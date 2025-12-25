const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check if admin exists
    const result = await pool.query(
      'SELECT * FROM admins WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const admin = result.rows[0];

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken({
      id: admin.admin_id,
      email: admin.email,
      role: 'admin'
    });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: admin.admin_id,
        name: admin.name,
        email: admin.email,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// Teacher Login
const teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const result = await pool.query(
      'SELECT * FROM teachers WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const teacher = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken({
      id: teacher.teacher_id,
      email: teacher.email,
      role: 'teacher'
    });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: teacher.teacher_id,
        name: teacher.name,
        email: teacher.email,
        department: teacher.department,
        role: 'teacher'
      }
    });
  } catch (error) {
    console.error('Teacher login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// Student Login (Enrollment Number + DOB)
const studentLogin = async (req, res) => {
  try {
    const { enrollment_no, dob } = req.body;

    if (!enrollment_no || !dob) {
      return res.status(400).json({
        success: false,
        message: 'Please provide enrollment number and date of birth'
      });
    }

    const result = await pool.query(
      'SELECT * FROM students WHERE enrollment_no = $1',
      [enrollment_no]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const student = result.rows[0];

    // Compare DOB (format: YYYY-MM-DD)
    const studentDOB = new Date(student.dob).toISOString().split('T')[0];
    if (studentDOB !== dob) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken({
      id: student.student_id,
      email: student.email,
      role: 'student'
    });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: student.student_id,
        enrollment_no: student.enrollment_no,
        name: student.name,
        email: student.email,
        semester: student.semester,
        department: student.department,
        role: 'student'
      }
    });
  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// Parent Login
const parentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const result = await pool.query(
      'SELECT * FROM parents WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const parent = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, parent.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Get linked children
    const childrenResult = await pool.query(
      `SELECT s.student_id, s.enrollment_no, s.name, s.semester, s.department
       FROM students s
       INNER JOIN parent_student_links psl ON s.student_id = psl.student_id
       WHERE psl.parent_id = $1`,
      [parent.parent_id]
    );

    const token = generateToken({
      id: parent.parent_id,
      email: parent.email,
      role: 'parent'
    });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: parent.parent_id,
        name: parent.name,
        email: parent.email,
        relationship: parent.relationship,
        role: 'parent',
        children: childrenResult.rows
      }
    });
  } catch (error) {
    console.error('Parent login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

module.exports = {
  adminLogin,
  teacherLogin,
  studentLogin,
  parentLogin
};
