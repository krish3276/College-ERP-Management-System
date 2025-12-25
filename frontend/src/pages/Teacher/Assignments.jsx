import { useState } from 'react';
import TeacherLayout from '../../components/layouts/TeacherLayout';
import { FaPlus, FaFileAlt, FaClock, FaChartBar, FaDownload, FaEye, FaEdit } from 'react-icons/fa';

const Assignments = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const stats = [
    { label: 'Total Submissions', value: '45', change: '+12% vs last week', positive: true, icon: FaFileAlt },
    { label: 'Pending Review', value: '12', change: 'Requires immediate attention', alert: true, icon: FaClock },
    { label: 'Average Score', value: '88%', change: '', icon: FaChartBar }
  ];

  const assignments = [
    {
      id: 1,
      subject: 'CS101 - Intro to CS',
      title: 'Assignment #1',
      dueDate: 'Oct 24, 2023',
      submissions: 45,
      pending: 12,
      avgScore: 88
    },
    {
      id: 2,
      subject: 'CS202 - Data Structures',
      title: 'Lab Report',
      dueDate: 'Oct 22, 2023',
      submissions: 28,
      pending: 5,
      avgScore: 92
    }
  ];

  const submissions = [
    {
      student: 'Alice Johnson',
      submittedAt: 'Oct 24, 2:30 PM',
      status: 'On Time',
      score: null,
      avatar: 'AJ'
    },
    {
      student: 'Bob Williams',
      submittedAt: 'Oct 23, 5:45 PM',
      status: 'On Time',
      score: 85,
      avatar: 'BW'
    },
    {
      student: 'Carol Davis',
      submittedAt: 'Oct 25, 1:20 AM',
      status: 'Late',
      score: null,
      avatar: 'CD'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'submissions', label: 'Submissions List' },
    { id: 'grading', label: 'Grading Interface' }
  ];

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span>Subjects</span>
              <span>/</span>
              <span>CS101 - Intro to CS</span>
              <span>/</span>
              <span>Assignments</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Assignment Management</h1>
            <p className="text-gray-600 mt-1">Manage assignments, track submissions, and grade student work for CS101.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <FaFileAlt />
              Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <FaPlus />
              Create Assignment
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <h3 className="text-4xl font-bold text-gray-800 mt-2">{stat.value}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    stat.alert ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Icon className="text-xl" />
                  </div>
                </div>
                {stat.change && (
                  <p className={`text-sm font-medium ${
                    stat.positive ? 'text-green-600' : stat.alert ? 'text-orange-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </p>
                )}
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
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 border-b-2 font-medium transition ${
                    selectedTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="p-6">
              <h3 className="font-bold text-gray-800 mb-4">All Assignments</h3>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {assignment.subject}
                          </span>
                          <h4 className="font-bold text-gray-800">{assignment.title}</h4>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <span className="flex items-center gap-2">
                            <FaClock className="text-gray-400" />
                            Due: {assignment.dueDate}
                          </span>
                          <span>Submissions: {assignment.submissions}</span>
                          <span className="text-orange-600 font-medium">Pending: {assignment.pending}</span>
                          <span className="text-green-600 font-medium">Avg: {assignment.avgScore}%</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          View Details
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                          <FaEdit />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submissions Tab */}
          {selectedTab === 'submissions' && (
            <div className="p-6">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Student</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Submitted At</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Score</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                            {submission.avatar}
                          </div>
                          <span className="font-medium text-gray-800">{submission.student}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{submission.submittedAt}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          submission.status === 'On Time'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {submission.score ? (
                          <span className="font-bold text-blue-600">{submission.score}%</span>
                        ) : (
                          <span className="text-gray-400 italic">Not graded</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                            View
                          </button>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            Grade
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Grading Interface Tab */}
          {selectedTab === 'grading' && (
            <div className="p-6">
              <div className="grid grid-cols-3 gap-6">
                {/* Student Submission Preview */}
                <div className="col-span-2 border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                        AJ
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">Alice Johnson</p>
                        <p className="text-sm text-gray-600">Submitted Oct 24, 2:30 PM • On Time</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <FaDownload />
                      </button>
                    </div>
                  </div>

                  {/* Document Preview Placeholder */}
                  <div className="bg-gray-100 rounded-lg p-12 text-center mb-4">
                    <FaFileAlt className="text-gray-400 text-6xl mx-auto mb-4" />
                    <p className="text-gray-600">Assignment Document Preview</p>
                  </div>
                </div>

                {/* Evaluation Panel */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-4">Evaluation</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">RUBRIC</label>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-700">Clarity & Structure</span>
                            <span className="text-sm font-bold text-blue-600">8/10</span>
                          </div>
                          <input type="range" min="0" max="10" defaultValue="8" className="w-full" />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-700">Technical Accuracy</span>
                            <span className="text-sm font-bold text-blue-600">18/20</span>
                          </div>
                          <input type="range" min="0" max="20" defaultValue="18" className="w-full" />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-700">Citation Quality</span>
                            <span className="text-sm font-bold text-blue-600">4/5</span>
                          </div>
                          <input type="range" min="0" max="5" defaultValue="4" className="w-full" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-2">PROFESSOR COMMENTS</label>
                      <textarea
                        placeholder="Write feedback for the student..."
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                          Quick: Good
                        </button>
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Quick: Check
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </TeacherLayout>
  );
};

export default Assignments;
