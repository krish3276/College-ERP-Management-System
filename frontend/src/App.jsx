import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import StudentManagement from './pages/Admin/StudentManagement';
import TeacherManagement from './pages/Admin/TeacherManagement';
import SubjectManagement from './pages/Admin/SubjectManagement';
import TimetableManagement from './pages/Admin/TimetableManagement';
import MarksManagement from './pages/Admin/MarksManagement';
import ReportsAnalytics from './pages/Admin/ReportsAnalytics';
import ParentManagement from './pages/Admin/ParentManagement';
import TeacherDashboard from './pages/Teacher/Dashboard';
import MySubjects from './pages/Teacher/MySubjects';
import StudyMaterials from './pages/Teacher/StudyMaterials';
import TeacherAssignments from './pages/Teacher/Assignments';
import Gradebook from './pages/Teacher/Gradebook';
import TeacherSchedule from './pages/Teacher/Schedule';
import TeacherMessages from './pages/Teacher/Messages';
import StudentDashboard from './pages/Student/Dashboard';
import MyCourses from './pages/Student/MyCourses';
import CourseDetails from './pages/Student/CourseDetails';
import Library from './pages/Student/Library';
import StudentAssignments from './pages/Student/Assignments';
import Grades from './pages/Student/Grades';
import AIAssistant from './pages/Student/AIAssistant';
import StudentSchedule from './pages/Student/Schedule';
import StudentMessages from './pages/Student/Messages';
import ParentDashboard from './pages/Parent/Dashboard';
import ParentGrades from './pages/Parent/Grades';
import ParentAttendance from './pages/Parent/Attendance';
import ParentCalendar from './pages/Parent/Calendar';
import ParentMessages from './pages/Parent/Messages';
import ParentDirectory from './pages/Parent/Directory';
import ParentSettings from './pages/Parent/Settings';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<StudentManagement />} />
          <Route path="/admin/teachers" element={<TeacherManagement />} />
          <Route path="/admin/subjects" element={<SubjectManagement />} />
          <Route path="/admin/timetable" element={<TimetableManagement />} />
          <Route path="/admin/marks" element={<MarksManagement />} />
          <Route path="/admin/reports" element={<ReportsAnalytics />} />
          <Route path="/admin/parents" element={<ParentManagement />} />
          
          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/subjects" element={<MySubjects />} />
          <Route path="/teacher/materials" element={<StudyMaterials />} />
          <Route path="/teacher/assignments" element={<TeacherAssignments />} />
          <Route path="/teacher/gradebook" element={<Gradebook />} />
          <Route path="/teacher/schedule" element={<TeacherSchedule />} />
          <Route path="/teacher/messages" element={<TeacherMessages />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/courses" element={<MyCourses />} />
          <Route path="/student/course/:code" element={<CourseDetails />} />
          <Route path="/student/library" element={<Library />} />
          <Route path="/student/assignments" element={<StudentAssignments />} />
          <Route path="/student/grades" element={<Grades />} />
          <Route path="/student/ai-assistant" element={<AIAssistant />} />
          <Route path="/student/schedule" element={<StudentSchedule />} />
          <Route path="/student/messages" element={<StudentMessages />} />
          
          {/* Parent Routes */}
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
          <Route path="/parent/grades" element={<ParentGrades />} />
          <Route path="/parent/attendance" element={<ParentAttendance />} />
          <Route path="/parent/calendar" element={<ParentCalendar />} />
          <Route path="/parent/messages" element={<ParentMessages />} />
          <Route path="/parent/directory" element={<ParentDirectory />} />
          <Route path="/parent/settings" element={<ParentSettings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
