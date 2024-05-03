import{Suspense,lazy} from 'react';
import {useEffect,useState} from 'react'
import { axiosInstance } from "../../../api/axiosinstance";
import LoadingSpinner from '../../../Components/Common/LoadingSpinner';
import Usercourseslist1 from '../../../Components/User/CourseDetail/Usercourselist1';
import Hero1 from '../../../Components/User/Card/Hero1';


const Navbar =lazy(()=>import("../../../Components/User/Navbar/Navbar"));
//const Homemain=lazy(()=>import("../../../Components/User/Homemain/Homemain"));
const TutorBanner=lazy(()=>import("../../../Components/User/Banner/TutorBanner"));
const Hello=lazy(()=>import("../../../Components/User/Card/Hello"));
const Carousal=lazy(()=>import("../../../Components/User/Card/Carousel"));
const Testimonials=lazy(()=>import("../../../Components/User/Card/Testimonial"));
const Tutorfooter=lazy(()=>import("../../../Components/Tutor/Tutordashboard/Tutorfooter"));
//const HeroSection=lazy(()=>import("../../../Components/User/Card/HeroSection"));
const Statistics=lazy(()=>import( "../../../Components/Tutor/Tutordashboard/Statistics"));
const FAQ =lazy(()=>import("../../../Components/Tutor/FAQ/FAQ"));


function Home() {
  const [wishlistItemCount,setWishlistItemCount]=useState<number>(0)


  useEffect(()=>{
    axiosInstance.get('getallwishlistitems')
    .then((response)=>{
      if(response && response.data){
        setWishlistItemCount(response.data.wishlistedCourses.length)
      }
    })
    .catch((error)=>{
      console.error("Error in fetching wishlistCount",error)
    })

  },[])

  return (
    <>
    <Suspense fallback={<LoadingSpinner/>}>
    { <Navbar wishlistItemCount={wishlistItemCount} /> }
    <Hero1/>
      {/* <HeroSection /> */}
      <Statistics />
      {/* <Homemain /> */}
      <Carousal heading="Recommended Courses For You" />
      <Usercourseslist1/>
      <br />
      <br />
      <Hello />
      <br />
      <TutorBanner />
      <hr />
      <br />

      {/* <Carousal heading="Popular Courses" />
      <br /> */}
      <br />
   
      <br />
      <br />
      {/* <Carousal heading="Learners are viewing" />
      <br /> */}
      {/* <br />
      <Carousal heading="Short and Sweet Courses for you" /> */}
      <hr />
      <Testimonials />
      <br />
      <hr />
      <FAQ />
      <Tutorfooter />
    </Suspense>
     
    </>
  );
}

export default Home;
