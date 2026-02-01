import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, Home, Users, Briefcase, UserPlus, MessageSquare, FileText, BarChart3 } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Home className="w-6 h-6 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">Alumni Platform</span>
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/alumni"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md"
              >
                <Users className="w-4 h-4" />
                <span>Alumni</span>
              </Link>

              <Link
                to="/jobs"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md"
              >
                <Briefcase className="w-4 h-4" />
                <span>Jobs</span>
              </Link>

              <Link
                to="/mentorship"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md"
              >
                <UserPlus className="w-4 h-4" />
                <span>Mentorship</span>
              </Link>

              <Link
                to="/referrals"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Referrals</span>
              </Link>

              <Link
                to="/interviews"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md"
              >
                <FileText className="w-4 h-4" />
                <span>Interviews</span>
              </Link>

              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Admin</span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700">
              <span className="font-medium">{user?.firstName} {user?.lastName}</span>
              <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs">
                {user?.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-700 hover:text-red-600 px-3 py-2 rounded-md"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
