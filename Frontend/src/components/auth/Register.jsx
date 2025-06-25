// import React from "react";
// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from 'react-router-dom'
// import { setDefaultLocale } from "react-datepicker";
// import logo from '../../pages/Images/logo2.png'
// import LinkedIn from '../../pages/Images/linkedin2.jpg'
// import mail from '../../pages/Images/gmail.webp'
// import './Auth.css'


// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [domain, setDomain] = useState("");
//   const [message, setMsg] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, { name, email, password, role, domain });
//       console.log(response);
//       setEmail("");
//       setName("");
//       setPassword("");
//       setError("")
//       setDomain("");
//       setMsg(response.data?.message);
//     } catch (error) {
//       setMsg("");
//       setError(error.response.data?.message || "Something went wrong, try again.");
//       setEmail("");
//       setName("");
//       setPassword("");
//       setDomain("");

//     }
//   }






//   return (
//     <div className=' bg-radial-[at_50%_75%] from-blue-300 via-blue-400 to-indigo-500 to-90%   flex flex-col justify-start items-center min-h-screen w-screen overflow-x-hidden'>
//       <header className='bg-blue-800 h-[80px] flex justify-between p-2 w-full '>
//         <img src={logo} onClick={() => navigate('/')} className='ml-4 rounded-md w-[175px]' />
//         <div className='flex p-3 gap-3'>

//         </div>

//       </header>
//       <main className="flex-grow flex justify-center items-start">
//         <div className='bg-gray-300 h-auto w-170 rounded-4xl  mt-20'>
//           <form onSubmit={(e) => {
//             submitHandler(e)
//           }}
//             className=' py-10 px-10 w-full h-full '>
//             <h1 className='w-full text-4xl text-blue-800 font-bold  text-center my-5 '>Create Account </h1>
//             {message ? <div className='text-center font-bold text-green-700'>{message}</div> : null}
//             {error ? <div className='text-center font-bold text-red-600'>{error}</div> : null}

//             <div className='flex flex-col justify-start items-start ml-35'>
//               <label className=' py-1  font-medium '>Full Name</label>
//               <input value={name} onChange={(e) => {
//                 setName(e.target.value)
//               }} className=' py-2 font-medium outline-none  w-80 rounded-md p-2 border-1 ' placeholder="Enter Name" type='text'></input>
//               <label className=' py-1  font-medium '>Email</label>
//               <input value={email} onChange={(e) => {
//                 setEmail(e.target.value)
//               }} className=' py-2 font-medium outline-none  w-80 rounded-md p-2 border-1 ' placeholder="Enter Username" type='email'></input>
//               <label className=' text-1xl py-2 font-medium'>Password</label>
//               <input value={password} onChange={(e) => {
//                 setPassword(e.target.value);
//               }} className='py-2 font-medium outline-none w-80 rounded-md p-2 border-1' placeholder='Enter Password' type='password'></input>
//               <label className=' text-1xl py-2 font-medium'>Domain</label>
//               <select id="domain" name="domain" value={domain} onChange={(e) => { setDomain(e.target.value) }} className='py-2 font-medium outline-none w-80 rounded-md p-2 border-1'>
//                 <option value="">Select Domain</option>
//                 <option value="development">Development</option>
//                 <option value="marketing">Marketing</option>
//                 <option value="finance">Finance</option>
//                 <option value="design">Design</option>
//                 <option value="sales">Sales</option>
//                 <option value="human-resources">Human Resources</option>
//                 <option value="education">Education</option>
//                 <option value="healthcare">Healthcare</option>
//                 <option value="engineering">Engineering</option>
//                 <option value="legal">Legal</option>
//               </select>
//               <div className='display flex px-1 mt-2'>
//                 <h1>Role :</h1>
//                 <input type="radio" name="role" id="admin" value="admin" checked={role === "admin"} onChange={(e) => {
//                   setRole(e.target.value)
//                 }} className='mx-1' />
//                 <label for="admin" >Admin</label>
//                 <input type="radio" name="role" id="employee" value="employee" checked={role === "employee"} onChange={(e) => {
//                   setRole(e.target.value)
//                 }} className='mx-1' />
//                 <label for="employee">Employee</label>
//               </div>
//             </div>
//             <button type='submit' className='bg-blue-700 w-50 mx-50 mt-10 text-center  text-white  text-2xl p-2  rounded-md cursor-pointer'>Create Account</button>
//             <h2 className="text-center mt-4">or</h2>
//             <Link to="/login"><h1 className='text-center underline text-[18px] text-blue-900' >Log in</h1></Link>


//           </form>
//         </div>
//       </main>
//       <footer className='bg-blue-950 h-50 flex flex-col justify-end p-10 mt-25 w-full  '>
//         <div className='flex text-white justify-center gap-3 mb-6'>
//           <h1>About Us   </h1>

//           <h1>Contact Us</h1>
//         </div >
//         <div className='flex justify-center gap-2'>
//           <h1 className='text-white mb-0 text-center'>Maintained and Developed by Vineet </h1>
//           <a href='https://www.linkedin.com/in/vineet-b6a0ab262?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' target="_blank"><img src={LinkedIn} className='h-[25px] rounded-md' /></a>
//           <a href="mailto:vin.itku7277@gmail.com" target="_blank"><img src={mail} className='h-[25px] rounded-md' /></a>
//         </div>

//       </footer>
//     </div>
//   )

// }


// export default Register;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { Mail, Lock, Shield, Building2, User, ArrowRight, Linkedin, AtSign, UserCircle2 } from "lucide-react";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [domain, setDomain] = useState("");
//   const [message, setMsg] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/register`,
//         { name, email, password, role, domain }
//       );
//       setEmail("");
//       setName("");
//       setPassword("");
//       setError("");
//       setDomain("");
//       setMsg(response.data?.message);
//     } catch (error) {
//       setMsg("");
//       setError(error.response.data?.message || "Something went wrong, try again.");
//       setEmail("");
//       setName("");
//       setPassword("");
//       setDomain("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-300 to-blue-800 relative overflow-hidden">
//       <header className="relative z-10 bg-blue-950 backdrop-blur-xl border-b border-slate-700/50 shadow-xl">
//         <div className="flex justify-start max-w-7xl px-6 py-5">
//           <div className="flex items-center space-x-4 cursor-pointer group">
//             <div className="relative">
//               <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/25">
//                 <Building2 className="w-7 h-7 text-white" />
//               </div>
//               <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-ping opacity-75"></div>
//               <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full"></div>
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors duration-300">Workflo</h1>
//               <p className="text-sm text-blue-300 -mt-1 font-medium">Streamline your tasks</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-160px)] px-6 py-12">
//         <div className="w-full max-w-md">
//           <div className="bg-blue-900 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
//             <form onSubmit={submitHandler} className="px-8 pt-8 pb-8 space-y-6">
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
//                   <UserCircle2 className="w-8 h-8 text-white" />
//                 </div>
//                 <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
//                 <p className="text-blue-200">Join the workspace today</p>
//               </div>

//               {message && (
//                 <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
//                   <p className="text-green-600 text-center text-md font-medium">{message}</p>
//                 </div>
//               )}
//               {error && (
//                 <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
//                   <p className="text-red-600 text-center text-md font-medium">{error}</p>
//                 </div>
//               )}

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-blue-100 flex items-center space-x-2">
//                   <User className="w-4 h-4" />
//                   <span>Full Name</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter your name"
//                   required
//                   className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 backdrop-blur-sm"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-blue-100 flex items-center space-x-2">
//                   <Mail className="w-4 h-4" />
//                   <span>Email</span>
//                 </label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   required
//                   className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 backdrop-blur-sm"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-blue-100 flex items-center space-x-2">
//                   <Lock className="w-4 h-4" />
//                   <span>Password</span>
//                 </label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   required
//                   className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 backdrop-blur-sm"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-blue-100 flex items-center space-x-2">
//                   <span>Domain</span>
//                 </label>
//                 <select
//                   value={domain}
//                   onChange={(e) => setDomain(e.target.value)}
//                   required
//                   className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
//                 >
//                   <option value="">Select Domain</option>
//                   <option value="development">Development</option>
//                   <option value="marketing">Marketing</option>
//                   <option value="finance">Finance</option>
//                   <option value="design">Design</option>
//                   <option value="sales">Sales</option>
//                   <option value="human-resources">Human Resources</option>
//                   <option value="education">Education</option>
//                   <option value="healthcare">Healthcare</option>
//                   <option value="engineering">Engineering</option>
//                   <option value="legal">Legal</option>
//                 </select>
//               </div>

