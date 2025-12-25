import { useState } from 'react';
import StudentLayout from '../../components/layouts/StudentLayout';
import { FaSearch, FaEye, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';

const Library = () => {
  const [selectedSemester, setSelectedSemester] = useState('4');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const recentlyViewed = [
    {
      title: 'Data Structures: Trees',
      subject: 'Computer Science',
      unit: 'Unit 3',
      progress: 75,
      type: 'pdf',
      icon: '📄',
      color: 'red'
    },
    {
      title: 'Thermodynamics Basics',
      subject: 'Physics',
      unit: 'Lecture 02',
      progress: 25,
      type: 'ppt',
      icon: '📊',
      color: 'orange'
    },
    {
      title: 'MIT OpenCourseWare ...',
      subject: 'Mathematics',
      unit: 'External',
      progress: 0,
      type: 'link',
      icon: '🔗',
      color: 'blue'
    }
  ];

  const subjects = [
    {
      name: 'Computer Science',
      subtitle: 'Data Structures & Algo',
      files: 12,
      icon: '💻',
      color: 'blue'
    },
    {
      name: 'Mathematics',
      subtitle: 'Linear Algebra',
      files: 8,
      icon: 'Σ',
      color: 'purple'
    },
    {
      name: 'Electronics',
      subtitle: 'Digital Logic',
      files: 24,
      icon: '⚡',
      color: 'yellow'
    },
    {
      name: 'Soft Skills',
      subtitle: 'Communication',
      files: 5,
      icon: '💬',
      color: 'pink'
    }
  ];

  const allResources = [
    {
      name: 'Lecture 4: Binary Trees.pdf',
      subject: 'CS - Data Structures',
      date: 'Oct 24, 2023',
      size: '2.4 MB',
      type: 'pdf',
      icon: '📄',
      color: 'red'
    },
    {
      name: 'Unit 2: Circuit Diagrams.ppt',
      subject: 'Electronics',
      date: 'Oct 22, 2023',
      size: '3.1 MB',
      type: 'ppt',
      icon: '📊',
      color: 'orange'
    }
  ];

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Library & Study Materials</h1>
          <p className="text-gray-600">
            Welcome back, Alex
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Find your resources</h2>
          <p className="text-gray-600 mb-6">
            Access lecture notes, textbooks, and reference materials for your current semester.
          </p>
          
          <div className="flex gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for notes, books, or topics..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <select 
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="4">Semester 4</option>
              <option value="3">Semester 3</option>
              <option value="2">Semester 2</option>
              <option value="1">Semester 1</option>
            </select>

            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">Subject</option>
              <option value="cs">Computer Science</option>
              <option value="math">Mathematics</option>
              <option value="electronics">Electronics</option>
            </select>

            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">Type</option>
              <option value="pdf">PDF</option>
              <option value="ppt">PPT</option>
              <option value="video">Video</option>
            </select>

            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Recently Viewed</h3>
            <button className="text-blue-600 hover:underline text-sm">View History</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentlyViewed.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-3 ${
                  item.color === 'red' ? 'bg-red-100' :
                  item.color === 'orange' ? 'bg-orange-100' :
                  'bg-blue-100'
                }`}>
                  {item.icon}
                </div>
                <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{item.subject} • {item.unit}</p>
                
                {item.progress > 0 && (
                  <>
                    <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                      <div 
                        className="bg-blue-600 h-1 rounded-full" 
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">{item.progress}% completed</p>
                  </>
                )}
                {item.type === 'link' && (
                  <button className="text-blue-600 hover:underline text-sm flex items-center gap-1 mt-2">
                    Visit Link
                    <FaExternalLinkAlt className="text-xs" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Browse by Subject */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Browse by Subject</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjects.map((subject, index) => {
              const bgColors = {
                blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
                purple: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
                yellow: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200',
                pink: 'bg-pink-50 hover:bg-pink-100 border-pink-200'
              };

              const textColors = {
                blue: 'text-blue-700',
                purple: 'text-purple-700',
                yellow: 'text-yellow-700',
                pink: 'text-pink-700'
              };

              return (
                <div 
                  key={index} 
                  className={`${bgColors[subject.color]} border rounded-xl p-6 cursor-pointer transition`}
                >
                  <div className="text-3xl mb-3">{subject.icon}</div>
                  <h4 className="font-bold text-gray-800 mb-1">{subject.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{subject.subtitle}</p>
                  <p className={`text-sm font-bold ${textColors[subject.color]}`}>
                    {subject.files} Files
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* All Resources Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">All Resources</h3>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Subject</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Date Uploaded</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allResources.map((resource, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                        resource.color === 'red' ? 'bg-red-100' : 'bg-orange-100'
                      }`}>
                        {resource.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{resource.name}</p>
                        <p className="text-sm text-gray-500">{resource.size}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {resource.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{resource.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                        <FaEye className="text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                        <FaDownload className="text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Library;
