import { useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import { FaPlus, FaBook, FaAward, FaFilter, FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';

const SubjectManagement = () => {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const subjectStats = [
    { label: 'Total Subjects', value: '6', icon: FaBook, color: 'blue' },
    { label: 'Total Credits', value: '24', icon: FaAward, color: 'green' },
    { label: 'Faculty Assigned', value: '5/6', icon: FaUserPlus, color: 'orange', progress: 83 }
  ];

  const subjects = [
    {
      name: 'Engineering Mathematics I',
      code: 'MAT101',
      credits: 4.0,
      type: 'Core',
      teacher: { name: 'Prof. Alan Smith', qualification: 'PhD, Mathematics', avatar: 'AS' }
    },
    {
      name: 'Applied Physics',
      code: 'PHY102',
      credits: 3.0,
      type: 'Core',
      teacher: null
    },
    {
      name: 'Computer Science Basics',
      code: 'CS101',
      credits: 4.0,
      type: 'Elective',
      teacher: { name: 'Dr. Jane Doe', qualification: 'M.Tech, CS', avatar: 'JD' }
    },
    {
      name: 'Communication Skills',
      code: 'ENG105',
      credits: 2.0,
      type: 'Humanities',
      teacher: { name: 'Mr. Robert White', qualification: 'MA, English', avatar: 'RW' }
    },
    {
      name: 'Engineering Drawing',
      code: 'MEC103',
      credits: 3.0,
      type: 'Core',
      teacher: { name: 'Mrs. Sarah Khan', qualification: 'M.Arch', avatar: 'SK' }
    },
    {
      name: 'Basic Electronics',
      code: 'ECE104',
      credits: 4.0,
      type: 'Core',
      teacher: { name: 'Mr. Mike Lee', qualification: 'PhD, Electronics', avatar: 'ML' }
    }
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
              <span>Academics</span>
              <span>/</span>
              <span>Semesters</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Semester & Subject Management</h1>
            <p className="text-gray-600 mt-1">Configure curriculum and assign faculty members to subjects.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <FaPlus />
              Add Semester
            </button>
            <button 
              onClick={() => setShowAddSubjectModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <FaBook />
              Add Subject
            </button>
          </div>
        </div>

        {/* Semester Tabs */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 overflow-x-auto">
            {semesters.map((sem) => (
              <button
                key={sem}
                onClick={() => setSelectedSemester(sem)}
                className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                  selectedSemester === sem
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Semester {sem}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjectStats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600',
              green: 'bg-green-100 text-green-600',
              orange: 'bg-orange-100 text-orange-600'
            };

            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
                    <Icon className="text-xl" />
                  </div>
                </div>
                {stat.progress && (
                  <div className="mt-3">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-500 rounded-full transition-all duration-500"
                        style={{ width: `${stat.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Subject List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Subject List</h2>
            <button className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition">
              <FaFilter />
              Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Subject Name & Code</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Credits</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Type</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Assigned Teacher</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-800">{subject.name}</p>
                        <p className="text-sm text-gray-500">{subject.code}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{subject.credits}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        subject.type === 'Core' 
                          ? 'bg-green-100 text-green-700'
                          : subject.type === 'Elective'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {subject.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {subject.teacher ? (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm">
                            {subject.teacher.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">{subject.teacher.name}</p>
                            <p className="text-xs text-gray-500">{subject.teacher.qualification}</p>
                          </div>
                        </div>
                      ) : (
                        <button className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg text-sm">
                          <FaUserPlus />
                          Assign Teacher
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition">
                          <FaEdit />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing 6 subjects</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SubjectManagement;
