import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Save, X, Edit2, Plus, Calendar, Type, FileText } from 'lucide-react';

const NoteForm = ({ fetchNotes = () => {}, currentNote = null, setCurrentNote = () => {}, onClose = null }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentNote) {
      setFormData({
        title: currentNote.title,
        content: currentNote.content
      });
    } else {
      setFormData({
        title: '',
        content: ''
      });
    }
  }, [currentNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (currentNote) {
        await axios.put(`/notes/${currentNote._id}`, formData);
      } else {
        await axios.post('/notes', formData);
      }

      setFormData({ title: '', content: '' });
      // clear current note if parent provided a setter
      try { setCurrentNote(null); } catch (e) {}
      // refresh notes if callback provided
      try { fetchNotes(); } catch (e) {}
      // if used as modal, call onClose; otherwise navigate back to notes list
      if (typeof onClose === 'function') {
        onClose();
      } else {
        navigate('/notes');
      }
      
    } catch (err) {
      console.error('[NoteForm] save error:', err?.response || err.message || err);
      const serverMsg = err?.response?.data?.msg || err?.response?.data?.message ||
        (err?.response?.data ? JSON.stringify(err.response.data) : null) || err.message;
      setError(serverMsg || 'Failed to save note');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', content: '' });
    setCurrentNote(null);
    setError('');
  };

  return (
    <div className="mb-10">
      {/* Form Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-olive-100 to-emerald-100 rounded-xl">
            {currentNote ? (
              <Edit2 className="w-6 h-6 text-olive-700" />
            ) : (
              <Plus className="w-6 h-6 text-emerald-700" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-olive-900">
              {currentNote ? 'Edit Note' : 'Create New Note'}
            </h2>
            <p className="text-olive-600">
              {currentNote ? 'Update your existing note' : 'Capture your thoughts and ideas'}
            </p>
          </div>
        </div>
        
        {currentNote && (
          <button
            onClick={handleCancel}
            className="flex items-center space-x-2 text-olive-600 hover:text-olive-800 px-4 py-2 rounded-lg hover:bg-olive-50 transition-colors duration-300"
          >
            <X className="w-5 h-5" />
            <span className="font-medium">Cancel</span>
          </button>
        )}
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-olive-100 overflow-hidden">
        {error && (
          <div className="bg-red-50 border-b border-red-100 p-4">
            <div className="flex items-center text-red-700">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Title Field */}
            <div className="relative group">
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center text-sm font-semibold text-olive-800">
                  <Type className="w-4 h-4 mr-2" />
                  Title
                </label>
                <span className="text-xs text-olive-500 font-medium">
                  {formData.title.length}/100
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="What's on your mind?"
                  className="w-full px-5 py-4 bg-olive-50 border-2 border-olive-100 rounded-xl focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none transition-all duration-300 text-olive-900 placeholder-olive-400 group-hover:border-olive-300"
                  maxLength="100"
                  required
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 rounded-full bg-olive-200 group-focus-within:bg-olive-500"></div>
                </div>
              </div>
            </div>
            
            {/* Content Field */}
            <div className="relative group">
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center text-sm font-semibold text-olive-800">
                  <FileText className="w-4 h-4 mr-2" />
                  Content
                </label>
                <span className="text-xs text-olive-500 font-medium">
                  {formData.content.length}/5000
                </span>
              </div>
              <div className="relative">
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your thoughts here..."
                  rows="8"
                  className="w-full px-5 py-4 bg-olive-50 border-2 border-olive-100 rounded-xl focus:border-olive-500 focus:ring-2 focus:ring-olive-200 outline-none transition-all duration-300 text-olive-900 placeholder-olive-400 resize-none group-hover:border-olive-300"
                  maxLength="5000"
                  required
                />
                <div className="absolute right-4 top-4">
                  <div className="w-2 h-2 rounded-full bg-olive-200 group-focus-within:bg-olive-500"></div>
                </div>
              </div>
            </div>
            
            {/* Date Info */}
            {currentNote && (
              <div className="flex items-center p-4 bg-olive-50 rounded-lg border border-olive-100">
                <Calendar className="w-5 h-5 text-olive-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-olive-800">Last edited</p>
                  <p className="text-sm text-olive-600">
                    {new Date(currentNote.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            )}
            
            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
                  loading 
                    ? 'bg-olive-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-olive-600 to-emerald-600 hover:from-olive-700 hover:to-emerald-700'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>{currentNote ? 'Update Note' : 'Save Note'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;