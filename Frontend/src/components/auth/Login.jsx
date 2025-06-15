
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link,useNavigate,useParams } from 'react-router-dom';
import logo from '../../pages/Images/logo2.png'
import LinkedIn from '../../pages/Images/linkedin2.jpg'
import mail from '../../pages/Images/gmail.webp'
import './Auth.css'



const Login = ({ loggedinuser }) => {
  const navigate=useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [role, setRole] = useState('admin')
  const [error, setError] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault() 
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        email,
        password,
        role,
      }, {
        withCredentials: true //for cookiess
      })
      console.log(response)
      loggedinuser(response.data.user); 
      const Data = response.data; 
      if (Data.success) {
        const userId = Data.userId;   
        const userRole = Data.user.role;
        if (userRole == 'admin') {
          navigate(`/admin/${userId}`);
        }
        else {
          navigate(`/employee/${userId}`);
        }
      }
    setEmail('')
    setPass('')
    setError('')
  } catch (err) {
    console.error('Login error:', err); 
    setError(err.response?.data?.message || 'Login failed ')
    setEmail('')
    setPass('')
    
  }
}

  return (
    <div className=" bg-radial-[at_50%_75%] from-blue-300 via-blue-400 to-indigo-500 to-90% flex flex-col justify-start  items-center h-screen  min-w-screen overflow-x-hidden">
       <header className='bg-blue-800 h-[80px] flex justify-between p-2 w-full '>
         <img src={logo} onClick={() => navigate('/')} className='ml-4 rounded-md w-[175px]'/>
         <div className='flex p-3 gap-3'>
            
         </div>
         
        </header>
      <div className="bg-gray-200 h-140 w-170 rounded-4xl mt-20">
        <form onSubmit={submitHandler} className="py-10 px-10 w-full h-full">
          <h1 className="w-full text-4xl text-blue-800 font-bold text-center my-5">
            Login
          </h1>
          {error && (
            <div className="text-center font-bold text-red-600">{error}</div>
          )}

          <div className="flex flex-col justify-start items-start ml-35">
            <label className="py-1 mt-15 font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 font-medium outline-none w-80 rounded-md p-2 border-1"
              placeholder="Enter Username"
              type="email"
            />

            <label className="text-1xl py-2 font-medium">Password</label>
            <input
              value={password}
              onChange={(e) => setPass(e.target.value)}
              className="py-2 font-medium outline-none w-80 rounded-md p-2 border-1"
              placeholder="Enter Password"
              type="password"
            />

            <div className="display flex px-1 mt-2">
              <h1>Role :</h1>
              <input
                type="radio"
                name="role"
                id="admin"
                value="admin"
                checked={role === 'admin'}
                onChange={(e) => setRole(e.target.value)}
                className="mx-1"
              />
              <label htmlFor="admin">Admin</label>

              <input
                type="radio"
                name="role"
                id="employee"
                value="employee"
                checked={role === 'employee'}
                onChange={(e) => setRole(e.target.value)}
                className="mx-1"
              />
              <label htmlFor="employee">Employee</label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-700 w-30 mx-60 mt-10 text-center text-white text-2xl p-2 rounded-md cursor-pointer"
          >
            Log In
          </button>

          <h2 className="text-center mt-4">or</h2>
          <Link to="/register"><h1 className='text-center underline text-[18px] text-blue-900' >Register</h1></Link>
        </form>
      </div>
      <footer className='bg-blue-950 h-50 flex flex-col justify-end p-10 mt-25 w-full  '>
                  <div className='flex text-white justify-center gap-3 mb-6'>
                      <h1>About Us   </h1>
                      
                      <h1>Contact Us</h1>
                  </div >
                  <div className='flex justify-center gap-2'>
                       <h1 className='text-white mb-0 text-center'>Maintained and Developed by Vineet </h1>
                       <a href='https://www.linkedin.com/in/vineet-b6a0ab262?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'  target="_blank"><img src={LinkedIn} className='h-[25px] rounded-md'/></a>
                       <a href="mailto:vin.itku7277@gmail.com" target="_blank"><img src={mail} className='h-[25px] rounded-md'/></a>
                  </div>
                 
      </footer>
    </div>
  )
}

export default Login
