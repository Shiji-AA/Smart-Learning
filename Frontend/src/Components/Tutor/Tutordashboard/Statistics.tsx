import React,{useEffect,useState} from 'react';
import { axiosInstanceAdmin } from '../../../api/axiosinstance';

function Statistics() {
    const [count,setCount] = useState({ 
        tutorRevenue:0,
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
        <section className="text-gray-600 body-font">
            <div className="container px-6 py-12 mx-auto">
                <div className="flex flex-wrap w-full mb-8">                   
                </div>
                <div className="flex flex-wrap -m-4 text-center">
                    <div className="p-4 sm:w-1/4 w-1/2">
                        <div className="bg-indigo-500 rounded-lg p-2 xl:p-6">
                            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">{count?.tutorRevenue}</h2>
                            <p className="leading-relaxed text-gray-100 font-bold">Total Revenue Generated</p>
                        </div>
                    </div>
                    <div className="p-4 sm:w-1/4 w-1/4">
                        <div className="bg-indigo-500 rounded-lg p-2 xl:p-6">
                            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">{count?.totalUsersCount}</h2>
                            <p className="leading-relaxed text-gray-100 font-bold">Total Students</p>
                        </div>
                    </div>
                    <div className="p-4 sm:w-1/4 w-1/2">
                        <div className="bg-indigo-500 rounded-lg p-2 xl:p-6">
                            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">{count?.totalCourseCount}</h2>
                            <p className="leading-relaxed text-gray-100 font-bold">Total Courses</p>
                        </div>
                    </div>
                    <div className="p-4 sm:w-1/4 w-1/2">
                        <div className="bg-indigo-500 rounded-lg p-2 xl:p-6">
                            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">{count?.totalOrderCount}</h2>
                            <p className="leading-relaxed text-gray-100 font-bold">Total Orders</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Statistics;
