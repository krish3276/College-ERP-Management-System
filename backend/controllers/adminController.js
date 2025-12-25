const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const { generateEnrollmentNumber, generateRandomPassword } = require('../utils/generateCredentials');

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const { semester, department, search } = req.query;
    
    let query = 'SELECT * FROM students WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (semester) {
      query += ` AND semester = $${paramIndex}`;
      params.push(semester);
      paramIndex++;
    }

    if (department) {
      query += ` AND department = $${paramIndex}`;
      params.push(department);
      paramIndex++;
    }

    if (search) {
      query += ` AND (name ILIKE $${paramIndex} OR enrollment_no ILIKE $${paramIndex} OR email ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);

    res.json({
      success: true,
      count: result.rows.length,
      students: result.rows.map(student => ({
        ...student,
        dob: student.dob // DOB is the password for login
      }))
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching students'
    });
  }
};

// Add new student with auto-generated credentials
const addStudent = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      dob, 
      gender,
      address,
      semester, 
      department,
      guardian_name,
      guardian_phone
    } = req.body;

    // Check if email already exists
    const emailCheck = await pool.query(
      'SELECT * FROM students WHERE email = $1',
      [email]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Generate enrollment number
    const enrollment_no = await generateEnrollmentNumber(pool);

    // Insert student
    const result = await pool.query(
      `INSERT INTO students 
       (enrollment_no, name, email, phone, dob, gender, address, semester, department, guardian_name, guardian_phone, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
       RETURNING *`,
      [enrollment_no, name, email, phone, dob, gender, address, semester, department, guardian_name, guardian_phone, 'active']
    );

    const newStudent = result.rows[0];

    res.status(201).json({
      success: true,
      message: 'Student added successfully',
      student: newStudent,
      credentials: {
        enrollment_no: enrollment_no,
        password: dob, // DOB is used as password (format: YYYY-MM-DD)
        loginInstructions: 'Student can login with Enrollment Number and Date of Birth (YYYY-MM-DD format)'
      }
    });
  } catch (error) {
    console.error('Add student error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding student'
    });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      email, 
      phone, 
      dob, 
      gender,
      address,
      semester, 
      department,
      guardian_name,
      guardian_phone,
      status
    } = req.body;

    const result = await pool.query(
      `UPDATE students 
       SET name = $1, email = $2, phone = $3, dob = $4, gender = $5, address = $6,
           semester = $7, department = $8, guardian_name = $9, guardian_phone = $10, status = $11
       WHERE student_id = $12
       RETURNING *`,
      [name, email, phone, dob, gender, address, semester, department, guardian_name, guardian_phone, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Student updated successfully',
      student: result.rows[0]
    });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating student'
    });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM students WHERE student_id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting student'
    });
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM students WHERE student_id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      student: result.rows[0]
    });
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student'
    });
  }
};

// Get dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const totalStudentsResult = await pool.query('SELECT COUNT(*) FROM students');
    const totalTeachersResult = await pool.query('SELECT COUNT(*) FROM teachers');
    const totalSubjectsResult = await pool.query('SELECT COUNT(*) FROM subjects');
    const totalParentsResult = await pool.query('SELECT COUNT(*) FROM parents');

    const recentStudentsResult = await pool.query(
      'SELECT * FROM students ORDER BY created_at DESC LIMIT 5'
    );

    res.json({
      success: true,
      stats: {
        totalStudents: parseInt(totalStudentsResult.rows[0].count),
        totalTeachers: parseInt(totalTeachersResult.rows[0].count),
        totalSubjects: parseInt(totalSubjectsResult.rows[0].count),
        totalParents: parseInt(totalParentsResult.rows[0].count)
      },
      recentStudents: recentStudentsResult.rows
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats'
    });
  }
};

module.exports = {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
  getDashboardStats
};
