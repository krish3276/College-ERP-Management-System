import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaTimes } from 'react-icons/fa';
import { getAllStudents, addStudent, updateStudent, deleteStudent, getAllSemesters } from '../../services/adminService';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filters, setFilters] = useState({
    semester: '',
    department: '',
    search: ''
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Male',
    address: '',
    semester: '1',
    department: 'Computer Science',
    guardian_name: '',
    guardian_phone: ''
  });

  const [credentials, setCredentials] = useState(null);

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
    fetchSemesters();
  }, [filters]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await getAllStudents(filters);
      setStudents(response.students || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const fetchSemesters = async () => {
    try {
      const response = await getAllSemesters();
      setSemesters(response.semesters || []);
    } catch (error) {
      console.error('Error fetching semesters:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editMode && selectedStudent) {
        const response = await updateStudent(selectedStudent.id, formData);
        alert('Student updated successfully!');
        setCredentials(null);
      } else {
        const response = await addStudent(formData);
        alert('Student added successfully!');
        setCredentials(response.credentials);
      }
      
      fetchStudents();
      
      if (!editMode) {
        // Show credentials modal
        setTimeout(() => {
          setShowModal(false);
          resetForm();
        }, 5000);
      } else {
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving student:', error);
      alert(error.response?.data?.message || 'Failed to save student');
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setEditMode(true);
    setFormData({
      name: student.full_name,
      email: student.email,
      phone: student.phone || '',
      dob: student.date_of_birth?.split('T')[0] || '',
      gender: student.gender || 'Male',
      address: student.address || '',
      semester: student.semester?.toString() || '1',
      department: student.branch || 'Computer Science',
      guardian_name: student.guardian_name || '',
      guardian_phone: student.parent_phone || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (student) => {
    if (window.confirm(`Are you sure you want to delete ${student.full_name}?`)) {
      try {
        await deleteStudent(student.id);
        alert('Student deleted successfully!');
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Failed to delete student');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      dob: '',
      gender: 'Male',
      address: '',
      semester: '1',
      department: 'Computer Science',
      guardian_name: '',
      guardian_phone: ''
    });
    setEditMode(false);
    setSelectedStudent(null);
    setCredentials(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Student Management</h1>
            <p className="text-gray-600 mt-1">Manage student records, enrollments, and information</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FaPlus />
            <span>Add Student</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search students..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
              <select
                name="semester"
                value={filters.semester}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Semesters</option>
                {semesters.map(sem => (
                  <option key={sem.id} value={sem.semester_number}>{sem.semester_name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Electronics">Electronics</option>
                <option value="Civil">Civil</option>
                <option value="Electrical">Electrical</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setFilters({ semester: '', department: '', search: '' })}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Student</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Enrollment No.</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Department</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Semester</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Contact</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      Loading students...
                    </td>
                  </tr>
                ) : students.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No students found
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                            {student.full_name?.charAt(0) || 'S'}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">{student.full_name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{student.enrollment_number}</td>
                      <td className="px-6 py-4 text-gray-700">{student.branch}</td>
                      <td className="px-6 py-4 text-gray-700">Semester {student.semester}</td>
                      <td className="px-6 py-4 text-gray-700">{student.phone || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          student.is_active 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {student.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(student)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(student)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Count */}
        <div className="text-sm text-gray-600">
          Showing {students.length} student{students.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-800">
                {editMode ? 'Edit Student' : 'Add New Student'}
              </h2>
              <button
                onClick={() => {setShowModal(false); resetForm();}}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <FaTimes />
              </button>
            </div>

            {credentials && !editMode && (
              <div className="mx-6 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">✅ Student Added Successfully!</h3>
                <div className="space-y-1 text-sm text-green-700">
                  <p><strong>Enrollment No:</strong> {credentials.enrollment_no}</p>
                  <p><strong>Password (DOB):</strong> {credentials.password}</p>
                  <p className="text-xs mt-2 text-green-600">{credentials.loginInstructions}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Civil">Civil</option>
                    <option value="Electrical">Electrical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Semester *</label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1,2,3,4,5,6,7,8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Phone</label>
                  <input
                    type="tel"
                    name="guardian_phone"
                    value={formData.guardian_phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {setShowModal(false); resetForm();}}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {editMode ? 'Update Student' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default StudentManagement;
