const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. No token provided.' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid token.' 
    });
  }
};

// Admin only middleware
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Admin only.' 
    });
  }
  next();
};

// Teacher only middleware
const isTeacher = (req, res, next) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Teacher only.' 
    });
  }
  next();
};

// Student only middleware
const isStudent = (req, res, next) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Student only.' 
    });
  }
  next();
};

// Parent only middleware
const isParent = (req, res, next) => {
  if (req.user.role !== 'parent') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Parent only.' 
    });
  }
  next();
};

// Admin or Teacher middleware
const isAdminOrTeacher = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'teacher') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Admin or Teacher only.' 
    });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin,
  isTeacher,
  isStudent,
  isParent,
  isAdminOrTeacher
};
