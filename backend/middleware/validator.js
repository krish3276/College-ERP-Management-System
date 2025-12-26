const { body, validationResult } = require('express-validator');

// Validation middleware to handle errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Student validation rules
const validateStudent = [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('dob').isDate().withMessage('Valid date of birth is required'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Valid gender is required'),
  body('course').notEmpty().withMessage('Course is required'),
  body('semester').isInt({ min: 1, max: 10 }).withMessage('Valid semester is required'),
  body('parent_name').optional().trim(),
  body('parent_phone').optional().trim(),
  validate
];

// Teacher validation rules
const validateTeacher = [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('dob').isDate().withMessage('Valid date of birth is required'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Valid gender is required'),
  body('qualification').notEmpty().withMessage('Qualification is required'),
  body('department').notEmpty().withMessage('Department is required'),
  validate
];

// Subject validation rules
const validateSubject = [
  body('subject_name').notEmpty().withMessage('Subject name is required').trim(),
  body('subject_code').notEmpty().withMessage('Subject code is required').trim(),
  body('semester').isInt({ min: 1, max: 10 }).withMessage('Valid semester is required'),
  body('credits').isInt({ min: 1, max: 10 }).withMessage('Valid credits are required'),
  validate
];

// Marks validation rules
const validateMarks = [
  body('student_id').isInt().withMessage('Valid student ID is required'),
  body('subject_id').isInt().withMessage('Valid subject ID is required'),
  body('marks_obtained').isInt({ min: 0, max: 100 }).withMessage('Marks must be between 0 and 100'),
  body('exam_type').isIn(['Mid-term', 'Final', 'Assignment', 'Quiz']).withMessage('Valid exam type is required'),
  validate
];

// Attendance validation rules
const validateAttendance = [
  body('student_id').isInt().withMessage('Valid student ID is required'),
  body('subject_id').isInt().withMessage('Valid subject ID is required'),
  body('status').isIn(['Present', 'Absent', 'Late']).withMessage('Valid status is required'),
  body('date').isDate().withMessage('Valid date is required'),
  validate
];

// Assignment validation rules
const validateAssignment = [
  body('subject_id').isInt().withMessage('Valid subject ID is required'),
  body('title').notEmpty().withMessage('Title is required').trim(),
  body('description').optional().trim(),
  body('due_date').isDate().withMessage('Valid due date is required'),
  validate
];

module.exports = {
  validate,
  validateStudent,
  validateTeacher,
  validateSubject,
  validateMarks,
  validateAttendance,
  validateAssignment
};
