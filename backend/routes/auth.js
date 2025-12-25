const express = require('express');
const router = express.Router();
const { adminLogin, teacherLogin, studentLogin, parentLogin } = require('../controllers/authController');

// Authentication routes
router.post('/admin/login', adminLogin);
router.post('/teacher/login', teacherLogin);
router.post('/student/login', studentLogin);
router.post('/parent/login', parentLogin);

module.exports = router;
