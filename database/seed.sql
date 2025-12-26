-- Seed data for testing College ERP System (MySQL)
-- USE college_erp database before running this

USE college_erp;

-- Insert default admin
-- Password: admin123 (hashed with bcrypt)
INSERT INTO admins (username, email, password_hash, full_name, phone, is_active) VALUES
('admin', 'admin@college.edu', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8C8I8.YJZFtKjQQxZpFJBr8sE0YXCa', 'System Administrator', '9876543210', 1);

-- Insert semesters (1-8)
INSERT INTO semesters (semester_number, semester_name, is_active) VALUES
(1, 'Semester 1', 1),
(2, 'Semester 2', 1),
(3, 'Semester 3', 1),
(4, 'Semester 4', 1),
(5, 'Semester 5', 1),
(6, 'Semester 6', 1),
(7, 'Semester 7', 1),
(8, 'Semester 8', 1);

-- Sample Teachers
-- Password: teacher123 (hashed with bcrypt)
INSERT INTO teachers (teacher_id, username, email, password_hash, full_name, phone, department, qualification, is_active) VALUES
('TCH001', 'john.smith', 'john.smith@college.edu', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8C8I8.YJZFtKjQQxZpFJBr8sE0YXCa', 'Dr. John Smith', '9876543211', 'Computer Science', 'Ph.D. in Computer Science', 1),
('TCH002', 'sarah.johnson', 'sarah.johnson@college.edu', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8C8I8.YJZFtKjQQxZpFJBr8sE0YXCa', 'Prof. Sarah Johnson', '9876543212', 'Computer Science', 'M.Tech in Software Engineering', 1);

-- Sample Subjects
INSERT INTO subjects (subject_code, subject_name, semester_id, credits, is_active) VALUES
('CS101', 'Programming Fundamentals', 1, 4, 1),
('MA101', 'Engineering Mathematics I', 1, 4, 1),
('PH101', 'Engineering Physics', 1, 3, 1),
('CH101', 'Engineering Chemistry', 1, 3, 1),
('CS201', 'Data Structures', 2, 4, 1),
('CS202', 'Object Oriented Programming', 2, 4, 1);

-- Sample Students
-- Note: Students login with Enrollment Number and DOB (date of birth)
-- For student login: enrollment_no = enrollment_number, password = date_of_birth (YYYY-MM-DD format)
-- password_hash field stores DOB for students (not actually hashed in this implementation)
INSERT INTO students (enrollment_number, username, email, password_hash, full_name, date_of_birth, phone, parent_phone, address, semester, branch, is_active, force_password_change) VALUES
('2024001', '2024001', 'rajkumar@college.edu', '2005-01-15', 'Raj Kumar', '2005-01-15', '9876543213', '9876543220', '123 MG Road, Mumbai', 1, 'Computer Science', 1, 0),
('2024002', '2024002', 'priya.sharma@college.edu', '2005-03-22', 'Priya Sharma', '2005-03-22', '9876543214', '9876543221', '456 Park Street, Delhi', 1, 'Computer Science', 1, 0),
('2024003', '2024003', 'amit.patel@college.edu', '2005-07-10', 'Amit Patel', '2005-07-10', '9876543215', '9876543222', '789 Station Road, Ahmedabad', 1, 'Computer Science', 1, 0);

-- Sample Parent
-- Password: parent123 (hashed with bcrypt)
INSERT INTO parents (username, email, password_hash, full_name, phone, student_id, relation, is_active) VALUES
('parent001', 'parent1@gmail.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8C8I8.YJZFtKjQQxZpFJBr8sE0YXCa', 'Ramesh Kumar', '9876543220', 1, 'Father', 1);

-- ========================
-- LOGIN CREDENTIALS SUMMARY
-- ========================
-- Admin: email: admin@college.edu, password: admin123
-- Teacher 1: email: john.smith@college.edu, password: teacher123
-- Teacher 2: email: sarah.johnson@college.edu, password: teacher123
-- Student 1: enrollment_no: 2024001, dob: 2005-01-15
-- Student 2: enrollment_no: 2024002, dob: 2005-03-22
-- Student 3: enrollment_no: 2024003, dob: 2005-07-10
-- Parent 1: email: parent1@gmail.com, password: parent123
