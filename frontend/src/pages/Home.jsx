import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, LogIn, UserPlus, Leaf } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-olive-50 to-emerald-50 flex items-center">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-olive-500 to-emerald-600 rounded-3xl mb-4 shadow-xl">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-olive-900 leading-tight">Notebook Pro — Capture your ideas</h1>
            <p className="text-lg text-olive-700 max-w-xl">Fast, private, and beautifully organized notes with an olive-inspired theme. Sign up and get started in seconds.</p>

            <div className="flex flex-wrap gap-4 mt-6">
              <Link to="/register" className="inline-flex items-center gap-3 bg-gradient-to-r from-olive-600 to-olive-700 hover:from-olive-700 hover:to-olive-800 text-white px-6 py-3 rounded-lg shadow-lg font-semibold">
                <UserPlus className="w-5 h-5" />
                Get Started
              </Link>

              <Link to="/login" className="inline-flex items-center gap-3 border-2 border-olive-600 text-olive-800 px-5 py-3 rounded-lg hover:bg-olive-50 transition-all">
                <LogIn className="w-5 h-5" />
                Sign In
              </Link>
            </div>

            <div className="mt-8 text-sm text-olive-600">
              <p>Trusted by makers and teams who like a calm, focused UI.</p>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute -top-8 -right-8 w-56 h-56 bg-olive-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 pointer-events-none"></div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-olive-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-olive-900">Quick note</h3>
                  <p className="text-sm text-olive-600">Type a title and some notes — saved locally for demo</p>
                </div>
                <div className="w-12 h-12 bg-olive-50 rounded-md flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-olive-600" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-10 bg-olive-50 rounded-md" />
                <div className="h-40 bg-olive-50 rounded-md" />
                <div className="flex justify-between items-center">
                  <div className="text-xs text-olive-500">Autosave • Secure</div>
                  <div className="text-xs text-olive-600 font-medium">Just now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
