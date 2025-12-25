import { useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import { FaPlus, FaSearch, FaPhone, FaEnvelope, FaLink, FaEye, FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';

const ParentManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const stats = [
    { label: 'Total Parents', value: '1,240', change: '+5%' },
    { label: 'Pending Student Links', value: '18', change: 'Action Req.', alert: true },
    { label: 'Recent Communications', value: '45', change: 'Last 7 days' }
  ];

  const parents = [
    {
      name: 'Rajesh Kumar',
      relation: 'Father',
      linkedStudent: 'Amit Kumar',
      studentId: 'CSE-21-045',
      contact: '+91 98765 43210',
      email: 'rajesh.k@gmail.com',
      status: 'Active',
      avatar: 'RK'
    },
    {
      name: 'Sunita Sharma',
      relation: 'Mother',
      linkedStudent: 'Priya Sharma',
      studentId: 'ECE-22-012',
      contact: '+91 99887 76655',
      email: 'sunita.s@email.com',
      status: 'Active',
      avatar: 'SS'
    },
    {
      name: 'Vikram Singh',
      relation: 'Guardian',
      linkedStudent: null,
      studentId: null,
      contact: '+91 91234 56789',
      email: 'vikram.s@yahoo.com',
      status: 'Pending',
      avatar: 'VS'
    },
    {
      name: 'Anjali Gupta',
      relation: 'Mother',
      linkedStudent: 'Rohan Gupta',
      studentId: 'ME-20-083',
      contact: '+91 90000 11111',
      email: 'anjali.g@gmail.com',
      status: 'Active',
      avatar: 'AG'
    },
    {
      name: 'David Chen',
      relation: 'Father',
      linkedStudent: 'Lily Chen',
      studentId: 'CSE-23-108',
      contact: '+91 88888 22222',
      email: 'david.chen@work.com',
      status: 'Inactive',
      avatar: 'DC'
    }
  ];

  const departments = ['All Depts', 'CSE', 'ECE'];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Parent Management</h1>
            <p className="text-gray-600 mt-1">Manage parent accounts and student linkages</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                  <p className={`text-sm font-medium ${stat.alert ? 'text-orange-600' : 'text-green-600'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.alert ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {stat.alert ? <FaLink className="text-xl" /> : <FaUserPlus className="text-xl" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search parents by name, email, or student ID"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            
            <div className="flex items-center gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    dept === 'All Depts'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium whitespace-nowrap">
              <FaPlus />
              Add New Parent
            </button>
          </div>
        </div>

        {/* Parents Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Parent Name</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Linked Student</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Contact</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parents.map((parent, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold">
                        {parent.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{parent.name}</p>
                        <p className="text-sm text-gray-500">{parent.relation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {parent.linkedStudent ? (
                      <div>
                        <p className="font-medium text-gray-800">{parent.linkedStudent}</p>
                        <p className="text-sm text-blue-600">{parent.studentId}</p>
                      </div>
                    ) : (
                      <button className="flex items-center gap-2 text-orange-600 hover:bg-orange-50 px-3 py-1 rounded-lg text-sm font-medium">
                        <FaLink />
                        No Student Linked
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <FaPhone className="text-gray-400 text-xs" />
                        <span>{parent.contact}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <FaEnvelope className="text-gray-400 text-xs" />
                        <span>{parent.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      parent.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : parent.status === 'Pending'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      ● {parent.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {!parent.linkedStudent && (
                        <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition font-medium">
                          Link Student
                        </button>
                      )}
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
            <p className="text-sm text-gray-600">Showing 1 to 5 of 1,240 results</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ParentManagement;
