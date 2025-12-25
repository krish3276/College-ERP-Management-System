import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  College ERP Management System
                </h1>
                <p className="text-gray-600 mb-6">
                  Offline College Management System for Academic Administration
                </p>
                <div className="flex gap-4 justify-center">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Admin Login
                  </button>
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    Teacher Login
                  </button>
                  <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    Student Login
                  </button>
                  <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
                    Parent Login
                  </button>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
