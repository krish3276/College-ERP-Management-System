import { useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import { FaPlus, FaFileExport, FaFilter, FaEdit, FaTrash, FaEye, FaCalendar, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const StudentManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [formData, setFormData] = useState({
    enrollmentNumber: '',
    fullName: '',
    dateOfBirth: '',
    gender: 'Male',
    branch: 'CSE',
    semester: '1st Sem',
    email: '',
    phone: '',
    parentPhone: '',
    address: ''
  });

  const [generatedCredentials, setGeneratedCredentials] = useState(null);

  const students = [
    { 
      name: 'Arthur Dent', 
      enrollmentNumber: '2023CSE042', 
      branch: 'Comp. Science', 
      semester: 'Sem 3', 
      status: 'Active',
      avatar: 'AD'
    },
    { 
      name: 'Ford Prefect', 
      enrollmentNumber: '2023MEE013', 
      branch: 'Mechanical', 
      semester: 'Sem 5', 
      status: 'Active',
      avatar: 'FP'
    },
    { 
      name: 'Zaphod T.', 
      enrollmentNumber: '2023ECE050', 
      branch: 'Electronics', 
      semester: 'Sem 7', 
      status: 'Fees Due',
      avatar: 'ZT'
    },
    { 
      name: 'Trillian Astra', 
      enrollmentNumber: '2023CSE015', 
      branch: 'Comp. Science', 
      semester: 'Sem 3', 
      status: 'Active',
      avatar: 'TA'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateCredentials = () => {
    // Generate random enrollment number
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 900) + 100;
    const enrollNum = `STU-${year}-${formData.branch.toUpperCase().substring(0,3)}${randomNum}`;
    
    // Temp password from DOB
    const tempPass = formData.dateOfBirth || '#Welcome24';
    
    setGeneratedCredentials({
      loginId: enrollNum,
      tempPass: tempPass
    });

    setFormData({ ...formData, enrollmentNumber: enrollNum });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API call to register student
    console.log('Student Registration:', formData);
    setShowAddModal(false);
    setFormData({
      enrollmentNumber: '',
      fullName: '',
      dateOfBirth: '',
      gender: 'Male',
      branch: 'CSE',
      semester: '1st Sem',
      email: '',
      phone: '',
      parentPhone: '',
      address: ''
    });
    setGeneratedCredentials(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span>Home</span>
              <span>/</span>
              <span>Student Management</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Student Management</h1>
            <p className="text-gray-600 mt-1">Manage enrollments, view records, and update student details.</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <FaFileExport />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Filters and Add Button */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium">
                All Students
              </button>
              {['Sem 1', 'Sem 3', 'Sem 5', 'Sem 7'].map((sem) => (
                <button 
                  key={sem}
                  onClick={() => setSelectedSemester(sem)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition">
                  {sem}
                </button>
              ))}
              <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                <FaFilter />
                More Filters
              </button>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
              <FaPlus />
              New Student Registration
            </button>
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Student Info</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Branch</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Semester</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                        {student.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.enrollmentNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{student.branch}</td>
                  <td className="px-6 py-4 text-gray-700">{student.semester}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      student.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      ● {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <FaEye />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition">
                        <FaEdit />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing 1-4 of 128 students</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Prev</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>

        {/* Add Student Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaPlus className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">New Student Registration</h2>
                    <p className="text-sm text-gray-500">Fill in student details to create account</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enrollment Number
                    </label>
                    <input
                      type="text"
                      name="enrollmentNumber"
                      value={formData.enrollmentNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 2023BCS001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Branch
                    </label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="CSE">CSE</option>
                      <option value="ECE">ECE</option>
                      <option value="ME">Mechanical</option>
                      <option value="CE">Civil</option>
                      <option value="EE">Electrical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Semester
                    </label>
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option>1st Sem</option>
                      <option>2nd Sem</option>
                      <option>3rd Sem</option>
                      <option>4th Sem</option>
                      <option>5th Sem</option>
                      <option>6th Sem</option>
                      <option>7th Sem</option>
                      <option>8th Sem</option>
                    </select>
                  </div>
                </div>

                {/* Auto-Generated Credentials */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FaUser className="text-blue-600" />
                    <h3 className="font-semibold text-blue-900">AUTO-GENERATED CREDENTIALS</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-blue-700 mb-1">Login ID:</p>
                      <p className="font-mono font-bold text-blue-900">
                        {generatedCredentials?.loginId || formData.enrollmentNumber || 'STU-2023-X3Y'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-700 mb-1">Temp Pass:</p>
                      <p className="font-mono font-bold text-blue-900">
                        {generatedCredentials?.tempPass || formData.dateOfBirth || '#Welcome24'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setGeneratedCredentials(null);
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
                  >
                    Register Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default StudentManagement;
