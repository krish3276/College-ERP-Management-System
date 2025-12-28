const bcrypt = require('bcryptjs');
const pool = require('./config/database');

async function testLogins() {
  console.log('\n🔍 Testing Login Credentials...\n');
  
  // Test bcrypt hash
  const password = 'admin123';
  const hash = '$2a$10$CwTycUXWue0Thq9StjUM0uJ8C8I8.YJZFtKjQQxZpFJBr8sE0YXCa';
  
  console.log('1. Testing bcrypt hash:');
  console.log(`   Password: ${password}`);
  console.log(`   Hash: ${hash}`);
  const isValid = await bcrypt.compare(password, hash);
  console.log(`   ✓ Hash valid: ${isValid}\n`);
  
  // Check admin in database
  console.log('2. Checking Admin in database:');
  const [admins] = await pool.query('SELECT * FROM admins WHERE email = ?', ['admin@college.edu']);
  if (admins.length > 0) {
    console.log(`   ✓ Admin found: ${admins[0].email}`);
    console.log(`   ✓ Name: ${admins[0].full_name}`);
    console.log(`   ✓ Hash in DB: ${admins[0].password_hash}`);
    const dbHashValid = await bcrypt.compare('admin123', admins[0].password_hash);
    console.log(`   ✓ Password 'admin123' matches DB hash: ${dbHashValid}\n`);
  } else {
    console.log('   ✗ Admin not found!\n');
  }
  
  // Check teacher
  console.log('3. Checking Teacher in database:');
  const [teachers] = await pool.query('SELECT * FROM teachers WHERE email = ?', ['john.smith@college.edu']);
  if (teachers.length > 0) {
    console.log(`   ✓ Teacher found: ${teachers[0].email}`);
    console.log(`   ✓ Name: ${teachers[0].full_name}`);
    console.log(`   ✓ Hash in DB: ${teachers[0].password_hash}`);
    const teacherHashValid = await bcrypt.compare('teacher123', teachers[0].password_hash);
    console.log(`   ✓ Password 'teacher123' matches DB hash: ${teacherHashValid}\n`);
  } else {
    console.log('   ✗ Teacher not found!\n');
  }
  
  // Check parent
  console.log('4. Checking Parent in database:');
  const [parents] = await pool.query('SELECT * FROM parents WHERE email = ?', ['parent1@gmail.com']);
  if (parents.length > 0) {
    console.log(`   ✓ Parent found: ${parents[0].email}`);
    console.log(`   ✓ Name: ${parents[0].full_name}`);
    console.log(`   ✓ Hash in DB: ${parents[0].password_hash}`);
    const parentHashValid = await bcrypt.compare('parent123', parents[0].password_hash);
    console.log(`   ✓ Password 'parent123' matches DB hash: ${parentHashValid}\n`);
  } else {
    console.log('   ✗ Parent not found!\n');
  }
  
  // Check student
  console.log('5. Checking Student in database:');
  const [students] = await pool.query('SELECT * FROM students WHERE enrollment_number = ?', ['2024001']);
  if (students.length > 0) {
    console.log(`   ✓ Student found: ${students[0].enrollment_number}`);
    console.log(`   ✓ Name: ${students[0].full_name}`);
    console.log(`   ✓ DOB in DB: ${students[0].date_of_birth}`);
    console.log(`   ✓ Password hash field: ${students[0].password_hash}\n`);
  } else {
    console.log('   ✗ Student not found!\n');
  }
  
  process.exit(0);
}

testLogins().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
