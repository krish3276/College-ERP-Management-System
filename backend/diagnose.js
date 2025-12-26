// Diagnostic - Check exact student data and date format
const pool = require('./config/database');

const diagnose = async () => {
  try {
    console.log('\n🔍 Diagnosing Student Login Issue...\n');
    
    const [students] = await pool.query(
      'SELECT enrollment_number, full_name, date_of_birth, password_hash FROM students WHERE enrollment_number = ?',
      ['2024001']
    );
    
    if (students.length === 0) {
      console.log('❌ Student 2024001 not found!');
      process.exit(1);
    }
    
    const student = students[0];
    const testDOB = '2005-01-15';
    
    console.log('📊 Database Values:');
    console.log('  Enrollment:', student.enrollment_number);
    console.log('  Name:', student.full_name);
    console.log('  DOB (raw):', student.date_of_birth);
    console.log('  DOB (type):', typeof student.date_of_birth);
    console.log('  Password Hash:', student.password_hash);
    
    console.log('\n🔄 Processing DOB:');
    const formattedDOB = new Date(student.date_of_birth).toISOString().split('T')[0];
    console.log('  Formatted DOB:', formattedDOB);
    console.log('  Test DOB:', testDOB);
    console.log('  Match:', formattedDOB === testDOB);
    
    console.log('\n📅 Date Details:');
    const dbDate = new Date(student.date_of_birth);
    console.log('  DB Date Object:', dbDate);
    console.log('  ISO String:', dbDate.toISOString());
    console.log('  UTC Date:', dbDate.toUTCString());
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

diagnose();
