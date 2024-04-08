import { useEffect, useState } from "react";
import { axiosInstance } from "../../../api/axiosinstance";
 import {Suspense,lazy} from 'react';
 import LoadingSpinner from "../../../Components/Common/LoadingSpinner";

const Navbar=lazy(()=>import("../../../Components/User/Navbar/Navbar"));
const BuyNow1 =lazy(()=>import( "../../../Components/User/CourseDetail/BuyNow1"));
const TutorFooter =lazy(()=>import("../../../Components/Tutor/Tutordashboard/Tutorfooter"));
const Carousal =lazy(()=>import("../../../Components/User/Card/Carousel"));
const PricingPlan=lazy(()=>import("../../../Components/User/CourseDetail/PricingPlan"));
const ClientsOpinion =lazy(()=>import("../../../Components/User/CourseDetail/ClientsOpinion"));
const ExecutiveTeam=lazy(()=>import( "../../../Components/User/CourseDetail/ExecutiveTeam"));
const FAQ =lazy(()=>import("../../../Components/Tutor/FAQ/FAQ"));


function CourseDetailPage() {
  const [wishlistItemCount, setWishlistItemCount] = useState<number>(0);

    //for displaying wishlistCount to navbar
    useEffect(()=>{
      axiosInstance.get('/getallwishlistitems')
      .then((response)=>{
        if (response && response.data) {
          setWishlistItemCount(response.data.wishlistedCourses.length);
        }
      })
      .catch((error)=>{
        console.error("Error fetching Wishlist count:", error);
      })
    },[]);
    
  return (
    <>
    <Suspense fallback={<LoadingSpinner/>}>
    <Navbar wishlistItemCount={wishlistItemCount}/>
      <BuyNow1 />
      <br />
      <hr/>
      <br/>
      <Carousal heading="Students also bought this" />
      <br/><br/>
      <Carousal heading="Featured Courses" />
      <ClientsOpinion />
      <hr/>
      <ExecutiveTeam />
      <hr/>
      <PricingPlan />
      <hr/>
      <FAQ/>
      <TutorFooter />
    </Suspense>
      
    </>
  );
}

export default CourseDetailPage;
