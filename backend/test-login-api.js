const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testLogins() {
  console.log('\n🔐 Testing Login Endpoints...\n');
  
  // Test Admin Login
  try {
    console.log('1. Testing Admin Login...');
    const adminRes = await axios.post(`${API_URL}/auth/admin/login`, {
      email: 'admin@college.edu',
      password: 'admin123'
    });
    console.log('   ✅ Admin login successful!');
    console.log(`   Token: ${adminRes.data.token.substring(0, 50)}...`);
    console.log(`   User: ${adminRes.data.user.name}\n`);
  } catch (err) {
    console.log(`   ❌ Admin login failed: ${err.response?.data?.message || err.message}\n`);
  }
  
  // Test Teacher Login
  try {
    console.log('2. Testing Teacher Login...');
    const teacherRes = await axios.post(`${API_URL}/auth/teacher/login`, {
      email: 'john.smith@college.edu',
      password: 'teacher123'
    });
    console.log('   ✅ Teacher login successful!');
    console.log(`   Token: ${teacherRes.data.token.substring(0, 50)}...`);
    console.log(`   User: ${teacherRes.data.user.name}\n`);
  } catch (err) {
    console.log(`   ❌ Teacher login failed: ${err.response?.data?.message || err.message}\n`);
  }
  
  // Test Student Login
  try {
    console.log('3. Testing Student Login...');
    const studentRes = await axios.post(`${API_URL}/auth/student/login`, {
      enrollment_no: '2024001',
      dob: '2005-01-15'
    });
    console.log('   ✅ Student login successful!');
    console.log(`   Token: ${studentRes.data.token.substring(0, 50)}...`);
    console.log(`   User: ${studentRes.data.user.name}\n`);
  } catch (err) {
    console.log(`   ❌ Student login failed: ${err.response?.data?.message || err.message}\n`);
  }
  
  // Test Parent Login
  try {
    console.log('4. Testing Parent Login...');
    const parentRes = await axios.post(`${API_URL}/auth/parent/login`, {
      email: 'parent1@gmail.com',
      password: 'parent123'
    });
    console.log('   ✅ Parent login successful!');
    console.log(`   Token: ${parentRes.data.token.substring(0, 50)}...`);
    console.log(`   User: ${parentRes.data.user.name}\n`);
  } catch (err) {
    console.log(`   ❌ Parent login failed: ${err.response?.data?.message || err.message}\n`);
  }
  
  console.log('✅ All login tests complete!\n');
}

testLogins();
