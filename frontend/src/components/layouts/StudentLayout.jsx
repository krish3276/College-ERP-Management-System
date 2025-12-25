import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTh, FaBook, FaCalendarAlt, FaChartBar, FaMoneyBillWave, FaBookReader, FaRobot, FaCog, FaSignOutAlt, FaBell, FaSearch, FaEnvelope } from 'react-icons/fa';

const StudentLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/student/dashboard', icon: FaTh, label: 'Dashboard' },
    { path: '/student/courses', icon: FaBook, label: 'My Courses' },
    { path: '/student/schedule', icon: FaCalendarAlt, label: 'Schedule' },
    { path: '/student/library', icon: FaBookReader, label: 'Library' },
    { path: '/student/assignments', icon: FaBook, label: 'Assignments' },
    { path: '/student/grades', icon: FaChartBar, label: 'Grades & Results' },
    { path: '/student/ai-assistant', icon: FaRobot, label: 'AI Assistant' },
    { path: '/student/fees', icon: FaMoneyBillWave, label: 'Fees' },
    { path: '/student/messages', icon: FaEnvelope, label: 'Messages' },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              🎓
            </div>
            {isSidebarOpen && (
              <div>
                <h2 className="font-bold text-gray-800">Student Portal</h2>
                <p className="text-xs text-gray-500">Engineering Dept</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="text-xl flex-shrink-0" />
                    {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Menu */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => navigate('/student/settings')}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition w-full mb-2"
          >
            <FaCog className="text-xl" />
            {isSidebarOpen && <span className="font-medium">Settings</span>}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition w-full"
          >
            <FaSignOutAlt className="text-xl" />
            {isSidebarOpen && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="relative flex-1 max-w-md">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <FaBell className="text-xl text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <FaEnvelope className="text-xl text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="font-semibold text-gray-800">Alex Johnson</p>
                  <p className="text-xs text-gray-500">B.Tech CS</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <img src="/api/placeholder/40/40" alt="Profile" className="rounded-full" />
                </div>
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

export default StudentLayout;
