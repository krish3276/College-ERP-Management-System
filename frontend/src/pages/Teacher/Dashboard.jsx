import TeacherLayout from '../../components/layouts/TeacherLayout';
import { FaUsers, FaBook, FaClipboardList, FaClock, FaCalendar, FaFileAlt, FaBell, FaChalkboardTeacher } from 'react-icons/fa';

const TeacherDashboard = () => {
  const stats = [
    { label: 'Total Students', value: '142', icon: FaUsers, color: 'blue' },
    { label: 'Classes Today', value: '3', icon: FaBook, color: 'purple' },
    { label: 'Pending Grading', value: '12', icon: FaClipboardList, color: 'orange' }
  ];

  const todaySchedule = [
    {
      time: '09:00 AM',
      endTime: '10:30 AM',
      subject: 'Intro to Computer Science',
      code: 'CS101',
      room: 'Room 304',
      status: 'Completed'
    },
    {
      time: '11:00 AM',
      endTime: '12:30 PM',
      subject: 'Data Structures',
      code: 'CS202',
      room: 'Computer Lab B',
      status: 'Live Now'
    },
    {
      time: '02:00 PM',
      endTime: '03:30 PM',
      subject: 'Web Development',
      code: 'CS305',
      room: 'Room 102',
      status: 'Upcoming'
    }
  ];

  const activeSubjects = [
    { code: 'CS101', name: 'Intro to Computer Science', students: 42, progress: 75, color: 'blue' },
    { code: 'CS202', name: 'Data Structures', students: 38, progress: 60, color: 'purple' },
    { code: 'CS305', name: 'Web Development', students: 62, progress: 45, color: 'green' }
  ];

  const notifications = [
    {
      type: 'System Maintenance',
      message: 'Scheduled for Friday at 10 PM. Portal will be unavailable.',
      time: '2 hours ago',
      icon: '🔧'
    },
    {
      type: 'New Submission',
      message: 'Sarah Jenkins submitted Assignment #1 for CS101.',
      time: '1d mins ago',
      icon: '✅',
      action: 'Review Now'
    },
    {
      type: 'Grade Deadline',
      message: 'Final grades for CS305 are due in 2 days.',
      time: 'Yesterday',
      icon: '⚠️'
    },
    {
      type: 'Department Meeting',
      message: 'Monthly faculty meeting.',
      time: 'Sep 28',
      icon: '📅'
    }
  ];

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Good Morning, Professor Anderson</h1>
          <p className="text-gray-600 mt-1">Here's your daily overview and schedule for today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600',
              purple: 'bg-purple-100 text-purple-600',
              orange: 'bg-orange-100 text-orange-600'
            };

            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <h3 className="text-4xl font-bold text-gray-800 mt-2">{stat.value}</h3>
                  </div>
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
                    <Icon className="text-2xl" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Today's Schedule</h2>
              <button className="text-blue-600 hover:underline text-sm font-medium">View Calendar</button>
            </div>

            <div className="space-y-4">
              {todaySchedule.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                  <div className="flex items-start gap-4">
                    <div className="text-center min-w-[80px]">
                      <div className="text-sm font-semibold text-gray-800">{item.time}</div>
                      <div className="text-xs text-gray-500">{item.endTime}</div>
                    </div>

                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 flex items-center gap-2">
                        <FaChalkboardTeacher className="text-blue-600" />
                        {item.subject}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{item.code} • {item.room}</p>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Completed' 
                        ? 'bg-gray-100 text-gray-700'
                        : item.status === 'Live Now'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <FaBell className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              {notifications.map((notif, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex gap-3">
                    <span className="text-2xl">{notif.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm">{notif.type}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notif.time}</p>
                      {notif.action && (
                        <button className="text-blue-600 hover:underline text-xs font-medium mt-2">
                          {notif.action}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Subjects */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Active Subjects</h2>
            <button className="text-blue-600 hover:underline text-sm font-medium">All Subjects</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeSubjects.map((subject, index) => {
              const colorClasses = {
                blue: 'from-blue-500 to-blue-700',
                purple: 'from-purple-500 to-purple-700',
                green: 'from-green-500 to-green-700'
              };

              return (
                <div key={index} className={`bg-gradient-to-br ${colorClasses[subject.color]} rounded-xl p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">
                        {subject.code}
                      </span>
                      <button className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg">
                        ⋮
                      </button>
                    </div>

                    <h3 className="font-bold text-lg mb-4">{subject.name}</h3>

                    <div className="flex items-center gap-2 text-sm mb-4">
                      <FaUsers />
                      <span>{subject.students} Students</span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span className="font-semibold">{subject.progress}%</span>
                      </div>
                      <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white rounded-full transition-all duration-500"
                          style={{ width: `${subject.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherDashboard;
