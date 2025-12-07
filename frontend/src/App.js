import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotesList from './pages/NotesList';
import NoteForm from './pages/NoteForm'; // If you have a separate NoteForm page
 

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
        const userData = response.data?.data || response.data?.user || response.data;
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      }
    } catch (err) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      return false;
    }
    return false;
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth} user={user} />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/login" 
              element={
                !isAuthenticated ? 
                <Login setAuth={setAuth} fetchUser={fetchUser} /> : 
                <Navigate to="/" />
              } 
            />
            <Route 
              path="/register" 
              element={
                !isAuthenticated ? 
                <Register setAuth={setAuth} fetchUser={fetchUser} /> : 
                <Navigate to="/" />
              } 
            />
            
            {/* Private Routes */}
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                <Dashboard user={user} /> : 
                <Navigate to="/home" />
              } 
            />
            <Route 
              path="/notes" 
              element={
                isAuthenticated ? 
                <NotesList user={user} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/add-note" 
              element={
                isAuthenticated ? 
                <NoteForm user={user} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/edit-note/:id" 
              element={
                isAuthenticated ? 
                <NoteForm user={user} /> : 
                <Navigate to="/login" />
              } 
            />
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;