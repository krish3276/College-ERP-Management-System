# College ERP Backend API

Complete backend API for College ERP Management System with role-based authentication, auto-generated credentials, and full CRUD operations.

## 🚀 Quick Start

### Windows
```bash
cd backend
start.bat
```

### Linux/Mac
```bash
cd backend
chmod +x start.sh
./start.sh
```

## ✨ Key Features

### 🔐 Authentication System
- **JWT-based** secure authentication
- **Role-based access control** (Admin, Teacher, Student, Parent)
- **Auto-generated credentials** for students and teachers
- **DOB as password** for students (YYYY-MM-DD format)

### 👨‍💼 Admin Features
- ✅ Add/Edit/Delete Students with **auto-generated enrollment numbers**
- ✅ Add/Edit/Delete Teachers with **random password generation**
- ✅ Manage Subjects and assign teachers
- ✅ View dashboard statistics
- ✅ Bulk operations support

### 👨‍🎓 Student Features
- ✅ View dashboard with GPA, courses, assignments
- ✅ Access enrolled subjects/courses
- ✅ View grades and CGPA
- ✅ Submit assignments
- ✅ Check attendance records
- ✅ Login with **Enrollment Number + DOB**

### 👨‍🏫 Teacher Features
- ✅ View assigned subjects
- ✅ Upload study materials
- ✅ Create and manage assignments
- ✅ Grade student submissions
- ✅ Track student attendance

### 👪 Parent Features
- ✅ View linked children's data
- ✅ Access child's grades and performance
- ✅ Monitor attendance records
- ✅ View teacher directory

## 📋 Prerequisites

