const pool = require('../config/database');

// Get student dashboard data
const getDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Get student info
    const studentInfo = await pool.query(
      'SELECT * FROM students WHERE student_id = $1',
      [studentId]
    );

    if (studentInfo.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const student = studentInfo.rows[0];

    // Get enrolled subjects for current semester
    const subjects = await pool.query(
      `SELECT s.*, t.name as teacher_name 
       FROM subjects s
       LEFT JOIN teachers t ON s.teacher_id = t.teacher_id
       WHERE s.semester = $1 AND s.department = $2`,
      [student.semester, student.department]
    );

    // Get upcoming assignments
    const assignments = await pool.query(
      `SELECT a.*, s.subject_name 
       FROM assignments a
       INNER JOIN subjects s ON a.subject_id = s.subject_id
       WHERE s.semester = $1 AND s.department = $2 AND a.due_date >= CURRENT_DATE
       ORDER BY a.due_date ASC
       LIMIT 5`,
      [student.semester, student.department]
    );

    // Calculate GPA
    const gradesResult = await pool.query(
      `SELECT AVG(
        CASE 
          WHEN grade = 'A+' THEN 10
          WHEN grade = 'A' THEN 9
          WHEN grade = 'B+' THEN 8
          WHEN grade = 'B' THEN 7
          WHEN grade = 'C+' THEN 6
          WHEN grade = 'C' THEN 5
          ELSE 0
        END
      ) as cgpa
      FROM marks
      WHERE student_id = $1`,
      [studentId]
    );

    const cgpa = gradesResult.rows[0].cgpa || 0;

    res.json({
      success: true,
      data: {
        student: {
          name: student.name,
          enrollment_no: student.enrollment_no,
          semester: student.semester,
          department: student.department,
          cgpa: parseFloat(cgpa).toFixed(2)
        },
        subjects: subjects.rows,
        upcomingAssignments: assignments.rows
      }
    });
  } catch (error) {
    console.error('Student dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data'
    });
  }
};

// Get student's subjects/courses
const getMyCourses = async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await pool.query(
      'SELECT semester, department FROM students WHERE student_id = $1',
      [studentId]
    );

    if (student.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const { semester, department } = student.rows[0];

    const subjects = await pool.query(
      `SELECT s.*, t.name as teacher_name, t.email as teacher_email
       FROM subjects s
       LEFT JOIN teachers t ON s.teacher_id = t.teacher_id
       WHERE s.semester = $1 AND s.department = $2
       ORDER BY s.subject_code`,
      [semester, department]
    );

    res.json({
      success: true,
      count: subjects.rows.length,
      subjects: subjects.rows
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching courses'
    });
  }
};

// Get student's grades
const getGrades = async (req, res) => {
  try {
    const studentId = req.user.id;

    const grades = await pool.query(
      `SELECT m.*, s.subject_name, s.subject_code, s.credits
       FROM marks m
       INNER JOIN subjects s ON m.subject_id = s.subject_id
       WHERE m.student_id = $1
       ORDER BY s.semester DESC, s.subject_code`,
      [studentId]
    );

    // Calculate CGPA
    const cgpaResult = await pool.query(
      `SELECT AVG(
        CASE 
          WHEN grade = 'A+' THEN 10
          WHEN grade = 'A' THEN 9
          WHEN grade = 'B+' THEN 8
          WHEN grade = 'B' THEN 7
          WHEN grade = 'C+' THEN 6
          WHEN grade = 'C' THEN 5
          ELSE 0
        END
      ) as cgpa
      FROM marks
      WHERE student_id = $1`,
      [studentId]
    );

    res.json({
      success: true,
      cgpa: parseFloat(cgpaResult.rows[0].cgpa || 0).toFixed(2),
      grades: grades.rows
    });
  } catch (error) {
    console.error('Get grades error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching grades'
    });
  }
};

// Get student's assignments
const getAssignments = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { status } = req.query; // pending, submitted, evaluated

    const student = await pool.query(
      'SELECT semester, department FROM students WHERE student_id = $1',
      [studentId]
    );

    if (student.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const { semester, department } = student.rows[0];

    let query = `
      SELECT a.*, s.subject_name, s.subject_code,
             sub.submission_id, sub.submitted_at, sub.marks_obtained, sub.feedback
      FROM assignments a
      INNER JOIN subjects s ON a.subject_id = s.subject_id
      LEFT JOIN submissions sub ON a.assignment_id = sub.assignment_id AND sub.student_id = $1
      WHERE s.semester = $2 AND s.department = $3
    `;

    if (status === 'pending') {
      query += ' AND sub.submission_id IS NULL AND a.due_date >= CURRENT_DATE';
    } else if (status === 'submitted') {
      query += ' AND sub.submission_id IS NOT NULL AND sub.marks_obtained IS NULL';
    } else if (status === 'evaluated') {
      query += ' AND sub.marks_obtained IS NOT NULL';
    }

    query += ' ORDER BY a.due_date DESC';

    const result = await pool.query(query, [studentId, semester, department]);

    res.json({
      success: true,
      count: result.rows.length,
      assignments: result.rows
    });
  } catch (error) {
    console.error('Get assignments error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching assignments'
    });
  }
};

// Submit assignment
const submitAssignment = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { assignment_id, submission_text, file_path } = req.body;

    // Check if already submitted
    const existingSubmission = await pool.query(
      'SELECT * FROM submissions WHERE assignment_id = $1 AND student_id = $2',
      [assignment_id, studentId]
    );

    if (existingSubmission.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Assignment already submitted'
      });
    }

    const result = await pool.query(
      `INSERT INTO submissions (assignment_id, student_id, submission_text, file_path, submitted_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING *`,
      [assignment_id, studentId, submission_text, file_path]
    );

    res.status(201).json({
      success: true,
      message: 'Assignment submitted successfully',
      submission: result.rows[0]
    });
  } catch (error) {
    console.error('Submit assignment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting assignment'
    });
  }
};

// Get attendance
const getAttendance = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { month, year } = req.query;

    let query = 'SELECT * FROM attendance WHERE student_id = $1';
    const params = [studentId];

    if (month && year) {
      query += ' AND EXTRACT(MONTH FROM date) = $2 AND EXTRACT(YEAR FROM date) = $3';
      params.push(month, year);
    }

    query += ' ORDER BY date DESC';

    const result = await pool.query(query, params);

    // Calculate attendance percentage
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
    console.error('Get attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance'
    });
  }
};

module.exports = {
  getDashboard,
  getMyCourses,
  getGrades,
  getAssignments,
  submitAssignment,
  getAttendance
};
