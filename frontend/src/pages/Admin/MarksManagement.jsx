import { useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import { FaFileImport, FaSave, FaUsers, FaTrophy, FaChartLine, FaFilter } from 'react-icons/fa';

const MarksManagement = () => {
  const [selectedTab, setSelectedTab] = useState('internal');

  const stats = [
    { label: 'Total Students', value: '64', icon: FaUsers, color: 'blue' },
    { label: 'Pass Percentage', value: '88%', change: '↑ 2.4%', icon: FaChartLine, color: 'green' },
    { label: 'Class Average', value: '76.5%', change: '↑ 1.5%', icon: FaTrophy, color: 'purple' },
    { label: 'Highest GPA', value: '9.8', icon: FaTrophy, color: 'orange' }
  ];

  const students = [
    {
      rollNo: '21CS001',
      name: 'Alex Doe',
      type: 'Regular',
      dataStruct: 85,
      algorithms: 78,
      database: 92,
      os: 88,
      compNet: 76,
      total: 419,
      status: 'Pass'
    },
    {
      rollNo: '21CS002',
      name: 'Ben Smith',
      type: 'Regular',
      dataStruct: 45,
      algorithms: 62,
      database: 58,
      os: 60,
      compNet: 55,
      total: 280,
      status: 'Fail'
    },
    {
      rollNo: '21CS003',
      name: 'Clara Jones',
      type: 'Regular',
      dataStruct: 95,
      algorithms: 92,
      database: 96,
      os: 89,
      compNet: 94,
      total: 466,
      status: 'Pass'
    },
    {
      rollNo: '21CS004',
      name: 'David Miller',
      type: 'Regular',
      dataStruct: 70,
      algorithms: 72,
      database: 68,
      os: 75,
      compNet: 69,
      total: 354,
      status: 'Pass'
    }
  ];

  const tabs = [
    { id: 'internal', label: 'Internal Marks' },
    { id: 'external', label: 'External / End Sem' },
    { id: 'assignments', label: 'Assignments' },
    { id: 'final', label: 'Final Analysis' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span>Home</span>
              <span>/</span>
              <span>Academics</span>
              <span>/</span>
              <span>Marks & Results</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Marks Management</h1>
            <p className="text-gray-600 mt-1">Manage internal, external, and assignment scores.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <FaFileImport />
              Import CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <FaSave />
              Save Changes
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>2023-2024</option>
                <option>2024-2025</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Computer Science (CS)</option>
                <option>Electronics (ECE)</option>
                <option>Mechanical (ME)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Semester V</option>
                <option>Semester VI</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Section A</option>
                <option>Section B</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600',
              green: 'bg-green-100 text-green-600',
              purple: 'bg-purple-100 text-purple-600',
              orange: 'bg-orange-100 text-orange-600'
            };

            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
                    <Icon className="text-xl" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                  {stat.change && (
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200 px-6">
            <div className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 border-b-2 font-medium transition ${
                    selectedTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter and Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter by name or roll no..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
                Showing <span className="font-semibold">10 of 64</span> students
              </div>
            </div>
          </div>

          {/* Marks Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Roll No</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Student Name</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Data Struct.</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Algorithms</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Database</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">OS</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Comp. Net</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Total</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">{student.rollNo}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        value={student.dataStruct}
                        className={`w-16 px-2 py-1 text-center border rounded ${
                          student.dataStruct < 50 ? 'border-red-300 bg-red-50 text-red-700' : 'border-gray-300'
                        }`}
                        min="0"
                        max="100"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        value={student.algorithms}
                        className={`w-16 px-2 py-1 text-center border rounded ${
                          student.algorithms < 50 ? 'border-red-300 bg-red-50 text-red-700' : 'border-gray-300'
                        }`}
                        min="0"
                        max="100"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        value={student.database}
                        className="w-16 px-2 py-1 text-center border border-gray-300 rounded"
                        min="0"
                        max="100"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        value={student.os}
                        className="w-16 px-2 py-1 text-center border border-gray-300 rounded"
                        min="0"
                        max="100"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        value={student.compNet}
                        className="w-16 px-2 py-1 text-center border border-gray-300 rounded"
                        min="0"
                        max="100"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-blue-600">{student.total}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        student.status === 'Pass'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">Viewing 1-10 of 64</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default MarksManagement;
