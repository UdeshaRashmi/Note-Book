import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotesList from './pages/NotesList';
import NoteForm from './pages/NoteForm';
import Navbar from './components/Navbar';

// Set base URL for API calls
axios.defaults.baseURL = 'http://localhost:5000/api';

// Add axios interceptor for token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const setAuth = (value) => {
    setIsAuthenticated(value);
    if (!value) {
      setUser(null);
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('/auth/user');
        setUser(response.data);
        setIsAuthenticated(true);
      }
    } catch (err) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-olive-50 to-emerald-50">
        <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth} user={user} />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/login" 
              element={
                !isAuthenticated ? 
                <Login setAuth={setAuth} fetchUser={fetchUser} /> : 
                <Navigate to="/" />
              } 
            />
            <Route
              path="/home"
              element={<Home />}
            />
            <Route 
              path="/register" 
              element={
                !isAuthenticated ? 
                <Register setAuth={setAuth} fetchUser={fetchUser} /> : 
                <Navigate to="/" />
              } 
            />
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                <NotesList user={user} /> : 
                <Home />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;