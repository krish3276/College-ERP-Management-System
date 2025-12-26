const pool = require('../config/database');
const { generateTeacherId, generateRandomPassword } = require('../utils/generateCredentials');
const bcrypt = require('bcryptjs');

// Get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const { department, search } = req.query;
    
    let query = 'SELECT id, teacher_id, full_name, email, phone, department, qualification, is_active FROM teachers WHERE 1=1';
    const params = [];

    if (department) {
      query += ` AND department = ?`;
      params.push(department);
    }

    if (search) {
      query += ` AND (full_name LIKE ? OR email LIKE ? OR teacher_id LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC';

    const [result] = await pool.query(query, params);

    res.json({
      success: true,
      count: result.length,
      teachers: result
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
    const [emailCheck] = await pool.query(
      'SELECT * FROM teachers WHERE email = ?',
      [email]
    );

    if (emailCheck.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Generate teacher ID and password
    const teacher_id = await generateTeacherId(pool);
    const generatedPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const [result] = await pool.query(
      `INSERT INTO teachers 
       (teacher_id, full_name, email, password_hash, phone, department, qualification, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
      [teacher_id, name, email, hashedPassword, phone, department, qualification]
    );

    // Get the newly created teacher
    const [newTeacher] = await pool.query(
      'SELECT id, teacher_id, full_name, email, phone, department, qualification, is_active FROM teachers WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Teacher added successfully',
      teacher: newTeacher[0],
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

    const [result] = await pool.query(
      `UPDATE teachers 
       SET full_name = ?, email = ?, phone = ?, department = ?, qualification = ?, is_active = ?
       WHERE teacher_id = ?`,
      [name, email, phone, department, qualification, status === 'active' ? 1 : 0, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    // Get updated teacher
    const [updatedTeacher] = await pool.query(
      'SELECT id, teacher_id, full_name, email, phone, department, qualification, is_active FROM teachers WHERE teacher_id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Teacher updated successfully',
      teacher: updatedTeacher[0]
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

    const [result] = await pool.query(
      'DELETE FROM teachers WHERE teacher_id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
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
    const { semester } = req.query;
    
    let query = `
      SELECT s.* 
      FROM subjects s
      WHERE 1=1
    `;
    const params = [];

    if (semester) {
      query += ` AND s.semester_id = ?`;
      params.push(semester);
    }

    query += ' ORDER BY s.subject_code';

    const [result] = await pool.query(query, params);

    res.json({
      success: true,
      count: result.length,
      subjects: result
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
    const [codeCheck] = await pool.query(
      'SELECT * FROM subjects WHERE subject_code = ?',
      [subject_code]
    );

    if (codeCheck.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Subject code already exists'
      });
    }

    const [result] = await pool.query(
      `INSERT INTO subjects 
       (subject_code, subject_name, semester_id, credits, is_active)
       VALUES (?, ?, ?, ?, 1)`,
      [subject_code, subject_name, semester, credits]
    );

    // Get the newly created subject
    const [newSubject] = await pool.query(
      'SELECT * FROM subjects WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Subject added successfully',
      subject: newSubject[0]
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

    const [result] = await pool.query(
      `UPDATE subjects 
       SET subject_code = ?, subject_name = ?, semester_id = ?, credits = ?
       WHERE id = ?`,
      [subject_code, subject_name, semester, credits, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    // Get updated subject
    const [updatedSubject] = await pool.query(
      'SELECT * FROM subjects WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Subject updated successfully',
      subject: updatedSubject[0]
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

    const [result] = await pool.query(
      'DELETE FROM subjects WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
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
