import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-olive-800 to-olive-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-olive-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 text-olive-800 font-bold">N</div>
              </div>
              <span className="text-xl font-bold">Notebook Pro</span>
            </div>
            <p className="text-olive-200 text-sm">
              Your thoughts, organized beautifully. Secure, fast, and distraction-free.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-olive-200 hover:text-white">Features</Link></li>
              <li><Link to="/pricing" className="text-olive-200 hover:text-white">Pricing</Link></li>
              <li><Link to="/download" className="text-olive-200 hover:text-white">Download</Link></li>
              <li><Link to="/updates" className="text-olive-200 hover:text-white">Updates</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-olive-200 hover:text-white">About Us</Link></li>
              <li><Link to="/careers" className="text-olive-200 hover:text-white">Careers</Link></li>
              <li><Link to="/blog" className="text-olive-200 hover:text-white">Blog</Link></li>
              <li><Link to="/press" className="text-olive-200 hover:text-white">Press</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-olive-200 hover:text-white">Help Center</Link></li>
              <li><Link to="/contact" className="text-olive-200 hover:text-white">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-olive-200 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-olive-200 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-olive-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <a href="https://twitter.com" className="text-olive-300 hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com" className="text-olive-300 hover:text-white">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" className="text-olive-300 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            
            <p className="text-olive-300 text-sm flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-400" /> by the Notebook Pro team
            </p>
            
            <p className="text-olive-300 text-sm mt-4 md:mt-0">
              © {new Date().getFullYear()} Notebook Pro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;