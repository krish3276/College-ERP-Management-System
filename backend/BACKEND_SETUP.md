# Backend Setup Guide

## College ERP Management System - Backend API

Complete guide to set up and run the backend server with full API functionality.

---

## 🚀 Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Role-Based Access Control** - Admin, Teacher, Student, Parent roles
- ✅ **Auto-Generated Credentials** - Enrollment numbers and passwords
- ✅ **Student Management** - Complete CRUD operations
- ✅ **Teacher Management** - Faculty administration
- ✅ **Subject Management** - Course configuration
- ✅ **Marks & Grades** - Grade management system
- ✅ **Attendance Tracking** - Daily attendance records
- ✅ **Assignment System** - Create and submit assignments
- ✅ **Parent Portal** - Access to children's data
- ✅ **RESTful API** - Clean and documented endpoints

---

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/)
- **Git** - [Download](https://git-scm.com/)
- **VS Code** (recommended) - [Download](https://code.visualstudio.com/)

---

## 🛠️ Installation Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

This will install all required packages:
- express (Web framework)
- pg (PostgreSQL client)
- bcryptjs (Password hashing)
- jsonwebtoken (JWT tokens)
- cors (Cross-origin support)
- helmet (Security headers)
- morgan (HTTP logging)
- multer (File uploads)
- dotenv (Environment variables)

### 2. Database Setup

#### Create PostgreSQL Database

Open PostgreSQL terminal (psql) or pgAdmin:

```sql
-- Create database
CREATE DATABASE college_erp;

-- Connect to database
\c college_erp

-- Run schema file
\i database/schema.sql

-- Run seed file (sample data)
\i database/seed.sql
```

**Alternative using command line:**

```bash
# Windows
psql -U postgres -c "CREATE DATABASE college_erp;"
psql -U postgres -d college_erp -f database/schema.sql
psql -U postgres -d college_erp -f database/seed.sql

# Linux/Mac
sudo -u postgres psql -c "CREATE DATABASE college_erp;"
sudo -u postgres psql -d college_erp -f database/schema.sql
sudo -u postgres psql -d college_erp -f database/seed.sql
```

### 3. Environment Configuration

Create `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

**Edit `.env` with your configuration:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=college_erp

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

**Important:** Change `JWT_SECRET` and `DB_PASSWORD` to your actual values!

### 4. Create Upload Directory

```bash
mkdir uploads
```

---

## ▶️ Running the Server

### Development Mode (with auto-restart)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

**Server will start on:** `http://localhost:5000`

You should see:

```
╔════════════════════════════════════════════════╗
║   College ERP Management System API Server    ║
╠════════════════════════════════════════════════╣
║   Server running on port: 5000                 ║
║   Environment: development                     ║
║   Frontend URL: http://localhost:5173          ║
╚════════════════════════════════════════════════╝

✅ Database connected successfully
✅ Database connection test successful
```

---

## 🧪 Testing the API

### Health Check

```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "success": true,
  "message": "College ERP API is running",
  "timestamp": "2024-12-25T10:30:00.000Z"
}
```

### Test Login (with sample data)

#### Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@college.edu",
    "password": "admin123"
  }'
```

#### Teacher Login
```bash
curl -X POST http://localhost:5000/api/auth/teacher/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rajesh.kumar@college.edu",
    "password": "teacher123"
  }'
```

#### Student Login
```bash
curl -X POST http://localhost:5000/api/auth/student/login \
  -H "Content-Type: application/json" \
  -d '{
    "enrollment_no": "STU2024001",
    "dob": "2005-05-15"
  }'
```

#### Parent Login
```bash
curl -X POST http://localhost:5000/api/auth/parent/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "sunita.gupta@email.com",
    "password": "parent123"
  }'
```

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/auth/admin/login` | Admin login | `{email, password}` |
| POST | `/api/auth/teacher/login` | Teacher login | `{email, password}` |
| POST | `/api/auth/student/login` | Student login | `{enrollment_no, dob}` |
| POST | `/api/auth/parent/login` | Parent login | `{email, password}` |

