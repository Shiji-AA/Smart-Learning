import Homemain from "../../../Components/User/Homemain/Homemain";
import TutorBanner from "../../../Components/User/Banner/TutorBanner";
import Carousal from "../../../Components/User/Card/Carousel";
import Testimonials from "../../../Components/User/Card/Testimonial";
import Navbar from "../../../Components/User/Navbar/Navbar";
import HeroSection from "../../../Components/User/Card/HeroSection";
import Hello from "../../../Components/User/Card/Hello";
import TutorFooter from "../../../Components/Tutor/Tutordashboard/Tutorfooter";
import Statistics from "../../../Components/Tutor/Tutordashboard/Statistics";
import FAQ from "../../../Components/Tutor/FAQ/FAQ";

function Landingpage() {
  return (
    <>
      <div>
        <Navbar />
        <HeroSection />
        <Statistics />
        {/* <div className="mt- lg:px-0"> */}
        <Homemain />
        {/* </div> */}
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
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Your content */}
          </div>
        </main>

        <TutorFooter />
      </div>
    </>
  );
}

export default Landingpage;
