import { useState } from 'react';
import StudentLayout from '../../components/layouts/StudentLayout';
import { FaBook, FaTasks, FaTrophy, FaFire, FaArrowRight, FaClock, FaCalendar } from 'react-icons/fa';

const Dashboard = () => {
  const stats = [
    { 
      label: 'Current GPA', 
      value: '3.8', 
      max: '/ 4.0',
      change: '+0.2 from last sem', 
      icon: FaTrophy,
      color: 'blue'
    },
    { 
      label: 'Pending Tasks', 
      value: '4', 
      subtitle: 'Assignments',
      change: '2 Due Tomorrow', 
      icon: FaTasks,
      color: 'orange',
      alert: true
    },
    { 
      label: 'Credits Earned', 
      value: '85', 
      max: '/ 120',
      change: '',
      icon: FaBook,
      color: 'purple'
    },
    { 
      label: 'Learning Streak', 
      value: '12', 
      subtitle: 'Days',
      change: 'Keep it up, you\'re on fire! 🔥', 
      icon: FaFire,
      color: 'green'
    }
  ];

  const courses = [
    {
      code: 'CS101',
      name: 'Data Structures & Algorithms',
      instructor: 'Prof. Alan Turing',
      progress: 75,
      image: '/api/placeholder/300/200',
      color: 'blue'
    },
    {
      code: 'EE204',
      name: 'Circuit Theory',
      instructor: 'Prof. Ohm',
      progress: 40,
      image: '/api/placeholder/300/200',
      color: 'orange'
    },
    {
      code: 'MA301',
      name: 'Engineering Mathematics',
      instructor: 'Prof. Lovelace',
      progress: 90,
      image: '/api/placeholder/300/200',
      color: 'green'
    }
  ];

  const deadlines = [
    {
      title: 'Lab Report 3',
      subject: 'Circuit Theory',
      dueDate: 'Due Tomorrow',
      time: '11:59 PM',
      color: 'red',
      urgent: true
    },
    {
      title: 'Project Phase 1',
      subject: 'CS101',
      dueDate: 'Due in 3 days',
      time: '5:00 PM',
      color: 'yellow'
    },
    {
      title: 'Quiz 4',
      subject: 'Eng. Mathematics',
      dueDate: 'Due in 5 days',
      time: '',
      color: 'blue'
    }
  ];

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-800">Welcome back, Alex! 👋</h1>
          </div>
          <p className="text-gray-600">Monday, Oct 24th</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600',
              orange: 'bg-orange-100 text-orange-600',
              purple: 'bg-purple-100 text-purple-600',
              green: 'bg-green-100 text-green-600'
            };
            
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <div className="flex items-baseline gap-1 mt-2">
                      <h3 className="text-4xl font-bold text-gray-800">{stat.value}</h3>
                      {stat.max && <span className="text-gray-500 text-lg">{stat.max}</span>}
                      {stat.subtitle && <span className="text-gray-500 text-lg ml-1">{stat.subtitle}</span>}
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
                    <Icon className="text-xl" />
                  </div>
                </div>
                {stat.change && (
                  <p className={`text-sm font-medium ${
                    stat.alert ? 'text-orange-600' : 'text-blue-600'
                  }`}>
                    {stat.change}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Courses */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Current Courses</h2>
              <button className="text-blue-600 hover:underline font-medium flex items-center gap-2">
                View all
                <FaArrowRight />
              </button>
            </div>

            <div className="space-y-4">
              {courses.map((course, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                  <div className="flex">
                    <div className={`w-32 h-32 bg-${course.color}-100 flex items-center justify-center flex-shrink-0`}>
                      <div className="text-center">
                        <div className={`w-16 h-16 mx-auto bg-${course.color}-200 rounded-lg flex items-center justify-center mb-2`}>
                          <span className="text-2xl">💻</span>
                        </div>
                        <p className={`text-xs font-bold text-${course.color}-700`}>{course.code}</p>
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-1">{course.name}</h3>
                          <p className="text-sm text-gray-600">{course.code} • {course.instructor}</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </div>
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-bold text-gray-800">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-${course.color}-600`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <button className="w-full mt-3 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg font-medium transition">
                        Continue Learning
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Goal */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <FaTrophy className="text-yellow-300" />
                <h3 className="font-bold text-lg">Weekly Goal</h3>
              </div>
              <p className="text-blue-100 text-sm mb-4">
                "Success is the sum of small efforts, repeated day in and day out."
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Study Time</span>
                  <span className="font-bold">3 / 5 hrs</span>
                </div>
                <div className="w-full bg-blue-500 rounded-full h-2">
                  <div className="bg-yellow-300 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-800">Upcoming Deadlines</h3>
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">
                    2 Urgent!
                  </span>
                </div>
                <button className="text-blue-600 hover:underline text-sm">View Calendar</button>
              </div>
              
              <div className="space-y-3">
                {deadlines.map((deadline, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-1 h-full bg-${deadline.color}-500 rounded-full`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-gray-800 text-sm">{deadline.title}</h4>
                        {deadline.urgent && (
                          <span className="text-red-500 text-xs font-bold flex-shrink-0 ml-2">→</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{deadline.subject}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`${deadline.urgent ? 'text-red-600' : 'text-gray-500'} font-medium`}>
                          {deadline.urgent && '🔴'} {deadline.dueDate}
                        </span>
                        {deadline.time && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500">{deadline.time}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Dashboard;
