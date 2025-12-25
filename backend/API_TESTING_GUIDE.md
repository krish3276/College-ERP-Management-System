# API Testing Guide with Examples

## Quick Test Commands (using curl)

### 1. Admin Adds a New Student

**Step 1: Admin Login**
```bash
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@college.edu",
    "password": "admin123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "System Admin",
    "email": "admin@college.edu",
    "role": "admin"
  }
}
```

**Step 2: Add Student (Copy the token from above)**
```bash
curl -X POST http://localhost:5000/api/admin/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Alex Johnson",
    "email": "alex.johnson@student.college.edu",
    "phone": "+91-9876543399",
    "dob": "2006-01-15",
    "gender": "Male",
    "address": "123 College Road, City",
    "semester": 1,
    "department": "Computer Science",
    "guardian_name": "Mr. David Johnson",
    "guardian_phone": "+91-9876543499"
  }'
```

**Response with Auto-Generated Credentials:**
```json
{
  "success": true,
  "message": "Student added successfully",
  "student": {
    "student_id": 6,
    "enrollment_no": "STU2024006",
    "name": "Alex Johnson",
    "email": "alex.johnson@student.college.edu",
    "phone": "+91-9876543399",
    "dob": "2006-01-15T00:00:00.000Z",
    "gender": "Male",
    "semester": 1,
    "department": "Computer Science",
    "status": "active"
  },
  "credentials": {
    "enrollment_no": "STU2024006",
    "password": "2006-01-15",
    "loginInstructions": "Student can login with Enrollment Number and Date of Birth (YYYY-MM-DD format)"
  }
}
```

**Step 3: Student Can Now Login**
```bash
curl -X POST http://localhost:5000/api/auth/student/login \
  -H "Content-Type: application/json" \
  -d '{
    "enrollment_no": "STU2024006",
    "dob": "2006-01-15"
  }'
```

---

## Complete API Test Flow

### 1. Authentication Tests

#### Test All Login Types
```bash
# Admin Login
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@college.edu","password":"admin123"}'

# Teacher Login
curl -X POST http://localhost:5000/api/auth/teacher/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rajesh.kumar@college.edu","password":"teacher123"}'

# Student Login
curl -X POST http://localhost:5000/api/auth/student/login \
  -H "Content-Type: application/json" \
  -d '{"enrollment_no":"STU2024001","dob":"2005-05-15"}'

# Parent Login
curl -X POST http://localhost:5000/api/auth/parent/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sunita.gupta@email.com","password":"parent123"}'
```

### 2. Admin Operations

Set your token:
```bash
export TOKEN="your_admin_token_here"
```

#### Get Dashboard Stats
```bash
curl http://localhost:5000/api/admin/dashboard/stats \
  -H "Authorization: Bearer $TOKEN"
```

#### Get All Students
```bash
curl http://localhost:5000/api/admin/students \
  -H "Authorization: Bearer $TOKEN"
```

#### Search Students by Semester
```bash
curl "http://localhost:5000/api/admin/students?semester=3" \
  -H "Authorization: Bearer $TOKEN"
```

#### Search Students by Department
```bash
curl "http://localhost:5000/api/admin/students?department=Computer%20Science" \
  -H "Authorization: Bearer $TOKEN"
```

#### Get Student by ID
```bash
curl http://localhost:5000/api/admin/students/1 \
  -H "Authorization: Bearer $TOKEN"
```

#### Update Student
```bash
curl -X PUT http://localhost:5000/api/admin/students/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Rahul Verma Updated",
    "email": "rahul.verma@student.college.edu",
    "phone": "+91-9876543301",
    "dob": "2005-05-15",
    "gender": "Male",
    "address": "Updated Address",
    "semester": 4,
    "department": "Computer Science",
    "guardian_name": "Mr. Suresh Verma",
    "guardian_phone": "+91-9876543401",
    "status": "active"
  }'
```

#### Add Teacher
```bash
curl -X POST http://localhost:5000/api/admin/teachers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Dr. John Smith",
    "email": "john.smith@college.edu",
    "phone": "+91-9876543220",
    "department": "Computer Science",
    "qualification": "PhD in AI",
    "experience": 15,
    "address": "Faculty Block A"
  }'
```

#### Get All Teachers
```bash
curl http://localhost:5000/api/admin/teachers \
  -H "Authorization: Bearer $TOKEN"
```

#### Add Subject
```bash
curl -X POST http://localhost:5000/api/admin/subjects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "subject_code": "CS401",
    "subject_name": "Artificial Intelligence",
    "semester": 4,
    "credits": 4,
    "department": "Computer Science",
    "teacher_id": "TCH2024001"
  }'
```

#### Get All Subjects
```bash
curl http://localhost:5000/api/admin/subjects \
  -H "Authorization: Bearer $TOKEN"
```

#### Get Subjects by Semester
```bash
curl "http://localhost:5000/api/admin/subjects?semester=3" \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Student Operations

Set student token:
```bash
export STUDENT_TOKEN="your_student_token_here"
```

#### Get Student Dashboard
```bash
curl http://localhost:5000/api/student/dashboard \
  -H "Authorization: Bearer $STUDENT_TOKEN"
```

#### Get My Courses/Subjects
```bash
curl http://localhost:5000/api/student/courses \
  -H "Authorization: Bearer $STUDENT_TOKEN"
```

#### Get My Grades
```bash
curl http://localhost:5000/api/student/grades \
  -H "Authorization: Bearer $STUDENT_TOKEN"
```

#### Get Assignments (All)
```bash
curl http://localhost:5000/api/student/assignments \
  -H "Authorization: Bearer $STUDENT_TOKEN"