//               <div className="space-y-3">
//                 <label className="text-sm font-semibold text-blue-100">Select Role</label>
//                 <div className="grid grid-cols-2 gap-3">
//                   <label className={`relative cursor-pointer group ${role === 'admin' ? 'ring-2 ring-blue-500' : ''}`}>
//                     <input
//                       type="radio"
//                       name="role"
//                       value="admin"
//                       checked={role === 'admin'}
//                       onChange={(e) => setRole(e.target.value)}
//                       className="sr-only"
//                     />
//                     <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${role === 'admin' ? 'bg-blue-500/20 border-blue-500 text-white' : 'bg-white/5 border-white/20 text-blue-200 hover:bg-white/10 hover:border-white/30'}`}>
//                       <div className="flex items-center justify-center space-x-2">
//                         <Shield className="w-5 h-5" />
//                         <span className="font-semibold">Admin</span>
//                       </div>
//                     </div>
//                   </label>
//                   <label className={`relative cursor-pointer group ${role === 'employee' ? 'ring-2 ring-blue-500' : ''}`}>
//                     <input
//                       type="radio"
//                       name="role"
//                       value="employee"
//                       checked={role === 'employee'}
//                       onChange={(e) => setRole(e.target.value)}
//                       className="sr-only"
//                     />
//                     <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${role === 'employee' ? 'bg-blue-500/20 border-blue-500 text-white' : 'bg-white/5 border-white/20 text-blue-200 hover:bg-white/10 hover:border-white/30'}`}>
//                       <div className="flex items-center justify-center space-x-2">
//                         <User className="w-5 h-5" />
//                         <span className="font-semibold">Employee</span>
//                       </div>
//                     </div>
//                   </label>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center space-x-2 group"
//               >
//                 <span>Create Account</span>
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>

//               <div className="relative flex items-center justify-center py-4">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-white/20"></div>
//                 </div>
//                 <div className="relative px-4">
//                   <span className="text-sm text-blue-200">or</span>
//                 </div>
//               </div>

//               <div className="text-center">
//                 <p className="text-blue-200">
//                   Already have an account?{' '}
//                   <Link to="/login" className="text-white hover:text-blue-400 font-semibold transition-colors hover:underline">
//                     Log in
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </main>

