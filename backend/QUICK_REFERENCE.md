# 🚀 Backend Quick Reference

## Instant Commands

### Start Server
```bash
cd backend
npm run dev          # Development with auto-restart
npm start           # Production mode
```

### Database Setup
```bash
psql -U postgres -c "CREATE DATABASE college_erp;"
psql -U postgres -d college_erp -f database/schema.sql
psql -U postgres -d college_erp -f database/seed.sql
```

---

## 🔑 Test Credentials

| Role | ID | Password |
|------|----|----|
| Admin | admin@college.edu | admin123 |
| Teacher | rajesh.kumar@college.edu | teacher123 |
| Student | STU2024001 | 2005-05-15 |
| Parent | sunita.gupta@email.com | parent123 |

---

## 📡 Quick API Tests

### Admin Login → Add Student → Student Login

```bash
# 1. Admin Login
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@college.edu","password":"admin123"}' \
  | jq -r '.token')

# 2. Add Student
curl -X POST http://localhost:5000/api/admin/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name":"Test Student",
    "email":"test@student.college.edu",
    "dob":"2006-01-01",
    "semester":1,
    "department":"Computer Science",
    "guardian_name":"Guardian Name",
    "guardian_phone":"+91-9999999999"
  }'

# 3. Student Login (use enrollment and DOB from response)
curl -X POST http://localhost:5000/api/auth/student/login \
  -H "Content-Type: application/json" \
  -d '{"enrollment_no":"STU2024006","dob":"2006-01-01"}'
```

---

## 🎯 Most Used Endpoints

```bash
# Health Check
curl http://localhost:5000/api/health

# Admin Login
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@college.edu","password":"admin123"}'

# Get All Students (with token)
curl http://localhost:5000/api/admin/students \
  -H "Authorization: Bearer YOUR_TOKEN"

# Add Student
curl -X POST http://localhost:5000/api/admin/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{...student data...}'

# Student Dashboard
curl http://localhost:5000/api/student/dashboard \
  -H "Authorization: Bearer STUDENT_TOKEN"
```

---

## 🔐 Credential Rules

| User Type | ID Format | Password |
|-----------|-----------|----------|
| Student | STU2024XXX | DOB (YYYY-MM-DD) |
| Teacher | TCH2024XXX | Random 8 chars |
| Parent | PAR2024XXX | Random 8 chars |
| Admin | Email | Set manually |

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `server.js` | Main entry point |
| `config/database.js` | DB connection |
| `controllers/adminController.js` | Student/Teacher CRUD |
| `middleware/auth.js` | JWT verification |
| `utils/generateCredentials.js` | Auto-generate IDs |
| `.env` | Configuration |

---

## 🐛 Common Fixes

**Port in use:**
```bash
# Change in .env
PORT=5001
```

**DB connection fail:**
```env
# Check .env
DB_PASSWORD=your_actual_password
```

**Token expired:**
```bash
# Re-login to get new token
```

**Module not found:**
```bash
rm -rf node_modules
npm install
```

---

## 📊 Database Tables

- `admins` - Admin accounts
- `students` - Student records
- `teachers` - Teacher records
- `parents` - Parent accounts
- `subjects` - Subject/Course info
- `marks` - Grades and marks
- `attendance` - Attendance records
- `assignments` - Assignment details
- `submissions` - Student submissions
- `parent_student_links` - Parent-child relationships
- `timetable` - Class schedule
- `study_materials` - Learning resources
- `messages` - Communication
- `announcements` - Notices

---

## 🎨 Response Format

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🔒 Security Headers

All responses include:
- `helmet` security headers
- CORS enabled for frontend
- JWT token validation
- Password hashing (bcrypt)
- SQL injection prevention

---

## 📝 Quick Notes

- Server runs on port **5000**
- JWT tokens expire in **7 days**
- Student enrollment auto-increments
- DOB must be in **YYYY-MM-DD** format
- All dates in ISO 8601 format
- File uploads go to `/uploads`
- Max file size: **10MB**

---

**Keep this handy while developing! 📌**
