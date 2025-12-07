import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NoteForm from './NoteForm';
import { 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  Calendar, 
  BookOpen, 
  Loader2, 
  Plus, 
  Grid, 
  List, 
  AlertCircle,
  X,
  Pin,
  Archive,
  Tag
} from 'lucide-react';

const NotesList = ({ user }) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [filters, setFilters] = useState({
    pinned: false,
    archived: false,
    tag: ''
  });

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/notes');
      console.debug('[fetchNotes] response:', response);
      const notesPayload = response.data?.data?.notes || response.data?.notes || response.data;
      setNotes(notesPayload || []);
      setFilteredNotes(notesPayload || []);
      setError('');
    } catch (err) {
      console.error('[fetchNotes] error:', err?.response || err.message || err);
      const serverMsg = err?.response?.data?.message || err?.response?.data?.msg || (err?.response?.data ? JSON.stringify(err.response.data) : null);
      setError(serverMsg || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    let filtered = notes;
    
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filters.pinned) {
      filtered = filtered.filter(note => note.isPinned);
    }
    
    if (filters.archived) {
      filtered = filtered.filter(note => note.isArchived);
    }
    
    if (filters.tag) {
      filtered = filtered.filter(note => note.tags && note.tags.includes(filters.tag));
    }
    
    setFilteredNotes(filtered);
  }, [searchTerm, notes, filters]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/notes/${id}`);
      fetchNotes();
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete note');
    }
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setShowNoteForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const togglePin = async (id) => {
    try {
      await axios.put(`/notes/${id}/pin`);
      fetchNotes();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update note');
    }
  };

  const toggleArchive = async (id) => {
    try {
      await axios.put(`/notes/${id}/archive`);
      fetchNotes();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update note');
    }
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
        day: 'numeric'
      });
    }
  };

  const extractTags = () => {
    const allTags = notes.flatMap(note => note.tags || []);
    return [...new Set(allTags)];
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50/30 to-white pt-8">
      {/* Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-olive-900">My Notes</h1>
            <p className="text-olive-600 mt-2">
              {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''} •{' '}
              {notes.filter(n => n.isPinned).length} pinned •{' '}
              {notes.filter(n => n.isArchived).length} archived
            </p>
          </div>
          
          <button
            onClick={() => {
              setCurrentNote(null);
              setShowNoteForm(true);
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>New Note</span>
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={() => setFilters({...filters, pinned: !filters.pinned})}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              filters.pinned 
                ? 'bg-amber-50 border-amber-200 text-amber-700' 
                : 'bg-white border-olive-200 text-olive-700 hover:bg-olive-50'
            }`}
          >
            <Pin className="w-4 h-4" />
            <span>Pinned</span>
            {filters.pinned && <X className="w-4 h-4 ml-1" />}
          </button>
          
          <button
            onClick={() => setFilters({...filters, archived: !filters.archived})}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              filters.archived 
                ? 'bg-purple-50 border-purple-200 text-purple-700' 
                : 'bg-white border-olive-200 text-olive-700 hover:bg-olive-50'
            }`}
          >
            <Archive className="w-4 h-4" />
            <span>Archived</span>
            {filters.archived && <X className="w-4 h-4 ml-1" />}
          </button>
          
          {/* Tag Filters */}
          {extractTags().slice(0, 3).map(tag => (
            <button
              key={tag}
              onClick={() => setFilters({...filters, tag: filters.tag === tag ? '' : tag})}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                filters.tag === tag 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                  : 'bg-white border-olive-200 text-olive-700 hover:bg-olive-50'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>{tag}</span>
              {filters.tag === tag && <X className="w-4 h-4 ml-1" />}
            </button>
          ))}
          
          {(filters.pinned || filters.archived || filters.tag) && (
            <button
              onClick={() => setFilters({ pinned: false, archived: false, tag: '' })}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-olive-200 text-olive-600 hover:bg-olive-50"
            >
              <X className="w-4 h-4" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Note Form Modal */}
      {showNoteForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <NoteForm 
              fetchNotes={fetchNotes} 
              currentNote={currentNote} 
              setCurrentNote={setCurrentNote}
              onClose={() => {
                setShowNoteForm(false);
                setCurrentNote(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="container mx-auto px-4 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-olive-400" />
          <input
            type="text"
            placeholder="Search notes by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-olive-100 rounded-xl focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none transition-all duration-300 text-olive-900 placeholder-olive-400 shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-olive-400 hover:text-olive-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {searchTerm && (
          <div className="mt-3 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-100">
            <p className="text-emerald-700 font-medium">
              Found {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''} for "{searchTerm}"
            </p>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="container mx-auto px-4 mb-6">
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* View Controls */}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-sm font-medium text-olive-700">
              {viewMode === 'grid' ? 'Grid View' : 'List View'}
            </div>
            <div className="flex items-center space-x-1 bg-olive-50 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-olive-100'}`}
              >
                <Grid className={`w-4 h-4 ${viewMode === 'grid' ? 'text-olive-700' : 'text-olive-400'}`} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-olive-100'}`}
              >
                <List className={`w-4 h-4 ${viewMode === 'list' ? 'text-olive-700' : 'text-olive-400'}`} />
              </button>
            </div>
          </div>
          
          <div className="text-sm text-olive-600">
            Sorted by: <span className="font-medium text-olive-800">Recent</span>
          </div>
        </div>
      </div>

      {/* Notes Display */}
      <div className="container mx-auto px-4 pb-12">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-olive-50 to-emerald-50 rounded-2xl border-2 border-dashed border-olive-200">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-6">
              <BookOpen className="w-10 h-10 text-olive-400" />
            </div>
            <h3 className="text-2xl font-bold text-olive-800 mb-3">
              {searchTerm || filters.pinned || filters.archived || filters.tag 
                ? 'No notes found' 
                : 'No notes yet'}
            </h3>
            <p className="text-olive-600 max-w-md mx-auto mb-8">
              {searchTerm 
                ? 'Try a different search term or clear your filters'
                : 'Start capturing your thoughts and ideas. Create your first note!'}
            </p>
            <button
              onClick={() => {
                setCurrentNote(null);
                setShowNoteForm(true);
              }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Note</span>
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard 
                key={note._id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onTogglePin={togglePin}
                onToggleArchive={toggleArchive}
                deleteConfirm={deleteConfirm}
                setDeleteConfirm={setDeleteConfirm}
                formatDate={formatDate}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-olive-100 overflow-hidden">
            <div className="divide-y divide-olive-100">
              {filteredNotes.map((note) => (
                <NoteRow 
                  key={note._id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onTogglePin={togglePin}
                  onToggleArchive={toggleArchive}
                  deleteConfirm={deleteConfirm}
                  setDeleteConfirm={setDeleteConfirm}
                  formatDate={formatDate}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty state when no notes */}
        {notes.length === 0 && !loading && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-olive-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-olive-800 mb-3">Your notebook is empty</h3>
            <p className="text-olive-600 mb-8 max-w-md mx-auto">
              Start by capturing your thoughts, ideas, and to-dos. Every great project begins with a single note.
            </p>
            <button
              onClick={() => {
                setCurrentNote(null);
                setShowNoteForm(true);
              }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Write Your First Note</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Note Card Component for Grid View
const NoteCard = ({ note, onEdit, onDelete, onTogglePin, onToggleArchive, deleteConfirm, setDeleteConfirm, formatDate }) => {
  const [showActions, setShowActions] = React.useState(false);

  return (
    <div 
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-olive-100 hover:border-olive-300"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="p-6">
        {/* Note Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {note.isPinned && (
                <span className="inline-flex items-center text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                  <Pin className="w-3 h-3 mr-1" />
                  Pinned
                </span>
              )}
              {note.isArchived && (
                <span className="inline-flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  <Archive className="w-3 h-3 mr-1" />
                  Archived
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-bold text-olive-900 truncate group-hover:text-olive-700 transition-colors">
              {note.title}
            </h3>
            
            <div className="flex items-center mt-1">
              <Calendar className="w-4 h-4 text-olive-400 mr-2" />
              <span className="text-xs text-olive-500">
                {formatDate(note.updatedAt || note.createdAt)}
              </span>
            </div>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setDeleteConfirm(deleteConfirm === note._id ? null : note._id)}
              className="p-2 text-olive-400 hover:text-olive-600 rounded-lg hover:bg-olive-50"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            
            {/* Actions Menu */}
            {deleteConfirm === note._id && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-olive-200 z-10 overflow-hidden">
                <div className="p-2">
                  <p className="text-sm text-olive-700 p-2">Note actions</p>
                  <div className="space-y-1">
                    <button
                      onClick={() => onEdit(note)}
                      className="flex items-center space-x-2 w-full p-2 text-sm text-olive-600 hover:text-olive-800 hover:bg-olive-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => onTogglePin(note._id)}
                      className="flex items-center space-x-2 w-full p-2 text-sm text-olive-600 hover:text-olive-800 hover:bg-olive-50 rounded-lg transition-colors"
                    >
                      <Pin className="w-4 h-4" />
                      <span>{note.isPinned ? 'Unpin' : 'Pin'}</span>
                    </button>
                    <button
                      onClick={() => onToggleArchive(note._id)}
                      className="flex items-center space-x-2 w-full p-2 text-sm text-olive-600 hover:text-olive-800 hover:bg-olive-50 rounded-lg transition-colors"
                    >
                      <Archive className="w-4 h-4" />
                      <span>{note.isArchived ? 'Unarchive' : 'Archive'}</span>
                    </button>
                    <button
                      onClick={() => onDelete(note._id)}
                      className="flex items-center space-x-2 w-full p-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
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
        
        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {note.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-100"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="text-xs text-olive-500 px-2 py-1">
                +{note.tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        {/* Quick Actions (shown on hover) */}
        {showActions && (
          <div className="flex items-center justify-between pt-4 border-t border-olive-100">
            <button
              onClick={() => onEdit(note)}
              className="flex items-center space-x-2 text-olive-600 hover:text-olive-800 font-medium group/btn"
            >
              <Edit2 className="w-4 h-4 group-hover/btn:transform group-hover/btn:scale-110 transition-transform" />
              <span>Edit</span>
            </button>
            <button 
              onClick={() => onDelete(note._id)}
              className="flex items-center space-x-2 text-red-600 hover:text-red-800 font-medium group/btn"
            >
              <Trash2 className="w-4 h-4 group-hover/btn:transform group-hover/btn:scale-110 transition-transform" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Color Indicator */}
      <div className={`h-2 ${getColorGradient(note.color || '#6a7e43')} group-hover:opacity-100 transition-all duration-500`}></div>
    </div>
  );
};

// Note Row Component for List View
const NoteRow = ({ note, onEdit, onDelete, onTogglePin, onToggleArchive, deleteConfirm, setDeleteConfirm, formatDate }) => {
  return (
    <div className="group hover:bg-olive-50 transition-colors duration-300">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className={`w-12 h-12 ${getNoteColor(note.color || '#6a7e43')} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {note.isPinned && (
                    <span className="inline-flex items-center text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                      <Pin className="w-3 h-3 mr-1" />
                      Pinned
                    </span>
                  )}
                  {note.isArchived && (
                    <span className="inline-flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      <Archive className="w-3 h-3 mr-1" />
                      Archived
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-olive-900 truncate group-hover:text-olive-700 transition-colors">
                  {note.title}
                </h3>
                <p className="text-olive-600 text-sm mt-1 line-clamp-2">
                  {note.content}
                </p>
                
                <div className="flex items-center space-x-4 mt-3">
                  <span className="text-xs text-olive-500">
                    {formatDate(note.updatedAt || note.createdAt)}
                  </span>
                  
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Tag className="w-3 h-3 text-olive-400" />
                      <div className="flex space-x-1">
                        {note.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="text-xs text-emerald-600">
                            {tag}
                          </span>
                        ))}
                        {note.tags.length > 2 && (
                          <span className="text-xs text-olive-500">
                            +{note.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-3 ml-4">
                <button
                  onClick={() => onTogglePin(note._id)}
                  className={`p-2 rounded-lg transition-colors ${
                    note.isPinned 
                      ? 'text-amber-600 bg-amber-50 hover:bg-amber-100' 
                      : 'text-olive-400 hover:text-olive-600 hover:bg-olive-50'
                  }`}
                >
                  <Pin className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onToggleArchive(note._id)}
                  className={`p-2 rounded-lg transition-colors ${
                    note.isArchived 
                      ? 'text-purple-600 bg-purple-50 hover:bg-purple-100' 
                      : 'text-olive-400 hover:text-olive-600 hover:bg-olive-50'
                  }`}
                >
                  <Archive className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onEdit(note)}
                  className="p-2 text-olive-400 hover:text-olive-600 rounded-lg hover:bg-olive-50"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(note._id)}
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
  );
};

// Helper functions for colors
const getColorGradient = (color) => {
  const gradients = {
    '#6a7e43': 'bg-gradient-to-r from-olive-400 to-olive-500',
    '#5f713c': 'bg-gradient-to-r from-olive-500 to-olive-600',
    '#4f5e32': 'bg-gradient-to-r from-olive-600 to-olive-700',
    '#3f4b28': 'bg-gradient-to-r from-olive-700 to-olive-800',
    '#333e21': 'bg-gradient-to-r from-olive-800 to-olive-900'
  };
  return gradients[color] || gradients['#6a7e43'];
};

const getNoteColor = (color) => {
  const colors = {
    '#6a7e43': 'bg-olive-500',
    '#5f713c': 'bg-olive-600',
    '#4f5e32': 'bg-olive-700',
    '#3f4b28': 'bg-olive-800',
    '#333e21': 'bg-olive-900'
  };
  return colors[color] || colors['#6a7e43'];
};

export default NotesList;