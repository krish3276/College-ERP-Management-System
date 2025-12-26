const pool = require('../config/database');

// Get student dashboard data
const getDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Get student info
    const [studentInfo] = await pool.query(
      'SELECT * FROM students WHERE id = ?',
      [studentId]
    );

    if (studentInfo.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const student = studentInfo[0];

    // Get enrolled subjects for current semester
    const [subjects] = await pool.query(
      `SELECT s.* 
       FROM subjects s
       WHERE s.semester_id = ?`,
      [student.semester]
    );

    // Get upcoming assignments
    const [assignments] = await pool.query(
      `SELECT a.*, s.subject_name 
       FROM assignments a
       INNER JOIN subjects s ON a.subject_id = s.id
       WHERE a.due_date >= CURDATE()
       ORDER BY a.due_date ASC
       LIMIT 5`,
      []
    );

    // Calculate GPA
    const [[gradesResult]] = await pool.query(
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
      WHERE student_id = ?`,
      [studentId]
    );

    const cgpa = gradesResult.cgpa || 0;

    res.json({
      success: true,
      data: {
        student: {
          name: student.full_name,
          enrollment_no: student.enrollment_number,
          semester: student.semester,
          department: student.branch,
          cgpa: parseFloat(cgpa).toFixed(2)
        },
        subjects: subjects,
        upcomingAssignments: assignments
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

    const [student] = await pool.query(
      'SELECT semester, branch FROM students WHERE id = ?',
      [studentId]
    );

    if (student.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const { semester, branch } = student[0];

    const [subjects] = await pool.query(
      `SELECT s.*
       FROM subjects s
       WHERE s.semester_id = ?
       ORDER BY s.subject_code`,
      [semester]
    );

    res.json({
      success: true,
      count: subjects.length,
      subjects: subjects
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

    const [grades] = await pool.query(
      `SELECT m.*, s.subject_name, s.subject_code, s.credits
       FROM marks m
       INNER JOIN subjects s ON m.subject_id = s.id
       WHERE m.student_id = ?
       ORDER BY s.subject_code`,
      [studentId]
    );

    // Calculate CGPA
    const [[cgpaResult]] = await pool.query(
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
      WHERE student_id = ?`,
      [studentId]
    );

    res.json({
      success: true,
      cgpa: parseFloat(cgpaResult.cgpa || 0).toFixed(2),
      grades: grades
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

    const [student] = await pool.query(
      'SELECT semester, branch FROM students WHERE id = ?',
      [studentId]
    );

    if (student.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const { semester, branch } = student[0];

    let query = `
      SELECT a.*, s.subject_name, s.subject_code,
             sub.id as submission_id, sub.submitted_at, sub.marks_obtained, sub.feedback
      FROM assignments a
      INNER JOIN subjects s ON a.subject_id = s.id
      LEFT JOIN submissions sub ON a.id = sub.assignment_id AND sub.student_id = ?
      WHERE 1=1
    `;

    if (status === 'pending') {
      query += ' AND sub.id IS NULL AND a.due_date >= CURDATE()';
    } else if (status === 'submitted') {
      query += ' AND sub.id IS NOT NULL AND sub.marks_obtained IS NULL';
    } else if (status === 'evaluated') {
      query += ' AND sub.marks_obtained IS NOT NULL';
    }

    query += ' ORDER BY a.due_date DESC';

    const [result] = await pool.query(query, [studentId]);

    res.json({
      success: true,
      count: result.length,
      assignments: result
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
    const [existingSubmission] = await pool.query(
      'SELECT * FROM submissions WHERE assignment_id = ? AND student_id = ?',
      [assignment_id, studentId]
    );

    if (existingSubmission.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Assignment already submitted'
      });
    }

    const [result] = await pool.query(
      `INSERT INTO submissions (assignment_id, student_id, submission_text, file_path, submitted_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [assignment_id, studentId, submission_text, file_path]
    );

    // Get the newly created submission
    const [newSubmission] = await pool.query(
      'SELECT * FROM submissions WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Assignment submitted successfully',
      submission: newSubmission[0]
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

    let query = 'SELECT * FROM attendance WHERE student_id = ?';
    const params = [studentId];

    if (month && year) {
      query += ' AND MONTH(date) = ? AND YEAR(date) = ?';
      params.push(month, year);
    }

    query += ' ORDER BY date DESC';

    const [result] = await pool.query(query, params);

    // Calculate attendance percentage
    const total = result.length;
    const present = result.filter(r => r.status === 'Present').length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

    res.json({
      success: true,
      attendancePercentage: percentage,
      totalDays: total,
      presentDays: present,
      records: result
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