### Admin Endpoints

**All require:** `Authorization: Bearer <token>` and Admin role

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard/stats` | Get dashboard statistics |
| GET | `/api/admin/students` | Get all students |
| GET | `/api/admin/students/:id` | Get student by ID |
| POST | `/api/admin/students` | Add new student (auto-generates credentials) |
| PUT | `/api/admin/students/:id` | Update student |
| DELETE | `/api/admin/students/:id` | Delete student |
| GET | `/api/admin/teachers` | Get all teachers |
| POST | `/api/admin/teachers` | Add new teacher |
| PUT | `/api/admin/teachers/:id` | Update teacher |
| DELETE | `/api/admin/teachers/:id` | Delete teacher |
| GET | `/api/admin/subjects` | Get all subjects |
| POST | `/api/admin/subjects` | Add new subject |
| PUT | `/api/admin/subjects/:id` | Update subject |
| DELETE | `/api/admin/subjects/:id` | Delete subject |

### Student Endpoints

**All require:** `Authorization: Bearer <token>` and Student role

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/student/dashboard` | Get student dashboard data |
| GET | `/api/student/courses` | Get enrolled subjects |
| GET | `/api/student/grades` | Get all grades |
| GET | `/api/student/assignments` | Get assignments |
| POST | `/api/student/assignments/submit` | Submit assignment |
| GET | `/api/student/attendance` | Get attendance records |

### Parent Endpoints

**All require:** `Authorization: Bearer <token>` and Parent role

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/parent/children` | Get linked children |
| GET | `/api/parent/children/:id/grades` | Get child's grades |
| GET | `/api/parent/children/:id/attendance` | Get child's attendance |
| GET | `/api/parent/teachers` | Get all teachers |

---

## 🎓 How Admin Adds Students

### Step 1: Admin Login

```javascript
const response = await fetch('http://localhost:5000/api/auth/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@college.edu',
    password: 'admin123'
  })
});

const { token } = await response.json();
```

### Step 2: Add Student (Auto-generates credentials)

```javascript
const response = await fetch('http://localhost:5000/api/admin/students', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john.doe@student.college.edu',
    phone: '+91-9876543399',
    dob: '2005-10-15',  // This becomes the login password!
    gender: 'Male',
    address: '123 Main St, City',
    semester: 1,
    department: 'Computer Science',
    guardian_name: 'Mr. Robert Doe',
    guardian_phone: '+91-9876543499'
  })
});

