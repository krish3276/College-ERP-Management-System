const express = require('express');
const router = express.Router();
const { verifyToken, isStudent } = require('../middleware/auth');
const {
  getDashboard,
  getMyCourses,
  getGrades,
  getAssignments,
  submitAssignment,
  getAttendance
} = require('../controllers/studentController');

// All routes require authentication and student role
router.use(verifyToken, isStudent);

// Student routes
router.get('/dashboard', getDashboard);
router.get('/courses', getMyCourses);
router.get('/grades', getGrades);
router.get('/assignments', getAssignments);
router.post('/assignments/submit', submitAssignment);
router.get('/attendance', getAttendance);

module.exports = router;
