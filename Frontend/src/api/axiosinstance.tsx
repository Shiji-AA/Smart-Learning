import axios from 'axios';
import toast from 'react-hot-toast'

///////////////////////////////////////////////////////
export const axiosInstance = axios.create({
    baseURL:'http://localhost:3000/api/student'
})

//axiosInterceptor for student
axiosInstance.interceptors.request.use((config) => {
const studentToken = localStorage.getItem('studentToken');
if (studentToken !== null) {
config.headers.authorization = `Bearer ${studentToken}`;
}
return config;
})

axiosInstance.interceptors.response.use(     
    (response) => response,
    (error) => {
        if (error.response && error.response.data) {
            console.log(error.response, "error")
            const errorMessage = error.response.data.error || 'An error occurred';
            // Show error toast with errorMessage
            toast.error(errorMessage, { duration: 2000, style: { color: '#fff', background: 'black' } });
        } else {
            console.error('Axios error:', error);
        }
        return Promise.reject(error);
    }
)
///////////////////////////////////////////////////////

export const axiosInstanceTutor = axios.create({
    baseURL:'http://localhost:3000/api/tutor'
})

//axiosInterceptor for Tutor
axiosInstanceTutor.interceptors.request.use((config) => {
    const tutorToken = localStorage.getItem('tutorToken');

    if (tutorToken !== null) {
        config.headers.authorization = `Bearer ${tutorToken}`;
    }
    return config;
})
axiosInstanceTutor.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.data) {          
            const errorMessage = error.response.data.error || 'An error occurred';
            // Show error toast with errorMessage
            toast.error(errorMessage, { duration: 2000, style: { color: '#fff', background: 'black' } });
        } else {
            console.error('Axios error:', error);
        }
        return Promise.reject(error);
    }
)

///////////////////////////////////////////////////////
export const axiosInstanceAdmin = axios.create({
    baseURL:'http://localhost:3000/api/admin'
})

//axiosInterceptor for Admin
axiosInstanceAdmin.interceptors.request.use((config)=>{
    const adminToken = localStorage.getItem('adminToken');
    if(adminToken !== null){
        config.headers.Authorization = `Bearer ${adminToken}`
    }
    return config;
})
axiosInstanceAdmin.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.data) {          
            const errorMessage = error.response.data.error || 'An error occurred';
            // Show error toast with errorMessage
            toast.error(errorMessage, { duration: 2000, style: { color: '#fff', background: 'black' } });
        } else {
            console.error('Axios error:', error);
        }
        return Promise.reject(error);
    }
)