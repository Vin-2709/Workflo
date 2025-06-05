import React from 'react'
import Login from '../auth/Login.jsx'
import { useNavigate,useParams } from 'react-router-dom'
import logo from '../../pages/Images/logo2.png'
import axios from 'axios';
axios.defaults.withCredentials = true;



const Header = ({changeUser,name}) => {
  const {id}=useParams();
  const navigate=useNavigate();
  const logOutUser = async() => {
  changeUser(null);
  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout/${id}/`);
  navigate('/home');
  }

  return (
    <div className='flex h-20 items-center justify-between px-2 bg-blue-800 '>
      <div className='flex   '>
         <img src={logo} className='h-19 w-42'/>
        <h1 className='text-white  text-3xl font-extrabold px-6 align-text-bottom mt-6 font-serif'>
          Hello, {name?.toLowerCase()} !
        </h1>
      </div>
     
      <button 
        onClick={logOutUser} 
        className='bg-red-600 rounded-md w-22 h-11 text-[18px] shadow-red-950 border-[1px] border-red-950 shadow-md text-white m-2 cursor-pointer '
      >
        Log out
      </button>
    </div>
  )
}

export default Header
