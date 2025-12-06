import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './NoteForm';
import { 
  Search, Filter, MoreVertical, Edit2, Trash2, Eye, 
  Calendar, BookOpen, Clock, ChevronRight, AlertCircle,
  Loader2, Plus, Grid, List, CheckCircle
} from 'lucide-react';

const NotesList = ({ user }) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/notes');
      setNotes(response.data);
      setFilteredNotes(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [searchTerm, notes]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/notes/${id}`);
      fetchNotes();
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to delete note');
    }
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-olive-200 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Loader2 className="w-10 h-10 text-olive-600 animate-spin" />
          </div>
        </div>
        <p className="mt-6 text-olive-700 font-medium">Loading your notes...</p>
        <p className="text-olive-500 text-sm mt-2">Just a moment</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-olive-900">My Notes</h1>
            <p className="text-olive-600 mt-2">
              Welcome back, <span className="font-semibold text-olive-800">{user?.name}</span>! 
              You have {notes.length} note{notes.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {!currentNote && (
            <button
              onClick={() => setCurrentNote({})}
              className="flex items-center space-x-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <Plus className="w-5 h-5" />
              <span>New Note</span>
            </button>
          )}
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gradient-to-r from-olive-50 to-emerald-50 rounded-xl p-5 border border-olive-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-olive-700">Total Notes</p>
                <p className="text-3xl font-bold text-olive-900 mt-2">{notes.length}</p>
              </div>
              <BookOpen className="w-10 h-10 text-olive-400" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">This Week</p>
                <p className="text-3xl font-bold text-amber-900 mt-2">
                  {notes.filter(note => {
                    const noteDate = new Date(note.date);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return noteDate >= weekAgo;
                  }).length}
                </p>
              </div>
              <Clock className="w-10 h-10 text-amber-400" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">Today</p>
                <p className="text-3xl font-bold text-emerald-900 mt-2">
                  {notes.filter(note => {
                    const noteDate = new Date(note.date);
                    const today = new Date();
                    return noteDate.toDateString() === today.toDateString();
                  }).length}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Note Form */}
      {currentNote && (
        <NoteForm 
          fetchNotes={fetchNotes} 
          currentNote={currentNote._id ? currentNote : null} 
          setCurrentNote={setCurrentNote} 
        />
      )}

      {/* Search and Controls */}
      {!currentNote && (
        <>
          <div className="mb-8 bg-white rounded-2xl shadow-lg border border-olive-100 p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-olive-400" />
                <input
                  type="text"
                  placeholder="Search notes by title or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-olive-50 border-2 border-olive-100 rounded-xl focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none transition-all duration-300 text-olive-900 placeholder-olive-400"
                />
              </div>
              
              {/* View Controls */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-olive-50 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-white shadow-md' : 'hover:bg-olive-100'}`}
                  >
                    <Grid className={`w-5 h-5 ${viewMode === 'grid' ? 'text-olive-700' : 'text-olive-400'}`} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-white shadow-md' : 'hover:bg-olive-100'}`}
                  >
                    <List className={`w-5 h-5 ${viewMode === 'list' ? 'text-olive-700' : 'text-olive-400'}`} />
                  </button>
                </div>
                
                <button className="flex items-center space-x-2 text-olive-700 hover:text-olive-900 px-4 py-2.5 rounded-xl border-2 border-olive-200 hover:border-olive-300 transition-all duration-300">
                  <Filter className="w-5 h-5" />
                  <span className="font-medium">Filter</span>
                </button>
              </div>
            </div>
            
            {/* Search Results Info */}
            {searchTerm && (
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <p className="text-emerald-700 font-medium">
                  Found {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''} for "{searchTerm}"
                </p>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Notes Display */}
          {filteredNotes.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-olive-50 to-emerald-50 rounded-2xl border-2 border-dashed border-olive-200">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-6">
                <BookOpen className="w-10 h-10 text-olive-400" />
              </div>
              <h3 className="text-2xl font-bold text-olive-800 mb-3">
                {searchTerm ? 'No notes found' : 'No notes yet'}
              </h3>
              <p className="text-olive-600 max-w-md mx-auto mb-8">
                {searchTerm 
                  ? 'Try a different search term or create a new note'
                  : 'Start capturing your thoughts and ideas. Click "New Note" to begin!'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setCurrentNote({})}
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Your First Note</span>
                </button>
              )}
            </div>
          ) : viewMode === 'grid' ? (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <div 
                  key={note._id} 
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-olive-100 hover:border-olive-300"
                >
                  <div className="p-6">
                    {/* Note Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-olive-900 truncate group-hover:text-olive-700 transition-colors">
                          {note.title}
                        </h3>
                        <div className="flex items-center mt-1">
                          <Calendar className="w-4 h-4 text-olive-400 mr-2" />
                          <span className="text-xs text-olive-500">
                            {formatDate(note.date)}
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <button 
                          onClick={() => setDeleteConfirm(deleteConfirm === note._id ? null : note._id)}
                          className="p-2 text-olive-400 hover:text-olive-600 rounded-lg hover:bg-olive-50"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        
                        {/* Delete Confirmation */}
                        {deleteConfirm === note._id && (
                          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-olive-200 z-10 overflow-hidden">
                            <div className="p-2">
                              <p className="text-sm text-olive-700 p-2">Delete this note?</p>
                              <div className="flex space-x-2 p-2">
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="flex-1 py-2 text-sm font-medium text-olive-600 hover:text-olive-800 hover:bg-olive-50 rounded-lg transition-colors"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleDelete(note._id)}
                                  className="flex-1 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Note Content Preview */}
                    <div className="mb-6">
                      <p className="text-olive-700 line-clamp-3 text-sm">
                        {note.content}
                      </p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-olive-100">
                      <button
                        onClick={() => handleEdit(note)}
                        className="flex items-center space-x-2 text-olive-600 hover:text-olive-800 font-medium group/btn"
                      >
                        <Edit2 className="w-4 h-4 group-hover/btn:transform group-hover/btn:scale-110 transition-transform" />
                        <span>Edit</span>
                      </button>
                      <button className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-800 font-medium group/btn">
                        <Eye className="w-4 h-4 group-hover/btn:transform group-hover/btn:scale-110 transition-transform" />
                        <span>View</span>
                        <ChevronRight className="w-4 h-4 group-hover/btn:transform group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Color Indicator */}
                  <div className="h-1 bg-gradient-to-r from-olive-400 to-emerald-400 group-hover:from-olive-500 group-hover:to-emerald-500 transition-all duration-500"></div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="bg-white rounded-2xl shadow-lg border border-olive-100 overflow-hidden">
              <div className="divide-y divide-olive-100">
                {filteredNotes.map((note) => (
                  <div key={note._id} className="group hover:bg-olive-50 transition-colors duration-300">
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-olive-100 to-emerald-100 rounded-xl flex items-center justify-center group-hover:from-olive-200 group-hover:to-emerald-200 transition-all duration-300">
                            <BookOpen className="w-6 h-6 text-olive-700" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-olive-900 truncate group-hover:text-olive-700 transition-colors">
                                {note.title}
                              </h3>
                              <p className="text-olive-600 text-sm mt-1 line-clamp-2">
                                {note.content}
                              </p>
                            </div>
                            
                            <div className="flex items-center space-x-3 ml-4">
                              <span className="text-xs text-olive-500 whitespace-nowrap">
                                {formatDate(note.date)}
                              </span>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleEdit(note)}
                                  className="p-2 text-olive-400 hover:text-olive-600 rounded-lg hover:bg-olive-100"
                                >
                                  <Edit2 className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(note._id)}
                                  className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pagination/Footer */}
          <div className="mt-10 pt-6 border-t border-olive-200">
            <div className="flex items-center justify-between text-sm text-olive-600">
              <p>
                Showing {filteredNotes.length} of {notes.length} notes
              </p>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 border border-olive-200 rounded-lg hover:bg-olive-50 transition-colors">
                  Previous
                </button>
                <span className="font-medium">Page 1 of 1</span>
                <button className="px-4 py-2 border border-olive-200 rounded-lg hover:bg-olive-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotesList;