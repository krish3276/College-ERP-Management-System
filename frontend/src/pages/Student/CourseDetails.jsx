import { useState } from 'react';
import StudentLayout from '../../components/layouts/StudentLayout';
import { FaDownload, FaExternalLinkAlt, FaClock, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const CourseDetails = () => {
  const [activeTab, setActiveTab] = useState('materials');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'materials', label: 'Materials' },
    { id: 'assignments', label: 'Assignments' },
    { id: 'grades', label: 'Grades' }
  ];

  const materials = [
    {
      week: 'Week 5: Binary Search Trees',
      current: true,
      items: [
        {
          type: 'pdf',
          name: 'Lecture 12: BST Operations.pdf',
          size: '2.4 MB',
          uploaded: '2 days ago',
          icon: '📄',
          color: 'red'
        },
        {
          type: 'docx',
          name: 'Lab 5 Manual.docx',
          size: '1.1 MB',
          uploaded: '2 days ago',
          icon: '📘',
          color: 'blue'
        },
        {
          type: 'video',
          name: 'Live Session Recording - BST',
          duration: '54 mins',
          uploaded: 'Watch online',
          icon: '▶️',
          color: 'purple'
        }
      ]
    },
    {
      week: 'Week 4: Linked Lists',
      current: false,
      items: [
        {
          type: 'pdf',
          name: 'Week 4 Summary Notes.pdf',
          size: '3.2 MB',
          uploaded: '1 week ago',
          icon: '📄',
          color: 'red'
        }
      ]
    }
  ];

  const upcomingTasks = [
    {
      title: 'Lab 3 Submission',
      dueDate: 'Tomorrow, 11:59 PM',
      urgent: true
    },
    {
      title: 'Mid-Term Quiz',
      dueDate: 'Sep 24, 10:00 AM',
      urgent: false
    },
    {
      title: 'Project Proposal',
      dueDate: 'Oct 02, 5:00 PM',
      urgent: false
    }
  ];

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Home</span>
          <span>&gt;</span>
          <span>Courses</span>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">Data Structures</span>
        </div>

        {/* Course Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-500 rounded-full text-sm font-bold">CS-202</span>
                <span className="px-3 py-1 bg-green-500 rounded-full text-sm font-bold">In Progress</span>
              </div>
              <h1 className="text-4xl font-bold mb-2">Introduction to Data Structures</h1>
              <p className="text-blue-100 mb-4">Semester 3 • Core Subject • 4 Credits</p>
              
              <div className="bg-white/20 rounded-lg p-4 inline-block">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">Course Completion</span>
                  <span className="font-bold text-lg">75%</span>
                </div>
                <div className="w-64 bg-white/20 rounded-full h-3">
                  <div className="bg-white h-3 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-blue-100 mt-2">12/16 Modules Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="border-b border-gray-200 px-6">
                <div className="flex gap-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 border-b-2 font-medium transition ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Materials Tab Content */}
              {activeTab === 'materials' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Course Materials</h3>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search resources..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {materials.map((week, weekIndex) => (
                      <div key={weekIndex}>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-gray-800">{week.week}</h4>
                          {week.current && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                              Current Week
                            </span>
                          )}
                        </div>

                        <div className="space-y-3">
                          {week.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                                item.color === 'red' ? 'bg-red-100' :
                                item.color === 'blue' ? 'bg-blue-100' :
                                'bg-purple-100'
                              }`}>
                                {item.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-semibold text-gray-800">{item.name}</h5>
                                <p className="text-sm text-gray-600">
                                  {item.size || item.duration} • Uploaded {item.uploaded}
                                </p>
                              </div>
                              <button className="p-2 hover:bg-white rounded-lg transition">
                                {item.type === 'video' ? (
                                  <FaExternalLinkAlt className="text-gray-600" />
                                ) : (
                                  <FaDownload className="text-gray-600" />
                                )}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Instructor & Tasks */}
          <div className="space-y-6">
            {/* Course Instructor */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">COURSE INSTRUCTOR</h3>
              
              <div className="text-center mb-6">
                <img 
                  src="/api/placeholder/80/80" 
                  alt="Prof. Alan Turing" 
                  className="w-20 h-20 rounded-full mx-auto mb-3"
                />
                <h4 className="font-bold text-gray-800">Prof. Alan Turing</h4>
                <a href="mailto:alan.turing@college.edu" className="text-sm text-blue-600 hover:underline">
                  alan.turing@college.edu
                </a>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 text-sm">
                  <FaClock className="text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-800">Office Hours</p>
                    <p className="text-gray-600">Tue/Thu 2:00 - 4:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-800">Office Location</p>
                    <p className="text-gray-600">Building C, Room 304</p>
                  </div>
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                <FaEnvelope />
                Contact Instructor
              </button>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">UPCOMING TASKS</h3>
                <button className="text-blue-600 hover:underline text-sm">View All</button>
              </div>

              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-gray-800 text-sm">{task.title}</h4>
                      {task.urgent && (
                        <span className="text-red-500 text-xs font-bold">🔴</span>
                      )}
                    </div>
                    <p className={`text-xs ${task.urgent ? 'text-red-600' : 'text-gray-600'}`}>
                      {task.urgent && 'Due '}{task.dueDate}
                    </p>
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

export default CourseDetails;
