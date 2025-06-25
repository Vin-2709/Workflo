import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, Brain,FileUp,BadgeCheck,UserCog,LayoutDashboard,Clock,Users,Star,Shield,TrendingUp,Eye, EyeOff, Mail, Lock,   User, ArrowRight, Linkedin, AtSign,ChevronDown
} from 'lucide-react';


const ModernLandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: UserCog, title: "Role-Based Access", desc: "Granular permissions for Admins and Employees with intelligent role management", color: "from-blue-500 to-indigo-600" },
    { icon: BadgeCheck, title: "Real-Time Tracking", desc: "Live task monitoring with instant status updates and progress visualization", color: "from-indigo-500 to-cyan-600" },
    { icon: FileUp, title: "Smart File Management", desc: "Drag-and-drop file handling with automated organization and version control", color: "from-cyan-500 to-blue-600" },
    { icon: Brain, title: "AI-Powered Insights", desc: "Intelligent task optimization and predictive analytics for better productivity", color: "from-blue-600 to-indigo-700" }
  ];

  const stats = [
    { number: "10K+", label: "Active Users", icon: Users },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "50%", label: "Time Saved", icon: Clock },
    { number: "4.9/5", label: "User Rating", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated bg */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/50">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-ping opacity-75"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors duration-300">Workflo</h1>
              <p className="text-xs text-blue-300 -mt-1">Next-gen productivity</p>
            </div>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link to="/features" className="hidden md:block text-white hover:text-blue-300 transition-colors duration-200">Features</Link>
            <Link to="/about" className="hidden md:block text-white hover:text-blue-300 transition-colors duration-200">About</Link>
            <Link to="/login" className="px-4 py-2 text-blue-300 hover:text-white transition-colors duration-200">Log in</Link>
            <Link to="/register" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg transform hover:scale-105">Sign up</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 text-center max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-full text-blue-300 text-sm font-medium border border-blue-500/30 backdrop-blur-sm">
            ✨ Introducing AI-Powered Workflow Management
          </span>
        </div>
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Transform Your
          <span className="block bg-gradient-to-r from-blue-400 via-indigo-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
            Workflow Forever
          </span>
        </h1>
        <p className="text-xl text-slate-300 mb-10 leading-relaxed">
          Experience the future of task management with AI-driven insights, seamless collaboration, and intelligent automation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/login" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300">
            Get Started
          </Link>
          <p to="/features" className="px-8 py-4 border border-slate-600 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
            Learn More
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Powerful Features for
            <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Modern Teams</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Streamline workflows, boost productivity, and scale your operations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} onMouseEnter={() => setActiveFeature(i)} className="group relative p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500">
              <div className={`w-12 h-12 bg-gradient-to-r ${f.color} rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 transform group-hover:scale-110 shadow-lg`}>
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">{f.title}</h3>
              <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900/50 to-indigo-900/20">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Get Started in
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"> Minutes</span>
          </h2>
          <p className="text-slate-300 text-lg">Simple setup, powerful results.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative max-w-7xl mx-auto">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transform -translate-y-1/2"></div>
          {[
            { icon: Users, title: "Sign Up", desc: "Create your account in seconds", step: "01" },
            { icon: UserCog, title: "Set Roles", desc: "Define team permissions", step: "02" },
            { icon: LayoutDashboard, title: "Create Tasks", desc: "Build your workflow", step: "03" },
            { icon: TrendingUp, title: "Track Progress", desc: "Monitor and optimize", step: "04" }
          ].map((item, idx) => (
            <div key={idx} className="relative text-center group">
              <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">          
                <item.icon className="w-8 h-8 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-xs font-bold text-slate-900">{item.step}</div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">{item.title}</h3>
              <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center p-12 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-3xl backdrop-blur-smborder border-blue-500/20">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Workflow?</h2>
          <p className="text-slate-300 text-lg mb-8">Join thousands of teams already using Workflo.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link to="/login" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300">
              Get Started Now
            </Link>
            <p to="/contact" className="px-8 py-4 text-blue-300 hover:text-white transition-colors duration-200 font-semibold">
              Contact Us
            </p>
          </div>
          <p className="text-slate-500 text-sm">Easy setup • Powerful features • Get started today</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center gap-50 items-center">
          
          <div className="flex justify-center items-center space-x-6 text-slate-400">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
            <div className="flex justify-center items-center space-x-4 mt-4">
              <span className="text-sm text-blue-200">Maintained and Developed by Vineet</span>
              <div className="flex items-center space-x-2">
                <a
                  href="https://www.linkedin.com/in/vineet-b6a0ab262"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors group"
                >
                  <Linkedin className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="mailto:vin.itku7277@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-colors group"
                >
                  <AtSign className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
      </footer>
    </div>
  );
};

export default ModernLandingPage;

