import { useState } from 'react';
import ParentLayout from '../../components/layouts/ParentLayout';
import { FaTrophy, FaUserGraduate, FaEnvelope, FaTasks, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const [selectedSemester, setSelectedSemester] = useState('fall');

  const stats = [
    {
      label: 'Current GPA',
      value: '3.8',
      change: '+0.2',
      positive: true,
      icon: FaTrophy,
      color: 'blue'
    },
    {
      label: 'Attendance Rate',
      value: '98%',
      subtitle: 'Steady',
      icon: FaUserGraduate,
      color: 'purple'
    },
    {
      label: 'Unread Messages',
      value: '2',
      subtitle: 'New',
      alert: true,
      icon: FaEnvelope,
      color: 'orange'
    },
    {
      label: 'Upcoming Tasks',
      value: '4',
      subtitle: '',
      icon: FaTasks,
      color: 'teal'
    }
  ];

  const teachers = [
    {
      name: 'Mr. Davis',
      subject: 'Mathematics',
      avatar: '/api/placeholder/40/40'
    },
    {
      name: 'Mrs. Smith',
      subject: 'History',
      avatar: '/api/placeholder/40/40'
    },
    {
      name: 'Mr. Lee',
      subject: 'Science',
      avatar: '/api/placeholder/40/40'
    },
    {
      name: 'Ms. Connor',
      subject: 'English',
      avatar: '/api/placeholder/40/40'
    }
  ];

  const recentActivity = [
    {
      title: 'Alex submitted "Volcano Project"',
      subject: 'Science',
      time: '2 hours ago',
      icon: '📄',
      color: 'blue'
    },
    {
      title: 'Mrs. Smith posted a new announcement',
      subject: 'History',
      time: 'Yesterday',
      icon: '📢',
      color: 'purple'
    }
  ];

  const subjectPerformance = [
    { name: 'Math', score: 85 },
    { name: 'Science', score: 75 },
    { name: 'English', score: 90 },
    { name: 'History', score: 78 },
    { name: 'Art', score: 88 }
  ];

  return (
    <ParentLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              Welcome back, Sarah 👋
            </h1>
            <p className="text-gray-600 mt-1">Here is what's happening with Alex today.</p>
          </div>
          <p className="text-gray-600">October 24, 2023</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600',
              purple: 'bg-purple-100 text-purple-600',
              orange: 'bg-orange-100 text-orange-600',
              teal: 'bg-teal-100 text-teal-600'
            };

            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <h3 className="text-4xl font-bold text-gray-800 mt-2">{stat.value}</h3>
                    {stat.change && (
                      <p className={`text-sm font-medium mt-1 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </p>
                    )}
                    {stat.subtitle && (
                      <p className={`text-sm font-medium mt-1 ${stat.alert ? 'text-orange-600' : 'text-gray-600'}`}>
                        {stat.subtitle}
                      </p>
                    )}
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
                    <Icon className="text-xl" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Academic Performance */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Academic Performance</h3>
              <select 
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="fall">Fall Semester</option>
                <option value="spring">Spring Semester</option>
              </select>
            </div>

            {/* Chart Placeholder */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <FaChartLine className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Subject Performance Chart</p>
              </div>
            </div>

            {/* Subject Performance Bars */}
            <div className="space-y-3">
              {subjectPerformance.map((subject, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{subject.name}</span>
                    <span className="text-sm font-bold text-gray-800">{subject.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        subject.score >= 85 ? 'bg-green-500' : 
                        subject.score >= 70 ? 'bg-blue-500' : 
                        'bg-orange-500'
                      }`}
                      style={{ width: `${subject.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* My Teachers */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">My Teachers</h3>
              </div>
              
              <div className="space-y-3">
                {teachers.map((teacher, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex items-center gap-3">
                      <img src={teacher.avatar} alt={teacher.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{teacher.name}</p>
                        <p className="text-xs text-gray-600">{teacher.subject}</p>
                      </div>
                    </div>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <FaEnvelope />
                    </button>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-blue-600 hover:underline text-sm font-medium">
                View Full Directory
              </button>
            </div>

            {/* Upcoming Event */}
            <div className="bg-blue-600 text-white rounded-xl p-6">
              <h3 className="font-bold mb-2">Upcoming Event</h3>
              <p className="text-sm text-blue-100 mb-4">Parent-Teacher Conference is scheduled.</p>
              <div className="bg-blue-500 rounded-lg p-3">
                <p className="text-sm font-medium">📅 Oct 28, 2023</p>
                <p className="text-xs text-blue-100">10:00 AM - School Auditorium</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
            <button className="text-blue-600 hover:underline text-sm">View All</button>
          </div>
          
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{activity.title}</p>
                  <p className="text-xs text-gray-600">{activity.subject} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default Dashboard;
