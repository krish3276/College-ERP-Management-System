import { useState } from 'react';
import ParentLayout from '../../components/layouts/ParentLayout';
import { FaDownload, FaTrophy, FaChartLine } from 'react-icons/fa';

const Grades = () => {
  const [selectedSemester, setSelectedSemester] = useState('fall2023');

  const stats = [
    {
      label: 'Current GPA',
      value: '3.8',
      max: '/ 4.0',
      icon: FaTrophy,
      color: 'blue'
    },
    {
      label: 'Attendance',
      value: '96%',
      icon: '✓',
      color: 'green'
    },
    {
      label: 'Total Credits',
      value: '18',
      icon: '📚',
      color: 'purple'
    }
  ];

  const subjects = [
    {
      name: 'Mathematics',
      teacher: 'Mr. Anderson',
      internal: 88,
      internalMax: 100,
      external: 92,
      externalMax: 100,
      finalGrade: 'A',
      status: 'Distinction',
      icon: '📐',
      color: 'blue'
    },
    {
      name: 'Science',
      teacher: 'Ms. Roberts',
      internal: 85,
      internalMax: 100,
      external: 89,
      externalMax: 100,
      finalGrade: 'B+',
      status: 'Merit',
      icon: '🔬',
      color: 'purple'
    },
    {
      name: 'English Lit',
      teacher: 'Mrs. Davis',
      internal: 95,
      internalMax: 100,
      external: 94,
      externalMax: 100,
      finalGrade: 'A+',
      status: 'Distinction',
      icon: '📚',
      color: 'orange'
    },
    {
      name: 'History',
      teacher: 'Mr. Thompson',
      internal: 78,
      internalMax: 100,
      external: 82,
      externalMax: 100,
      finalGrade: 'B',
      status: 'Pass',
      icon: '📜',
      color: 'yellow'
    }
  ];

  const recentAssignments = [
    {
      title: 'Math Homework #4',
      subject: 'Chapter 5: Quadratic Equations',
      status: 'due',
      label: 'Due Today',
      color: 'red'
    },
    {
      title: 'Science Lab Report',
      subject: 'Physics: Motion and Force',
      status: 'submitted',
      label: 'Submitted',
      color: 'green'
    },
    {
      title: 'English Essay',
      subject: 'Shakespeare Analysis',
      score: '95/100',
      color: 'blue'
    }
  ];

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'bg-green-100 text-green-700';
    if (grade.includes('B')) return 'bg-blue-100 text-blue-700';
    if (grade.includes('C')) return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <ParentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="/api/placeholder/40/40" alt="Alex" className="w-10 h-10 rounded-full" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Alex Johnson</h1>
                <p className="text-gray-600">Grade 10B</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <select 
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="fall2023">Fall Semester 2023</option>
              <option value="spring2023">Spring Semester 2023</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <FaDownload />
              Report Card
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">Grades & Performance</h2>
        <p className="text-gray-600">Academic progress for Fall Semester 2023</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600',
              green: 'bg-green-100 text-green-600',
              purple: 'bg-purple-100 text-purple-600'
            };

            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  {typeof Icon === 'function' ? (
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
                      <Icon />
                    </div>
                  ) : (
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-2xl ${colorClasses[stat.color]}`}>
                      {stat.icon}
                    </div>
                  )}
                  <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">{stat.label}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-4xl font-bold text-gray-800">{stat.value}</h3>
                  {stat.max && <span className="text-gray-500 text-lg">{stat.max}</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subject Performance */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Subject Performance</h3>
              <button className="text-blue-600 hover:underline text-sm">View All</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Subject</th>
                    <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Internal</th>
                    <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">External</th>
                    <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Final Grade</th>
                    <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-${subject.color}-100`}>
                            {subject.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{subject.name}</p>
                            <p className="text-sm text-gray-500">{subject.teacher}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-medium text-gray-700">{subject.internal}%</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-medium text-gray-700">{subject.external}%</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(subject.finalGrade)}`}>
                          {subject.finalGrade}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm text-gray-600">{subject.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Assignments */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">Recent Assignments</h3>
            
            <div className="space-y-3">
              {recentAssignments.map((assignment, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  {assignment.label && (
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-bold mb-2 ${
                      assignment.status === 'due' ? 'bg-red-100 text-red-700' :
                      assignment.status === 'submitted' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {assignment.label}
                    </span>
                  )}
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">{assignment.title}</h4>
                  <p className="text-xs text-gray-600">{assignment.subject}</p>
                  {assignment.score && (
                    <p className="text-sm font-bold text-blue-600 mt-2">{assignment.score}</p>
                  )}
                </div>
              ))}
            </div>

            <button className="w-full mt-4 text-blue-600 hover:underline text-sm">
              View All Assignments
            </button>
          </div>
        </div>

        {/* Academic Trajectory */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Academic Trajectory (GPA Trend)</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-3xl font-bold text-gray-800">3.8</span>
                <span className="text-green-600 text-sm font-medium">↗ +0.2% vs Last Sem</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">1Y</button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">ALL</button>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FaChartLine className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">GPA Trend Chart</p>
              <p className="text-sm text-gray-400">Semester-wise performance visualization</p>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default Grades;
