import { useState } from 'react';
import ParentLayout from '../../components/layouts/ParentLayout';
import { FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Calendar = () => {
  const [view, setView] = useState('Month');
  const [selectedFilters, setSelectedFilters] = useState(['All Events']);

  const filters = [
    { id: 'all', label: 'All Events', color: 'gray' },
    { id: 'exams', label: 'Exams Only', color: 'red' },
    { id: 'holidays', label: 'Holidays', color: 'yellow' },
    { id: 'assignments', label: 'Assignments', color: 'green' }
  ];

  const calendar = {
    month: 'October 2023',
    daysOfWeek: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    dates: [
      [28, 29, 30, 1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25],
      [26, 27, 28, 29, 30, 31, null]
    ],
    events: {
      2: [{ label: 'Soccer...', color: 'blue' }],
      4: [{ label: 'Math H...', color: 'red' }],
      5: 'today',
      9: [{ label: 'Science...', color: 'green' }],
      11: [{ label: 'PTA Me...', color: 'blue' }],
      14: [{ label: 'Youth...', color: 'orange' }]
    }
  };

  const upcomingEvents = [
    {
      date: '04',
      month: 'OCT',
      title: 'Mathematics Midterm',
      time: '09:00 AM',
      location: 'Room 302',
      type: 'Exam',
      color: 'red'
    },
    {
      date: '09',
      month: 'OCT',
      title: 'Science Project Due',
      time: 'Submit by 11:59 PM',
      type: 'Assignment',
      color: 'green'
    },
    {
      date: '11',
      month: 'OCT',
      title: 'PTA Meeting',
      time: '06:00 PM',
      location: 'School Auditorium',
      type: 'Event',
      color: 'blue'
    }
  ];

  const notices = [
    {
      title: 'Field trip permission slips are due this Friday.',
      date: 'Today'
    },
    {
      title: 'School will close early on Oct 13th for staff training.',
      date: 'Yesterday'
    }
  ];

  return (
    <ParentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Calendar & Events</h1>
            <p className="text-gray-600 mt-1">Manage your child's schedule, exams, and holidays.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <FaPlus />
            Add Personal Event
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex gap-2">
            {filters.map((filter) => {
              const colorClasses = {
                gray: 'bg-gray-800 text-white',
                red: 'bg-red-500 text-white',
                yellow: 'bg-yellow-500 text-white',
                green: 'bg-green-500 text-white'
              };

              return (
                <button
                  key={filter.id}
                  className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                    filter.id === 'all' ? colorClasses[filter.color] : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    filter.id === 'exams' ? 'bg-red-500' :
                    filter.id === 'holidays' ? 'bg-yellow-500' :
                    filter.id === 'assignments' ? 'bg-green-500' :
                    'bg-gray-500'
                  }`}></span>
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <FaChevronLeft />
                </button>
                <h3 className="text-xl font-bold text-gray-800">{calendar.month}</h3>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <FaChevronRight />
                </button>
              </div>

              <div className="flex gap-2">
                {['Month', 'Week', 'Day'].map((viewType) => (
                  <button
                    key={viewType}
                    onClick={() => setView(viewType)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      view === viewType ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {viewType}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendar.daysOfWeek.map((day, index) => (
                <div key={index} className="text-center font-semibold text-gray-600 text-sm py-2">
                  {day}
                </div>
              ))}
              
              {calendar.dates.map((week, weekIndex) => (
                week.map((date, dateIndex) => {
                  const events = date ? calendar.events[date] : null;
                  const isToday = events === 'today';
                  const isPrevMonth = weekIndex === 0 && date > 20;
                  
                  return (
                    <div
                      key={`${weekIndex}-${dateIndex}`}
                      className={`min-h-[80px] border rounded-lg p-2 ${
                        !date ? 'bg-gray-50' :
                        isToday ? 'bg-blue-600 text-white border-blue-600' :
                        isPrevMonth ? 'bg-gray-50 text-gray-400' :
                        'hover:bg-gray-50 cursor-pointer'
                      }`}
                    >
                      {date && (
                        <>
                          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-white' : ''}`}>
                            {date}
                          </div>
                          {Array.isArray(events) && events.map((event, i) => (
                            <div
                              key={i}
                              className={`text-xs px-2 py-1 rounded mt-1 truncate ${
                                event.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                                event.color === 'red' ? 'bg-red-100 text-red-700' :
                                event.color === 'green' ? 'bg-green-100 text-green-700' :
                                'bg-orange-100 text-orange-700'
                              }`}
                            >
                              {event.label}
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  );
                })
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Upcoming</h3>
                <button className="text-blue-600 hover:underline text-sm">View All</button>
              </div>

              <div className="space-y-3">
                {upcomingEvents.map((event, index) => {
                  const colorClasses = {
                    red: 'bg-red-50 border-red-200',
                    green: 'bg-green-50 border-green-200',
                    blue: 'bg-blue-50 border-blue-200'
                  };

                  const labelColors = {
                    red: 'bg-red-500',
                    green: 'bg-green-500',
                    blue: 'bg-blue-500'
                  };

                  return (
                    <div key={index} className={`p-3 rounded-lg border ${colorClasses[event.color]}`}>
                      <div className="flex gap-3">
                        <div className="text-center flex-shrink-0">
                          <div className={`text-2xl font-bold ${
                            event.color === 'red' ? 'text-red-700' :
                            event.color === 'green' ? 'text-green-700' :
                            'text-blue-700'
                          }`}>
                            {event.date}
                          </div>
                          <div className="text-xs text-gray-600">{event.month}</div>
                        </div>
                        <div className="flex-1">
                          <span className={`inline-block px-2 py-1 ${labelColors[event.color]} text-white rounded text-xs font-bold mb-1`}>
                            {event.type}
                          </span>
                          <h4 className="font-semibold text-gray-800 text-sm mb-1">{event.title}</h4>
                          <p className="text-xs text-gray-600">{event.time}</p>
                          {event.location && (
                            <p className="text-xs text-gray-600">{event.location}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Notices */}
            <div className="bg-blue-600 text-white rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🔔</span>
                <h3 className="font-bold text-lg">Notices</h3>
              </div>

              <div className="space-y-3">
                {notices.map((notice, index) => (
                  <div key={index} className="bg-blue-500 rounded-lg p-3">
                    <p className="text-sm font-medium mb-1">{notice.title}</p>
                    <p className="text-xs text-blue-200">{notice.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default Calendar;
