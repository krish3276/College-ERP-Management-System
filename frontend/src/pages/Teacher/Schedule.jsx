import { useState } from 'react';
import TeacherLayout from '../../components/layouts/TeacherLayout';
import { FaPlus, FaCalendar, FaClock, FaMapMarkerAlt, FaUsers, FaPrint, FaDownload, FaPlay } from 'react-icons/fa';

const Schedule = () => {
  const [view, setView] = useState('week');
  const [currentDate] = useState('October 2023');

  const daysOfWeek = [
    { day: 'Mon', date: '23' },
    { day: 'Tue', date: '24' },
    { day: 'Wed', date: '25' },
    { day: 'Thu', date: '26' },
    { day: 'Fri', date: '27' }
  ];

  const schedule = [
    {
      time: '09:00 AM',
      classes: [
        { subject: 'CS101 - Intr...', location: 'Rm 302', color: 'blue', students: 32 },
        null,
        null,
        { subject: 'CS101 - Intr...', location: 'Rm 302', color: 'blue', students: 32 },
        null
      ]
    },
    {
      time: '10:00 AM',
      classes: [null, null, null, null, null]
    },
    {
      time: '11:00 AM',
      classes: [
        null,
        null,
        { subject: 'Faculty Me...', location: 'Conf Room B', color: 'red', type: 'Meeting' },
        null,
        null
      ]
    },
    {
      time: '12:00 PM',
      classes: [
        { subject: 'CS305 - Dat...', location: 'Lab A', color: 'orange', students: 48, attendees: 2 },
        null,
        null,
        null,
        null
      ]
    },
    {
      time: '01:00 PM',
      classes: [
        null,
        null,
        null,
        null,
        { subject: 'Office Hours', location: 'Faculty Lounge', color: 'purple' }
      ]
    },
    {
      time: '02:00 PM',
      classes: [null, null, null, null, null]
    }
  ];

  const upNext = {
    time: '13 mins',
    subject: 'CS305 - Data Structures',
    location: 'Lab A • 32 Students',
    action: 'Start Session'
  };

  const reminders = [
    { title: 'Submit Mid-term Grades', date: 'Due Friday, 5:00 PM', color: 'red' },
    { title: 'Department Meeting', date: 'Tomorrow, 8:00 AM', color: 'orange' },
    { title: 'Review Project Proposals', date: 'Oct 30', color: 'blue' }
  ];

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Timetable & Calendar</h1>
            <p className="text-gray-600 mt-1">Manage your classes and events for Oct 23 - Oct 29, 2023</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <FaPrint />
              Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <FaDownload />
              PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <FaPlus />
              Add Event
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              ← 
            </button>
            <h2 className="text-lg font-semibold text-gray-800">{currentDate}</h2>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              →
            </button>
          </div>

          <div className="flex gap-2">
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
            <button
              onClick={() => setView('month')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                view === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Month
            </button>
          </div>

          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
            <FaClock className="text-blue-600" />
            <span className="font-semibold text-blue-800">Up Next</span>
            <span className="text-blue-600">{upNext.time}</span>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase w-24">TIME</th>
                    {daysOfWeek.map((day, index) => (
                      <th key={index} className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                        <div className="font-bold text-gray-800">{day.day}</div>
                        <div className="text-gray-500 text-lg font-bold">{day.date}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((slot, slotIndex) => (
                    <tr key={slotIndex} className="border-b border-gray-100">
                      <td className="px-4 py-3 text-sm font-medium text-gray-700 align-top">
                        {slot.time}
                      </td>
                      {slot.classes.map((classItem, dayIndex) => (
                        <td key={dayIndex} className="px-2 py-3 align-top">
                          {classItem ? (
                            <div className={`p-3 rounded-lg border-l-4 ${
                              classItem.color === 'blue' ? 'bg-blue-50 border-blue-500' :
                              classItem.color === 'orange' ? 'bg-orange-50 border-orange-500' :
                              classItem.color === 'red' ? 'bg-red-50 border-red-500' :
                              'bg-purple-50 border-purple-500'
                            }`}>
                              <h4 className="font-bold text-gray-800 text-sm mb-1">{classItem.subject}</h4>
                              <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                                <FaMapMarkerAlt className="text-gray-400" />
                                <span>{classItem.location}</span>
                              </div>
                              {classItem.students && (
                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                  <FaUsers className="text-gray-400" />
                                  <span>{classItem.students}</span>
                                  {classItem.attendees && (
                                    <span>• 👥 {classItem.attendees}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="h-16"></div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Up Next Card */}
            <div className="bg-blue-600 text-white rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaClock />
                <span className="font-semibold">Up Next</span>
                <span className="ml-auto bg-blue-500 px-2 py-1 rounded text-sm">{upNext.time}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{upNext.subject}</h3>
              <p className="text-blue-100 text-sm mb-4">{upNext.location}</p>
              <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2">
                <FaPlay />
                {upNext.action}
              </button>
            </div>

            {/* Mini Calendar */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center justify-between">
                <span>{currentDate}</span>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-gray-100 rounded">←</button>
                  <button className="p-1 hover:bg-gray-100 rounded">→</button>
                </div>
              </h3>
              <div className="grid grid-cols-7 gap-1 text-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-xs font-semibold text-gray-500 py-2">{day}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                  <div
                    key={date}
                    className={`text-sm py-2 rounded ${
                      date === 24 ? 'bg-blue-600 text-white font-bold' : 
                      [23, 25, 26, 27].includes(date) ? 'bg-blue-50 text-blue-600 font-medium' :
                      'text-gray-700 hover:bg-gray-100'
                    } cursor-pointer`}
                  >
                    {date}
                  </div>
                ))}
              </div>
            </div>

            {/* Reminders */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Reminders</h3>
                <button className="text-blue-600 hover:underline text-sm">View All</button>
              </div>
              <div className="space-y-3">
                {reminders.map((reminder, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      reminder.color === 'red' ? 'bg-red-500' :
                      reminder.color === 'orange' ? 'bg-orange-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{reminder.title}</p>
                      <p className="text-xs text-gray-500">{reminder.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default Schedule;
