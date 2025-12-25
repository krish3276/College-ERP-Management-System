import { useState } from 'react';
import TeacherLayout from '../../components/layouts/TeacherLayout';
import { FaFileExport, FaPrint, FaSave, FaTrophy, FaExclamationTriangle } from 'react-icons/fa';

const Gradebook = () => {
  const stats = [
    { label: 'Avg. Internal', value: '78%', change: '+2.5% from mid-term', icon: FaTrophy },
    { label: 'Avg. Assignments', value: '88%', change: '96% Submission Rate', icon: FaTrophy },
    { label: 'Avg. External', value: '82%', change: 'Class Median: 83%', icon: FaTrophy }
  ];

  const students = [
    {
      name: 'Alice Smith',
      email: 'alice.s@college.edu',
      rollNo: '#J101',
      midTerm: 28,
      finalExam: 45,
      assignment: 18,
      totalGrade: '91% (A)',
      status: 'Pass',
      avatar: 'AS'
    },
    {
      name: 'Bob Jones',
      email: 'bob.j@college.edu',
      rollNo: '#J102',
      midTerm: 15,
      finalExam: 30,
      assignment: 10,
      totalGrade: '55% (D)',
      status: 'Warning',
      avatar: 'BJ'
    },
    {
      name: 'Charlie Davis',
      email: 'charlie.d@college.edu',
      rollNo: '#J103',
      midTerm: 25,
      finalExam: 38,
      assignment: 15,
      totalGrade: '78% (B)',
      status: 'Pass',
      avatar: 'CD'
    },
    {
      name: 'Dana Lee',
      email: 'dana.l@college.edu',
      rollNo: '#J104',
      midTerm: 10,
      finalExam: 20,
      assignment: 8,
      totalGrade: '38% (F)',
      status: 'Fail',
      avatar: 'DL'
    }
  ];

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span>Home</span>
              <span>/</span>
              <span>Classes</span>
              <span>/</span>
              <span>CS 101</span>
              <span>/</span>
              <span>Gradebook</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Computer Science 101</h1>
            <p className="text-gray-600 mt-1">Fall 2023 Gradebook • Dr. Sarah Wilson</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <FaFileExport />
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <FaPrint />
              Print
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <h3 className="text-4xl font-bold text-gray-800 mt-2">{stat.value}</h3>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <Icon className="text-xl" />
                  </div>
                </div>
                <p className="text-sm font-medium text-blue-600">{stat.change}</p>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search student..."
              className="flex-1 max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Fall 2023</option>
              <option>Spring 2024</option>
            </select>

            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option>All Statuses</option>
              <option>Pass</option>
              <option>Warning</option>
              <option>Fail</option>
            </select>

            <button className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2">
              <FaSave />
              Save Changes
            </button>
          </div>
        </div>

        {/* Gradebook Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase sticky left-0 bg-gray-50">
                    Student Name
                  </th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Roll No</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                    Mid-Term<br/>(30%)
                  </th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                    Final Exam<br/>(50%)
                  </th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                    Assign.<br/>(20%)
                  </th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                    Total Grade
                  </th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 sticky left-0 bg-white">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                          {student.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">{student.rollNo}</td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        value={student.midTerm}
                        className={`w-16 px-2 py-1 text-center border rounded ${
                          student.midTerm < 15 ? 'border-red-300 bg-red-50 text-red-700' : 'border-gray-300'
                        }`}
                        min="0"
                        max="30"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        value={student.finalExam}
                        className={`w-16 px-2 py-1 text-center border rounded ${
                          student.finalExam < 25 ? 'border-red-300 bg-red-50 text-red-700' : 'border-gray-300'
                        }`}
                        min="0"
                        max="50"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        value={student.assignment}
                        className={`w-16 px-2 py-1 text-center border rounded ${
                          student.assignment < 10 ? 'border-red-300 bg-red-50 text-red-700' : 'border-gray-300'
                        }`}
                        min="0"
                        max="20"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-blue-600">{student.totalGrade}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        student.status === 'Pass'
                          ? 'bg-green-100 text-green-700'
                          : student.status === 'Warning'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {student.status === 'Fail' && <FaExclamationTriangle className="mr-1" />}
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing 1 to 4 of 24 Students</p>
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
    </TeacherLayout>
  );
};

export default Gradebook;
