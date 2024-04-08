import {useState,useEffect} from 'react'
import { axiosInstanceAdmin } from '../../../api/axiosinstance';


function Adminstatistics() {
const [count,setCount] = useState({ 
  adminRevenue:0,
  totalUsersCount:0,
  totalOrderCount:0,
  totalTutorCount:0,
  totalCourseCount:0})  


useEffect(()=>{
axiosInstanceAdmin.get('/totalcount')
.then((response)=>{
  if(response){
    console.log(response.data,"totalSales")
    setCount(response.data)
  }
})
.catch((error)=>{
console.log(error)
})

  },[])

  return (
    <>
    {/* <div className="w-full md:w-1/3 mx-auto bg-white p-4">
    <div className="p-5 leading-normal text-blue-600 bg-blue-100 rounded-lg" role="alert">
	<h2 className="text-lg font-semibold">Alert Header Here</h2>
	<p className="mt-2">A simple basic info alert with text</p>
  </div>
    </div> */}


    <div className="relative m-6 inline-flex w-fit">
  <div
    className="absolute bottom-auto left-0 right-auto top-0 z-10 inline-block -translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-pink-700 p-2.5 text-xs"></div>
  <div
    className="flex items-center justify-center rounded-lg bg-indigo-400 px-8 py-6 text-center text-white shadow-lg dark:text-gray-200">
    <span className="[&>svg]:h-10 [&>svg]:w-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
          clip-rule="evenodd" />
      </svg>
    </span>
  </div>
</div>
  
  
      <div className="bg-gray-100 flex justify-between ml-3 mt-10">
        <div className="flex gap-10">
          <div
            className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-6 rounded-lg border-2 border-purple-500"
            style={{ width: "300px", height: "180px" }}
          >
            <div className="text-lg text-purple-300">Total Users</div>
            <div className="text-4xl text-purple-100">{count?.totalUsersCount}</div>
          </div>
          <div
            className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-6 rounded-lg border-2 border-purple-500"
            style={{ width: "300px", height: "180px" }}
          >
            <div className="text-lg text-purple-300">Total Tutors</div>
            <div className="text-4xl text-purple-100">{count?.totalTutorCount}</div>
          </div>
          <div
            className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-6 rounded-lg border-2 border-purple-500"
            style={{ width: "300px", height: "180px" }}
          >
            <div className="text-lg text-purple-300">Total Orders</div>
            <div className="text-4xl text-purple-100">{count?.totalOrderCount}</div>
             </div>
             
          <div
            className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-6 rounded-lg border-2 border-purple-500"
            style={{ width: "300px", height: "180px" }}
          >
            <div className="text-lg text-purple-300">Total Revenue</div>
            <div className="text-4xl text-purple-100">{count?.adminRevenue}</div>
          </div>

        </div>
      </div>
    </>
  );
  
}

export default Adminstatistics;

