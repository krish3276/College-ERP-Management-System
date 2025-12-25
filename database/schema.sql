-- College ERP Management System Database Schema
-- This is a basic schema structure. Adjust based on your specific requirements.

-- Enable UUID extension (PostgreSQL)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================
-- USER TABLES
-- ========================

-- Admins Table
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teachers Table
CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    teacher_id VARCHAR(20) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    department VARCHAR(50),
    qualification VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students Table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    enrollment_number VARCHAR(20) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL, -- Same as enrollment_number
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Initial password = DOB
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    phone VARCHAR(15),
    parent_phone VARCHAR(15),
    address TEXT,
    semester INT CHECK (semester BETWEEN 1 AND 8),
    branch VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    force_password_change BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Parents Table
CREATE TABLE parents (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    relation VARCHAR(20), -- Father, Mother, Guardian
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- ACADEMIC TABLES
-- ========================

-- Semesters Table
CREATE TABLE semesters (
    id SERIAL PRIMARY KEY,
    semester_number INT UNIQUE CHECK (semester_number BETWEEN 1 AND 8),
    semester_name VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subjects Table
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    subject_code VARCHAR(20) UNIQUE NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    semester_id INT REFERENCES semesters(id),
    credits INT DEFAULT 3,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teacher-Subject Assignment
CREATE TABLE teacher_subjects (
    id SERIAL PRIMARY KEY,
    teacher_id INT REFERENCES teachers(id) ON DELETE CASCADE,
    subject_id INT REFERENCES subjects(id) ON DELETE CASCADE,
    semester_id INT REFERENCES semesters(id),
    academic_year VARCHAR(10), -- e.g., "2024-25"
    UNIQUE(teacher_id, subject_id, academic_year)
);

-- Student-Subject Enrollment
CREATE TABLE student_subjects (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    subject_id INT REFERENCES subjects(id) ON DELETE CASCADE,
    semester_id INT REFERENCES semesters(id),
    academic_year VARCHAR(10),
    UNIQUE(student_id, subject_id, academic_year)
);

-- ========================
-- MARKS & RESULTS
-- ========================

-- Marks Table
CREATE TABLE marks (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    subject_id INT REFERENCES subjects(id) ON DELETE CASCADE,
    internal_marks DECIMAL(5,2) DEFAULT 0,
    external_marks DECIMAL(5,2) DEFAULT 0,
    total_marks DECIMAL(5,2) DEFAULT 0,
    grade VARCHAR(2),
    is_locked BOOLEAN DEFAULT false,
    entered_by INT, -- teacher_id or admin_id
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, subject_id)
);

-- ========================
-- ASSIGNMENTS
-- ========================

-- Assignments Table
CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    subject_id INT REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id INT REFERENCES teachers(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    due_date TIMESTAMP,
    max_marks DECIMAL(5,2) DEFAULT 100,
    file_path VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Submissions
CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    assignment_id INT REFERENCES assignments(id) ON DELETE CASCADE,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    file_path VARCHAR(255),
    submission_text TEXT,
    marks_obtained DECIMAL(5,2),
    feedback TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    evaluated_at TIMESTAMP,
    UNIQUE(assignment_id, student_id)
);

-- ========================
-- ATTENDANCE
-- ========================

-- Attendance Table
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    subject_id INT REFERENCES subjects(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(10) CHECK (status IN ('Present', 'Absent', 'Late')),
    marked_by INT REFERENCES teachers(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, subject_id, date)
);

-- ========================
-- TIMETABLE
-- ========================

-- Timetable Table
CREATE TABLE timetable (
    id SERIAL PRIMARY KEY,
    semester_id INT REFERENCES semesters(id),
    subject_id INT REFERENCES subjects(id),
    teacher_id INT REFERENCES teachers(id),
    day_of_week VARCHAR(10) CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_number VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- STUDY MATERIALS
-- ========================

-- Study Materials Table
CREATE TABLE study_materials (
    id SERIAL PRIMARY KEY,
    subject_id INT REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id INT REFERENCES teachers(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    file_path VARCHAR(255),
    file_type VARCHAR(50), -- PDF, PPT, etc.
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- MESSAGING
-- ========================

-- Messages Table
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL,
    sender_role VARCHAR(20) CHECK (sender_role IN ('admin', 'teacher', 'student', 'parent')),
    receiver_id INT NOT NULL,
    receiver_role VARCHAR(20) CHECK (receiver_role IN ('admin', 'teacher', 'student', 'parent')),
    subject VARCHAR(200),
    message_text TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- INDEXES FOR PERFORMANCE
-- ========================

CREATE INDEX idx_students_enrollment ON students(enrollment_number);
CREATE INDEX idx_teachers_teacher_id ON teachers(teacher_id);
CREATE INDEX idx_marks_student ON marks(student_id);
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id, receiver_role);
