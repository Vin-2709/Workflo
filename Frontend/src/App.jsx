import React, { useContext, useEffect, useState } from 'react';
import Login from './components/auth/Login.jsx'; 
import EmployeeDashboard from './components/dashboard/EmployeeDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import Register from './components/auth/Register.jsx'
import {  Routes, Route,Navigate } from 'react-router-dom';
import Dashboard from './components/layout/Dashboard.jsx';
import Home from './pages/Home.jsx';

const ProtectedRoute = ({ user, role, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/home" replace />;
  return children;
};

const app=()=>{
  const [user,setUser]=useState('');
  return  (

    <div>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home/>}/>
          <Route path='/login' element={<Login loggedinuser={setUser}/>}/>
          <Route path='/register' element={<Register/>}/>
          {/* <Route  path="/admin/:id" element={<AdminDashboard userdata={user} changeUser={setUser} />} />
          <Route  path="/employee/:id" element={<EmployeeDashboard userdata={user} changeUser={setUser} />} /> */}
          {/* Secure Admin Route */}
          <Route path="/admin/:id" element={
            <ProtectedRoute user={user} role="admin">
              <AdminDashboard userdata={user} changeUser={setUser} />
            </ProtectedRoute>
          } />

          {/* Secure Employee Route */}
          <Route path="/employee/:id" element={
            <ProtectedRoute user={user} role="employee">
              <EmployeeDashboard userdata={user} changeUser={setUser} />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={<Dashboard/>}/>
 
        </Routes>
           
    </div>
  )
}


export default app;




























