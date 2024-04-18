import { useState, useEffect } from "react";
import { axiosInstance } from "../../../api/axiosinstance";
import Navbar from "../../../Components/User/Navbar/Navbar";
import CourseIntroBanner from "./CourseIntroBanner";

function CourseIntro() {
  const [wishlistItemCount, setWishlistItemCount] = useState<number>(0);

  //for displaying wishlistCount to navbar
  useEffect(() => {
    axiosInstance
      .get("/getallwishlistitems")
      .then((response) => {
        if (response && response.data) {
          setWishlistItemCount(response.data.wishlistedCourses.length);
        }
      })
      .catch((error) => {
        console.error("Error fetching Wishlist count:", error);
      });
  }, []);
  return (
    <>
      <Navbar wishlistItemCount={wishlistItemCount} />
      <div>
        <CourseIntroBanner />
        <br />
      </div>
    </>
  );
}

export default CourseIntro;
