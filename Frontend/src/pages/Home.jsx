import React,{useState} from 'react'
import logo from './Images/logo2.png'
import mainImg from './Images/main4.jpg'
import { Link } from 'react-router-dom'
import LinkedIn from './Images/linkedin2.jpg'
import mail from './Images/gmail.webp'
import './home.css'


const Home=()=>{
    return (
        <div className='flex flex-col min-h-screen'>
        <header className='bg-violet-900 h-[80px] flex justify-between p-2'>
         <img src={logo} className='ml-4 rounded-md w-[175px]'/>
         <div className='flex p-3 gap-3'>
           <Link to="/login"><button className='bg-white text-black h-9 w-21 rounded  text-[18px] cursor-pointer'>Log in</button></Link> 
           <Link to="/register"><button className='bg-white text-black h-9 w-21 rounded  text-[18px] cursor-pointer'>Sign up</button></Link> 
         </div>
         
        </header>
        <main className='flex-grow flex justify-center items-center'>
            <img src={mainImg} className='h-[700px]'/>
        </main>
        <footer className='bg-indigo-950 h-[220px] flex flex-col justify-end p-3 '>
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

export default Home;
