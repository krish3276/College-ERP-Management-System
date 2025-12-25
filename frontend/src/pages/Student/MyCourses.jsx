import { useState } from 'react';
import StudentLayout from '../../components/layouts/StudentLayout';
import { FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
  const navigate = useNavigate();
  const [selectedSemester, setSelectedSemester] = useState('current');

  const stats = [
    { label: 'Total Credits', value: '24', icon: '📚' },
    { label: 'Current GPA', value: '3.8', icon: '📈' },
    { label: 'Pending Tasks', value: '5', icon: '📝' }
  ];

  const courses = [
    {
      code: 'CS-201',
      name: 'Data Structures & Algorithms',
      instructor: 'Prof. A. Sharma',
      department: 'Computer Science Dept.',
      progress: 75,
      avatar: '/api/placeholder/40/40',
      color: 'blue',
      credits: 4
    },
    {
      code: 'EC-204',
      name: 'Digital Electronics',
      instructor: 'Dr. R. Verma',
      department: 'Electronics Dept.',
      progress: 40,
      avatar: '/api/placeholder/40/40',
      color: 'purple',
      credits: 4
    },
    {
      code: 'MA-202',
      name: 'Engineering Mathematics IV',
      instructor: 'Prof. K. Singh',
      department: 'Mathematics Dept.',
      progress: 90,
      avatar: '/api/placeholder/40/40',
      color: 'orange',
      credits: 4
    },
    {
      code: 'HS-201',
      name: 'Soft Skills & Communication',
      instructor: 'Ms. L. Davis',
      department: 'Humanities Dept.',
      progress: 15,
      avatar: '/api/placeholder/40/40',
      color: 'teal',
      credits: 2
    },
    {
      code: 'CS-202',
      name: 'Database Management',
      instructor: 'Prof. J. Chen',
      department: 'Computer Science Dept.',
      progress: 55,
      avatar: '/api/placeholder/40/40',
      color: 'purple',
      credits: 3
    },
    {
      code: 'CS-203',
      name: 'Computer Networks',
      instructor: 'Dr. S. Miller',
      department: 'Computer Science Dept.',
      progress: 10,
      avatar: '/api/placeholder/40/40',
      color: 'red',
      credits: 3
    }
  ];

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-green-600';
    if (progress >= 40) return 'bg-orange-600';
    return 'bg-blue-600';
  };

  const handleViewDetails = (courseCode) => {
    navigate(`/student/course/${courseCode}`);
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span>Spring 2024</span>
              <span>&gt;</span>
              <span>My Courses</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Spring 2024</h1>
            <p className="text-gray-600 mt-1">Track your progress and access course materials</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <FaDownload />
            Download Schedule
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">{stat.label}</p>
                  <h3 className="text-4xl font-bold text-gray-800 mt-2">{stat.value}</h3>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Semester Tabs */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSelectedSemester('current')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedSemester === 'current' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Current Semester
            </button>
            <button 
              onClick={() => setSelectedSemester('past')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedSemester === 'past' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Past Semesters
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => {
            const borderColors = {
              blue: 'border-t-blue-500',
              purple: 'border-t-purple-500',
              orange: 'border-t-orange-500',
              teal: 'border-t-teal-500',
              red: 'border-t-red-500'
            };

            const bgColors = {
              blue: 'bg-blue-50',
              purple: 'bg-purple-50',
              orange: 'bg-orange-50',
              teal: 'bg-teal-50',
              red: 'bg-red-50'
            };

            const iconColors = {
              blue: 'text-blue-600',
              purple: 'text-purple-600',
              orange: 'text-orange-600',
              teal: 'text-teal-600',
              red: 'text-red-600'
            };

            return (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-sm border-t-4 ${borderColors[course.color]} border-l border-r border-b border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer`}
                onClick={() => handleViewDetails(course.code)}
              >
                <div className={`p-4 ${bgColors[course.color]}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-700">
                      {course.code}
                    </span>
                    <div className="flex gap-1">
                      <button className="p-1 hover:bg-white rounded">
                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${bgColors[course.color]} rounded-lg flex items-center justify-center mb-3`}>
                    <span className="text-2xl">🎓</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{course.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <img src={course.avatar} alt={course.instructor} className="w-8 h-8 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm">{course.instructor}</p>
                      <p className="text-xs text-gray-500 truncate">{course.department}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-bold text-gray-800">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(course.code);
                      }}
                      className={`flex-1 px-4 py-2 ${course.progress > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded-lg font-medium transition`}
                    >
                      {course.progress > 0 ? 'Resume Course →' : 'View Details'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600">Showing 1 to 6 of 6 Courses</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FaChevronLeft />
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              Next
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default MyCourses;
