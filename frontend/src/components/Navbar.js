import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BookOpen, LogOut, User, Home, FilePlus2, FileText, NotebookPen, Menu, X } from "lucide-react";

const Navbar = ({ isAuthenticated, setAuth, user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? "bg-olive-600/50 text-white" : "text-olive-100 hover:text-white";
  };

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="z-50 bg-gradient-to-r from-olive-700 to-olive-800 shadow-xl fixed w-full top-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-3 group">
            <div className="bg-olive-100 p-2 rounded-full group-hover:bg-olive-200 transition-all duration-300">
              <BookOpen className="w-8 h-8 text-olive-800" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-white tracking-tight">Notebook Pro</h1>
              <p className="text-olive-200 text-sm">Your digital thoughts, organized</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-xl font-bold text-white">Notebook Pro</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="flex items-center space-x-4 bg-olive-600/30 backdrop-blur-sm px-4 py-2 rounded-full border border-olive-500/30">
                  <div className="w-8 h-8 bg-olive-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-olive-800" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{user?.name || "User"}</p>
                    <p className="text-olive-200 text-xs truncate max-w-[120px]">{user?.email || ""}</p>
                  </div>
                </div>

                {/* Dashboard */}
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-olive-600/50 transition-all duration-300 ${isActive("/dashboard")}`}
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>

                {/* Notes */}
                <Link
                  to="/notes"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-olive-600/50 transition-all duration-300 ${isActive("/notes")}`}
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">My Notes</span>
                </Link>

                {/* Add Note */}
                <Link
                  to="/add-note"
                  className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <FilePlus2 className="w-5 h-5" />
                  <span className="font-semibold">Add Note</span>
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-5 py-2.5 rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-semibold">Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Public Links */}
                <Link
                  to="/home"
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${isActive("/home")}`}
                >
                  Home
                </Link>

                <Link
                  to="/about"
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${isActive("/about")}`}
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${isActive("/contact")}`}
                >
                  Contact
                </Link>

                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${isActive("/login")}`}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-olive-600/50 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-gradient-to-r from-olive-800 to-olive-900 shadow-xl border-t border-olive-600">
            <div className="px-4 py-6 space-y-4">
              {isAuthenticated ? (
                <>
                  {/* User Info Mobile */}
                  <div className="flex items-center space-x-3 p-3 bg-olive-600/30 rounded-lg">
                    <div className="w-10 h-10 bg-olive-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-olive-800" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{user?.name || "User"}</p>
                      <p className="text-olive-200 text-xs truncate">{user?.email || ""}</p>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <Link
                    to="/dashboard"
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive("/dashboard")}`}
                  >
                    <Home className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    to="/notes"
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive("/notes")}`}
                  >
                    <FileText className="w-5 h-5" />
                    <span>My Notes</span>
                  </Link>

                  <Link
                    to="/add-note"
                    className="flex items-center space-x-3 p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <FilePlus2 className="w-5 h-5" />
                    <span className="font-semibold">Add Note</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-3 p-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all mt-4"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-semibold">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  {/* Public Mobile Links */}
                  <Link
                    to="/home"
                    className={`block p-3 rounded-lg transition-colors ${isActive("/home")}`}
                  >
                    Home
                  </Link>

                  <Link
                    to="/about"
                    className={`block p-3 rounded-lg transition-colors ${isActive("/about")}`}
                  >
                    About
                  </Link>

                  <Link
                    to="/contact"
                    className={`block p-3 rounded-lg transition-colors ${isActive("/contact")}`}
                  >
                    Contact
                  </Link>

                  <div className="pt-4 border-t border-olive-600 space-y-3">
                    <Link
                      to="/login"
                      className="block p-3 text-center border border-olive-400 text-olive-100 rounded-lg hover:bg-olive-600/50 transition-colors"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="block p-3 text-center bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;