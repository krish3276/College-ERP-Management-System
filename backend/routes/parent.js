const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyToken, isParent } = require('../middleware/auth');

// All routes require authentication and parent role
router.use(verifyToken, isParent);

// Get linked children
router.get('/children', async (req, res) => {
  try {
    const parentId = req.user.id;

    const result = await pool.query(
      `SELECT s.* 
       FROM students s
       INNER JOIN parent_student_links psl ON s.student_id = psl.student_id
       WHERE psl.parent_id = $1`,
      [parentId]
    );

    res.json({
      success: true,
      children: result.rows
    });
  } catch (error) {
    console.error('Get children error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching children data'
    });
  }
});

// Get child's grades
router.get('/children/:studentId/grades', async (req, res) => {
  try {
    const { studentId } = req.params;
    const parentId = req.user.id;

    // Verify this child is linked to this parent
    const linkCheck = await pool.query(
      'SELECT * FROM parent_student_links WHERE parent_id = $1 AND student_id = $2',
      [parentId, studentId]
    );

    if (linkCheck.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const grades = await pool.query(
      `SELECT m.*, s.subject_name, s.subject_code, s.credits
       FROM marks m
       INNER JOIN subjects s ON m.subject_id = s.subject_id
       WHERE m.student_id = $1
       ORDER BY s.semester DESC, s.subject_code`,
      [studentId]
    );

    res.json({
      success: true,
      grades: grades.rows
    });
  } catch (error) {
    console.error('Get child grades error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching grades'
    });
  }
});

// Get child's attendance
router.get('/children/:studentId/attendance', async (req, res) => {
  try {
    const { studentId } = req.params;
    const parentId = req.user.id;
    const { month, year } = req.query;

    // Verify link
    const linkCheck = await pool.query(
      'SELECT * FROM parent_student_links WHERE parent_id = $1 AND student_id = $2',
      [parentId, studentId]
    );

    if (linkCheck.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    let query = 'SELECT * FROM attendance WHERE student_id = $1';
    const params = [studentId];

    if (month && year) {
      query += ' AND EXTRACT(MONTH FROM date) = $2 AND EXTRACT(YEAR FROM date) = $3';
      params.push(month, year);
    }

    query += ' ORDER BY date DESC';

    const result = await pool.query(query, params);

    const total = result.rows.length;
    const present = result.rows.filter(r => r.status === 'present').length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

    res.json({
      success: true,
      attendancePercentage: percentage,
      totalDays: total,
      presentDays: present,
      records: result.rows
    });
  } catch (error) {
    console.error('Get child attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance'
    });
  }
});

// Get teachers
router.get('/teachers', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT teacher_id, name, email, phone, department, qualification FROM teachers WHERE status = $1',
      ['active']
    );

    res.json({
      success: true,
      teachers: result.rows
    });
  } catch (error) {
    console.error('Get teachers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching teachers'
    });
  }
});

module.exports = router;
