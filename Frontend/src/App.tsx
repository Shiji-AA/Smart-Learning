import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/User/Login/Login';
import SignUp from './Components/User/SignUp/SignUp';
import HomePage from "./Pages/User/Home/HomePage";
import Forgotpassword from "./Components/User/Login/Forgotpassword";
import Resetpassword from "./Components/User/Login/Resetpassword";
import UserProfile from "./Pages/User/UserProfile/UserProfile";
import Landingpage from "./Pages/User/Landingpage/Landingpage";
import EditProfile from "./Components/User/UserProfile/Editprofile";



function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} /> 
        <Route path="/forgot" element={<Forgotpassword />} /> 
        <Route path="/reset" element={<Resetpassword />} /> 
        <Route path="/register" element={<SignUp />} /> 
        <Route path="/userprofile" element={<UserProfile/>}  />  
        <Route path="/home" element={<Landingpage/>}  />  
        <Route path="/editprofile" element={<EditProfile/>}  />  
        </Routes>
    </Router>
  
  )
}

export default App
