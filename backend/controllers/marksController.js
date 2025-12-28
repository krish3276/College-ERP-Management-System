const pool = require('../config/database');

// Get all marks
const getAllMarks = async (req, res) => {
  try {
    const { semester, subject, student } = req.query;
    
    let query = `
      SELECT m.*, 
             s.full_name as student_name, s.enrollment_number,
             sub.subject_name, sub.subject_code,
             sem.semester_name
      FROM marks m
      JOIN students s ON m.student_id = s.id
      JOIN subjects sub ON m.subject_id = sub.id
      JOIN semesters sem ON sub.semester_id = sem.id
      WHERE 1=1
    `;
    const params = [];

    if (semester) {
      query += ` AND sem.id = ?`;
      params.push(semester);
    }

    if (subject) {
      query += ` AND sub.id = ?`;
      params.push(subject);
    }

    if (student) {
      query += ` AND s.id = ?`;
      params.push(student);
    }

    query += ' ORDER BY m.created_at DESC';

    const [result] = await pool.query(query, params);

    res.json({
      success: true,
      count: result.length,
      marks: result
    });
  } catch (error) {
    console.error('Get marks error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching marks'
    });
  }
};

// Add or update marks
const addOrUpdateMarks = async (req, res) => {
  try {
    const { 
      student_id,
      subject_id,
      internal_marks,
      external_marks,
      total_marks,
      grade
    } = req.body;

    // Check if marks already exist
    const [existing] = await pool.query(
      'SELECT id FROM marks WHERE student_id = ? AND subject_id = ?',
      [student_id, subject_id]
    );

    let result;
    if (existing.length > 0) {
      // Update existing marks
      result = await pool.query(
        `UPDATE marks 
         SET internal_marks = ?, external_marks = ?, total_marks = ?, grade = ?, updated_at = NOW()
         WHERE id = ?`,
        [internal_marks, external_marks, total_marks, grade, existing[0].id]
      );
    } else {
      // Insert new marks
      result = await pool.query(
        `INSERT INTO marks (student_id, subject_id, internal_marks, external_marks, total_marks, grade)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [student_id, subject_id, internal_marks, external_marks, total_marks, grade]
      );
    }

    res.json({
      success: true,
      message: 'Marks saved successfully'
    });
  } catch (error) {
    console.error('Add/Update marks error:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving marks'
    });
  }
};

// Update marks
const updateMarks = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      internal_marks,
      external_marks,
      total_marks,
      grade
    } = req.body;

    const [result] = await pool.query(
      `UPDATE marks 
       SET internal_marks = ?, external_marks = ?, total_marks = ?, grade = ?, updated_at = NOW()
       WHERE id = ?`,
      [internal_marks, external_marks, total_marks, grade, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Marks not found'
      });
    }

    res.json({
      success: true,
      message: 'Marks updated successfully'
    });
  } catch (error) {
    console.error('Update marks error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating marks'
    });
  }
};

// Get all semesters
const getAllSemesters = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM semesters ORDER BY semester_number ASC'
    );

    res.json({
      success: true,
      count: result.length,
      semesters: result
    });
  } catch (error) {
    console.error('Get semesters error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching semesters'
    });
  }
};

// Get reports - attendance, performance, etc.
const getReports = async (req, res) => {
  try {
    const { type } = req.params;
    
    let result;
    
    switch(type) {
      case 'attendance':
        // Get attendance statistics
        [result] = await pool.query(`
          SELECT 
            s.id, s.full_name, s.enrollment_number, s.semester,
            COUNT(a.id) as total_classes,
            SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) as present_count,
            ROUND((SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) / COUNT(a.id)) * 100, 2) as attendance_percentage
          FROM students s
          LEFT JOIN attendance a ON s.id = a.student_id
          GROUP BY s.id
          ORDER BY s.semester, s.full_name
        `);
        break;
        
      case 'performance':
        // Get academic performance
        [result] = await pool.query(`
          SELECT 
            s.id, s.full_name, s.enrollment_number, s.semester,
            COUNT(m.id) as subjects_count,
            AVG(m.total_marks) as average_marks,
            AVG(m.internal_marks) as avg_internal,
            AVG(m.external_marks) as avg_external
          FROM students s
          LEFT JOIN marks m ON s.id = m.student_id
          GROUP BY s.id
          ORDER BY average_marks DESC
        `);
        break;
        
      case 'semester-wise':
        // Get semester-wise statistics
        [result] = await pool.query(`
          SELECT 
            sem.semester_name,
            COUNT(DISTINCT s.id) as student_count,
            COUNT(DISTINCT sub.id) as subject_count,
            AVG(m.total_marks) as average_marks
          FROM semesters sem
          LEFT JOIN students s ON s.semester = sem.semester_number
          LEFT JOIN subjects sub ON sub.semester_id = sem.id
          LEFT JOIN marks m ON m.subject_id = sub.id
          GROUP BY sem.id
          ORDER BY sem.semester_number
        `);
        break;
        
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid report type'
        });
    }

    res.json({
      success: true,
      type,
      data: result
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating report'
    });
  }
};

module.exports = {
  getAllMarks,
  addOrUpdateMarks,
  updateMarks,
  getAllSemesters,
  getReports
};
