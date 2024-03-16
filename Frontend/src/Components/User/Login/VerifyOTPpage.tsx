import logo1 from "../../../assets/logo1.jpg";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../api/axiosinstance";
import toast from "react-hot-toast";

function VerifyOTPpage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>("");
  const [email , setEmail] = useState<string>('');
  //State variables to manage minutes and seconds
  const [minutes,setMinutes]= useState(1) ;
  const[seconds,setSeconds] = useState(1);


//verify OTP Button functioning
  const otpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosInstance.post("/verify-otp", { otp })
    .then((response) => {
      if (response.data.message) {
        toast.success(response.data.message);
        navigate("/resetPassword" , {state : {email : email}});
      }
    });
  };

useEffect(() => {
    if(location.state && location.state.email){
      setEmail(location.state.email)
    }
  },[]);

//while click on Resend Otp
const resendOTP = () => {  
  axiosInstance.post('/send-otp', { email })
    .then((response) => {
      if (response.data.message) {
        toast.success(response.data.message);
        navigate('/verify-otp', { state: { email } });
        setMinutes(1);
        setSeconds(10);
      }
    })
    .catch((error) => {
      // Handle error
      console.error('Error sending OTP:', error);
    });
};


//OTP Timer
useEffect(()=>{
  const interval= setInterval(()=>{
    //Decrease seconds if greater than 0
    if(seconds >0){
      setSeconds(seconds-1)
    }  
    //When seconds reach 0,decrease minutes if  greater than 0
  if(seconds ===0){
    if(minutes ===0){
      //stop the countDown when both minutes and seconds are 0
      clearInterval(interval)
    }else{
      //Reset seconds to 59 and decrease minutes by 1
      setSeconds(59);
      setMinutes(minutes-1);
    }   
  }  
  },1000);
  return ()=>{
    //CleanUp: stop the interval when component unmounts
    clearInterval(interval)
  }
},[seconds]); //Return this effect when second changes



  return (
    <div className="flex min-h-screen justify-center items-center bg-blue-100">
    <div className="sm:max-w-md w-full bg-white p-6 rounded-lg shadow-md">
      <img className="mx-auto h-10 w-auto" src={logo1} alt="Smart Learning" />
      <h2 className="mt-6 text-center text-2xl font-bold leading-9 text-gray-900">
        Verify OTP
      </h2>

      <form
        onSubmit={otpSubmit}
        className="mt-8 space-y-6"
        action="#"
        method="POST"
      >
        <div className="rounded-md shadow-sm">
          <label
            htmlFor="otp"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            OTP
          </label>

          <div className="mt-1">
            <input
              id="otp"
              name="otp"
              type="number" // Allowing only numeric input
              onChange={(e) => setOtp(e.target.value)} // Call handleOtpChange when input changes
              value={otp} // Bind the value of the input field to the otp state
              placeholder="Enter your OTP"
              required // Input is required
              className="block w-full py-2 px-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <br />
          {/* OTP TIMER */}
          <div className="flex items-center justify-between">
            <div>
              <p>Time Remaining:{" "}
                <span style={{ fontWeight: 600 }}>
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </span>
              </p>
            </div>
            {/* BUTTON TO RESEND OTP */}
            <div>
              <button
                disabled={seconds > 0 || minutes > 0}
                style={{
                  fontWeight: 700,
                  color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                  textDecoration: "underline",
                }}
                onClick={resendOTP}
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Verify OTP
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}

export default VerifyOTPpage;
