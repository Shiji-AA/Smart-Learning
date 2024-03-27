import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import AuthrootState from '../../Redux/Rootstate/Authstate';
import TutorrootState from '../../Redux/Rootstate/Tutorstate';

interface PrivatePageProps {
    isStudent : boolean;          //received as props from App.jsx
}

const Privatepages : React.FC<PrivatePageProps> = ({isStudent}) => {
    const studentUser = useSelector((state: AuthrootState) => state.auth.userdata);
    const tutorUser = useSelector((state: TutorrootState) => state.tutor.tutordata);
    

    if(isStudent) {
        if(studentUser) {
            return <Outlet/>
        } else {
            return <Navigate to={'/login'}/>
        }
    } else {
        if(tutorUser) {
            return <Outlet/>
        } else {
            return <Navigate to={'/tutorLogin'}/>
        }
    }
}

export default Privatepages;