const result = await response.json();
```

### Step 3: Response with Generated Credentials

```json
{
  "success": true,
  "message": "Student added successfully",
  "student": {
    "student_id": 6,
    "enrollment_no": "STU2024006",
    "name": "John Doe",
    "email": "john.doe@student.college.edu",
    "semester": 1,
    "department": "Computer Science"
  },
  "credentials": {
    "enrollment_no": "STU2024006",
    "password": "2005-10-15",
    "loginInstructions": "Student can login with Enrollment Number and Date of Birth (YYYY-MM-DD format)"
  }
}
```

**The student can now login with:**
- **Enrollment Number:** STU2024006
- **Password:** 2005-10-15 (their date of birth)

---

## 🔐 Credential Generation Logic

### Student Credentials
- **Enrollment Number:** Auto-generated as `STU + YEAR + Sequential Number`
  - Example: STU2024001, STU2024002, etc.
- **Password:** Student's Date of Birth in YYYY-MM-DD format
  - Example: If DOB is May 15, 2005 → Password is `2005-05-15`

### Teacher Credentials
- **Teacher ID:** Auto-generated as `TCH + YEAR + Sequential Number`
  - Example: TCH2024001, TCH2024002
- **Email:** Provided during creation
- **Password:** Random 8-character password (uppercase, lowercase, numbers, special chars)
  - Example: `T3@mPr8x`

### Parent Credentials
- **Parent ID:** Auto-generated as `PAR + YEAR + Sequential Number`
- **Email:** Provided during creation
- **Password:** Random 8-character password

---

## 📊 Sample Data (After running seed.sql)

### Admin Account
- **Email:** admin@college.edu
- **Password:** admin123

### Teacher Accounts
| Name | Email | Password |
|------|-------|----------|
| Dr. Rajesh Kumar | rajesh.kumar@college.edu | teacher123 |
| Prof. Anita Sharma | anita.sharma@college.edu | teacher123 |

### Student Accounts
| Name | Enrollment | DOB (Password) |
|------|------------|----------------|
| Rahul Verma | STU2024001 | 2005-05-15 |
| Priya Gupta | STU2024002 | 2005-08-20 |

### Parent Accounts
| Name | Email | Password |
|------|-------|----------|
| Mrs. Sunita Gupta | sunita.gupta@email.com | parent123 |

---

## 🐛 Troubleshooting

### Database Connection Error

**Error:** `Connection refused` or `ECONNREFUSED`

**Solution:**
1. Check if PostgreSQL is running:
   ```bash
   # Windows
   services.msc  # Look for PostgreSQL service

   # Linux
   sudo systemctl status postgresql
   ```

2. Verify database credentials in `.env`
3. Ensure database `college_erp` exists

### JWT Token Error

**Error:** `Invalid token` or `Token expired`

**Solution:**
1. Check `JWT_SECRET` in `.env` is set
2. Re-login to get a new token
3. Verify token is sent in header as: `Authorization: Bearer <token>`

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

Or change port in `.env`:
```env
PORT=5001
```

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🔒 Security Best Practices

### Production Deployment

1. **Change JWT Secret:**
   ```env
   JWT_SECRET=<generate-strong-random-secret>
   ```

2. **Use Environment Variables:**
   - Never commit `.env` file
   - Use separate `.env` for production

3. **Enable HTTPS:**
   - Use SSL certificates
   - Enforce HTTPS only

4. **Database Security:**
   - Use strong passwords
   - Limit database access
   - Enable SSL for database connections

5. **Rate Limiting:**
   ```javascript
   // Add to server.js
   const rateLimit = require('express-rate-limit');
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

---

## 📝 Development Workflow

### Adding New Endpoints

1. **Create Controller** (`controllers/newController.js`)
2. **Create Route** (`routes/newRoute.js`)
3. **Add to server.js:**
   ```javascript
   const newRoutes = require('./routes/newRoute');
   app.use('/api/new', newRoutes);
   ```
4. **Test with Postman/Thunder Client**

### Database Changes

1. **Modify `schema.sql`**
2. **Drop and recreate database:**
   ```sql
   DROP DATABASE college_erp;
   CREATE DATABASE college_erp;
   \c college_erp
   \i database/schema.sql
   \i database/seed.sql
   ```

---

## 📦 Project Structure

```
backend/
├── config/
│   └── database.js          # PostgreSQL connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── adminController.js   # Admin operations
│   ├── studentController.js # Student operations
│   └── teacherController.js # Teacher operations
├── middleware/
│   ├── auth.js             # JWT verification & role checks
│   └── validator.js        # Input validation
├── routes/
│   ├── auth.js             # Auth routes
│   ├── admin.js            # Admin routes
│   ├── student.js          # Student routes
│   └── parent.js           # Parent routes
├── utils/
│   └── generateCredentials.js  # ID/Password generation
├── uploads/                # File upload directory
├── .env                    # Environment variables
├── .env.example           # Example environment file
├── package.json           # Dependencies
└── server.js              # Main application file
```

---

## 🚀 Next Steps

1. **Test all endpoints** using Postman or Thunder Client
2. **Connect frontend** to backend API
3. **Implement file upload** for assignments
4. **Add email notifications** for new credentials
5. **Deploy to production** (Heroku, AWS, DigitalOcean)

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check server logs for errors

---

**Happy Coding! 🎉**
