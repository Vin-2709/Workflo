import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Shield, Building2, User, ArrowRight, Linkedin, AtSign, Info } from 'lucide-react';

const Login = ({ loggedinuser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        { email, password, role },
        { withCredentials: true }
      );

      const Data = response.data;
      if (Data.success) {
        loggedinuser(Data.user);
        const userId = Data.user?._id || Data.userId;
        const userRole = Data.user?.role;
        if (userRole === 'admin') {
          navigate(`/admin/${userId}`);
        } else {
          navigate(`/employee/${userId}`);
        }
      }

      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 to-blue-800 relative overflow-hidden flex flex-col">
      <header className="relative z-10 bg-blue-950 backdrop-blur-xl border-b border-slate-700/50 shadow-xl">
        <div className="flex justify-start w-full px-6 py-5 h-16" onClick={() => { navigate('/home') }} >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 cursor-pointer group">
              <div className="relative" >
                <div className="w-14 h-12 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/25">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-ping opacity-75"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors duration-300">Workflo</h1>
                <p className="text-sm text-blue-300 -mt-1 font-medium">Streamline your tasks</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {/* Changed flex properties here */}
      <main className="relative z-10 flex flex-grow items-center justify-center px-6 py-12">
        {/* Removed flex container for login + demo box */}
        {/* Login Form Section - now directly centered by main */}
        <div className="flex flex-col w-full max-w-md"> {/* Ensure login form has a max-width */}
          <div className="bg-blue-900 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            <div className="px-8 pt-8 pb-8 space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-blue-200">Sign in to access your workspace</p>
              </div>

              {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                  <p className="text-red-300 text-center text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="space-y-2 flex flex-col items-center">
                <label className="text-sm font-semibold text-blue-100 flex items-center space-x-2 w-full max-w-xs">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </label>
                <div className="relative w-full max-w-xs">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Mail className="w-5 h-5 text-blue-300" />
                  </div>
                </div>
              </div>

              <div className="space-y-2 flex flex-col items-center">
                <label className="text-sm font-semibold text-blue-100 flex items-center space-x-2 w-full max-w-xs">
                  <Lock className="w-4 h-4" />
                  <span>Password</span>
                </label>
                <div className="relative w-full max-w-xs">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-300 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3 flex flex-col items-center">
                <label className="text-sm font-semibold text-blue-100 w-full max-w-xs">Select Role</label>
                <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                  <label className={`relative cursor-pointer group rounded-xl ${role === 'admin' ? 'ring-2 ring-blue-500' : ''}`}>
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={role === 'admin'}
                      onChange={(e) => setRole(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-3 rounded-xl border-2 transition-all duration-300 ${role === 'admin' ? 'bg-blue-500/20 border-blue-500 text-white' : 'bg-white/5 border-white/20 text-blue-200 hover:bg-white/10 hover:border-white/30'}`}>
                      <div className="flex items-center justify-center space-x-2">
                        <Shield className="w-5 h-5" />
                        <span className="font-semibold text-sm">Admin</span>
                      </div>
                    </div>
                  </label>
                  <label className={`relative cursor-pointer group rounded-xl ${role === 'employee' ? 'ring-2 ring-blue-500' : ''}`}>
                    <input
                      type="radio"
                      name="role"
                      value="employee"
                      checked={role === 'employee'}
                      onChange={(e) => setRole(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-3 rounded-xl border-2 transition-all duration-300 ${role === 'employee' ? 'bg-blue-500/20 border-blue-500 text-white' : 'bg-white/5 border-white/20 text-blue-200 hover:bg-white/10 hover:border-white/30'}`}>
                      <div className="flex items-center justify-center space-x-2">
                        <User className="w-5 h-5" />
                        <span className="font-semibold text-sm">Employee</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={submitHandler}
                  disabled={isLoading}
                  className="w-full max-w-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center px-8">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative px-4 bg-blue-900">
                  <span className="text-sm text-blue-200">or</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-blue-200 text-sm">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-white hover:text-blue-400 font-semibold transition-colors hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Credentials Section - Positioned Absolutely */}
        {/* Changed positioning here */}
        <div className="fixed top-1/2 right-4 transform -translate-y-1/2 hidden lg:block w-auto max-w-xs z-20"> {/* Fixed position, hidden on small screens */}
          <div className="bg-blue-950/70 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Info size={20} className="text-blue-300" />
              Demo Credentials
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-blue-200">Admin:</p>
                <p className="text-white break-words">Email: <span className="font-mono">admin@example.com</span></p>
                <p className="text-white">Password: <span className="font-mono">admin123</span></p>
              </div>
              <div>
                <p className="font-medium text-blue-200">Employee:</p>
                <p className="text-white break-words">Email: <span className="font-mono">employee@example.com</span></p>
                <p className="text-white">Password: <span className="font-mono">employee123</span></p>
              </div>
            </div>
          </div>
        </div>

      </main>

      <footer className="relative z-10 bg-blue-900 backdrop-blur-xl border-t border-white/10 mt-auto">
        <div className="w-full max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-blue-200 mt-3">
              <span className="hover:text-white cursor-pointer transition-colors">About Us</span>
              <span className="hover:text-white cursor-pointer transition-colors">Contact Us</span>
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            </div>
            <div className="flex items-center space-x-4 mt-4">
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
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;