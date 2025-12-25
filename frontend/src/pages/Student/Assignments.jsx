import { useState } from 'react';
import StudentLayout from '../../components/layouts/StudentLayout';
import { FaPlus, FaUpload } from 'react-icons/fa';

const Assignments = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const stats = [
    { label: 'Pending', value: '3', subtitle: '2 due this week', color: 'orange' },
    { label: 'Submitted', value: '12', subtitle: 'All on time', color: 'green' },
    { label: 'Avg. Grade', value: 'A-', subtitle: 'Top 15% of class', color: 'blue' }
  ];

  const tabs = [
    { id: 'pending', label: 'Pending', count: 3 },
    { id: 'submitted', label: 'Submitted', count: null },
    { id: 'evaluated', label: 'Evaluated', count: null }
  ];

  const pendingAssignments = [
    {
      course: 'CS-201',
      title: 'Data Structures & Algorithms',
      description: 'Binary Tree Implementation and Traversal Analysis.',
      dueDate: 'Oct 24, 11:59 PM',
      dueLabel: 'DUE TOMORROW',
      maxScore: 100,
      format: 'PDF, ZIP',
      urgent: true,
      image: '/api/placeholder/300/200'
    },
    {
      course: 'ECO-101',
      title: 'Engineering Economics',
      description: 'Cost Benefit Analysis Case Study.',
      dueDate: 'Oct 28, 5:00 PM',
      dueLabel: 'PENDING',
      maxScore: 50,
      format: '',
      urgent: false,
      image: '/api/placeholder/300/200'
    }
  ];

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Assignments</h1>
            <p className="text-gray-600 mt-1">Spring Semester 2024</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <FaPlus />
            New Submission
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const iconColors = {
              orange: 'bg-orange-100 text-orange-600',
              green: 'bg-green-100 text-green-600',
              blue: 'bg-blue-100 text-blue-600'
            };

            const icons = {
              orange: '⚠️',
              green: '✓',
              blue: '⭐'
            };

            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">{stat.label}</p>
                    <h3 className="text-4xl font-bold text-gray-800 mt-2">{stat.value}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${iconColors[stat.color]}`}>
                    {icons[stat.color]}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{stat.subtitle}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200 px-6">
            <div className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 border-b-2 font-medium transition flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Pending Tab Content */}
          {activeTab === 'pending' && (
            <div className="p-6">
              <div className="space-y-4">
                {pendingAssignments.map((assignment, index) => (
                  <div key={index} className={`border-l-4 ${
                    assignment.urgent ? 'border-orange-500 bg-orange-50' : 'border-blue-500 bg-white'
                  } rounded-lg overflow-hidden hover:shadow-md transition`}>
                    <div className="flex">
                      <div className="w-64 h-48 bg-gray-900 flex-shrink-0 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-6xl mb-2">💻</div>
                            <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold">
                              {assignment.course}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                assignment.urgent 
                                  ? 'bg-orange-500 text-white' 
                                  : 'bg-gray-200 text-gray-700'
                              }`}>
                                {assignment.dueLabel}
                              </span>
                              <span className="text-sm text-gray-600">{assignment.course}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{assignment.title}</h3>
                            <p className="text-gray-600 mb-4">{assignment.description}</p>
                          </div>
                          <span className="text-right ml-4">
                            <p className="text-sm text-gray-600">Max Score</p>
                            <p className="text-2xl font-bold text-gray-800">{assignment.maxScore} pts</p>
                          </span>
                        </div>

                        <div className="flex items-center gap-6 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{assignment.dueDate}</span>
                          </div>
                          {assignment.format && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              <span>{assignment.format}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2">
                            <FaUpload />
                            Upload Solution
                          </button>
                          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium">
                            View Details →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submitted Tab */}
          {activeTab === 'submitted' && (
            <div className="p-6">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No submitted assignments to show</h3>
                <p className="text-gray-600">Your submitted assignments will appear here</p>
              </div>
            </div>
          )}

          {/* Evaluated Tab */}
          {activeTab === 'evaluated' && (
            <div className="p-6">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No evaluated assignments yet</h3>
                <p className="text-gray-600">Graded assignments will appear here</p>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">RECENT ACTIVITY</h3>
          <div className="space-y-3">
            <p className="text-gray-600 text-sm">No recent activity to display</p>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Assignments;
