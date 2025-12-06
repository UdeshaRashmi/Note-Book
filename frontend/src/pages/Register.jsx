import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const Register = ({ setAuth, fetchUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');

    // Check password strength
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 6) strength += 25;
      if (/[A-Z]/.test(value)) strength += 25;
      if (/[0-9]/.test(value)) strength += 25;
      if (/[^A-Za-z0-9]/.test(value)) strength += 25;
      setPasswordStrength(strength);
    }
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength >= 75) return 'bg-emerald-500';
    if (strength >= 50) return 'bg-amber-500';
    if (strength >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/auth/register', {
        name,
        email,
        password
      });
      
      localStorage.setItem('token', response.data.token);
      await fetchUser();
      navigate('/');
      
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl mb-4 shadow-lg">
            <UserPlus className="w-8 h-8 text-emerald-700" />
          </div>
          <h2 className="text-3xl font-bold text-olive-900 mb-2">Join Notebook Pro</h2>
          <p className="text-olive-600">Create your account in seconds</p>
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
              {/* Name Field */}
              <div className="relative">
                <label className="block text-sm font-semibold text-olive-800 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-olive-400" />
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3.5 bg-olive-50 border-2 border-olive-100 rounded-xl focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none transition-all duration-300 text-olive-900 placeholder-olive-400"
                    required
                  />
                </div>
              </div>
              
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
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-olive-400 hover:text-olive-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-olive-700">Password strength</span>
                      <span className="text-xs font-bold text-olive-900">{passwordStrength}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-olive-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getPasswordStrengthColor(passwordStrength)} transition-all duration-500`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className={`flex items-center text-xs ${password.length >= 6 ? 'text-emerald-600' : 'text-olive-400'}`}>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        6+ characters
                      </div>
                      <div className={`flex items-center text-xs ${/[A-Z]/.test(password) ? 'text-emerald-600' : 'text-olive-400'}`}>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Uppercase
                      </div>
                      <div className={`flex items-center text-xs ${/[0-9]/.test(password) ? 'text-emerald-600' : 'text-olive-400'}`}>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Number
                      </div>
                      <div className={`flex items-center text-xs ${/[^A-Za-z0-9]/.test(password) ? 'text-emerald-600' : 'text-olive-400'}`}>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Special
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Confirm Password Field */}
              <div className="relative">
                <label className="block text-sm font-semibold text-olive-800 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-olive-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 bg-olive-50 border-2 border-olive-100 rounded-xl focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none transition-all duration-300 text-olive-900 placeholder-olive-400"
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-olive-400 hover:text-olive-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {password && confirmPassword && password !== confirmPassword && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Passwords don't match
                  </p>
                )}
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
                  loading 
                    ? 'bg-emerald-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <UserPlus className="w-5 h-5 mr-3" />
                    Create Account
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
                <span className="px-4 bg-white text-olive-500">Already have an account?</span>
              </div>
            </div>
            
            {/* Login Link */}
            <div className="text-center">
              <Link 
                to="/login" 
                className="inline-flex items-center text-olive-700 hover:text-olive-900 font-semibold transition-colors duration-300 group"
              >
                Sign in to existing account
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-olive-50 px-8 py-4 border-t border-olive-100">
            <p className="text-center text-sm text-olive-600">
              By registering, you agree to our{' '}
              <a href="#" className="text-olive-700 hover:text-olive-900 font-medium">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-olive-700 hover:text-olive-900 font-medium">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;