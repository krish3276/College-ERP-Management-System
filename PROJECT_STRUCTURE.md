# College ERP Management System

A comprehensive full-stack Student Management System for offline engineering colleges.

## 🎯 Project Overview

This is a final-year B.Tech Computer Engineering project designed to digitize academic administration for an offline college. The system manages student records, teacher management, subjects, attendance, marks, assignments, and communication between all stakeholders.

**Important**: This is NOT an online learning platform. Classes happen physically in classrooms. The system only manages academic data digitally.

## 🏗️ Project Structure

```
College-ERP-Management-System/
├── backend/                    # Node.js + Express Backend
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   │   ├── admin/
│   │   │   ├── teacher/
│   │   │   ├── student/
│   │   │   └── parent/
│   │   ├── services/           # Business logic
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Auth & validation
│   │   ├── models/             # Database models
│   │   ├── config/             # Configuration files
│   │   ├── utils/              # Helper functions
│   │   └── server.js           # Entry point
│   ├── uploads/                # File uploads
│   └── package.json
│
├── frontend/                   # React + Vite Frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── common/
│   │   │   └── layouts/
│   │   ├── pages/              # Page components
│   │   │   ├── Admin/
│   │   │   ├── Teacher/
│   │   │   ├── Student/
│   │   │   └── Parent/
│   │   ├── services/           # API calls
│   │   ├── contexts/           # React contexts
│   │   ├── utils/              # Helper functions
│   │   ├── assets/             # Images, icons
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── database/                   # Database scripts
│   ├── schema.sql
│   └── seed.sql
│
└── README.md
```

## 🚀 Tech Stack

### Frontend
- **React** + **Vite** - Fast, modern UI development
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP requests

### Backend
- **Node.js** + **Express** - RESTful API server
- **JWT** - Authentication & authorization
- **bcrypt** - Password hashing
- **Multer** - File uploads
- **Express Validator** - Input validation

### Database
- **PostgreSQL** or **MySQL** - Relational database
- Normalized schema for data integrity

## 👥 User Roles

1. **ADMIN** - Full system control, manage users, subjects, marks
2. **TEACHER** - Manage assigned subjects, assignments, grading
3. **STUDENT** - View materials, submit assignments, track progress
4. **PARENT** - View child's performance and communicate with teachers

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL or MySQL
- Git

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your database credentials
# Run database migrations
# (Import schema.sql and seed.sql into your database)

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🔑 Authentication

### Default Credentials

**Admin Login:**
- Username: `admin`
- Password: `admin123`

**Student Login:**
- Username: Enrollment Number (e.g., `2024001`)
- Initial Password: Date of Birth (e.g., `2005-01-15`)

**Teacher Login:**
- Username: Assigned by admin
- Password: Assigned by admin

## 📚 Key Features

### Admin Module
- Create and manage students, teachers, parents
- Semester and subject management
- Assign subjects to teachers
- Generate offline timetables
- View and manage marks
- Analytics and reports

### Teacher Module
- View assigned subjects
- Upload study materials
- Create and manage assignments
- Evaluate student submissions
- Enter marks (internal/external)
- Message students and parents

### Student Module
- View enrolled subjects
- Access study materials
- Submit assignments
- View grades and attendance
- Track academic progress
- AI study assistant (optional)

### Parent Module
- View child's academic performance
- View attendance and marks
- Message teachers
- View academic calendar

## 🔒 Security Features

- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Input validation
- Protected API routes
- CORS configuration

## 🎨 UI Features (Ready for Your Files)

I've created the complete project structure. Now you can provide your UI files, and I'll:
- Integrate them into the appropriate folders
- Fix any mistakes based on project requirements
- Ensure role-based routing is correct
- Validate component structure
- Set up proper API integrations

## 📝 Next Steps

1. **Provide your UI files** - I'll organize and correct them
2. **Database setup** - Import schema and seed data
3. **Environment configuration** - Update .env files
4. **API development** - Build controllers and routes
5. **Testing** - Validate all features

## 🤝 Contributing

This is a final-year project. Follow clean code practices and maintain documentation.

## 📄 License

This project is for educational purposes.

---

**Ready to integrate your UI files!** Please share them, and I'll organize everything correctly. 🚀
