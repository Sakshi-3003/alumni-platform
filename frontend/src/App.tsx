import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AlumniDirectory from './pages/AlumniDirectory';
import JobBoard from './pages/JobBoard';
import Mentorship from './pages/Mentorship';
import Referrals from './pages/Referrals';
import InterviewExperiences from './pages/InterviewExperiences';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/register"
            element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/alumni"
            element={isAuthenticated ? <AlumniDirectory /> : <Navigate to="/login" />}
          />
          <Route
            path="/jobs"
            element={isAuthenticated ? <JobBoard /> : <Navigate to="/login" />}
          />
          <Route
            path="/mentorship"
            element={isAuthenticated ? <Mentorship /> : <Navigate to="/login" />}
          />
          <Route
            path="/referrals"
            element={isAuthenticated ? <Referrals /> : <Navigate to="/login" />}
          />
          <Route
            path="/interviews"
            element={isAuthenticated ? <InterviewExperiences /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={
              isAuthenticated && user?.role === 'admin' ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
