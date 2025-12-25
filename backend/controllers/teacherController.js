const pool = require('../config/database');
const { generateTeacherId, generateRandomPassword } = require('../utils/generateCredentials');
const bcrypt = require('bcryptjs');

// Get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const { department, search } = req.query;
    
    let query = 'SELECT teacher_id, name, email, phone, department, qualification, experience, status FROM teachers WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (department) {
      query += ` AND department = $${paramIndex}`;
      params.push(department);
      paramIndex++;
    }

    if (search) {
      query += ` AND (name ILIKE $${paramIndex} OR email ILIKE $${paramIndex} OR teacher_id ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);

    res.json({
      success: true,
      count: result.rows.length,
      teachers: result.rows
    });
  } catch (error) {
    console.error('Get teachers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching teachers'
    });
  }
};

// Add new teacher
const addTeacher = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      department,
      qualification,
      experience,
      address
    } = req.body;

    // Check if email already exists
    const emailCheck = await pool.query(
      'SELECT * FROM teachers WHERE email = $1',
      [email]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Generate teacher ID and password
    const teacher_id = await generateTeacherId(pool);
    const generatedPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const result = await pool.query(
      `INSERT INTO teachers 
       (teacher_id, name, email, password, phone, department, qualification, experience, address, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
       RETURNING teacher_id, name, email, phone, department, qualification, experience, status`,
      [teacher_id, name, email, hashedPassword, phone, department, qualification, experience, address, 'active']
    );

    res.status(201).json({
      success: true,
      message: 'Teacher added successfully',
      teacher: result.rows[0],
      credentials: {
        teacher_id: teacher_id,
        email: email,
        password: generatedPassword,
        loginInstructions: 'Teacher can login with Email and the provided password'
      }
    });
  } catch (error) {
    console.error('Add teacher error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding teacher'
    });
  }
};

// Update teacher
const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      email, 
      phone, 
      department,
      qualification,
      experience,
      address,
      status
    } = req.body;

    const result = await pool.query(
      `UPDATE teachers 
       SET name = $1, email = $2, phone = $3, department = $4, qualification = $5, experience = $6, address = $7, status = $8
       WHERE teacher_id = $9
       RETURNING teacher_id, name, email, phone, department, qualification, experience, status`,
      [name, email, phone, department, qualification, experience, address, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.json({
      success: true,
      message: 'Teacher updated successfully',
      teacher: result.rows[0]
    });
  } catch (error) {
    console.error('Update teacher error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating teacher'
    });
  }
};

// Delete teacher
const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM teachers WHERE teacher_id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.json({
      success: true,
      message: 'Teacher deleted successfully'
    });
  } catch (error) {
    console.error('Delete teacher error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting teacher'
    });
  }
};

// Get all subjects
const getAllSubjects = async (req, res) => {
  try {
    const { semester, department } = req.query;
    
    let query = `
      SELECT s.*, t.name as teacher_name 
      FROM subjects s
      LEFT JOIN teachers t ON s.teacher_id = t.teacher_id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (semester) {
      query += ` AND s.semester = $${paramIndex}`;
      params.push(semester);
      paramIndex++;
    }

    if (department) {
      query += ` AND s.department = $${paramIndex}`;
      params.push(department);
      paramIndex++;
    }

    query += ' ORDER BY s.semester, s.subject_code';

    const result = await pool.query(query, params);

    res.json({
      success: true,
      count: result.rows.length,
      subjects: result.rows
    });
  } catch (error) {
    console.error('Get subjects error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching subjects'
    });
  }
};

// Add new subject
const addSubject = async (req, res) => {
  try {
    const { 
      subject_code, 
      subject_name, 
      semester, 
      credits,
      department,
      teacher_id
    } = req.body;

    // Check if subject code already exists
    const codeCheck = await pool.query(
      'SELECT * FROM subjects WHERE subject_code = $1',
      [subject_code]
    );

    if (codeCheck.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Subject code already exists'
      });
    }

    const result = await pool.query(
      `INSERT INTO subjects 
       (subject_code, subject_name, semester, credits, department, teacher_id, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING *`,
      [subject_code, subject_name, semester, credits, department, teacher_id]
    );

    res.status(201).json({
      success: true,
      message: 'Subject added successfully',
      subject: result.rows[0]
    });
  } catch (error) {
    console.error('Add subject error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding subject'
    });
  }
};

// Update subject
const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      subject_code, 
      subject_name, 
      semester, 
      credits,
      department,
      teacher_id
    } = req.body;

    const result = await pool.query(
      `UPDATE subjects 
       SET subject_code = $1, subject_name = $2, semester = $3, credits = $4, department = $5, teacher_id = $6
       WHERE subject_id = $7
       RETURNING *`,
      [subject_code, subject_name, semester, credits, department, teacher_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.json({
      success: true,
      message: 'Subject updated successfully',
      subject: result.rows[0]
    });
  } catch (error) {
    console.error('Update subject error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating subject'
    });
  }
};

// Delete subject
const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM subjects WHERE subject_id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.json({
      success: true,
      message: 'Subject deleted successfully'
    });
  } catch (error) {
    console.error('Delete subject error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting subject'
    });
  }
};

module.exports = {
  getAllTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  getAllSubjects,
  addSubject,
  updateSubject,
  deleteSubject
};
