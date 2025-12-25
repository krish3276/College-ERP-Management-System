# College ERP Management System - Complete Documentation

## System Overview
A comprehensive full-stack Student Management System for an OFFLINE engineering college with four distinct modules: Admin, Teacher, Student, and Parent.

## Technology Stack

### Frontend
- **React**: 18.2.0
- **Vite**: 5.0.8
- **React Router**: 6.20.1
- **Tailwind CSS**: 3.3.6
- **React Icons**: For consistent iconography

### Backend
- **Node.js + Express**: 4.18.2
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **Multer**: File uploads
- **PostgreSQL/MySQL**: Database

## Module Breakdown

### 1. Login Page
**Features:**
- Multi-role authentication (Admin, Teacher, Student, Parent)
- Role-specific login methods:
  - **Students**: Enrollment Number + DOB
  - **Teachers/Admin**: Email + Password
  - **Parents**: Email + Password
- "Contact Admin" link for credential recovery

---

### 2. Admin Module (8 Pages)

#### Dashboard
- System overview with key statistics
- AI-powered timetable generator
- Recent student enrollments
- Quick actions panel

#### Student Management
- CRUD operations for students
- Auto-generated credentials (Enrollment + DOB)
- Bulk upload/export functionality
- Semester-wise student listing

#### Teacher Management
- Faculty CRUD operations
- Subject assignments
- Contact information management
- Performance tracking

#### Subject Management
- Semester 1-8 subject configuration
- Subject code, name, credits
- Department-wise categorization
- Teacher assignments

#### Timetable Management
- AI-powered scheduling
- Conflict detection
- Weekly/daily view
- Print/export options

#### Marks Management
- Internal/External marks entry
- Pass/fail indicators
- Semester-wise filtering
- Bulk import/export

#### Reports & Analytics
- Performance charts
- Attendance analytics
- Department-wise statistics
- Custom report generation

#### Parent Management
- Parent account creation
- Student-parent linking
- Multi-child support
- Communication settings

---

### 3. Teacher Module (7 Pages)

#### Dashboard
- Daily schedule overview
- Active subjects
- Recent notifications
- Upcoming tasks

#### My Subjects
- Semester-wise subject cards
- Student enrollment counts
- Subject materials upload
- Quick navigation

#### Study Materials
- Upload PDFs, PPTs, DOCX, links
- Categorize by subject/chapter
- Version control
- Student access tracking

#### Assignments
- **3 Tabs:**
  - Overview: Create new assignments
  - Submissions: Track student submissions
  - Grading: Rubric-based grading interface
- Due date management
- Auto-reminders

#### Gradebook
- Editable marks table
- Weightage: Mid-Term 30%, Final 50%, Assignment 20%
- Grade calculation
- Export to Excel

#### Schedule
- Weekly timetable view
- "Up Next" card
- Mini calendar
- Reminders and notifications

#### Messages
- Communication with students/parents/staff
- File attachments
- Read receipts
- Message archive

---

### 4. Student Module (9 Pages)

#### Dashboard
- GPA: 3.8/4.0
- Pending tasks counter
- Learning streak tracker
- Current courses overview
- Upcoming deadlines

#### My Courses
- Semester-wise course cards
- Progress tracking
- Quick links to materials
- Attendance percentage

#### Course Details
- Materials tab
- Instructor information
- Upcoming assignments
- Grade breakdown

#### Library
- Search resources
- Recently viewed
- Browse by subject
- Digital library access

#### Assignments
- **3 Tabs:**
  - Pending
  - Submitted
  - Evaluated
- Upload functionality
- Submission history

#### Grades
- SGPA: 8.1, CGPA: 8.4
- Subject-wise breakdown
- GPA trend chart
- Downloadable transcripts

#### AI Assistant
- **Integration with:**
  - ChatGPT-4
  - Gemini Pro
- Homework help
- Concept clarification
- Study tips

#### Schedule
- Monthly calendar view
- Today's timetable
- Upcoming deadlines
- Event notifications

#### Messages
- Chat with professors
- Admin communication
- Library services
- Group discussions

---

### 5. Parent Module (7 Pages)

#### Dashboard
- Child overview (Alex Johnson, Grade 10B)
- Current GPA: 3.8/4.0
- Attendance Rate: 98%
- Unread messages: 2
- Upcoming tasks: 4
- Subject performance chart
- Teacher directory (4 teachers)
- Recent activity feed
- Upcoming events

#### Grades & Performance
- Semester selector
- GPA: 3.8/4.0
- Attendance: 96%
- Total Credits: 18
- Subject performance table:
  - Math: A (88%)
  - Science: B+ (85%)
  - English Literature: A+ (95%)
  - History: B (78%)
