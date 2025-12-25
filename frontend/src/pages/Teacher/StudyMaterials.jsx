import { useState } from 'react';
import TeacherLayout from '../../components/layouts/TeacherLayout';
import { FaPlus, FaUpload, FaFilePdf, FaFileWord, FaLink, FaDownload, FaTrash, FaSearch } from 'react-icons/fa';

const StudyMaterials = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const categories = ['All', 'Mathematics', 'Physics', 'History'];

  const materials = [
    {
      title: 'Advanced Calculus Notes: Chapter 4',
      type: 'PDF',
      size: '2.4 MB',
      subject: 'Mathematics 101',
      date: 'Oct 24, 2023',
      icon: FaFilePdf,
      color: 'red'
    },
    {
      title: "Newton's Laws of Motion - Presentation",
      type: 'PPTX',
      size: '13.1 MB',
      subject: 'Physics 202',
      date: 'Oct 22, 2023',
      icon: FaFileWord,
      color: 'orange'
    },
    {
      title: 'External Resource: Khan Academy...',
      type: 'URL Link',
      size: null,
      subject: 'History',
      date: 'Oct 20, 2023',
      icon: FaLink,
      color: 'blue'
    },
    {
      title: 'Homework Assignment Sheet #3',
      type: 'DOCX',
      size: '540 KB',
      subject: 'Mathematics 101',
      date: 'Oct 18, 2023',
      icon: FaFileWord,
      color: 'blue'
    }
  ];

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Study Material Management</h1>
            <p className="text-gray-600 mt-1">Upload and manage subject resources for your students.</p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <FaUpload className="text-blue-600 text-xl" />
            <h2 className="text-lg font-bold text-gray-800">Add New Resource</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resource Title</label>
              <input
                type="text"
                placeholder="e.g., Week 4: Calculus Limits"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject / Class</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Select a subject</option>
                <option>Mathematics 101</option>
                <option>Physics 202</option>
                <option>History 301</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition cursor-pointer">
              <FaUpload className="text-gray-400 text-3xl mx-auto mb-3" />
              <p className="text-blue-600 font-medium mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PDF, PPT, DOCX (MAX. 10MB)</p>
            </div>
          </div>

          <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2">
            <FaPlus />
            Upload Material
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search files, subjects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    cat === 'All'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Uploads */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Uploads</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {materials.map((material, index) => {
              const Icon = material.icon;
              const colorClasses = {
                red: 'bg-red-100 text-red-600',
                orange: 'bg-orange-100 text-orange-600',
                blue: 'bg-blue-100 text-blue-600'
              };

              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[material.color]}`}>
                      <Icon className="text-2xl" />
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">⋮</button>
                  </div>

                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{material.title}</h3>
                  
                  {material.size && (
                    <p className="text-sm text-gray-500 mb-2">{material.size} • {material.type}</p>
                  )}
                  {!material.size && (
                    <p className="text-sm text-gray-500 mb-2">{material.type}</p>
                  )}

                  <p className="text-xs text-blue-600 font-medium mb-3">{material.subject}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-xs text-gray-500">{material.date}</span>
                    <div className="flex gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                        <FaDownload />
                      </button>
                      {material.type !== 'URL Link' && (
                        <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded">
                          <FaLink />
                        </button>
                      )}
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default StudyMaterials;
