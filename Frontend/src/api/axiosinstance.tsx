import axios from 'axios';
import toast from 'react-hot-toast'




export const axiosInstanceChat = axios.create({
    baseURL:'https://smartlearningofficial.online/api/chat'
})
//axiosInterceptor for Chat
axiosInstanceChat.interceptors.request.use((config) => {
    const chatToken = localStorage.getItem('tutorToken');

    if (chatToken !== null) {
        config.headers.authorization = `Bearer ${chatToken}`;
    }
    return config;
})
axiosInstanceChat.interceptors.response.use(
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


export const axiosInstancePayment = axios.create({
    baseURL:'https://smartlearningofficial.online/api/payment'
})
///////////////////////////////////////////////////////
export const axiosInstance = axios.create({
    baseURL:'https://smartlearningofficial.online/api/student'
})

//axiosInterceptor for student
axiosInstance.interceptors.request.use((config) => {
const studentToken = localStorage.getItem('studentToken');
if (studentToken !== null) {
config.headers.authorization = `Bearer ${studentToken}`;
}
return config;
}) 
//Response Part
axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
      if (error.response.data.status === 401 && error.response.data.error === "Unauthorized - No token found") {
       console.log(error.response,"Error.response")
        try {
          // Perform token refresh
          const refreshToken = localStorage.getItem('studentRefreshToken');
          const response = await axiosInstance.post('/refreshtoken', { refreshToken });

          const newToken = response.data.token;
          
          // Update local storage with the new token
          localStorage.setItem('studentToken', newToken);          
          // Retry the original request with the new token
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(error.config);

        } catch (refreshError) { 
        const error = refreshError as Error;         
          console.error('Error refreshing token:', error);         
          toast.error(error .message, { duration: 2000, style: { color: '#fff', background: 'black' } });        
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
  
///////////////////////////////////////////////////////

export const axiosInstanceTutor = axios.create({
    baseURL:'https://smartlearningofficial.online/api/tutor'
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
    async(error) => {
        if (error.response.data.status === 401 && error.response.data.error === "Unauthorized - No token found") {
            console.log(error.response,"Error.response")
             try {
               // Perform token refresh
               const refreshToken = localStorage.getItem('tutorRefreshToken');
               const response = await axiosInstanceTutor.post('/refreshtoken', { refreshToken });
     
               const newToken = response.data.token;
               
               // Update local storage with the new token
               localStorage.setItem('tutorToken', newToken);          
               // Retry the original request with the new token
               error.config.headers.Authorization = `Bearer ${newToken}`;
               return axiosInstanceTutor(error.config);
     
             } catch (refreshError) { 
             const error = refreshError as Error;         
               console.error('Error refreshing token:', error);         
               toast.error(error .message, { duration: 2000, style: { color: '#fff', background: 'black' } });        
               return Promise.reject(error);
             }
           }
        return Promise.reject(error);
    }
)

///////////////////////////////////////////////////////
export const axiosInstanceAdmin = axios.create({
    baseURL:'https://smartlearningofficial.online/api/admin'
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