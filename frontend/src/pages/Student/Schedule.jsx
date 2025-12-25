import { useState } from 'react';
import StudentLayout from '../../components/layouts/StudentLayout';
import { FaFilter, FaPlus } from 'react-icons/fa';

const Schedule = () => {
  const [view, setView] = useState('month');

  const upcomingDeadline = {
    title: 'Physics Lab Report',
    subtitle: 'Experiment 4: Optics & Refraction',
    dueTime: '01:45',
    dueUnit: 'HRS',
    dueMinutes: '45',
    dueMinutesUnit: 'MINS'
  };

  const notifications = [
    {
      title: 'Calculus Mid-Term Syllabus Updated',
      department: 'Math Dept',
      time: '2 hours ago',
      icon: '📄',
      color: 'red'
    },
    {
      title: 'Grade Posted: Data Structures Quiz 3',
      department: 'System',
      time: '5 hours ago',
      icon: '⭐',
      color: 'green'
    },
    {
      title: 'Tech Fest Registration is Open!',
      department: 'Student Council',
      time: 'Yesterday',
      icon: '📅',
      color: 'blue'
    }
  ];

  const todayTimetable = [
    {
      subject: 'Data Structures',
      time: '09:00 AM - 10:30 AM',
      location: 'Lecture Hall A',
      instructor: 'Dr. Smith',
      type: 'LECTURE',
      color: 'blue'
    },
    {
      subject: 'Digital Logic Design',
      time: '11:00 AM - 12:30 PM',
      location: 'Room 302',
      instructor: 'Prof. Johnson',
      type: 'LECTURE',
      color: 'purple'
    },
    {
      subject: 'Physics Lab',
      time: '02:00 PM - 04:00 PM',
      location: 'Lab Building - L203',
      instructor: 'Dr. Williams',
      type: 'PRACTICAL',
      color: 'orange'
    }
  ];

  const upcomingDeadlines = [
    {
      date: '10',
      month: 'OCT',
      title: 'Database Project',
      subject: 'CS-202',
      daysLeft: '2 Days'
    },
    {
      date: '12',
      month: 'OCT',
      title: 'History Essay',
      subject: 'HS-101',
      daysLeft: '5 Days'
    }
  ];

  const calendar = {
    month: 'October 2023',
    weeks: [
      ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
      [null, null, null, 1, 2, 3, 4],
      [null, 6, 7, 8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25],
      [26, 27, 28, 29, 30, 31, null]
    ],
    events: {
      5: ['exam'],
      10: ['due'],
      15: ['exam', 'exam'],
      20: ['event'],
      24: ['due']
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Schedule & Alerts</h1>
            <p className="text-gray-600 mt-1">Manage your deadlines, exams, and daily classes.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <FaFilter />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <FaPlus />
              Add Event
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calendar Controls */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-xl font-bold text-gray-800">{calendar.month}</h2>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setView('month')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      view === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setView('week')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setView('day')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      view === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Day
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="mb-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">Exam</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">Due</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Event</span>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendar.weeks[0].map((day, index) => (
                  <div key={index} className="text-center font-semibold text-gray-600 text-sm py-2">
                    {day}
                  </div>
                ))}
                
                {calendar.weeks.slice(1).map((week, weekIndex) => (
                  week.map((date, dateIndex) => {
                    const hasEvents = date && calendar.events[date];
                    const isToday = date === 5;
                    
                    return (
                      <div
                        key={`${weekIndex}-${dateIndex}`}
                        className={`aspect-square border rounded-lg p-2 ${
                          !date ? 'bg-gray-50' : 
                          isToday ? 'bg-blue-600 text-white font-bold' :
                          'hover:bg-gray-50 cursor-pointer'
                        }`}
                      >
                        {date && (
                          <>
                            <div className="text-center mb-1">{date}</div>
                            {hasEvents && (
                              <div className="flex justify-center gap-1">
                                {hasEvents.map((event, i) => (
                                  <div
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      event === 'exam' ? 'bg-red-500' :
                                      event === 'due' ? 'bg-yellow-500' :
                                      'bg-green-500'
                                    }`}
                                  ></div>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })
                ))}
              </div>
            </div>

            {/* Today's Timetable */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Today's Timetable</h3>
              
              <div className="space-y-3">
                {todayTimetable.map((item, index) => {
                  const borderColors = {
                    blue: 'border-blue-500',
                    purple: 'border-purple-500',
                    orange: 'border-orange-500'
                  };

                  const bgColors = {
                    blue: 'bg-blue-50',
                    purple: 'bg-purple-50',
                    orange: 'bg-orange-50'
                  };

                  const labelColors = {
                    blue: 'bg-blue-500',
                    purple: 'bg-purple-500',
                    orange: 'bg-orange-500'
                  };

                  return (
                    <div key={index} className={`border-l-4 ${borderColors[item.color]} ${bgColors[item.color]} rounded-lg p-4`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 ${labelColors[item.color]} text-white rounded text-xs font-bold`}>
                              {item.type}
                            </span>
                            <h4 className="font-bold text-gray-800">{item.subject}</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{item.time} • {item.location}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <span>👤</span>
                            {item.instructor}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Up Next Card */}
            <div className="bg-blue-600 text-white rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-500 rounded text-xs font-bold">UP NEXT</span>
                <span className="text-sm">Due Today</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{upcomingDeadline.title}</h3>
              <p className="text-blue-100 text-sm mb-4">{upcomingDeadline.subtitle}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{upcomingDeadline.dueTime.split(':')[0]}</div>
                  <div className="text-xs">{upcomingDeadline.dueUnit}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{upcomingDeadline.dueMinutes}</div>
                  <div className="text-xs">{upcomingDeadline.dueMinutesUnit}</div>
                </div>
              </div>
              
              <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                Submit Now
              </button>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Notifications</h3>
                <button className="text-blue-600 hover:underline text-sm">Mark all read</button>
              </div>
              
              <div className="space-y-3">
                {notifications.map((notif, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{notif.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm">{notif.title}</p>
                      <p className="text-xs text-gray-500">{notif.department} • {notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-blue-600 hover:underline text-sm">VIEW ARCHIVE</button>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Upcoming Deadlines</h3>
              
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">{deadline.date}</div>
                      <div className="text-xs text-gray-500">{deadline.month}</div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{deadline.title}</p>
                      <p className="text-xs text-gray-500">{deadline.subject} • {deadline.daysLeft}</p>
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

export default Schedule;
