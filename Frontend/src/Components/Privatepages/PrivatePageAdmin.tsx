
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import AdminrootState from '../../Redux/Rootstate/Adminstate';

const PrivatePageAdmin : React.FC = () => {
    const adminUser =  useSelector((state:AdminrootState)=>state.admin.admindata);

    if(adminUser){
        return <Outlet />;
    }else {
    <Navigate to = {'/admin'}/>
   }
}

export default PrivatePageAdmin ;

