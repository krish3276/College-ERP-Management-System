import { useState } from 'react';
import ParentLayout from '../../components/layouts/ParentLayout';
import { FaSearch, FaEnvelope, FaComment, FaFilter } from 'react-icons/fa';

const Directory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = ['All', 'Mathematics', 'Science', 'English', 'History', 'Arts', 'Physical Ed'];

  const teachers = [
    {
      name: 'Mr. James Davis',
      photo: 'JD',
      dept: 'Mathematics',
      subject: 'Algebra I, Geometry',
      email: 'j.davis@school.edu',
      phone: '+1-234-567-8901',
      office: 'Room 302',
      hours: 'Mon-Fri: 3:00 PM - 4:00 PM'
    },
    {
      name: 'Mrs. Emily Smith',
      photo: 'ES',
      dept: 'History',
      subject: 'World History, U.S. History',
      email: 'e.smith@school.edu',
      phone: '+1-234-567-8902',
      office: 'Room 205',
      hours: 'Mon-Wed-Fri: 2:30 PM - 3:30 PM'
    },
    {
      name: 'Mr. Robert Lee',
      photo: 'RL',
      dept: 'Science',
      subject: 'Biology, Chemistry',
      email: 'r.lee@school.edu',
      phone: '+1-234-567-8903',
      office: 'Science Lab 1',
      hours: 'Tue-Thu: 3:00 PM - 4:30 PM'
    },
    {
      name: 'Ms. Lisa Connor',
      photo: 'LC',
      dept: 'English',
      subject: 'English Literature, Creative Writing',
      email: 'l.connor@school.edu',
      phone: '+1-234-567-8904',
      office: 'Room 108',
      hours: 'Mon-Fri: 2:45 PM - 3:45 PM'
    },
    {
      name: 'Mr. John Martinez',
      photo: 'JM',
      dept: 'Physical Ed',
      subject: 'Physical Education, Health',
      email: 'j.martinez@school.edu',
      phone: '+1-234-567-8905',
      office: 'Gymnasium Office',
      hours: 'Mon-Wed-Fri: 4:00 PM - 5:00 PM'
    },
    {
      name: 'Mrs. Susan Taylor',
      photo: 'ST',
      dept: 'Arts',
      subject: 'Visual Arts, Music',
      email: 's.taylor@school.edu',
      phone: '+1-234-567-8906',
      office: 'Art Room',
      hours: 'Tue-Thu: 3:15 PM - 4:15 PM'
    }
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesDept = selectedDept === 'All' || teacher.dept === selectedDept;
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          teacher.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <ParentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Teacher Directory</h1>
          <p className="text-gray-600 mt-1">View and contact your child's teachers.</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by teacher name or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-w-[200px]"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-gray-600">
          Showing {filteredTeachers.length} of {teachers.length} teachers
        </div>

        {/* Teacher Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
              {/* Photo and Name */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl flex-shrink-0">
                  {teacher.photo}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 text-lg">{teacher.name}</h3>
                  <p className="text-sm text-gray-600">{teacher.dept}</p>
                </div>
              </div>

              {/* Subject Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  {teacher.subject}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 font-medium min-w-[60px]">Email:</span>
                  <a href={`mailto:${teacher.email}`} className="text-blue-600 hover:underline break-all">
                    {teacher.email}
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 font-medium min-w-[60px]">Phone:</span>
                  <span className="text-gray-800">{teacher.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 font-medium min-w-[60px]">Office:</span>
                  <span className="text-gray-800">{teacher.office}</span>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-xs font-semibold text-gray-600 mb-1">Office Hours</p>
                <p className="text-sm text-gray-800">{teacher.hours}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                  <FaEnvelope />
                  Email
                </button>
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
                  <FaComment />
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Teachers Found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </ParentLayout>
  );
};

export default Directory;
