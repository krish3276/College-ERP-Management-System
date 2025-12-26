const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const { generateEnrollmentNumber, generateRandomPassword } = require('../utils/generateCredentials');

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const { semester, department, search } = req.query;
    
    let query = 'SELECT * FROM students WHERE 1=1';
    const params = [];

    if (semester) {
      query += ` AND semester = ?`;
      params.push(semester);
    }

    if (department) {
      query += ` AND branch = ?`;
      params.push(department);
    }

    if (search) {
      query += ` AND (full_name LIKE ? OR enrollment_number LIKE ? OR email LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC';

    const [result] = await pool.query(query, params);

    res.json({
      success: true,
      count: result.length,
      students: result.map(student => ({
        ...student,
        date_of_birth: student.date_of_birth // DOB is the password for login
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
    const [emailCheck] = await pool.query(
      'SELECT * FROM students WHERE email = ?',
      [email]
    );

    if (emailCheck.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Generate enrollment number
    const enrollment_no = await generateEnrollmentNumber(pool);

    // Insert student
    const [result] = await pool.query(
      `INSERT INTO students 
       (enrollment_number, full_name, email, phone, date_of_birth, address, semester, branch, parent_phone, is_active, password_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
      [enrollment_no, name, email, phone, dob, address, semester, department, guardian_phone, dob.replace(/-/g, '')]
    );

    // Get the newly created student
    const [newStudent] = await pool.query(
      'SELECT * FROM students WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Student added successfully',
      student: newStudent[0],
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

    const [result] = await pool.query(
      `UPDATE students 
       SET full_name = ?, email = ?, phone = ?, date_of_birth = ?, address = ?,
           semester = ?, branch = ?, parent_phone = ?, is_active = ?
       WHERE id = ?`,
      [name, email, phone, dob, address, semester, department, guardian_phone, status === 'active' ? 1 : 0, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Get updated student
    const [updatedStudent] = await pool.query(
      'SELECT * FROM students WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Student updated successfully',
      student: updatedStudent[0]
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

    const [result] = await pool.query(
      'DELETE FROM students WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
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

    const [result] = await pool.query(
      'SELECT * FROM students WHERE id = ?',
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      student: result[0]
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
    const [[totalStudentsResult]] = await pool.query('SELECT COUNT(*) as count FROM students');
    const [[totalTeachersResult]] = await pool.query('SELECT COUNT(*) as count FROM teachers');
    const [[totalSubjectsResult]] = await pool.query('SELECT COUNT(*) as count FROM subjects');
    const [[totalParentsResult]] = await pool.query('SELECT COUNT(*) as count FROM parents');

    const [recentStudentsResult] = await pool.query(
      'SELECT * FROM students ORDER BY created_at DESC LIMIT 5'
    );

    res.json({
      success: true,
      stats: {
        totalStudents: parseInt(totalStudentsResult.count),
        totalTeachers: parseInt(totalTeachersResult.count),
        totalSubjects: parseInt(totalSubjectsResult.count),
        totalParents: parseInt(totalParentsResult.count)
      },
      recentStudents: recentStudentsResult
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
