import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaHome, FaUsers, FaChalkboardTeacher, FaBook, FaCalendarAlt, 
  FaGraduationCap, FaChartBar, FaUserFriends, FaCog, FaBell,
  FaSearch, FaSignOutAlt, FaBars, FaTimes 
} from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { 
      section: 'MAIN',
      items: [
        { path: '/admin/dashboard', label: 'Dashboard', icon: FaHome }
      ]
    },
    {
      section: 'ACADEMIC',
      items: [
        { path: '/admin/students', label: 'Students', icon: FaUsers },
        { path: '/admin/teachers', label: 'Teachers', icon: FaChalkboardTeacher },
        { path: '/admin/subjects', label: 'Subjects', icon: FaBook },
        { path: '/admin/grades', label: 'Grades', icon: FaGraduationCap }
      ]
    },
    {
      section: 'MANAGEMENT',
      items: [
        { path: '/admin/timetable', label: 'Timetable', icon: FaCalendarAlt },
        { path: '/admin/marks', label: 'Marks & Results', icon: FaChartBar },
        { path: '/admin/parents', label: 'Parents', icon: FaUserFriends },
        { path: '/admin/reports', label: 'Reports', icon: FaChartBar }
      ]
    },
    {
      section: 'SYSTEM',
      items: [
        { path: '/admin/settings', label: 'Settings', icon: FaCog }
      ]
    }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FaGraduationCap className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="font-bold text-gray-800">College Admin</h1>
                  <p className="text-xs text-gray-500">Admin Portal</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </>
          ) : (
            <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-700 mx-auto">
              <FaBars />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-6">
              {sidebarOpen && (
                <h3 className="text-xs font-semibold text-gray-400 mb-3 px-3">
                  {section.section}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      title={!sidebarOpen ? item.label : ''}
                    >
                      <Icon className="text-lg flex-shrink-0" />
                      {sidebarOpen && <span className="font-medium">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Info / Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors"
          >
            <FaSignOutAlt className="text-lg" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students, staff..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <FaBell className="text-xl" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">Administrator</p>
                <p className="text-xs text-gray-500">System Admin</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
