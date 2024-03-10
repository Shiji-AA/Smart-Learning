
import { axiosInstanceAdmin } from '../../../api/axiosinstance';
import { useNavigate } from 'react-router-dom';
import logo1 from '../../../assets/logo1.jpg';
import { useState } from "react";
import toast from "react-hot-toast";
import {  useDispatch,useSelector} from 'react-redux'
import { setAdminInfo } from '../../../Redux/Slices/Adminslice';
import AdminrootState from '../../../Redux/Rootstate/Adminstate';


export default function Example() {
 
const[email,setEmail]= useState<string>("")
const[password,setPassword]=useState<string>("")

const adminUser = useSelector((state : AdminrootState) => state.admin.admindata)
  const navigate = useNavigate();
  const dispatch= useDispatch()

console.log(adminUser)
const handleSubmit=(e :React.FormEvent<HTMLFormElement>)=> {
  e.preventDefault();
  axiosInstanceAdmin.post('/admin',{email,password})
  .then((response)=>{
    console.log(response)
    if(response.data.message){
      localStorage.setItem("adminToken",response.data.token) // for setting token in local storage
      dispatch(setAdminInfo(response.data))
      toast.success(response.data.message);   
      navigate('/admindashboard')
    }

  })
 
 

}
  return (
    <div className="flex min-h-screen justify-center items-center bg-blue-50">
      <div className="bg-white rounded-lg border border-gray-300 shadow-md overflow-hidden sm:max-w-sm sm:w-full">
        <div className="px-6 py-8">
          <img
            className="mx-auto h-20 w-auto"
            src={logo1}
            alt="Smart Learning"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 text-gray-900">
            Login As Admin
          </h2>

          <form onSubmit ={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="Enter your username"
                  autoComplete="email"
                  required
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="/tutorforgot" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
               ADMIN LOGIN
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
