import api from './api';

// Admin Login
export const adminLogin = async (email, password) => {
  const response = await api.post('/auth/admin/login', { email, password });
  return response.data;
};

// Teacher Login
export const teacherLogin = async (email, password) => {
  const response = await api.post('/auth/teacher/login', { email, password });
  return response.data;
};

// Student Login
export const studentLogin = async (enrollment_no, dob) => {
  const response = await api.post('/auth/student/login', { enrollment_no, dob });
  return response.data;
};

// Parent Login
export const parentLogin = async (email, password) => {
  const response = await api.post('/auth/parent/login', { email, password });
  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
};

// Save user data to localStorage
export const saveUserData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
