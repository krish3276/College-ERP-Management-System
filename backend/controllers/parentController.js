const pool = require('../config/database');
const bcrypt = require('bcryptjs');

// Get all parents
const getAllParents = async (req, res) => {
  try {
    const { search } = req.query;
    
    let query = `
      SELECT p.*, s.full_name as student_name, s.enrollment_number 
      FROM parents p 
      LEFT JOIN students s ON p.student_id = s.id 
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      query += ` AND (p.full_name LIKE ? OR p.email LIKE ? OR s.full_name LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY p.created_at DESC';

    const [result] = await pool.query(query, params);

    res.json({
      success: true,
      count: result.length,
      parents: result
    });
  } catch (error) {
    console.error('Get parents error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching parents'
    });
  }
};

// Add new parent
const addParent = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      student_id,
      relation
    } = req.body;

    // Check if email already exists
    const [emailCheck] = await pool.query(
      'SELECT * FROM parents WHERE email = ?',
      [email]
    );

    if (emailCheck.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Generate random password
    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(password, 10);

    const username = email.split('@')[0];

    const [result] = await pool.query(
      `INSERT INTO parents 
       (username, email, password_hash, full_name, phone, student_id, relation, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
      [username, email, hashedPassword, name, phone, student_id, relation]
    );

    // Get the newly created parent
    const [newParent] = await pool.query(
      `SELECT p.*, s.full_name as student_name, s.enrollment_number 
       FROM parents p 
       LEFT JOIN students s ON p.student_id = s.id 
       WHERE p.id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Parent added successfully',
      parent: newParent[0],
      credentials: {
        email: email,
        password: password,
        loginInstructions: 'Parent can login with Email and the provided password'
      }
    });
  } catch (error) {
    console.error('Add parent error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding parent'
    });
  }
};

// Update parent
const updateParent = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      email, 
      phone, 
      student_id,
      relation,
      status
    } = req.body;

    const [result] = await pool.query(
      `UPDATE parents 
       SET full_name = ?, email = ?, phone = ?, student_id = ?, relation = ?, is_active = ?
       WHERE id = ?`,
      [name, email, phone, student_id, relation, status === 'active' ? 1 : 0, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Parent not found'
      });
    }

    // Get updated parent
    const [updatedParent] = await pool.query(
      `SELECT p.*, s.full_name as student_name, s.enrollment_number 
       FROM parents p 
       LEFT JOIN students s ON p.student_id = s.id 
       WHERE p.id = ?`,
      [id]
    );

    res.json({
      success: true,
      message: 'Parent updated successfully',
      parent: updatedParent[0]
    });
  } catch (error) {
    console.error('Update parent error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating parent'
    });
  }
};

// Delete parent
const deleteParent = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM parents WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Parent not found'
      });
    }

    res.json({
      success: true,
      message: 'Parent deleted successfully'
    });
  } catch (error) {
    console.error('Delete parent error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting parent'
    });
  }
};

module.exports = {
  getAllParents,
  addParent,
  updateParent,
  deleteParent
};
