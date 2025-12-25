import { useState } from 'react';
import StudentLayout from '../../components/layouts/StudentLayout';
import { FaDownload, FaTrophy } from 'react-icons/fa';

const Grades = () => {
  const [selectedSemester, setSelectedSemester] = useState('5');

  const stats = [
    { 
      label: 'Current SGPA', 
      value: '8.1', 
      change: '+0.2%', 
      positive: true,
      icon: '📈'
    },
    { 
      label: 'Overall CGPA', 
      value: '8.4', 
      change: '+0.1%', 
      positive: true,
      icon: '🎓'
    },
    { 
      label: 'Total Credits Earned', 
      value: '120', 
      max: '/ 160',
      icon: '📚'
    },
    { 
      label: 'Class Rank', 
      value: '#14', 
      subtitle: 'Top 5%',
      icon: '🏆'
    }
  ];

  const subjects = [
    {
      code: 'CS301',
      name: 'Data Structures & Algo',
      subtitle: 'Core • Theory',
      credit: 4,
      internal: 35,
      internalMax: 40,
      external: 52,
      externalMax: 60,
      total: 87,
      grade: 'A',
      status: 'Pass'
    },
    {
      code: 'MA302',
      name: 'Engineering Math III',
      subtitle: 'Core • Theory',
      credit: 4,
      internal: 30,
      internalMax: 40,
      external: 45,
      externalMax: 60,
      total: 75,
      grade: 'B+',
      status: 'Pass'
    },
    {
      code: 'CS304',
      name: 'Database Management',
      subtitle: 'Core • Lab',
      credit: 3,
      internal: 38,
      internalMax: 40,
      external: 55,
      externalMax: 60,
      total: 93,
      grade: 'O',
      status: 'Pass'
    },
    {
      code: 'HS301',
      name: 'Technical Comm.',
      subtitle: 'Elective • Soft Skills',
      credit: 2,
      internal: 20,
      internalMax: 25,
      external: 60,
      externalMax: 75,
      total: 80,
      grade: 'A',
      status: 'Pass'
    },
    {
      code: 'CS305',
      name: 'Operating Systems',
      subtitle: 'Core • Theory',
      credit: 4,
      internal: 32,
      internalMax: 40,
      external: 48,
      externalMax: 60,
      total: 80,
      grade: 'A',
      status: 'Pass'
    }
  ];

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'O':
      case 'A':
        return 'bg-green-100 text-green-700';
      case 'B+':
      case 'B':
        return 'bg-blue-100 text-blue-700';
      case 'C':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span>Home</span>
              <span>/</span>
              <span>Student Corner</span>
              <span>/</span>
              <span className="text-gray-800 font-medium">Grades & Results</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Grades & Results</h1>
            <p className="text-gray-600 mt-1">Fall 2023 Semester Performance • <span className="text-green-600 font-medium">Active</span></p>
          </div>
          <div className="flex gap-3">
            <select 
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="5">Semester 5 (Fall 23)</option>
              <option value="4">Semester 4 (Spring 23)</option>
              <option value="3">Semester 3 (Fall 22)</option>
              <option value="2">Semester 2 (Spring 22)</option>
              <option value="1">Semester 1 (Fall 21)</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <FaDownload />
              Download Grade Sheet
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">{stat.label}</p>
                  <div className="flex items-baseline gap-1 mt-2">
                    <h3 className="text-4xl font-bold text-gray-800">{stat.value}</h3>
                    {stat.max && <span className="text-gray-500 text-lg">{stat.max}</span>}
                  </div>
                  {stat.change && (
                    <p className={`text-sm font-medium mt-1 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </p>
                  )}
                  {stat.subtitle && (
                    <p className="text-sm text-gray-600 mt-1">{stat.subtitle}</p>
                  )}
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Subject Breakdown Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Subject Breakdown</h3>
              <button className="text-blue-600 hover:underline text-sm">
                View Backlogs (0)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Code</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Subject Name</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Credit</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Internal</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">External</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Total</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Grade</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800">{subject.code}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-800">{subject.name}</p>
                        <p className="text-sm text-gray-500">{subject.subtitle}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-gray-800">{subject.credit}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-700">{subject.internal}/{subject.internalMax}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-700">{subject.external}/{subject.externalMax}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-gray-800">{subject.total}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(subject.grade)}`}>
                        {subject.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <span className="mr-1">●</span>
                        {subject.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <p className="text-sm text-gray-600">Showing 5 of 5 subjects</p>
            <button className="text-blue-600 hover:underline text-sm">Next Page</button>
          </div>
        </div>

        {/* GPA Trend & Performance Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* GPA Trend (Placeholder) */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">GPA Trend</h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">📊</div>
                <p>GPA Trend Chart</p>
                <p className="text-sm">Semester-wise performance visualization</p>
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Performance Summary</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white">
                    📗
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Core Subjects</p>
                    <p className="text-sm text-gray-600">Avg. Score: <span className="font-bold text-green-600">85%</span></p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                    🔬
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Labs & Practicals</p>
                    <p className="text-sm text-gray-600">Avg. Score: <span className="font-bold text-orange-600">91%</span></p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white">
                    ⚡
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Electives</p>
                    <p className="text-sm text-gray-600">Avg. Score: <span className="font-bold text-purple-600">80%</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Grades;
