 import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle, Leaf } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-olive-50 via-emerald-50 to-olive-100 flex items-center justify-center p-4">
      {/* Background decorative elements (non-interactive) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-olive-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-olive-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        {/* Leaf pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 rotate-12">
            <Leaf className="w-24 h-24 text-olive-800" />
          </div>
          <div className="absolute bottom-10 right-10 -rotate-12">
            <Leaf className="w-32 h-32 text-olive-800" />
          </div>
          <div className="absolute top-1/3 right-1/4 rotate-45">
            <Leaf className="w-16 h-16 text-olive-800" />
          </div>
          <div className="absolute bottom-1/4 left-1/3 -rotate-45">
            <Leaf className="w-20 h-20 text-olive-800" />
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-olive-500 to-emerald-600 rounded-2xl mb-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <LogIn className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-olive-900 mb-3 tracking-tight">Welcome Back</h2>
          <p className="text-olive-700 text-lg">Sign in to your Notebook Pro</p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border-2 border-white/50">
          <div className="p-8 md:p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border-l-4 border-red-500 rounded-xl">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Email Field */}
              <div className="relative">
                <label className="block text-sm font-semibold text-olive-800 mb-2 pl-1">
                  <span className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address
                  </span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-olive-100 to-emerald-100 rounded-xl transform group-hover:scale-[1.02] transition-transform duration-300"></div>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="relative w-full pl-12 pr-4 py-4 bg-transparent border-2 border-olive-200/50 rounded-xl focus:border-olive-500 focus:ring-2 focus:ring-olive-200/30 outline-none transition-all duration-300 text-olive-900 placeholder-olive-400/70 z-10"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
                    <Mail className="w-5 h-5 text-olive-500" />
                  </div>
                </div>
              </div>
              
              {/* Password Field */}
              <div className="relative">
                <label className="block text-sm font-semibold text-olive-800 mb-2 pl-1">
                  <span className="flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    Password
                  </span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-olive-100 to-emerald-100 rounded-xl transform group-hover:scale-[1.02] transition-transform duration-300"></div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="relative w-full pl-12 pr-12 py-4 bg-transparent border-2 border-olive-200/50 rounded-xl focus:border-olive-500 focus:ring-2 focus:ring-olive-200/30 outline-none transition-all duration-300 text-olive-900 placeholder-olive-400/70 z-10"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
                    <Lock className="w-5 h-5 text-olive-500" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-olive-500 hover:text-olive-700 z-20 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl relative overflow-hidden group ${
                  loading 
                    ? 'bg-olive-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-olive-600 via-olive-700 to-emerald-700'
                }`}
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                {loading ? (
                  <div className="flex items-center justify-center relative z-10">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    <span className="text-lg">Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center relative z-10">
                    <LogIn className="w-6 h-6 mr-3" />
                    <span className="text-lg">Sign In</span>
                  </div>
                )}
              </button>
            </form>
            
            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-olive-200/50"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white/80 backdrop-blur-sm text-olive-600 font-medium rounded-lg">New to Notebook Pro?</span>
              </div>
            </div>
            
            {/* Register Link */}
            <div className="text-center">
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-olive-100 to-emerald-100 text-olive-800 hover:text-olive-900 font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg border border-olive-200/50 group"
              >
                <span>Create an account</span>
                <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gradient-to-r from-olive-50/80 to-emerald-50/80 backdrop-blur-sm px-8 py-5 border-t-2 border-olive-200/30">
            <p className="text-center text-sm text-olive-700">
              By signing in, you agree to our{' '}
              <a href="#" className="text-olive-800 hover:text-olive-900 font-semibold hover:underline transition-colors">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-olive-800 hover:text-olive-900 font-semibold hover:underline transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Extra decorative element */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center text-olive-600 text-sm">
            <Leaf className="w-4 h-4 mr-2" />
            <span>Secure & Encrypted</span>
            <Leaf className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;