//       <footer className="relative z-10 bg-blue-900 backdrop-blur-xl border-t border-white/10">
//         <div className="w-full max-w-6xl mx-auto px-6 py-6">
//           <div className="flex flex-col items-center justify-between space-y-4 md:space-y-0">
//             <div className="flex items-center space-x-6 text-sm text-blue-200 mt-3">
//               <span className="hover:text-white cursor-pointer transition-colors">About Us</span>
//               <span className="hover:text-white cursor-pointer transition-colors">Contact Us</span>
//               <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
//             </div>
//             <div className="flex items-center space-x-4 mt-4">
//               <span className="text-sm text-blue-200">Maintained and Developed by Vineet</span>
//               <div className="flex items-center space-x-2">
//                 <a href="https://www.linkedin.com/in/vineet-b6a0ab262" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors group">
//                   <Linkedin className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
//                 </a>
//                 <a href="mailto:vin.itku7277@gmail.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-colors group">
//                   <AtSign className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  Building2,
  UserCircle2,
  User,
  Mail,
  Lock,
  Shield,
  ArrowRight,
  Linkedin,
  AtSign
} from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [domain, setDomain] = useState('');
  const [message, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
        { name, email, password, role, domain }
      );
      setMsg(data.message);
      setError('');
      // Optionally auto-redirect after registration:
      // navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong, try again.');
      setMsg('');
    }
    // clear fields
    setName('');
    setEmail('');
    setPassword('');
    setDomain('');
    setRole('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 to-blue-800 relative overflow-hidden">
      {/* Header */}
      <header className="relative z-10 bg-blue-950 backdrop-blur-xl border-b border-slate-700/50 shadow-xl">
        <div className="flex justify-start w-full px-6 py-5 h-16" onClick={()=>{navigate('/home')}} >
          <div className="flex items-center justify-between space-x-4 cursor-pointer group">
            <div className="relative">
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
      </header>

      {/* Main Form */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-160px)] px-6 py-12">
        <div className="w-full max-w-[35vw]">
          <div className="bg-blue-900 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            <form onSubmit={submitHandler} className="px-8 pt-8 pb-8 space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <UserCircle2 className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-blue-200">Join the workspace today</p>
              </div>

              {message && (
                <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                  <p className="text-green-600 text-center text-md font-medium">{message}</p>
                </div>
              )}
              {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                  <p className="text-red-600 text-center text-md font-medium">{error}</p>
                </div>
              )}

              {/* Name */}
              <div className="space-y-2 flex flex-col items-center">
                <label className="text-sm font-semibold text-blue-100 flex items-center space-x-2 w-80">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="w-80 px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-2 flex flex-col items-center">
                <label className="text-sm font-semibold text-blue-100 flex items-center space-x-2 w-80">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-80 px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              {/* Password */}
              <div className="space-y-2 flex flex-col items-center">
                <label className="text-sm font-semibold text-blue-100 flex items-center space-x-2 w-80">
                  <Lock className="w-4 h-4" />
                  <span>Password</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-80 px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              {/* Domain */}
              <div className="space-y-2 flex flex-col items-center">
                <label className="text-sm font-semibold text-blue-100 w-80">Domain</label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  required
                  className="w-80 px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                >
                  <option value="">Select Domain</option>
                  <option value="development">Development</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="design">Design</option>
                  <option value="sales">Sales</option>
                  <option value="human-resources">Human Resources</option>
                  <option value="education">Education</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="engineering">Engineering</option>
                  <option value="legal">Legal</option>
                </select>
              </div>

              {/* Role */}
              <div className="space-y-3 flex flex-col items-center">
                <label className="text-sm font-semibold text-blue-100 w-80">Select Role</label>
                <div className="grid grid-cols-2 gap-3 w-80">
                  <label className={`relative cursor-pointer group ${role === 'admin' ? 'ring-2 ring-blue-500' : ''}`}>
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={role === 'admin'}
                      onChange={(e) => setRole(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${role === 'admin' ? 'bg-blue-500/20 border-blue-500 text-white' : 'bg-white/5 border-white/20 text-blue-200 hover:bg-white/10 hover:border-white/30'}`}>
                      <div className="flex items-center justify-center space-x-2">
                        <Shield className="w-5 h-5" />
                        <span className="font-semibold">Admin</span>
                      </div>
                    </div>
                  </label>
                  <label className={`relative cursor-pointer group ${role === 'employee' ? 'ring-2 ring-blue-500' : ''}`}>
                    <input
                      type="radio"
                      name="role"
                      value="employee"
                      checked={role === 'employee'}
                      onChange={(e) => setRole(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${role === 'employee' ? 'bg-blue-500/20 border-blue-500 text-white' : 'bg-white/5 border-white/20 text-blue-200 hover:bg-white/10 hover:border-white/30'}`}>
                      <div className="flex items-center justify-center space-x-2">
                        <User className="w-5 h-5" />
                        <span className="font-semibold">Employee</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-80 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Link to Login */}
              <div className="relative flex items-center justify-center py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative px-4">
                  <span className="text-sm text-blue-200">or</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-blue-200">
                  Already have an account?{' '}
                  <Link to="/login" className="text-white hover:text-blue-400 font-semibold transition-colors hover:underline">
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative h-[15vh] z-10 bg-blue-900 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-6xl h-full mx-auto px-6 py-6 flex flex-col items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6 text-sm text-blue-200 mt-4">
            <span className="hover:text-white cursor-pointer transition-colors">About Us</span>
            <span className="hover:text-white cursor-pointer transition-colors">Contact Us</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-blue-200">Maintained and Developed by Vineet</span>
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

export default Register;

