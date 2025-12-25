import { useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import { FaPlus, FaBolt, FaClock, FaMapMarkerAlt, FaUser, FaExclamationTriangle, FaPrint, FaDownload } from 'react-icons/fa';

const TimetableManagement = () => {
  const [selectedSemester, setSelectedSemester] = useState('4');
  const [selectedDay, setSelectedDay] = useState('TUE');

  const days = [
    { id: 'MON', label: 'MON', date: '12 Feb' },
    { id: 'TUE', label: 'TUE', date: '13 Feb' },
    { id: 'WED', label: 'WED', date: '14 Feb' },
    { id: 'THU', label: 'THU', date: '15 Feb' },
    { id: 'FRI', label: 'FRI', date: '16 Feb' }
  ];

  const timeSlots = [
    { time: '09:00 AM', classes: [
      { subject: 'Data Structures', code: 'CS-301', type: 'Lecture', teacher: 'Dr. C. Kumar', room: 'Room 301', color: 'blue' },
      null,
      null,
      { subject: 'OS Architecture', code: 'CS-205', type: 'Lecture', teacher: 'Room 304', room: 'Room 304', color: 'blue' },
      { subject: 'Mathematics IV', code: 'MA-202', type: 'Lecture', teacher: 'Room 155', room: 'Room 155', color: 'purple' }
    ]},
    { time: '10:00 AM', classes: [
      { subject: 'Computer Networks', code: 'CS-302', type: 'Lecture', teacher: 'Prof. R. Singh', room: 'Room 305', color: 'orange', conflict: true },
      { subject: 'DBMS', code: 'CS-204', type: 'Lecture', teacher: 'Dr. S. Gupta', room: 'Room 301', color: 'green' },
      { subject: 'Data Structures', code: 'CS-301', type: 'Lecture', teacher: 'Room 301', room: 'Room 301', color: 'blue' },
      null,
      { subject: 'DBMS', code: 'CS-204', type: 'Lecture', teacher: 'Room 301', room: 'Room 301', color: 'green' }
    ]},
    { time: '11:00 AM', classes: [null, null, null, null, null] },
    { time: '11:45 AM', classes: [
      { subject: 'DBMS Lab', code: 'Group A', type: 'Lab', duration: '2 hours', teacher: 'Comp Lab 2', room: 'Comp Lab 2', color: 'teal' },
      { subject: 'Mathematics IV', code: 'MA-202', type: 'Tutorial', teacher: 'Group B', room: 'Group B', color: 'purple' },
      { subject: 'OS Lab', code: 'Group B', type: 'Lab', duration: '2 hours', teacher: 'Comp Lab 2', room: 'Comp Lab 2', color: 'teal' },
      { subject: 'Computer Networks', code: 'CS-202', type: 'Lecture', teacher: 'Room 301', room: 'Room 301', color: 'orange' }
    ]}
  ];

  const semesters = [
    { id: '4', label: 'Sem 4' },
    { id: '6', label: 'Sem 6' },
    { id: '8', label: 'Sem 8' }
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
              <span>Admin</span>
              <span>/</span>
              <span>Timetable Management</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Timetable Management</h1>
            <p className="text-gray-600 mt-1">Computer Science Dept • Spring 2024</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <FaClock />
              View History
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <FaPlus />
              New Schedule
            </button>
          </div>
        </div>

        {/* AI Timetable Generator */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <FaBolt className="text-blue-600" />
                <h3 className="font-bold text-gray-800">AI Timetable Generator</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Automatically generate conflict-free schedules based on faculty availability, room capacity, and course requirements.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Computer Science</option>
                    <option>Electronics</option>
                    <option>Mechanical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>2023-2024</option>
                    <option>2024-2025</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Spring (Even)</option>
                    <option>Fall (Odd)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                  <FaBolt />
                  Generate with AI
                </button>
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-sm font-medium">System Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {semesters.map((sem) => (
              <button
                key={sem.id}
                onClick={() => setSelectedSemester(sem.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedSemester === sem.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {sem.label}
              </button>
            ))}
          </div>

          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <option>Section A</option>
            <option>Section B</option>
          </select>

          <div className="ml-auto flex items-center gap-2">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <span className="text-sm">Edit Mode</span>
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FaPrint />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FaDownload />
            </button>
          </div>
        </div>

        {/* Timetable Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase w-24">TIME</th>
                  {days.map((day) => (
                    <th key={day.id} className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                      <div className="font-bold text-gray-800">{day.label}</div>
                      <div className="text-gray-500 text-xs font-normal">{day.date}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, slotIndex) => (
                  <tr key={slotIndex} className="border-b border-gray-100">
                    <td className="px-4 py-3 text-sm font-medium text-gray-700 align-top">
                      {slot.time}
                    </td>
                    {slot.classes.map((classItem, dayIndex) => (
                      <td key={dayIndex} className="px-2 py-3 align-top">
                        {classItem ? (
                          <div className={`p-3 rounded-lg border-l-4 ${
                            classItem.conflict 
                              ? 'bg-red-50 border-red-500' 
                              : classItem.color === 'blue'
                              ? 'bg-blue-50 border-blue-500'
                              : classItem.color === 'green'
                              ? 'bg-green-50 border-green-500'
                              : classItem.color === 'orange'
                              ? 'bg-orange-50 border-orange-500'
                              : classItem.color === 'purple'
                              ? 'bg-purple-50 border-purple-500'
                              : 'bg-teal-50 border-teal-500'
                          }`}>
                            {classItem.conflict && (
                              <div className="flex items-center gap-1 text-red-600 text-xs mb-1">
                                <FaExclamationTriangle />
                                <span>Conflict Detected</span>
                              </div>
                            )}
                            <h4 className="font-bold text-gray-800 text-sm mb-1">{classItem.subject}</h4>
                            <p className="text-xs text-gray-600 mb-2">{classItem.code} • {classItem.type}</p>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <FaUser className="text-gray-400" />
                                <span>{classItem.teacher}</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <FaMapMarkerAlt className="text-gray-400" />
                                <span>{classItem.room}</span>
                              </div>
                              {classItem.duration && (
                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                  <FaClock className="text-gray-400" />
                                  <span>{classItem.duration}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : slotIndex === 2 && dayIndex === 0 ? (
                          <div className="text-center py-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <p className="text-sm font-medium text-gray-600">LUNCH BREAK (45 MINS)</p>
                          </div>
                        ) : (
                          <div className="text-center py-6 text-gray-400 text-sm">Free Slot</div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TimetableManagement;
