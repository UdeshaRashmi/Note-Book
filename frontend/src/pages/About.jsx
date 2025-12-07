import React from 'react';
import { 
  Leaf, 
  Shield, 
  Zap, 
  EyeOff, 
  Code, 
  Users, 
  Globe, 
  Heart,
  Github,
  Linkedin,
  Twitter,
  BookOpen,
  Lock,
  Palette,
  Smartphone
} from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Alex Morgan',
      role: 'Lead Developer',
      bio: 'Full-stack developer with 5+ years experience in building scalable applications',
      github: 'alexmorgan',
      linkedin: 'alexmorgan'
    },
    {
      name: 'Sarah Chen',
      role: 'UI/UX Designer',
      bio: 'Passionate about creating beautiful, user-friendly interfaces with attention to detail',
      github: 'sarahchen',
      linkedin: 'sarahchen'
    },
    {
      name: 'Marcus Rivera',
      role: 'DevOps Engineer',
      bio: 'Infrastructure specialist focused on performance and security',
      github: 'marcusrivera',
      linkedin: 'marcusrivera'
    }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Privacy First',
      description: 'Your notes are encrypted and stored securely. We never share your data.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Instant search and smooth performance, even with thousands of notes.'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Beautiful Design',
      description: 'Carefully crafted olive theme that reduces eye strain and enhances focus.'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Fully Responsive',
      description: 'Works perfectly on desktop, tablet, and mobile devices.'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Rich Editing',
      description: 'Format your notes with markdown support and rich text features.'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'End-to-End Secure',
      description: 'Bank-level security with JWT authentication and data encryption.'
    }
  ];

  const techStack = [
    { name: 'React.js', color: 'bg-blue-100 text-blue-800' },
    { name: 'Express.js', color: 'bg-gray-100 text-gray-800' },
    { name: 'MongoDB', color: 'bg-green-100 text-green-800' },
    { name: 'Node.js', color: 'bg-emerald-100 text-emerald-800' },
    { name: 'Tailwind CSS', color: 'bg-teal-100 text-teal-800' },
    { name: 'JWT', color: 'bg-purple-100 text-purple-800' },
    { name: 'Axios', color: 'bg-indigo-100 text-indigo-800' },
    { name: 'Lucide Icons', color: 'bg-pink-100 text-pink-800' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-olive-600/10 to-emerald-600/10" />
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-olive-100 to-emerald-100 rounded-2xl shadow-lg mb-6">
              <Leaf className="w-10 h-10 text-olive-700" />
            </div>
            
            <h1 className="text-5xl font-bold text-olive-900 mb-4">
              Welcome to <span className="text-emerald-700">Notebook Pro</span>
            </h1>
            
            <p className="text-xl text-olive-700 mb-8 max-w-2xl mx-auto">
              Where your thoughts find clarity, organization meets simplicity, and privacy is never optional.
            </p>
            
            <div className="inline-flex items-center space-x-2 bg-olive-100 text-olive-800 px-4 py-2 rounded-full">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Made with care for focused minds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 -mt-10 mb-16">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-olive-100">
          <div className="flex items-start space-x-6 mb-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-olive-50 to-emerald-50 rounded-xl flex items-center justify-center">
                <Globe className="w-8 h-8 text-olive-600" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-olive-900 mb-3">Our Mission</h2>
              <p className="text-olive-700 leading-relaxed">
                In a world of endless distractions, we believe in creating digital spaces that foster focus and creativity. 
                Notebook Pro is more than just a note-taking app—it's a sanctuary for your thoughts. We combine elegant 
                design with powerful functionality to provide a writing experience that feels both effortless and inspiring.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gradient-to-br from-olive-50 to-emerald-50 rounded-xl p-6 border border-olive-100">
              <h3 className="text-lg font-semibold text-olive-900 mb-2">Philosophy</h3>
              <p className="text-olive-700">
                We believe software should be intuitive, beautiful, and respectful of your time. Every feature is 
                thoughtfully designed to enhance your productivity without adding complexity.
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Vision</h3>
              <p className="text-amber-800">
                To become the most trusted note-taking platform for individuals and teams who value privacy, 
                simplicity, and exceptional user experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-olive-900 mb-3">Why Choose Notebook Pro?</h2>
            <p className="text-olive-600 max-w-2xl mx-auto">
              We've built every feature with one goal in mind: to help you think better.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-xl p-6 border border-olive-100 hover:border-olive-300 
                         hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-olive-50 
                              group-hover:bg-olive-100 rounded-lg mb-4 transition-colors">
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

      {/* Technology Stack */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-olive-50 to-emerald-50 rounded-2xl p-8 border border-olive-100">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <Code className="w-6 h-6 text-olive-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-olive-900">Built with Modern Technology</h2>
              <p className="text-olive-600">Reliable, scalable, and developer-friendly stack</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {techStack.map((tech, index) => (
              <span 
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium ${tech.color} 
                          border border-white/50 hover:scale-105 transition-transform`}
              >
                {tech.name}
              </span>
            ))}
          </div>
          
          <div className="bg-white/80 rounded-lg p-6 border border-white">
            <h3 className="text-lg font-semibold text-olive-900 mb-3">Open Source</h3>
            <p className="text-olive-700 mb-4">
              Notebook Pro is built with transparency in mind. Our code is open source and we welcome 
              contributions from developers worldwide.
            </p>
            <a 
              href="https://github.com/yourusername/notebook-pro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-olive-700 hover:text-olive-900 font-medium"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 mb-4">
              <Users className="w-8 h-8 text-olive-600" />
              <h2 className="text-3xl font-bold text-olive-900">Meet Our Team</h2>
            </div>
            <p className="text-olive-600 max-w-2xl mx-auto">
              A small team of passionate creators dedicated to building tools that make a difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-olive-100 hover:shadow-xl 
                         transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-olive-100 to-emerald-100 
                                rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-olive-800">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-olive-900">{member.name}</h3>
                    <p className="text-olive-600">{member.role}</p>
                  </div>
                </div>
                
                <p className="text-olive-700 mb-6">{member.bio}</p>
                
                <div className="flex space-x-4">
                  <a 
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-olive-500 hover:text-olive-700 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href={`https://linkedin.com/in/${member.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-olive-500 hover:text-olive-700 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-olive-600 to-emerald-600 
                      rounded-2xl p-10 text-center shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Organize Your Thoughts?
          </h2>
          <p className="text-olive-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their note-taking experience with Notebook Pro.
            Start free today—no credit card required.
          </p>
          
          
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-olive-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-6 mb-6">
              <a href="#" className="text-olive-500 hover:text-olive-700">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-olive-500 hover:text-olive-700">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-olive-500 hover:text-olive-700">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <a href="#" className="text-olive-600 hover:text-olive-900 font-medium">
                Privacy Policy
              </a>
              <a href="#" className="text-olive-600 hover:text-olive-900 font-medium">
                Terms of Service
              </a>
              <a href="#" className="text-olive-600 hover:text-olive-900 font-medium">
                Documentation
              </a>
              <a href="#" className="text-olive-600 hover:text-olive-900 font-medium">
                Contact Us
              </a>
            </div>
            
            <p className="text-olive-500 text-sm">
              © {new Date().getFullYear()} Notebook Pro. All rights reserved. 
              Built with <Heart className="w-3 h-3 inline mx-1" /> and lots of green tea.
            </p>
            
            <p className="text-olive-400 text-xs mt-4">
              Version 2.1.0 • Last updated: April 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;