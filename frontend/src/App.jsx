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
import Assignments from './pages/Teacher/Assignments';
import Gradebook from './pages/Teacher/Gradebook';
import Schedule from './pages/Teacher/Schedule';
import Messages from './pages/Teacher/Messages';
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
          <Route path="/teacher/assignments" element={<Assignments />} />
          <Route path="/teacher/gradebook" element={<Gradebook />} />
          <Route path="/teacher/schedule" element={<Schedule />} />
          <Route path="/teacher/messages" element={<Messages />} />
          
          {/* Student Routes will be added here */}
          {/* Parent Routes will be added here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
