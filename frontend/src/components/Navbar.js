import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, User, Home } from 'lucide-react';

const Navbar = ({ isAuthenticated, setAuth, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/login');
  };

  return (
    <nav className="z-50 bg-gradient-to-r from-olive-700 to-olive-800 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-3 group">
            <div className="bg-olive-100 p-2 rounded-full group-hover:bg-olive-200 transition-all duration-300">
              <BookOpen className="w-8 h-8 text-olive-800" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Notebook Pro</h1>
              <p className="text-olive-200 text-sm">Your digital thoughts, organized</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-4 bg-olive-600/30 backdrop-blur-sm px-4 py-2 rounded-full border border-olive-500/30">
                  <div className="w-8 h-8 bg-olive-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-olive-800" />
                  </div>
                  <div className="hidden md:block">
                    <p className="text-white font-medium text-sm">{user?.name || 'User'}</p>
                    <p className="text-olive-200 text-xs">{user?.email || ''}</p>
                  </div>
                </div>
                
                <Link 
                  to="/home" 
                  className="flex items-center space-x-2 text-olive-100 hover:text-white px-4 py-2 rounded-lg hover:bg-olive-600/50 transition-all duration-300"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Home</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-5 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span className="font-semibold">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-olive-100 hover:text-white px-5 py-2.5 rounded-lg border-2 border-olive-500 hover:border-olive-400 transition-all duration-300 font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register"
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;