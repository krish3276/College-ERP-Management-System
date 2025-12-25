import { useState } from 'react';
import TeacherLayout from '../../components/layouts/TeacherLayout';
import { FaPlus, FaFilter, FaMapMarkerAlt, FaClock, FaUsers, FaBook } from 'react-icons/fa';

const MySubjects = () => {
  const [selectedYear, setSelectedYear] = useState('2023-2024');
  const [selectedStatus, setSelectedStatus] = useState('Active');

  const subjects = {
    'Fall Semester 2023': [
      {
        code: 'CS101',
        name: 'Intro to Computer Science',
        semester: 'Fall Semester 2023',
        schedule: 'Mon, Wed • 10:00 AM - 11:30 AM',
        location: 'Building A, Room 304',
        students: 42,
        icon: '💻',
        color: 'orange'
      },
      {
        code: 'CS202',
        name: 'Data Structures',
        semester: 'Fall Semester 2023',
        schedule: 'Tue, Thu • 01:00 PM - 02:30 PM',
        location: 'Building C, Lab 02',
        students: 28,
        icon: '📊',
        color: 'purple'
      },
      {
        code: 'CS305',
        name: 'Web Development',
        semester: 'Fall Semester 2023',
        schedule: 'Mon, Wed • 02:00 PM - 04:00 PM',
        location: 'Online / Hybrid',
        students: 35,
        icon: '🌐',
        color: 'green'
      }
    ],
    'Spring Semester 2024': [
      {
        code: 'AI401',
        name: 'Artificial Intelligence',
        semester: 'Spring Semester 2024',
        schedule: 'Fri • 09:00 AM - 12:00 PM',
        location: 'Building B, Room 101',
        students: 12,
        icon: '🤖',
        color: 'blue',
        status: 'Upcoming'
      }
    ]
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Subjects</h1>
            <p className="text-gray-600 mt-1">Manage your subjects, students, and curriculum.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <FaBook />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <FaPlus />
              Add New Subject
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-xs">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by subject name or code..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option>2023 - 2024</option>
              <option>2024 - 2025</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedStatus('Active')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedStatus === 'Active'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setSelectedStatus('Archived')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedStatus === 'Archived'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Archived
              </button>
            </div>

            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              Sort by: Semester
            </button>
          </div>
        </div>

        {/* Subjects by Semester */}
        {Object.entries(subjects).map(([semester, subjectList]) => (
          <div key={semester}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">{semester}</h2>
              {semester === 'Spring Semester 2024' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Upcoming
                </span>
              )}
              {semester === 'Fall Semester 2023' && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Current
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjectList.map((subject, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{subject.icon}</div>
                      <div>
                        <span className="text-sm font-semibold text-blue-600">{subject.code}</span>
                        <h3 className="font-bold text-gray-800">{subject.name}</h3>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">⋮</button>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaClock className="text-gray-400" />
                      <span>{subject.schedule}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span>{subject.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-blue-600">
                      <FaUsers />
                      <span className="font-semibold">{subject.students} Students</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      View Class →
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Subject Card */}
              {semester === 'Spring Semester 2024' && (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <FaPlus className="text-gray-400 text-2xl" />
                  </div>
                  <h3 className="font-semibold text-gray-700 mb-2">Add Another Subject</h3>
                  <p className="text-sm text-gray-500 text-center">Prepare your curriculum for Spring semester.</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </TeacherLayout>
  );
};

export default MySubjects;
