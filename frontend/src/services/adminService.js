import api from './api';

// ==================== DASHBOARD ====================
export const getDashboardStats = async () => {
  const response = await api.get('/admin/dashboard/stats');
  return response.data;
};

// ==================== STUDENT MANAGEMENT ====================
export const getAllStudents = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.semester) params.append('semester', filters.semester);
  if (filters.department) params.append('department', filters.department);
  if (filters.search) params.append('search', filters.search);
  
  const response = await api.get(`/admin/students?${params.toString()}`);
  return response.data;
};

export const getStudentById = async (id) => {
  const response = await api.get(`/admin/students/${id}`);
  return response.data;
};

export const addStudent = async (studentData) => {
  const response = await api.post('/admin/students', studentData);
  return response.data;
};

export const updateStudent = async (id, studentData) => {
  const response = await api.put(`/admin/students/${id}`, studentData);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await api.delete(`/admin/students/${id}`);
  return response.data;
};

// ==================== TEACHER MANAGEMENT ====================
export const getAllTeachers = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.department) params.append('department', filters.department);
  if (filters.search) params.append('search', filters.search);
  
  const response = await api.get(`/admin/teachers?${params.toString()}`);
  return response.data;
};

export const addTeacher = async (teacherData) => {
  const response = await api.post('/admin/teachers', teacherData);
  return response.data;
};

export const updateTeacher = async (id, teacherData) => {
  const response = await api.put(`/admin/teachers/${id}`, teacherData);
  return response.data;
};

export const deleteTeacher = async (id) => {
  const response = await api.delete(`/admin/teachers/${id}`);
  return response.data;
};

// ==================== SUBJECT MANAGEMENT ====================
export const getAllSubjects = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.semester) params.append('semester', filters.semester);
  if (filters.search) params.append('search', filters.search);
  
  const response = await api.get(`/admin/subjects?${params.toString()}`);
  return response.data;
};

export const addSubject = async (subjectData) => {
  const response = await api.post('/admin/subjects', subjectData);
  return response.data;
};

export const updateSubject = async (id, subjectData) => {
  const response = await api.put(`/admin/subjects/${id}`, subjectData);
  return response.data;
};

export const deleteSubject = async (id) => {
  const response = await api.delete(`/admin/subjects/${id}`);
  return response.data;
};

// ==================== PARENT MANAGEMENT ====================
export const getAllParents = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  
  const response = await api.get(`/admin/parents?${params.toString()}`);
  return response.data;
};

export const addParent = async (parentData) => {
  const response = await api.post('/admin/parents', parentData);
  return response.data;
};

export const updateParent = async (id, parentData) => {
  const response = await api.put(`/admin/parents/${id}`, parentData);
  return response.data;
};

export const deleteParent = async (id) => {
  const response = await api.delete(`/admin/parents/${id}`);
  return response.data;
};

// ==================== MARKS MANAGEMENT ====================
export const getAllMarks = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.semester) params.append('semester', filters.semester);
  if (filters.subject) params.append('subject', filters.subject);
  if (filters.student) params.append('student', filters.student);
  
  const response = await api.get(`/admin/marks?${params.toString()}`);
  return response.data;
};

export const addMarks = async (marksData) => {
  const response = await api.post('/admin/marks', marksData);
  return response.data;
};

export const updateMarks = async (id, marksData) => {
  const response = await api.put(`/admin/marks/${id}`, marksData);
  return response.data;
};

// ==================== REPORTS & ANALYTICS ====================
export const getReports = async (type, filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await api.get(`/admin/reports/${type}?${params.toString()}`);
  return response.data;
};

export const exportReport = async (type, format = 'pdf') => {
  const response = await api.get(`/admin/reports/${type}/export?format=${format}`, {
    responseType: 'blob'
  });
  return response.data;
};

// ==================== SEMESTERS ====================
export const getAllSemesters = async () => {
  const response = await api.get('/admin/semesters');
  return response.data;
};
