const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const { validateStudent, validateTeacher, validateSubject } = require('../middleware/validator');
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
  getDashboardStats
} = require('../controllers/adminController');
const {
  getAllTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  getAllSubjects,
  addSubject,
  updateSubject,
  deleteSubject
} = require('../controllers/teacherController');
const {
  getAllParents,
  addParent,
  updateParent,
  deleteParent
} = require('../controllers/parentController');
const {
  getAllMarks,
  addOrUpdateMarks,
  updateMarks,
  getAllSemesters,
  getReports
} = require('../controllers/marksController');

// All routes require authentication and admin role
router.use(verifyToken, isAdmin);

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// Student management
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.post('/students', validateStudent, addStudent);
router.put('/students/:id', validateStudent, updateStudent);
router.delete('/students/:id', deleteStudent);

// Teacher management
router.get('/teachers', getAllTeachers);
router.post('/teachers', validateTeacher, addTeacher);
router.put('/teachers/:id', validateTeacher, updateTeacher);
router.delete('/teachers/:id', deleteTeacher);

// Subject management
router.get('/subjects', getAllSubjects);
router.post('/subjects', validateSubject, addSubject);
router.put('/subjects/:id', validateSubject, updateSubject);
router.delete('/subjects/:id', deleteSubject);

// Parent management
router.get('/parents', getAllParents);
router.post('/parents', addParent);
router.put('/parents/:id', updateParent);
router.delete('/parents/:id', deleteParent);

// Marks management
router.get('/marks', getAllMarks);
router.post('/marks', addOrUpdateMarks);
router.put('/marks/:id', updateMarks);

// Semesters
router.get('/semesters', getAllSemesters);

// Reports
router.get('/reports/:type', getReports);

module.exports = router;
