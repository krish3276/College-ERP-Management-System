import { useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import { FaPlus, FaFileExport, FaFilter, FaEdit, FaTrash, FaEye, FaUser, FaEnvelope, FaUpload } from 'react-icons/fa';

const TeacherManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    teacherId: '',
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    designation: '',
    qualifications: '',
    subjects: []
  });

  const teachers = [
    { 
      name: 'Sarah Jenkins', 
      id: '2023-F-001', 
      department: 'Comp. Sci', 
      subjects: ['DS', 'AL'], 
      status: 'Active',
      avatar: 'SJ'
    },
    { 
      name: 'Michael Chen', 
      id: '2022-F-045', 
      department: 'Electrical', 
      subjects: ['CK'], 
      status: 'Active',
      avatar: 'MC'
    },
    { 
      name: 'Elena Rodriguez', 
      id: '2021-F-012', 
      department: 'Comp. Sci', 
      subjects: [], 
      status: 'On Leave',
      avatar: 'ER'
    },
    { 
      name: 'David Kim', 
      id: '2023-F-088', 
      department: 'Mechanical', 
      subjects: ['TD', 'FM'], 
      status: 'Active',
      avatar: 'DK'
    }
  ];

  const stats = [
    { label: 'Total Faculty', value: '45', change: '+5% this month', positive: true },
    { label: 'Active Teachers', value: '42', change: '+2% active', positive: true },
    { label: 'On Leave', value: '3', change: 'No change', positive: null }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Teacher Registration:', formData);
    setShowAddModal(false);
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
              <span>Faculty Management</span>
              <span>/</span>
              <span>Teachers</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Teacher Management</h1>
            <p className="text-gray-600 mt-1">Manage faculty profiles, assign academic responsibilities, and track teaching credentials.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
            <FaFileExport />
            <span>Export List</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</h3>
              <p className={`text-sm font-medium ${
                stat.positive === true ? 'text-green-600' : stat.positive === false ? 'text-red-600' : 'text-gray-500'
              }`}>
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Search and Add Button */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <input
                type="text"
                placeholder="Search by name, ID, or email..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option>All Departments</option>
                <option>CSE</option>
                <option>ECE</option>
                <option>Mechanical</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                <FaFilter />
                Filter
              </button>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium whitespace-nowrap">
              <FaPlus />
              Add New Teacher
            </button>
          </div>
        </div>

        {/* Teacher Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Teacher</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Department</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Subjects</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold">
                        {teacher.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{teacher.name}</p>
                        <p className="text-sm text-gray-500">ID: {teacher.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{teacher.department}</td>
                  <td className="px-6 py-4">
                    {teacher.subjects.length > 0 ? (
                      <div className="flex gap-1">
                        {teacher.subjects.map((sub, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            {sub}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic text-sm">No subjects assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      teacher.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      ● {teacher.status}
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
            <p className="text-sm text-gray-600">Showing 1-4 of 45</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>

        {/* Add Teacher Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <h2 className="text-2xl font-bold text-gray-800">Add New Teacher</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Profile Picture Upload */}
                <div className="flex justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <FaUpload className="text-gray-400 text-2xl" />
                    </div>
                    <button type="button" className="text-blue-600 hover:underline text-sm">Upload Photo</button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="e.g. John"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="e.g. Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john.doe@college.edu"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      name="department"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option>Select...</option>
                      <option>Computer Engineering</option>
                      <option>Electronics</option>
                      <option>Mechanical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                    <select
                      name="designation"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option>Select...</option>
                      <option>Professor</option>
                      <option>Associate Professor</option>
                      <option>Assistant Professor</option>
                      <option>Lecturer</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications & Credentials</label>
                    <input
                      type="text"
                      name="qualifications"
                      placeholder="e.g. M.Tech, Add"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assign Subjects</label>
                    <button type="button" className="text-blue-600 hover:underline text-sm">+ View Schedule</button>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Add Teacher
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

export default TeacherManagement;