- Recent assignments
- GPA trend chart

#### Attendance Record
- Monthly calendar view (October 2023)
- Color-coded attendance:
  - Green: Present
  - Red: Absent
  - Yellow: Late
  - Gray: Holiday
- Stats: 95% rate, 2 absent days, 0 late arrivals
- Subject-wise attendance:
  - Mathematics: 98%
  - Physics: 92%
  - English: 100%
  - History: 95%
  - Physical Education: 88%

#### Calendar & Events
- Monthly calendar with events
- Filter options:
  - All Events
  - Exams Only
  - Holidays
  - Assignments
- Upcoming events list:
  - Mathematics Midterm (Oct 04)
  - Science Project Due (Oct 09)
  - PTA Meeting (Oct 11)
- Notices section

#### Messages
- Conversation list with teachers/staff
- Real-time chat interface
- File attachments support
- Online/offline status
- Message search
- New conversation button
- Pre-populated conversations:
  - Mrs. Sarah Jenkins (Homeroom Teacher)
  - Principal Skinner
  - Mr. Anderson (Math Teacher)
  - Nurse Joy

#### Teacher Directory
- Grid view of all teachers
- Teacher cards with:
  - Photo placeholder
  - Name and department
  - Subjects taught
  - Email address
  - Phone number
  - Office location
  - Office hours
- Email and Message buttons
- Search and filter functionality
- Department filter

#### Settings
- **4 Tabs:**
  1. **Personal Information:**
     - Full Name: Sarah Jenkins
     - Email: sarah.jenkins@email.com
     - Phone: +1-234-567-8900
     - Relationship: Mother
     - Address
     - Emergency Contact
     - Edit/Save functionality
  
  2. **Notifications:**
     - Email toggles:
       - Grade Updates
       - Attendance Alerts
       - Assignment Reminders
       - School Announcements
       - Event Invitations
       - New Messages
     - Communication channels:
       - Email Notifications
       - SMS/Text Notifications
  
  3. **Security:**
     - Change password
     - Two-factor authentication
     - Security questions
  
  4. **Linked Students:**
     - Alex Johnson (Grade 10B)
     - Roll No: STU2023001
     - Status: Active
     - Link new student button
     - Edit/Unlink options

---

## Database Schema

### Core Tables
1. **students**: enrollment_no, name, dob, semester, email, phone
2. **teachers**: teacher_id, name, email, phone, department
3. **parents**: parent_id, name, email, phone, relationship
4. **parent_student_links**: Maps parents to students
5. **subjects**: subject_code, name, semester, credits, teacher_id
6. **marks**: student_id, subject_id, internal, external, total, grade
7. **attendance**: student_id, date, status (present/absent/late)
8. **timetable**: day, time, subject_id, room, semester
9. **assignments**: title, subject_id, due_date, total_marks
10. **messages**: sender_id, receiver_id, message, timestamp
11. **materials**: subject_id, title, file_path, upload_date
12. **announcements**: title, description, date, target_role

---

## Authentication Flow

### JWT-based Authentication
1. User selects role (Admin/Teacher/Student/Parent)
2. Enters credentials (role-specific)
3. Backend validates and generates JWT token
4. Token stored in localStorage
5. Role-based middleware protects routes:
   - `isAdmin`
   - `isTeacher`
   - `isStudent`
   - `isParent`

### Role-Based Access Control
- **Admin**: Full system access
- **Teacher**: Own subjects, students, materials
- **Student**: Own data, courses, grades
- **Parent**: Linked children's data (read-only)

---

## Key Features

### Offline College Focus
- Uses "Subject" terminology (not "Course")
- Semester 1-8 structure (not grades)
- No online streaming/video content
- Physical attendance tracking
- In-person exam scheduling

### Multi-Child Support (Parents)
- Parents can link multiple students
- Switch between children's dashboards
- Consolidated notifications
- Individual student tracking

### AI Integration
- **Student AI Assistant**: ChatGPT-4, Gemini Pro
- **Admin Timetable Generator**: AI-powered scheduling
- **Conflict Detection**: Automated clash resolution

### File Management
- Study materials upload (PDF, PPT, DOCX)
- Assignment submissions
- Bulk import/export (CSV, Excel)
- Document versioning

---

## API Endpoints

### Admin
```
POST /api/admin/login
GET /api/admin/students
POST /api/admin/students
PUT /api/admin/students/:id
DELETE /api/admin/students/:id
GET /api/admin/teachers
POST /api/admin/teachers
GET /api/admin/timetable
POST /api/admin/timetable/generate
```