- Node.js v16+ ([Download](https://nodejs.org/))
- PostgreSQL v12+ ([Download](https://www.postgresql.org/))
- npm or yarn

## 🛠️ Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=college_erp
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### 3. Setup Database
```bash
# Create database
psql -U postgres -c "CREATE DATABASE college_erp;"

# Run schema
psql -U postgres -d college_erp -f database/schema.sql

# Insert sample data
psql -U postgres -d college_erp -f database/seed.sql
```

### 4. Start Server
```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

Server will run on: `http://localhost:5000`

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/auth/admin/login` | Admin login | `{email, password}` |
| POST | `/api/auth/teacher/login` | Teacher login | `{email, password}` |
| POST | `/api/auth/student/login` | Student login | `{enrollment_no, dob}` |
| POST | `/api/auth/parent/login` | Parent login | `{email, password}` |

### Admin Endpoints
**Requires:** `Authorization: Bearer <admin_token>`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard/stats` | Dashboard statistics |
| GET | `/api/admin/students` | Get all students |
| POST | `/api/admin/students` | **Add student (auto-generates credentials)** |
| PUT | `/api/admin/students/:id` | Update student |
| DELETE | `/api/admin/students/:id` | Delete student |
| GET | `/api/admin/teachers` | Get all teachers |
| POST | `/api/admin/teachers` | Add teacher |
| GET | `/api/admin/subjects` | Get all subjects |
| POST | `/api/admin/subjects` | Add subject |

### Student Endpoints
**Requires:** `Authorization: Bearer <student_token>`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/student/dashboard` | Student dashboard |
| GET | `/api/student/courses` | Enrolled subjects |
| GET | `/api/student/grades` | All grades |
| GET | `/api/student/assignments` | Assignments |
| POST | `/api/student/assignments/submit` | Submit assignment |
| GET | `/api/student/attendance` | Attendance records |

### Parent Endpoints
**Requires:** `Authorization: Bearer <parent_token>`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/parent/children` | Linked children |
| GET | `/api/parent/children/:id/grades` | Child's grades |
| GET | `/api/parent/children/:id/attendance` | Child's attendance |
| GET | `/api/parent/teachers` | All teachers |

## 🎓 How Admin Adds Students

### 1. Admin Login
```javascript
POST /api/auth/admin/login
{
  "email": "admin@college.edu",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 1, "name": "System Admin", "role": "admin" }
}
```

### 2. Add Student
```javascript
POST /api/admin/students
Authorization: Bearer <token>

{
  "name": "John Doe",
  "email": "john.doe@student.college.edu",
  "phone": "+91-9876543399",
  "dob": "2006-05-20",  // ⚡ This becomes the password!
  "gender": "Male",
  "semester": 1,
  "department": "Computer Science",
  "guardian_name": "Mr. Robert Doe",
  "guardian_phone": "+91-9876543499"
}
```

**Response with Auto-Generated Credentials:**
```json
{
  "success": true,
  "message": "Student added successfully",
  "student": {
    "student_id": 6,
    "enrollment_no": "STU2024006",
    "name": "John Doe",
    "semester": 1,
    "department": "Computer Science"
  },
  "credentials": {
    "enrollment_no": "STU2024006",
    "password": "2006-05-20",
    "loginInstructions": "Student can login with Enrollment Number and Date of Birth (YYYY-MM-DD format)"
  }
}
```

### 3. Student Login
```javascript
POST /api/auth/student/login
{
  "enrollment_no": "STU2024006",
  "dob": "2006-05-20"
}
```

**Success!** Student is logged in.

## 🔐 Credential Generation

### Students
- **Enrollment Number:** `STU + YEAR + Sequential Number`
  - Example: STU2024001, STU2024002, STU2024003
- **Password:** Date of Birth in `YYYY-MM-DD` format
  - Example: If DOB is May 20, 2006 → Password is `2006-05-20`

### Teachers
- **Teacher ID:** `TCH + YEAR + Sequential Number`
  - Example: TCH2024001, TCH2024002
- **Password:** Random 8-character password
  - Example: `T3@mPr8x` (includes uppercase, lowercase, numbers, special chars)

### Parents
- **Parent ID:** `PAR + YEAR + Sequential Number`
- **Password:** Random 8-character password

## 📊 Sample Login Credentials

After running `seed.sql`:

| Role | Identifier | Password |
|------|-----------|----------|
| **Admin** | admin@college.edu | admin123 |
| **Teacher** | rajesh.kumar@college.edu | teacher123 |
| **Student** | STU2024001 | 2005-05-15 |
| **Parent** | sunita.gupta@email.com | parent123 |

## 🧪 Test the API

### Using curl
```bash
# Admin Login
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@college.edu","password":"admin123"}'

# Add Student (replace TOKEN)
curl -X POST http://localhost:5000/api/admin/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "name":"Test Student",
    "email":"test@student.college.edu",
    "dob":"2006-01-01",
    "semester":1,
    "department":"Computer Science"
  }'
```

### Using Postman
1. Import the collection from `API_TESTING_GUIDE.md`
2. Set `baseUrl` variable to `http://localhost:5000/api`
3. Test all endpoints

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # PostgreSQL connection
├── controllers/
│   ├── authController.js    # Login logic
│   ├── adminController.js   # Student/Teacher CRUD
│   ├── studentController.js # Student operations
│   └── teacherController.js # Teacher operations
├── middleware/
│   ├── auth.js             # JWT verification
│   └── validator.js        # Input validation
├── routes/
│   ├── auth.js             # Auth routes
│   ├── admin.js            # Admin routes
│   ├── student.js          # Student routes
│   └── parent.js           # Parent routes
├── utils/
│   └── generateCredentials.js  # ID/Password generation
├── uploads/                # File uploads
├── .env                    # Environment config
├── server.js              # Main server file
└── package.json           # Dependencies
```

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check PostgreSQL service
# Windows: services.msc
# Linux: sudo systemctl status postgresql

# Verify .env settings
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_actual_password
DB_NAME=college_erp
```

### Port Already in Use
```bash
# Change port in .env
PORT=5001
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📖 Documentation

- **Setup Guide:** [BACKEND_SETUP.md](./BACKEND_SETUP.md)
- **API Testing:** [API_TESTING_GUIDE.md](./API_TESTING_GUIDE.md)
- **Project Docs:** [PROJECT_DOCUMENTATION.md](../PROJECT_DOCUMENTATION.md)

## 🔒 Security

### Production Checklist
- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Implement input sanitization
- [ ] Set up CORS properly
- [ ] Use strong database passwords

## 📝 License

Private project for educational purposes.

---

**Built with ❤️ using Node.js, Express, and PostgreSQL**
