import AdminLayout from '../../components/layouts/AdminLayout';
import { FaUsers, FaChalkboardTeacher, FaBook, FaChartLine, FaCalendar, FaUserGraduate, FaPlus, FaBolt } from 'react-icons/fa';

const AdminDashboard = () => {
  const stats = [
    {
      label: 'Total Students',
      value: '1,240',
      change: '+5% vs last month',
      positive: true,
      icon: FaUsers,
      color: 'blue'
    },
    {
      label: 'Attendance Rate',
      value: '94%',
      change: '-1% vs yesterday',
      positive: false,
      icon: FaChartLine,
      color: 'green'
    },
    {
      label: 'Active Teachers',
      value: '45',
      change: '48 Total Staff',
      positive: true,
      icon: FaChalkboardTeacher,
      color: 'purple'
    },
    {
      label: 'Avg. Grade',
      value: 'B+',
      change: '+2% improvement',
      positive: true,
      icon: FaUserGraduate,
      color: 'orange'
    }
  ];

  const recentEnrollments = [
    { name: 'Emma Watson', id: '2024-001', grade: 'Grade 10-A', date: 'Oct 24, 2023', status: 'Enrolled' },
    { name: 'Liam Johnson', id: '2024-002', grade: 'Grade 11-B', date: 'Oct 23, 2023', status: 'Pending' },
    { name: 'Sophia Davis', id: '2024-003', grade: 'Grade 9-C', date: 'Oct 22, 2023', status: 'Enrolled' },
    { name: 'Noah Wilson', id: '2024-004', grade: 'Grade 12-A', date: 'Oct 22, 2023', status: 'Enrolled' }
  ];

  const upcomingClasses = [
    { time: '09:00 AM', subject: 'Mathematics', grade: 'Grade 10-A', room: 'Room 302', teacher: 'Mrs. Sarah Jenkins' },
    { time: '10:30 AM', subject: 'Physics Lab', grade: 'Grade 11-B', room: 'Lab 2', teacher: 'Mr. Robert Fox' },
    { time: '01:00 PM', subject: 'English Literature', grade: 'Grade 9-C', room: 'Room 104', teacher: 'Ms. Emily Chen' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Welcome back, Admin. Here's what's happening today.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <FaPlus />
            <span>New Student</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
                    <Icon className="text-xl" />
                  </div>
                </div>
                <p className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </p>
              </div>
            );
          })}
        </div>

        {/* AI Timetable Generator Banner */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-blue-500 bg-opacity-40 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                <FaBolt className="text-yellow-300" />
                AI POWERED
              </div>
              <h2 className="text-3xl font-bold mb-3">Generate Smart Timetables</h2>
              <p className="text-blue-100 text-lg max-w-2xl">
                Create conflict-free schedules in seconds using our advanced AI engine. 
                Automatically balance teacher workloads and classroom availability.
              </p>
            </div>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2 ml-6">
              <FaBolt />
              Generate Now
            </button>
          </div>
        </div>

        {/* Recent Enrollments & Upcoming Classes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Enrollments */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Enrollments</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-semibold text-gray-600 uppercase pb-3">Student Name</th>
                    <th className="text-left text-xs font-semibold text-gray-600 uppercase pb-3">ID</th>
                    <th className="text-left text-xs font-semibold text-gray-600 uppercase pb-3">Class</th>
                    <th className="text-left text-xs font-semibold text-gray-600 uppercase pb-3">Date</th>
                    <th className="text-left text-xs font-semibold text-gray-600 uppercase pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEnrollments.map((student, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                            {student.name.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-800">{student.name}</span>
                        </div>
                      </td>
                      <td className="text-gray-600">{student.id}</td>
                      <td className="text-gray-600">{student.grade}</td>
                      <td className="text-gray-600 text-sm">{student.date}</td>
                      <td>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          student.status === 'Enrolled' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Upcoming Classes</h2>
              <p className="text-sm text-gray-500">Today, Oct 25</p>
            </div>

            <div className="space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <FaCalendar className="text-blue-600 text-sm" />
                    <span className="font-semibold text-blue-600 text-sm">{classItem.time}</span>
                  </div>
                  <h4 className="font-bold text-gray-800">{classItem.subject}</h4>
                  <p className="text-sm text-gray-600">{classItem.grade} • {classItem.room}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-600">{classItem.teacher}</span>
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

export default AdminDashboard;
