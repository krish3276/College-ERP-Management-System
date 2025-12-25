/**
 * Generate student enrollment number
 * Format: STU + YEAR + 4-digit sequential number
 * Example: STU2024001, STU2024002
 */
const generateEnrollmentNumber = async (pool) => {
  const year = new Date().getFullYear();
  const prefix = `STU${year}`;

  try {
    // Get the last enrollment number for this year
    const result = await pool.query(
      `SELECT enrollment_no FROM students 
       WHERE enrollment_no LIKE $1 
       ORDER BY enrollment_no DESC 
       LIMIT 1`,
      [`${prefix}%`]
    );

    if (result.rows.length === 0) {
      // First student of the year
      return `${prefix}001`;
    }

    // Extract the sequential number and increment
    const lastEnrollment = result.rows[0].enrollment_no;
    const lastNumber = parseInt(lastEnrollment.slice(-3));
    const newNumber = (lastNumber + 1).toString().padStart(3, '0');

    return `${prefix}${newNumber}`;
  } catch (error) {
    console.error('Error generating enrollment number:', error);
    throw error;
  }
};

/**
 * Generate teacher ID
 * Format: TCH + YEAR + 3-digit sequential number
 * Example: TCH2024001
 */
const generateTeacherId = async (pool) => {
  const year = new Date().getFullYear();
  const prefix = `TCH${year}`;

  try {
    const result = await pool.query(
      `SELECT teacher_id FROM teachers 
       WHERE teacher_id LIKE $1 
       ORDER BY teacher_id DESC 
       LIMIT 1`,
      [`${prefix}%`]
    );

    if (result.rows.length === 0) {
      return `${prefix}001`;
    }

    const lastId = result.rows[0].teacher_id;
    const lastNumber = parseInt(lastId.slice(-3));
    const newNumber = (lastNumber + 1).toString().padStart(3, '0');

    return `${prefix}${newNumber}`;
  } catch (error) {
    console.error('Error generating teacher ID:', error);
    throw error;
  }
};

/**
 * Generate parent ID
 * Format: PAR + YEAR + 3-digit sequential number
 * Example: PAR2024001
 */
const generateParentId = async (pool) => {
  const year = new Date().getFullYear();
  const prefix = `PAR${year}`;

  try {
    const result = await pool.query(
      `SELECT parent_id FROM parents 
       WHERE parent_id LIKE $1 
       ORDER BY parent_id DESC 
       LIMIT 1`,
      [`${prefix}%`]
    );

    if (result.rows.length === 0) {
      return `${prefix}001`;
    }

    const lastId = result.rows[0].parent_id;
    const lastNumber = parseInt(lastId.slice(-3));
    const newNumber = (lastNumber + 1).toString().padStart(3, '0');

    return `${prefix}${newNumber}`;
  } catch (error) {
    console.error('Error generating parent ID:', error);
    throw error;
  }
};

/**
 * Generate random password
 * 8 characters: uppercase, lowercase, numbers, special chars
 */
const generateRandomPassword = () => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '@#$%&*';
  
  const all = uppercase + lowercase + numbers + special;
  let password = '';
  
  // Ensure at least one of each type
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];
  
  // Fill remaining 4 characters
  for (let i = 0; i < 4; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }
  
  // Shuffle password
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

module.exports = {
  generateEnrollmentNumber,
  generateTeacherId,
  generateParentId,
  generateRandomPassword
};
