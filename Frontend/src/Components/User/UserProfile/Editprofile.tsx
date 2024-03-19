import { useNavigate } from 'react-router-dom';
import { useState ,useEffect} from "react";
import { axiosInstance } from "../../../api/axiosinstance";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../Redux/Slices/Authslice';
import Navbar from '../../../Components/User/Navbar/Navbar'

function EditProfile() {
  const navigate = useNavigate();
  const{id}=useParams();
  const dispatch= useDispatch();
  const [studentName,setstudentName] =useState<string>("");
  const [studentEmail,setstudentEmail] =useState<string>("");
  const [phone,setPhone] =useState<string>("");
  const [studentDetails, setStudentDetails] = useState<any>(null);

useEffect(()=>{
  axiosInstance.get(`/editProfile`)
  .then((response)=>{
    if(response.data){
      setStudentDetails(response.data?.studentDetails);
      setstudentName(response.data?.studentDetails?.studentName) 
      setstudentEmail(response.data?.studentDetails?.studentEmail) 
      setPhone(response.data?.studentDetails?.phone) ;      
    }
  })
  .catch((error)=>{
    console.log(error)
  })

},[]);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    axiosInstance.put(`/updateprofile`,{studentName,studentEmail,phone})
    .then((response)=>{
      if(response){
        console.log(response)
        setStudentDetails(response.data.studentDetails) ;
        dispatch(updateProfile(response.data.userData))     
        navigate('/userprofile');
      }
    })  
  };

  return (
<>
<Navbar/>
<div className="bg-gradient-to-b from-blue-200 to-white p-4 rounded-lg">
<div className="min-h-screen">
  <br/>
  <div className="text-2xl font-semibold mb-4 text-center">Edit Student Profile</div>
  <div className="flex justify-center items-center pb-8">
    <div className="max-w-4xl w-full mx-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md w-4/5 mx-auto">
        <form onSubmit={handleSubmit} className="p-4 space-y-4">     
          <div className="flex items-center">
            <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input
              type="text"
              id="username"
              className="w-2/3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={studentName}
              onChange={(e) => setstudentName(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-2/3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={studentEmail}
              onChange={(e) => setstudentEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label className="block w-1/3 text-sm font-medium text-gray-900 dark:text-white">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="w-2/3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>       
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update
          </button>         
        </form>
      </div>
    </div>
  </div>
</div>
</div>


</>

    
  );
}

export default EditProfile;
