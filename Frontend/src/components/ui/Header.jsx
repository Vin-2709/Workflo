import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Header = ({ changeUser, name }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const logOutUser = async () => {
    changeUser(null);
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout/${id}/`);
    navigate('/home');
  };

  return (
<header className="relative z-10 bg-blue-950 backdrop-blur-xl border-b border-slate-700/50 shadow-xl">
      <div className="flex justify-between items-center w-full px-6 py-5 h-17">
        {/* Left side - Workflo branding */}
        <div className="flex items-center space-x-4 cursor-pointer group flex-shrink-0 ">
          <div className="relative">
            <div className="w-14 h-12 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/25">
              <Building2 className="w-7 h-9 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors duration-300">
              Workflo
            </h1>
            <p className="text-sm text-blue-300 -mt-1 font-medium">
              Streamline your tasks
            </p>
          </div>
        </div>

        {/* Right side - Greeting and logout */}
        <div className="flex items-center space-x-4 flex-shrink-0 ml-auto">
          {name && (
            <h2 className="text-xl font-semibold text-white hidden sm:block whitespace-nowrap">
              Hello, <span className="capitalize">{name}</span>!
            </h2>
          )}
          <button
            onClick={logOutUser}
            className="bg-red-600 h-9 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded-lg transition duration-300 shadow-md border border-red-700 whitespace-nowrap"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
