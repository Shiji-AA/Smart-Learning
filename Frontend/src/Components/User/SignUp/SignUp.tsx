import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo1 from '../../../assets/logo1.jpg';
import toast from "react-hot-toast";
import { axiosInstance } from "../../../api/axiosinstance";

export default function Example() {
  const[name,setName] = useState<string>('');
  const[email,setEmail] = useState<string>('');
  const[phone,setPhone] = useState<string>('');
  const[password,setPassword] = useState<string>(''); 
  const[confirmpassword,setConfirmpassword] = useState<string>('');

  const navigate=useNavigate()

  const handleSubmit=(e :React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    if(password !== confirmpassword){
      return toast.error("Incorrect password")
    }

    axiosInstance.post('/register',{name,email,phone,password})
    .then((response)=>{
      if(response.data.message){
        toast.success(response.data.message)
        navigate('/login')
      }

    })
    .catch((error)=>{
      if(error.response.data.error){
        toast.error(error.response.data.error)
      }
    })

  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-blue-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white p-6 rounded-lg shadow-md">
          <img
            className="mx-auto h-10 w-auto"
            src={logo1}
            alt="Smart Learning"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">

          <div className="rounded-md shadow-sm">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="name"
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                  placeholder="Enter your Name"
                  autoComplete="name"
                  required
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="rounded-md shadow-sm">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="rounded-md shadow-sm">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e)=>{setPhone(e.target.value)}}
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  required
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
        
            <div className="rounded-md shadow-sm">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="rounded-md shadow-sm">
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  onChange={(e)=>{setConfirmpassword(e.target.value)}}
                  value={confirmpassword}
                  placeholder="Repeat Password"
                  autoComplete="current-password"
                  required
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
        
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              > Sign up 
              </button>
            </div>
          </form>
          
          <p className="mt-6 text-center text-sm text-gray-500">
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Already have an account? Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
