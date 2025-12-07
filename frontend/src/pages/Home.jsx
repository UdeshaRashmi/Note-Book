import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Shield, 
  Zap, 
  Lock, 
  TrendingUp, 
  Users,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Bank-Level Security',
      description: 'Your notes are encrypted and stored securely with end-to-end protection.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Instant search and seamless performance across all your devices.'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Complete Privacy',
      description: 'We never sell your data. Your thoughts belong only to you.'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Productivity Boost',
      description: 'Organize, search, and find your notes in seconds, not minutes.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Team Ready',
      description: 'Share notes securely with team members (coming soon).'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Reliable Sync',
      description: 'Access your notes anywhere, anytime. Always in sync.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-olive-600/5 to-emerald-600/5" />
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-olive-100 to-emerald-100 rounded-2xl shadow-lg mb-6">
                <BookOpen className="w-10 h-10 text-olive-700" />
              </div>
              
              <h1 className="text-5xl font-bold text-olive-900 mb-4">
                Organize Your Thoughts with{' '}
                <span className="text-emerald-700">Notebook Pro</span>
              </h1>
              
              <p className="text-xl text-olive-700 mb-8 max-w-2xl mx-auto">
                A beautiful, secure, and intuitive note-taking application designed for 
                thinkers, creators, and professionals who value clarity and focus.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center space-x-2 bg-white text-olive-700 hover:text-olive-900 px-8 py-3 rounded-xl font-semibold border-2 border-olive-200 hover:border-olive-300 transition-all duration-300"
                >
                  <span>Sign In</span>
                </Link>
              </div>
              
              <p className="text-olive-500 text-sm mt-6">
                No credit card required • Free forever plan available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-olive-900 mb-4">
              Everything You Need in a Notes App
            </h2>
            <p className="text-olive-600 max-w-2xl mx-auto">
              We've combined simplicity with powerful features to create the perfect 
              note-taking experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 border border-olive-100 hover:border-olive-300 
                         hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-olive-50 
                              rounded-lg mb-4">
                  <div className="text-olive-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-olive-900 mb-2">{feature.title}</h3>
                <p className="text-olive-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-olive-50 to-emerald-50 border-y border-olive-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-olive-900 mb-4">
              Ready to Transform Your Note-Taking?
            </h2>
            <p className="text-olive-700 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have found their perfect note-taking 
              solution with Notebook Pro.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-olive-600 to-emerald-600 hover:from-olive-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Start Your Free Account</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;