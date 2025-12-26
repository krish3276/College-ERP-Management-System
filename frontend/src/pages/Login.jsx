import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaChalkboardTeacher, FaUserFriends, FaUserShield, FaEye, FaEyeSlash } from 'react-icons/fa';
import { adminLogin, teacherLogin, studentLogin, parentLogin, saveUserData } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const roles = [
    { id: 'student', label: 'Student', icon: FaUser },
    { id: 'teacher', label: 'Teacher', icon: FaChalkboardTeacher },
    { id: 'parent', label: 'Parent', icon: FaUserFriends },
    { id: 'admin', label: 'Admin', icon: FaUserShield }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      
      switch(selectedRole) {
        case 'admin':
          response = await adminLogin(formData.username, formData.password);
          break;
        case 'teacher':
          response = await teacherLogin(formData.username, formData.password);
          break;
        case 'student':
          response = await studentLogin(formData.username, formData.password);
          break;
        case 'parent':
          response = await parentLogin(formData.username, formData.password);
          break;
        default:
          throw new Error('Invalid role selected');
      }

      if (response.success) {
        // Save token and user data
        saveUserData(response.token, response.user);
        
        // Navigate to dashboard
        navigate(`/${selectedRole}/dashboard`);
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    switch(selectedRole) {
      case 'student':
        return 'Enter Enrollment No. e.g. STU2024001';
      case 'teacher':
        return 'Enter your email';
      case 'admin':
        return 'Enter your email';
      case 'parent':
        return 'Enter your username';
      default:
        return 'Enter your ID';
    }
  };

  const getPasswordPlaceholder = () => {
    switch(selectedRole) {
      case 'student':
        return 'Enter DOB (YYYY-MM-DD)';
      default:
        return '••••••••';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <FaUserShield className="text-white text-xl" />
          </div>
          <span className="text-xl font-bold text-gray-800">College ERP</span>
        </div>
        <div className="text-sm text-gray-600">
          Need help? <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl flex bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Left Side - Branding */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-12 flex-col justify-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
              <div className="absolute bottom-20 right-10 w-48 h-48 border-4 border-white rounded-lg transform rotate-45"></div>
              <div className="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-block bg-blue-500 bg-opacity-40 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
                <span className="text-white text-sm font-semibold flex items-center gap-2">
                  <FaUserShield />
                  TRUSTED EDUCATION PLATFORM
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Manage your<br />
                college life<br />
                seamlessly.
              </h1>

              <p className="text-blue-100 text-lg leading-relaxed">
                Complete academic management system for offline engineering college.
                Streamline student records, attendance, marks, assignments, and communication
                all in one place.
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600 mb-8">Please select your role and sign in to continue.</p>

              <form onSubmit={handleSubmit}>
                {/* Role Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    I AM A...
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {roles.map((role) => {
                      const Icon = role.icon;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => handleRoleSelect(role.id)}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                            selectedRole === role.id
                              ? 'border-blue-600 bg-blue-50 text-blue-600'
                              : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300'
                          }`}
                        >
                          <Icon className="text-2xl" />
                          <span className="text-xs font-medium">{role.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Username Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username or ID
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder={getPlaceholder()}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {selectedRole === 'student' ? 'Date of Birth' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={selectedRole === 'student' ? 'date' : (showPassword ? 'text' : 'password')}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder={getPasswordPlaceholder()}
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                    {selectedRole !== 'student' && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <span>→</span>
                    </>
                  )}
                </button>

                {/* Contact Admin Link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                  Don't have an account?{' '}
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    Contact Admin
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-4 px-6 text-center text-sm text-gray-600 border-t">
        © 2024 College ERP Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