```

#### Get Pending Assignments
```bash
curl "http://localhost:5000/api/student/assignments?status=pending" \
  -H "Authorization: Bearer $STUDENT_TOKEN"
```

#### Submit Assignment
```bash
curl -X POST http://localhost:5000/api/student/assignments/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $STUDENT_TOKEN" \
  -d '{
    "assignment_id": 1,
    "submission_text": "Here is my solution for Binary Search Tree implementation...",
    "file_path": "/uploads/student1_bst.zip"
  }'
```

#### Get Attendance
```bash
curl http://localhost:5000/api/student/attendance \
  -H "Authorization: Bearer $STUDENT_TOKEN"
```

#### Get Attendance for Specific Month
```bash
curl "http://localhost:5000/api/student/attendance?month=12&year=2024" \
  -H "Authorization: Bearer $STUDENT_TOKEN"
```

### 4. Parent Operations

Set parent token:
```bash
export PARENT_TOKEN="your_parent_token_here"
```

#### Get Linked Children
```bash
curl http://localhost:5000/api/parent/children \
  -H "Authorization: Bearer $PARENT_TOKEN"
```

#### Get Child's Grades
```bash
curl http://localhost:5000/api/parent/children/2/grades \
  -H "Authorization: Bearer $PARENT_TOKEN"
```

#### Get Child's Attendance
```bash
curl http://localhost:5000/api/parent/children/2/attendance \
  -H "Authorization: Bearer $PARENT_TOKEN"
```

#### Get Child's Attendance for Specific Month
```bash
curl "http://localhost:5000/api/parent/children/2/attendance?month=12&year=2024" \
  -H "Authorization: Bearer $PARENT_TOKEN"
```

#### Get All Teachers
```bash
curl http://localhost:5000/api/parent/teachers \
  -H "Authorization: Bearer $PARENT_TOKEN"
```

---

## Testing with JavaScript/Fetch

### Admin Adds Student (Complete Flow)

```javascript
// Step 1: Admin Login
async function adminLogin() {
  const response = await fetch('http://localhost:5000/api/auth/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@college.edu',
      password: 'admin123'
    })
  });
  
  const data = await response.json();
  return data.token;
}

// Step 2: Add Student
async function addStudent(token) {
  const response = await fetch('http://localhost:5000/api/admin/students', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: 'Emma Watson',
      email: 'emma.watson@student.college.edu',
      phone: '+91-9876543388',
      dob: '2006-04-15',
      gender: 'Female',
      address: '456 University Ave',
      semester: 1,
      department: 'Information Technology',
      guardian_name: 'Mr. Chris Watson',
      guardian_phone: '+91-9876543488'
    })
  });
  
  const data = await response.json();
  console.log('Student Added:', data);
  console.log('Login Credentials:', data.credentials);
  return data;
}

// Step 3: Student Login
async function studentLogin(enrollmentNo, dob) {
  const response = await fetch('http://localhost:5000/api/auth/student/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      enrollment_no: enrollmentNo,
      dob: dob
    })
  });
  
  const data = await response.json();
  console.log('Student Logged In:', data);
  return data.token;
}

// Execute
(async () => {
  const adminToken = await adminLogin();
  console.log('Admin Token:', adminToken);
  
  const newStudent = await addStudent(adminToken);
  
  const studentToken = await studentLogin(
    newStudent.credentials.enrollment_no,
    newStudent.credentials.password
  );
  console.log('Student Token:', studentToken);
})();
```

---

## Expected Responses

### Success Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes
- **200** - Success
- **201** - Created (for POST requests)
- **400** - Bad Request (validation error)
- **401** - Unauthorized (invalid/missing token)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found
- **500** - Server Error

---

## Postman Collection Import

Save this as `college-erp-api.postman_collection.json`:

```json
{
  "info": {
    "name": "College ERP API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000/api"
    },
    {
      "key": "adminToken",
      "value": ""
    },
    {
      "key": "studentToken",
      "value": ""
    }
  ],
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Admin Login",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"admin@college.edu\",\n  \"password\": \"admin123\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": "{{baseUrl}}/auth/admin/login"
          }
        },
        {
          "name": "Student Login",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"enrollment_no\": \"STU2024001\",\n  \"dob\": \"2005-05-15\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": "{{baseUrl}}/auth/student/login"
          }
        }
      ]
    },
    {
      "name": "Admin - Students",
      "item": [
        {
          "name": "Get All Students",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{adminToken}}"
              }
            ],
            "url": "{{baseUrl}}/admin/students"
          }
        },
        {
          "name": "Add Student",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{adminToken}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Test Student\",\n  \"email\": \"test@student.college.edu\",\n  \"phone\": \"+91-9876543399\",\n  \"dob\": \"2006-01-01\",\n  \"gender\": \"Male\",\n  \"semester\": 1,\n  \"department\": \"Computer Science\",\n  \"guardian_name\": \"Mr. Test\",\n  \"guardian_phone\": \"+91-9876543499\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": "{{baseUrl}}/admin/students"
          }
        }
      ]
    }
  ]
}
```

---

## Testing Checklist

- [ ] All login endpoints work (Admin, Teacher, Student, Parent)
- [ ] Admin can add students and credentials are auto-generated
- [ ] New student can login with generated credentials
- [ ] Admin can add teachers with random passwords
- [ ] Admin can manage subjects
- [ ] Students can view their courses
- [ ] Students can view their grades
- [ ] Students can submit assignments
- [ ] Parents can view children's data
- [ ] Unauthorized access is blocked (try accessing student endpoint without token)
- [ ] Role-based access works (try accessing admin endpoint with student token)

---

**All APIs are now fully functional! 🚀**
