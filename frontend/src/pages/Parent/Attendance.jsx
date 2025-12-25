import { useState } from 'react';
import ParentLayout from '../../components/layouts/ParentLayout';
import { FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Attendance = () => {
  const [currentMonth, setCurrentMonth] = useState('October 2023');

  const stats = [
    {
      label: 'Attendance Rate',
      value: '95%',
      change: '+1.5% from last month',
      positive: true,
      icon: '📈'
    },
    {
      label: 'Total Absent',
      value: '2 Days',
      subtitle: '1 Excused, 1 Unexcused',
      icon: '📅'
    },
    {
      label: 'Late Arrivals',
      value: '0 Days',
      subtitle: '✓ Excellent record',
      icon: '⏰'
    }
  ];

  const calendar = {
    month: 'October 2023',
    daysOfWeek: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    dates: [
      [null, null, null, 1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25],
      [26, 27, 28, 29, 30, 31, null]
    ],
    attendance: {
      2: 'present',
      3: 'present',
      4: 'present',
      5: 'present',
      6: 'present',
      9: 'present',
      10: 'present',
      11: 'present',
      12: 'absent',
      13: 'present',
      16: 'present',
      17: 'present',
      18: 'present',
      19: 'present',
      20: 'present',
      23: 'present',
      24: 'present'
    }
  };

  const subjectWise = [
    { subject: 'Mathematics', percentage: 98, color: 'blue' },
    { subject: 'Physics', percentage: 92, color: 'purple' },
    { subject: 'English Lit.', percentage: 100, color: 'orange' },
    { subject: 'History', percentage: 95, color: 'teal' },
    { subject: 'Physical Ed.', percentage: 88, color: 'red' }
  ];

  const getAttendanceColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-green-200 text-green-800';
      case 'absent':
        return 'bg-red-200 text-red-800';
      case 'late':
        return 'bg-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-400';
    }
  };

  return (
    <ParentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Attendance Record - Alex Johnson</h1>
            <p className="text-gray-600 mt-1">Class 10-B • Academic Year 2023-2024</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <FaDownload />
            Download Report
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">{stat.label}</p>
                  <h3 className="text-4xl font-bold text-gray-800 mt-2">{stat.value}</h3>
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">{calendar.month}</h3>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <FaChevronLeft />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <FaChevronRight />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {calendar.daysOfWeek.map((day, index) => (
                <div key={index} className="text-center font-semibold text-gray-600 text-sm py-2">
                  {day}
                </div>
              ))}
              
              {calendar.dates.map((week, weekIndex) => (
                week.map((date, dateIndex) => {
                  const status = date ? calendar.attendance[date] : null;
                  const isToday = date === 24;
                  
                  return (
                    <div
                      key={`${weekIndex}-${dateIndex}`}
                      className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium ${
                        !date ? 'bg-gray-50 text-gray-300' :
                        isToday ? 'bg-blue-600 text-white' :
                        status ? getAttendanceColor(status) :
                        'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {date || ''}
                    </div>
                  );
                })
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Absent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Late</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-600">Holiday/Weekend</span>
              </div>
            </div>
          </div>

          {/* Subject Wise Attendance */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-800">Subject Wise</h3>
              <button className="text-blue-600 hover:underline text-sm">View All</button>
            </div>

            <div className="space-y-4">
              {subjectWise.map((item, index) => {
                const colorClasses = {
                  blue: 'bg-blue-600',
                  purple: 'bg-purple-600',
                  orange: 'bg-orange-600',
                  teal: 'bg-teal-600',
                  red: 'bg-red-600'
                };

                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${colorClasses[item.color]}`}></div>
                        <span className="text-sm font-medium text-gray-800">{item.subject}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-800">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${colorClasses[item.color]}`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default Attendance;
