import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { setDefaultLocale } from "react-datepicker";
import dotenv from 'dotenv';
dotenv.config({});

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [domain, setDomain] = useState("");
  const [message, setMsg] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, { name, email, password, role, domain });
      console.log(response);
      setEmail("");
      setName("");
      setPassword("");
      setError("")
      setDomain("");
      setMsg(response.data?.message);
    } catch (error) {
      setMsg("");
      setError(error.response.data?.message || "Something went wrong, try again.");
      setEmail("");
      setName("");
      setPassword("");
      setDomain("");

    }
  }






  return (
    <div className=' bg-violet-950  flex flex-col justify-center items-center h-screen w-screen '>
      <div className='bg-gray-300 h-auto w-170 rounded-4xl '>
        <form onSubmit={(e) => {
          submitHandler(e)
        }}
          className=' py-10 px-10 w-full h-full '>
          <h1 className='w-full text-4xl text-blue-800 font-bold  text-center my-5 '>Create Account </h1>
          {message ? <div className='text-center font-bold text-green-700'>{message}</div> : null}
          {error ? <div className='text-center font-bold text-red-600'>{error}</div> : null}

          <div className='flex flex-col justify-start items-start ml-35'>
            <label className=' py-1  font-medium '>Full Name</label>
            <input value={name} onChange={(e) => {
              setName(e.target.value)
            }} className=' py-2 font-medium outline-none  w-80 rounded-md p-2 border-1 ' placeholder="Enter Name" type='text'></input>
            <label className=' py-1  font-medium '>Email</label>
            <input value={email} onChange={(e) => {
              setEmail(e.target.value)
            }} className=' py-2 font-medium outline-none  w-80 rounded-md p-2 border-1 ' placeholder="Enter Username" type='email'></input>
            <label className=' text-1xl py-2 font-medium'>Password</label>
            <input value={password} onChange={(e) => {
              setPassword(e.target.value);
            }} className='py-2 font-medium outline-none w-80 rounded-md p-2 border-1' placeholder='Enter Password' type='password'></input>
            <label className=' text-1xl py-2 font-medium'>Domain</label>
            <select id="domain" name="domain" value={domain} onChange={(e) => { setDomain(e.target.value) }} className='py-2 font-medium outline-none w-80 rounded-md p-2 border-1'>
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
            <div className='display flex px-1 mt-2'>
              <h1>Role :</h1>
              <input type="radio" name="role" id="admin" value="admin" checked={role === "admin"} onChange={(e) => {
                setRole(e.target.value)
              }} className='mx-1' />
              <label for="admin" >Admin</label>
              <input type="radio" name="role" id="employee" value="employee" checked={role === "employee"} onChange={(e) => {
                setRole(e.target.value)
              }} className='mx-1' />
              <label for="employee">Employee</label>
            </div>
          </div>
          <button type='submit' className='bg-blue-700 w-50 mx-50 mt-10 text-center  text-white  text-2xl p-2  rounded-md cursor-pointer'>Create Account</button>
          <h2 className="text-center mt-4">or</h2>
          <Link to="/login"><h1 className='text-center underline text-[18px] text-blue-900' >Log in</h1></Link>


        </form>
      </div>
    </div>
  )

}


export default Register;
