-- Seed data for testing
-- Note: Passwords are hashed. Use bcrypt to generate your own hashes.
-- Example: Password 'admin123' hashed = '$2a$10$...'

-- Insert default admin
INSERT INTO admins (username, email, password_hash, full_name, phone) VALUES
('admin', 'admin@college.edu', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8C8I8.YJZFtKjQQxZpFJBr8sE0YXCa', 'System Administrator', '1234567890');
-- Password: admin123

-- Insert semesters (1-8)
INSERT INTO semesters (semester_number, semester_name) VALUES
(1, 'Semester 1'),
(2, 'Semester 2'),
(3, 'Semester 3'),
(4, 'Semester 4'),
(5, 'Semester 5'),
(6, 'Semester 6'),
(7, 'Semester 7'),
(8, 'Semester 8');

-- Sample Teachers
INSERT INTO teachers (teacher_id, username, email, password_hash, full_name, department, qualification) VALUES
('T001', 'teacher001', 'teacher1@college.edu', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8C8I8.YJZFtKjQQxZpFJBr8sE0YXCa', 'Dr. John Smith', 'Computer Engineering', 'Ph.D. in Computer Science'),
('T002', 'teacher002', 'teacher2@college.edu', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8C8I8.YJZFtKjQQxZpFJBr8sE0YXCa', 'Prof. Sarah Johnson', 'Computer Engineering', 'M.Tech in Software Engineering');
-- Password: teacher123

-- Sample Subjects (Semester 1)
INSERT INTO subjects (subject_code, subject_name, semester_id, credits) VALUES
('CS101', 'Programming Fundamentals', 1, 4),
('MA101', 'Engineering Mathematics I', 1, 4),
('PH101', 'Engineering Physics', 1, 3),
('CH101', 'Engineering Chemistry', 1, 3);

-- Sample Students
INSERT INTO students (enrollment_number, username, email, password_hash, full_name, date_of_birth, semester, branch) VALUES
('2024001', '2024001', 'student1@college.edu', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8C8I8.YJZFtKjQQxZpFJBr8sE0YXCa', 'Raj Kumar', '2005-01-15', 1, 'Computer Engineering'),
('2024002', '2024002', 'student2@college.edu', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8C8I8.YJZFtKjQQxZpFJBr8sE0YXCa', 'Priya Sharma', '2005-03-22', 1, 'Computer Engineering');
-- Password: 2005-01-15 (DOB format)

-- Note: In production, generate proper password hashes using bcrypt
