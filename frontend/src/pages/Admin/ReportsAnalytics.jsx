import AdminLayout from '../../components/layouts/AdminLayout';
import { FaFileExport, FaUsers, FaGraduationCap, FaCalendarCheck, FaBriefcase, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ReportsAnalytics = () => {
  const stats = [
    {
      label: 'Total Students',
      value: '1,240',
      change: '+12% vs last year',
      positive: true,
      icon: FaUsers,
      color: 'blue'
    },
    {
      label: 'Avg. CGPA',
      value: '7.8',
      change: '+0.3 vs last sem',
      positive: true,
      icon: FaGraduationCap,
      color: 'purple'
    },
    {
      label: 'Attendance',
      value: '88%',
      change: '-2% vs last month',
      positive: false,
      icon: FaCalendarCheck,
      color: 'orange'
    },
    {
      label: 'Placement Rate',
      value: '76%',
      change: '+5% vs last year',
      positive: true,
      icon: FaBriefcase,
      color: 'green'
    }
  ];

  const topPerformers = [
    { name: 'Alice Johnson', rollNo: 'CS2021001', cgpa: '9.8', status: 'Excellent' },
    { name: 'Bob Williams', rollNo: 'CS2021015', cgpa: '9.6', status: 'Excellent' },
    { name: 'Carol Davis', rollNo: 'CS2021028', cgpa: '9.5', status: 'Excellent' },
    { name: 'David Brown', rollNo: 'CS2021042', cgpa: '9.4', status: 'Excellent' },
    { name: 'Eva Martinez', rollNo: 'CS2021057', cgpa: '9.3', status: 'Excellent' }
  ];

  const subjectPassRates = [
    { subject: 'Data Structures', passRate: 92 },
    { subject: 'Computer Networks', passRate: 88 },
    { subject: 'Database Systems', passRate: 85 },
    { subject: 'Operating Systems', passRate: 79 },
    { subject: 'Algorithms', passRate: 75 }
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
              <span>Reports & Analytics</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Computer Science Dept (2023-2024)</p>
          </div>
          <div className="flex gap-3">
            <div className="text-sm bg-green-50 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              Data Updated: Today, 09:41 AM
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <FaFileExport />
              Export PDF
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>2023-2024</option>
                <option>2024-2025</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Computer Science</option>
                <option>Electronics</option>
                <option>Mechanical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>All Semesters</option>
                <option>Semester 1</option>
                <option>Semester 2</option>
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
              purple: 'bg-purple-100 text-purple-600',
              orange: 'bg-orange-100 text-orange-600',
              green: 'bg-green-100 text-green-600'
            };

            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
                    <Icon className="text-xl" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <div className="flex items-center gap-1">
                  {stat.positive ? (
                    <FaArrowUp className="text-green-600 text-sm" />
                  ) : (
                    <FaArrowDown className="text-red-600 text-sm" />
                  )}
                  <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SGPA Performance Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Semester-wise SGPA Performance</h2>
              <button className="text-blue-600 hover:underline text-sm font-medium">View Details</button>
            </div>
            
            {/* Simple Line Chart Visualization */}
            <div className="h-64 flex items-end justify-between gap-4 border-b border-l border-gray-300 pb-2 pl-2">
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full bg-blue-100 rounded-t" style={{ height: '40%' }}></div>
                <span className="text-xs text-gray-600 mt-2">Sem 1</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full bg-blue-200 rounded-t" style={{ height: '55%' }}></div>
                <span className="text-xs text-gray-600 mt-2">Sem 2</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full bg-blue-300 rounded-t" style={{ height: '60%' }}></div>
                <span className="text-xs text-gray-600 mt-2">Sem 3</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full bg-blue-400 rounded-t" style={{ height: '70%' }}></div>
                <span className="text-xs text-gray-600 mt-2">Sem 4</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full bg-blue-500 rounded-t" style={{ height: '75%' }}></div>
                <span className="text-xs text-gray-600 mt-2">Sem 5</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full bg-blue-600 rounded-t" style={{ height: '78%' }}></div>
                <span className="text-xs text-gray-600 mt-2">Sem 6</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full bg-blue-700 rounded-t" style={{ height: '85%' }}></div>
                <span className="text-xs text-gray-600 mt-2">Sem 7</span>
              </div>
            </div>
          </div>

          {/* Attendance Overview */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Attendance Overview</h2>
            
            {/* Circular Progress */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="#e5e7eb"
                    strokeWidth="16"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="#3b82f6"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 80}`}
                    strokeDashoffset={`${2 * Math.PI * 80 * (1 - 0.75)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-4xl font-bold text-gray-800">75%</span>
                  <span className="text-sm text-gray-600">AVERAGE</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">75%</p>
                <p className="text-sm text-gray-600">Present</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">25%</p>
                <p className="text-sm text-gray-600">Absent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performers */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Top Performers (Sem 5)</h2>
              <button className="text-blue-600 hover:underline text-sm font-medium">View All</button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-gray-600 uppercase pb-2 border-b">
                <div>Student</div>
                <div>Roll No.</div>
                <div>CGPA</div>
                <div>Status</div>
              </div>

              {topPerformers.map((student, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 items-center py-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                      {student.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-gray-800">{student.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">{student.rollNo}</div>
                  <div className="text-sm font-bold text-blue-600">{student.cgpa}</div>
                  <div>
                    <span className="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                      {student.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Pass Rate */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Subject Pass Rate</h2>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-600 rounded"></span>
                <span className="text-xs text-gray-600">Pass</span>
                <span className="w-3 h-3 bg-red-600 rounded ml-3"></span>
                <span className="text-xs text-gray-600">Fail</span>
              </div>
            </div>

            <div className="space-y-4">
              {subjectPassRates.map((subject, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800">{subject.subject}</span>
                    <span className="text-sm font-bold text-gray-800">{subject.passRate}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${subject.passRate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReportsAnalytics;
