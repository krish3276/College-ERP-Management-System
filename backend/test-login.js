// Test student login with native fetch (Node.js 18+)
const testStudentLogin = async () => {
  try {
    console.log('\n🧪 Testing Student Login API...\n');
    
    // Test 1: Health check
    console.log('1. Testing server health...');
    const healthRes = await fetch('http://localhost:5000/api/health');
    const healthData = await healthRes.json();
    console.log('✅ Server is running:', healthData.message);
    
    // Test 2: Student login
    console.log('\n2. Testing student login...');
    console.log('Credentials: enrollment_no=2024001, dob=2005-01-15');
    
    const loginRes = await fetch('http://localhost:5000/api/auth/student/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        enrollment_no: '2024001',
        dob: '2005-01-15'
      })
    });
    
    const loginData = await loginRes.json();
    
    if (loginRes.ok) {
      console.log('✅ Login Successful!');
      console.log('\nResponse:');
      console.log(JSON.stringify(loginData, null, 2));
    } else {
      console.log('❌ Login Failed!');
      console.log('Status:', loginRes.status);
      console.log('Error:', JSON.stringify(loginData, null, 2));
    }
    
  } catch (error) {
    console.log('❌ Test failed!');
    console.log('Error:', error.message);
    console.log('\nMake sure:');
    console.log('1. Backend server is running on port 5000');
    console.log('2. Database has test student data');
  }
};

testStudentLogin();
