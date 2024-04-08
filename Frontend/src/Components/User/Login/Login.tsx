import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo1 from '../../../assets/logo1.jpg';
import office2 from '../../../assets/office2.jpg'
import { axiosInstance } from '../../../api/axiosinstance';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../../Redux/Slices/Authslice';
import AuthrootState from '../../../Redux/Rootstate/Authstate';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
//import logo2 from '../../../assets/logo2.jpeg'

export default function Example() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const studentUser = useSelector((state: AuthrootState) => state.auth.userdata);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (studentUser) {
      navigate('/home');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosInstance.post("/login", { email, password })
      .then((response) => {
        if (response.data.message) {
          localStorage.setItem("studentToken", response.data.token);        
          localStorage.setItem("studentRefreshToken", response.data.refreshToken)
          dispatch(setUserInfo(response.data.userData));
          toast.success(response.data.message);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log('here', error);
        if (error.response.data.error) {
          toast.success(error.response.data.error);
        }
      });
  }

  return (
    <>
      <GoogleOAuthProvider clientId='637652104947-bvpng7ti4gvs5io0hbe4k3b1ui077pjc.apps.googleusercontent.com'>
        <div className="flex justify-center items-center min-h-screen bg-cover" style={{ backgroundImage: `url(${office2})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', width: '100vw' }}>
          <div className="bg-transparent rounded-lg border border-gray-300 shadow-md overflow-hidden sm:max-w-sm sm:w-full">
            <div className="px-6 py-8"style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(4px)' }}>
              <img
                className="mx-auto h-20 w-auto"
                src={logo1}
                alt="Smart Learning"
              />
              <h2 className="mt-6 text-center text-2xl font-bold leading-9 text-gray-900">
                Login to your account
              </h2>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST" >
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
                      onChange={(e) => { setEmail(e.target.value) }}
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
                    <div className="text-sm">
                      <a href="/forgot" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value) }}
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
                    LOGIN
                  </button>
                </div>
              </form>

              <p className="mt-6 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Sign Up here
                </Link>
              </p>

              {/* Google Authentication */}
              <div id="signInButton">
                <GoogleLogin
                  type='standard'
                  theme='filled_black'
                  size='large'
                  onSuccess={response => {
                    axiosInstance.post('/google/login', response)
                      .then((res) => {
                        console.log(res, 'google @')
                        if (res.data.message) {
                          localStorage.setItem("studentToken", res.data.token);
                          localStorage.setItem("studentRefreshToken", res.data.refreshToken);
                          dispatch(setUserInfo(res.data.userData));
                          toast.success(res.data.message);
                          navigate('/home');
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                        toast.error(error.response.data.error);
                      });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}
