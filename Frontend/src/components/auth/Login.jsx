
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link,useNavigate,useParams } from 'react-router-dom'



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
    <div className=" bg-radial-[at_50%_75%] from-sky-400 via-blue-400 to-indigo-500 to-90% flex flex-col justify-center items-center h-screen w-screen">
      <div className="bg-gray-200 h-140 w-170 rounded-4xl">
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
    </div>
  )
}

export default Login
