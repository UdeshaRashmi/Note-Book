import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

const Login = ({ setAuth, fetchUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/auth/login', {
        email,
        password
      });
      
      localStorage.setItem('token', response.data.token);
      await fetchUser();
      navigate('/');
      
    } catch (err) {
      setError(err.response?.data?.msg || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-olive-100 to-emerald-100 rounded-2xl mb-4 shadow-lg">
            <LogIn className="w-8 h-8 text-olive-700" />
          </div>
          <h2 className="text-3xl font-bold text-olive-900 mb-2">Welcome Back</h2>
          <p className="text-olive-600">Sign in to continue to your notebook</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-olive-100">
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <label className="block text-sm font-semibold text-olive-800 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-olive-400" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-olive-50 border-2 border-olive-100 rounded-xl focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none transition-all duration-300 text-olive-900 placeholder-olive-400"
                    required
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="relative">
                <label className="block text-sm font-semibold text-olive-800 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-olive-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 bg-olive-50 border-2 border-olive-100 rounded-xl focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none transition-all duration-300 text-olive-900 placeholder-olive-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-olive-400 hover:text-olive-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
                  loading 
                    ? 'bg-olive-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-olive-600 to-emerald-600 hover:from-olive-700 hover:to-emerald-700'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <LogIn className="w-5 h-5 mr-3" />
                    Sign In
                  </div>
                )}
              </button>
            </form>
            
            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-olive-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-olive-500">New to Notebook Pro?</span>
              </div>
            </div>
            
            {/* Register Link */}
            <div className="text-center">
              <Link 
                to="/register" 
                className="inline-flex items-center text-olive-700 hover:text-olive-900 font-semibold transition-colors duration-300 group"
              >
                Create an account
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-olive-50 px-8 py-4 border-t border-olive-100">
            <p className="text-center text-sm text-olive-600">
              By signing in, you agree to our{' '}
              <a href="#" className="text-olive-700 hover:text-olive-900 font-medium">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-olive-700 hover:text-olive-900 font-medium">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;