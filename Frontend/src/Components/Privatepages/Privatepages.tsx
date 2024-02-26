import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import AuthrootState from '../../Redux/Rootstate/Authstate';

const Privatepages = () => {
    const studentUser = useSelector((state : AuthrootState)=>state.auth.userdata)
  return (
    <div>
        {studentUser ? <Outlet/> : <Navigate to={'/login'}/> }
    </div>
  );
}

export default Privatepages;
