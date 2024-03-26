import Navbar from "../../../Components/User/Navbar/Navbar";
import Homemain from "../../../Components/User/Homemain/Homemain";
import TutorBanner from "../../../Components/User/Banner/TutorBanner";
import Hello from "../../../Components/User/Card/Hello";
import Carousal from "../../../Components/User/Card/Carousel";
import Testimonials from "../../../Components/User/Card/Testimonial";
import Tutorfooter from "../../../Components/Tutor/Tutordashboard/Tutorfooter";
import HeroSection from "../../../Components/User/Card/HeroSection";
import Statistics from "../../../Components/Tutor/Tutordashboard/Statistics";
import FAQ from "../../../Components/Tutor/FAQ/FAQ";
function Home() {
  return (
    <>
      <Navbar />
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
      <FAQ />
      <Tutorfooter />
    </>
  );
}

export default Home;