### Teacher
```
POST /api/teacher/login
GET /api/teacher/subjects
GET /api/teacher/students/:subjectId
POST /api/teacher/materials
POST /api/teacher/assignments
PUT /api/teacher/grades
GET /api/teacher/messages
```

### Student
```
POST /api/student/login
GET /api/student/courses
GET /api/student/grades
GET /api/student/assignments
POST /api/student/assignments/submit
GET /api/student/materials
GET /api/student/schedule
```

### Parent
```
POST /api/parent/login
GET /api/parent/children
GET /api/parent/child/:id/grades
GET /api/parent/child/:id/attendance
GET /api/parent/child/:id/schedule
GET /api/parent/teachers
POST /api/parent/messages
```

---

## Layouts

### 1. AdminLayout
- **Sidebar Menu:**
  - Dashboard
  - Students
  - Teachers
  - Subjects
  - Timetable
  - Marks
  - Reports
  - Parents
- Collapsible sidebar
- Profile dropdown
- Notifications bell

### 2. TeacherLayout
- **Sidebar Menu:**
  - Dashboard
  - My Subjects
  - Study Materials
  - Assignments
  - Gradebook
  - Schedule
  - Messages
- Profile section
- Search bar

### 3. StudentLayout
- **Sidebar Menu:**
  - Dashboard
  - My Courses
  - Library
  - Assignments
  - Grades
  - AI Assistant
  - Schedule
  - Messages
- Quick stats header

### 4. ParentLayout
- **Sidebar Menu:**
  - Dashboard
  - Grades
  - Attendance
  - Calendar
  - Messages
  - Directory
  - Settings
- Child selector dropdown
- Profile: Sarah Jenkins (Mother of Alex)

---

## Design Patterns

### UI Components
- **Stats Cards**: Used in all dashboards
- **Data Tables**: Sortable, filterable, searchable
- **Charts**: Bar, Line, Pie (Recharts library)
- **Calendars**: Monthly/weekly views
- **Modals**: For forms and confirmations
- **Toasts**: Success/error notifications
- **Tabs**: Multi-section pages

### Color Scheme
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Danger**: Red (#EF4444)
- **Neutral**: Gray shades

---

## Setup Instructions

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
node server.js
```

### Database Setup
```bash
psql -U postgres
CREATE DATABASE college_erp;
\c college_erp
\i schema.sql
\i seed.sql
```

### Environment Variables
```
# Backend (.env)
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=college_erp
JWT_SECRET=your_secret_key

# Frontend (.env)
VITE_API_URL=http://localhost:5000
VITE_OPENAI_API_KEY=your_openai_key
VITE_GEMINI_API_KEY=your_gemini_key
```

---

## Testing Credentials

### Admin
- Email: admin@college.edu
- Password: admin123

### Teacher
- Email: teacher@college.edu
- Password: teacher123

### Student
- Enrollment: STU2023001
- DOB: 2005-01-15

### Parent
- Email: sarah.jenkins@email.com
- Password: parent123

---

## Future Enhancements

1. **Mobile App**: React Native version
2. **Fee Management**: Payment gateway integration
3. **Hostel Management**: Room allocation, mess
4. **Library System**: Book issue/return
5. **Transport Management**: Bus routes, tracking
6. **Exam Hall Allocation**: Automated seating
7. **Alumni Portal**: Networking, placements
8. **Video Lectures**: Offline viewing support
9. **Biometric Attendance**: Hardware integration
10. **SMS Gateway**: Automated alerts

---

## Support & Maintenance

### Common Issues
1. **Login Fails**: Check JWT secret, clear localStorage
2. **Routes Not Working**: Verify App.jsx imports
3. **Database Errors**: Check connection string
4. **File Upload Fails**: Increase Multer limits

### Logs Location
- Frontend: Browser console
- Backend: logs/app.log
- Database: PostgreSQL logs

---

## Project Structure
```
College-ERP-Management-System/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── layouts/
│   │   │       ├── AdminLayout.jsx
│   │   │       ├── TeacherLayout.jsx
│   │   │       ├── StudentLayout.jsx
│   │   │       └── ParentLayout.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Admin/ (8 pages)
│   │   │   ├── Teacher/ (7 pages)
│   │   │   ├── Student/ (9 pages)
│   │   │   └── Parent/ (7 pages)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── server.js
│   └── package.json
└── database/
    ├── schema.sql
    └── seed.sql
```

---

## Version History

### v1.0.0 (Current)
- Initial release
- All 4 modules complete (Admin, Teacher, Student, Parent)
- JWT authentication
- Database schema
- Responsive UI

---

## Contributors
- **Developer**: GitHub Copilot + User
- **Role**: Full-stack development
- **Timeline**: Multi-session development

---

## License
Private project for college use.

---

**Last Updated**: December 2024
