// Check database connection and student data
const pool = require('./config/database');

const checkDatabase = async () => {
  try {
    console.log('\n🔍 Checking Database...\n');
    
    // Check students
    const [students] = await pool.query('SELECT * FROM students');
    console.log(`📊 Total Students in DB: ${students.length}`);
    
    if (students.length > 0) {
      console.log('\n📝 Student Data:');
      students.forEach(s => {
        console.log(`- ${s.enrollment_number} | ${s.full_name} | DOB: ${s.date_of_birth}`);
      });
    } else {
      console.log('⚠️  No students found! Run seed.sql first.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database Error:', error.message);
    process.exit(1);
  }
};

checkDatabase();
