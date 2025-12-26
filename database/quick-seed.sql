-- Quick seed - Insert test data manually
USE college_erp;

-- Insert admin if not exists
INSERT IGNORE INTO admins (username, email, password_hash, full_name, phone, is_active) VALUES
('admin', 'admin@college.edu', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8C8I8.YJZFtKjQQxZpFJBr8sE0YXCa', 'System Administrator', '9876543210', 1);

-- Insert semesters
INSERT IGNORE INTO semesters (semester_number, semester_name, is_active) VALUES
(1, 'Semester 1', 1),
(2, 'Semester 2', 1),
(3, 'Semester 3', 1),
(4, 'Semester 4', 1);

-- Insert a test student
-- Login: enrollment_no = 2024001, password = 2005-01-15 (their DOB)
INSERT IGNORE INTO students (enrollment_number, username, email, password_hash, full_name, date_of_birth, phone, semester, branch, is_active) VALUES
('2024001', '2024001', 'student1@college.edu', '20050115', 'Test Student', '2005-01-15', '9876543213', 1, 'Computer Science', 1);
