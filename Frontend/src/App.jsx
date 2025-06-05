
import React, { useContext, useEffect, useState } from 'react';
import Login from './components/auth/Login.jsx'; 
import EmployeeDashboard from './components/dashboard/EmployeeDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import Register from './components/auth/Register.jsx'
import {  Routes, Route,useParams } from 'react-router-dom';
import Create from './components/other/Createtask.jsx';
import Dashboard from './components/other/Dashboard.jsx';
import Home from './pages/Home.jsx';
import Edittask from './pages/edittask.jsx';






const app=()=>{
  const [user,setUser]=useState('');
  return  (

    <div>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path='/login' element={<Login loggedinuser={setUser}/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route  path="/admin/:id" element={<AdminDashboard userdata={user} changeUser={setUser} />} />
          <Route  path="/employee/:id" element={<EmployeeDashboard userdata={user} changeUser={setUser} />} />
          <Route path="/createtask/:id" element={<Create/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/edit-task/:id" element={<Edittask/>}/>  
        </Routes>
    </div>
  )
}


export default app;
























