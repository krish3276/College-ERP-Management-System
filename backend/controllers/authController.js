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
    const [result] = await pool.query(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const admin = result[0];

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken({
      id: admin.id,
      email: admin.email,
      role: 'admin'
    });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: admin.id,
        name: admin.full_name,
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

    const [result] = await pool.query(
      'SELECT * FROM teachers WHERE email = ?',
      [email]
    );

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const teacher = result[0];

    const isPasswordValid = await bcrypt.compare(password, teacher.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken({
      id: teacher.id,
      email: teacher.email,
      role: 'teacher'
    });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: teacher.id,
        name: teacher.full_name,
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

    const [result] = await pool.query(
      'SELECT * FROM students WHERE enrollment_number = ?',
      [enrollment_no]
    );

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const student = result[0];

    // Compare DOB (format: YYYY-MM-DD)
    // MySQL DATE field comparison - format the date from DB
    let studentDOB;
    if (student.date_of_birth instanceof Date) {
      // Get local date parts to avoid timezone issues
      const year = student.date_of_birth.getFullYear();
      const month = String(student.date_of_birth.getMonth() + 1).padStart(2, '0');
      const day = String(student.date_of_birth.getDate()).padStart(2, '0');
      studentDOB = `${year}-${month}-${day}`;
    } else {
      // If it's already a string, use it directly
      studentDOB = student.date_of_birth.toString().split('T')[0];
    }
    
    if (studentDOB !== dob) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken({
      id: student.id,
      email: student.email,
      role: 'student'
    });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: student.id,
        enrollment_no: student.enrollment_number,
        name: student.full_name,
        email: student.email,
        semester: student.semester,
        department: student.branch,
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

    const [result] = await pool.query(
      'SELECT * FROM parents WHERE email = ?',
      [email]
    );

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const parent = result[0];

    const isPasswordValid = await bcrypt.compare(password, parent.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Get linked children
    const [childrenResult] = await pool.query(
      `SELECT id, enrollment_number, full_name, semester, branch
       FROM students
       WHERE id = ?`,
      [parent.student_id]
    );

    const token = generateToken({
      id: parent.id,
      email: parent.email,
      role: 'parent'
    });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: parent.id,
        name: parent.full_name,
        email: parent.email,
        relationship: parent.relation,
        role: 'parent',
        children: childrenResult
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
