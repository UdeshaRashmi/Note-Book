import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  BookOpen,
  TrendingUp,
  Calendar,
  Clock,
  FileText,
  Plus,
  Archive,
  Pin,
  Tag,
  BarChart3,
  RefreshCw,
  AlertCircle,
  Zap,           // Added this
  ArrowRight,    // Added this
  Users,
  CheckCircle,
  Home
} from 'lucide-react';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalNotes: 0,
    todayNotes: 0,
    weekNotes: 0,
    pinnedNotes: 0,
    archivedNotes: 0
  });
  const [recentNotes, setRecentNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      console.debug('[Dashboard] fetching stats and recent notes');

      // Fetch stats
      const statsResponse = await axios.get('/stats');
      console.debug('[Dashboard] stats response:', statsResponse);
      const statsPayload = statsResponse.data?.data?.stats || statsResponse.data?.stats || statsResponse.data;
      setStats(statsPayload || {});

      // Fetch recent notes
      const notesResponse = await axios.get('/notes?limit=5');
      console.debug('[Dashboard] notes response:', notesResponse);
      const notesPayload = notesResponse.data?.data?.notes || notesResponse.data?.notes || notesResponse.data;
      setRecentNotes(notesPayload || []);
      
    } catch (err) {
      console.error('[Dashboard] fetch error:', err?.response || err.message || err);
      const serverMsg = err?.response?.data?.message || err?.response?.data?.msg || (err?.response?.data ? JSON.stringify(err.response.data) : null);
      setError(serverMsg || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olive-600 mx-auto"></div>
          <p className="mt-4 text-olive-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // If user data hasn't arrived yet, show a lightweight message instead of a spinner
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-olive-600">Preparing your dashboard…</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Notes',
      value: stats.totalNotes,
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-olive-50 to-emerald-50',
      border: 'border-olive-100',
      text: 'text-olive-700'
    },
    {
      title: 'Today',
      value: stats.todayNotes,
      icon: <Calendar className="w-6 h-6" />,
      color: 'from-amber-50 to-orange-50',
      border: 'border-amber-100',
      text: 'text-amber-700'
    },
    {
      title: 'This Week',
      value: stats.weekNotes,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-emerald-50 to-teal-50',
      border: 'border-emerald-100',
      text: 'text-emerald-700'
    },
    {
      title: 'Pinned',
      value: stats.pinnedNotes,
      icon: <Pin className="w-6 h-6" />,
      color: 'from-blue-50 to-indigo-50',
      border: 'border-blue-100',
      text: 'text-blue-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50/30 to-white pt-8">
      {/* Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-olive-900">Dashboard</h1>
            <p className="text-olive-600 mt-2">
              Welcome back, <span className="font-semibold text-olive-800">{user?.name}</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={fetchDashboardData}
              className="flex items-center space-x-2 text-olive-600 hover:text-olive-800 px-4 py-2 rounded-lg hover:bg-olive-50 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              <span className="font-medium">Refresh</span>
            </button>
            
            <Link
              to="/add-note"
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="container mx-auto px-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-r ${stat.color} rounded-xl p-6 border ${stat.border} shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-white ${stat.text}`}>
                  {stat.icon}
                </div>
                <span className={`text-3xl font-bold ${stat.text}`}>
                  {stat.value}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{stat.title}</h3>
              <p className="text-gray-600 text-sm mt-1">Total count</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Notes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-olive-100 overflow-hidden">
              <div className="border-b border-olive-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-olive-900">Recent Notes</h2>
                  <Link 
                    to="/notes"
                    className="text-olive-600 hover:text-olive-800 font-medium text-sm"
                  >
                    View all →
                  </Link>
                </div>
              </div>
              
              <div className="divide-y divide-olive-50">
                {recentNotes.length > 0 ? (
                  recentNotes.map((note) => (
                    <div key={note._id} className="px-6 py-4 hover:bg-olive-50/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-olive-900 truncate">{note.title}</h3>
                          <p className="text-olive-600 text-sm mt-1 line-clamp-2">
                            {note.content}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-olive-500">
                              {new Date(note.createdAt).toLocaleDateString()}
                            </span>
                            {note.tags && note.tags.length > 0 && (
                              <span className="inline-flex items-center text-xs text-emerald-600">
                                <Tag className="w-3 h-3 mr-1" />
                                {note.tags[0]}
                              </span>
                            )}
                          </div>
                        </div>
                        <Link
                          to={`/edit-note/${note._id}`}
                          className="ml-4 text-olive-600 hover:text-olive-800 text-sm font-medium"
                        >
                          View →
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-8 text-center">
                    <FileText className="w-12 h-12 text-olive-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-olive-800 mb-2">No notes yet</h3>
                    <p className="text-olive-600 mb-4">Create your first note to get started</p>
                    <Link
                      to="/add-note"
                      className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-800 font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Note</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-olive-100 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-6 h-6 text-olive-600" />
                <h3 className="text-lg font-semibold text-olive-900">Quick Stats</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-olive-700">Archived Notes</span>
                  <span className="font-bold text-olive-900">{stats.archivedNotes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-olive-700">This Month</span>
                  <span className="font-bold text-olive-900">
                    {stats.weekNotes * 4} {/* Approximate */}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-olive-700">Avg. per Day</span>
                  <span className="font-bold text-olive-900">
                    {(stats.totalNotes / 30).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-olive-100 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-amber-600" />
                <h3 className="text-lg font-semibold text-olive-900">Quick Actions</h3>
              </div>
              
              <div className="space-y-3">
                <Link
                  to="/add-note"
                  className="flex items-center justify-between p-3 rounded-lg border border-olive-100 hover:border-olive-300 hover:bg-olive-50 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-50 rounded flex items-center justify-center">
                      <Plus className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="font-medium text-olive-900">New Note</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-olive-400 group-hover:text-olive-600" />
                </Link>
                
                <Link
                  to="/notes?filter=pinned"
                  className="flex items-center justify-between p-3 rounded-lg border border-olive-100 hover:border-olive-300 hover:bg-olive-50 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center">
                      <Pin className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-olive-900">Pinned Notes</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-olive-400 group-hover:text-olive-600" />
                </Link>
                
                <Link
                  to="/notes?filter=archived"
                  className="flex items-center justify-between p-3 rounded-lg border border-olive-100 hover:border-olive-300 hover:bg-olive-50 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-50 rounded flex items-center justify-center">
                      <Archive className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="font-medium text-olive-900">Archived</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-olive-400 group-hover:text-olive-600" />
                </Link>
              </div>
            </div>

            {/* Productivity Tip */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-5 h-5 text-amber-600" />
                <h3 className="font-semibold text-amber-900">Productivity Tip</h3>
              </div>
              <p className="text-amber-800 text-sm">
                Organize your notes with tags. Studies show tagged notes are 3x easier 
                to find later!
              </p>
              <button className="mt-4 text-sm font-medium text-amber-700 hover:text-amber-900">
                Learn more →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;