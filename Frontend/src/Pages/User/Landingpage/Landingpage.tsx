import {useEffect,useState} from 'react'
import { axiosInstance } from "../../../api/axiosinstance";
import {Suspense,lazy} from "react";
import LoadingSpinner from '../../../Components/Common/LoadingSpinner';

const Homemain= lazy(()=>import("../../../Components/User/Homemain/Homemain")) ;
const TutorBanner = lazy(()=>import("../../../Components/User/Banner/TutorBanner"));
const Carousal= lazy(()=>import("../../../Components/User/Card/Carousel"));
const Testimonials= lazy(()=>import("../../../Components/User/Card/Testimonial"));
const Navbar = lazy(()=>import("../../../Components/User/Navbar/Navbar"));
const HeroSection= lazy(()=>import("../../../Components/User/Card/HeroSection"));
const Hello = lazy(()=>import("../../../Components/User/Card/Hello"));
const TutorFooter= lazy(()=>import("../../../Components/Tutor/Tutordashboard/Tutorfooter"));
const Statistics = lazy(()=>import("../../../Components/Tutor/Tutordashboard/Statistics"));
const FAQ = lazy(()=>import("../../../Components/Tutor/FAQ/FAQ"));



function Landingpage() {
  const [wishlistItemCount,setWishlistItemCount] = useState<number>(0);
  useEffect(()=>{
axiosInstance.get('/getallwishlistitems')
.then((response)=>{
if(response && response.data){
  setWishlistItemCount(response.data.wishlistedCourses.length)
}
})
.catch((error)=>{
  console.error("Error while fetching data",error)
})
  },[]);

  return (
    <>
    <Suspense fallback ={<LoadingSpinner/>}>
    <Navbar wishlistItemCount={wishlistItemCount}/>
        <HeroSection />
        <Statistics />       
        <Homemain />        
        <br />
        <br />
        <Hello />
        <br />
        <TutorBanner />
        <hr />
        <br />
        <Carousal heading="Popular Courses" />
        <br />
        <br />
        <Carousal heading="Recommended Courses For You" />
        <br />
        <br />
        <Carousal heading="Learners are viewing" />
        <br />
        <br />
        <Carousal heading="Short and Sweet Courses for you" />
        <hr />     
        <Testimonials />
        <br />
        <hr />
        <FAQ/>       
        <TutorFooter />      
    </Suspense>   
    </>
  );
}

export default Landingpage;
