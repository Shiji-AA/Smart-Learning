import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL:'http://localhost:3000/api/student'
})
export const axiosInstanceAdmin = axios.create({
    baseURL:'http://localhost:3000/api/admin'
})
export const axiosInstanceTutor = axios.create({
    baseURL:'http://localhost:3000/api/tutor'
})