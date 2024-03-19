import Footer from "../../../Components/User/Footer/Footer";
import Homemain from "../../../Components/User/Homemain/Homemain";
import TutorBanner from "../../../Components/User/Banner/TutorBanner";
import Carousal from '../../../Components/User/Card/Carousel'
import Testimonials from "../../../Components/User/Card/Testimonial";
import Navbar from "../../../Components/User/Navbar/Navbar";

function Landingpage() {
  return (
    <div>
      <Navbar />
      <div className="mt- lg:px-0">
        <Homemain />
        <TutorBanner />
      </div>

      <Carousal heading="Popular Courses"/>
  <br/><br/>
  <Carousal heading="Recommended Courses For You"/>
  <br/><br/>
  <Carousal heading="Learners are viewing"/>
  <br/><br/>
  <Carousal heading="Short and Sweet Courses for you"/>
  <hr/>
  <Testimonials/>
<br/>   
<hr/>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Landingpage;
