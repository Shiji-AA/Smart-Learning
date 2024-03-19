//import image1 from '../../../assets/image1.jpg'
//import Footer from '../../../Components/User/Footer/Footer';
import Navbar from '../../../Components/User/Navbar/Navbar';
import Homemain from '../../../Components/User/Homemain/Homemain';
import TutorBanner from '../../../Components/User/Banner/TutorBanner';
import Hello from '../../../Components/User/Card/Hello';
import Carousal from '../../../Components/User/Card/Carousel'
import Testimonials from '../../../Components/User/Card/Testimonial'
import Tutorfooter from '../../../Components/Tutor/Tutordashboard/Tutorfooter'
import HeroSection from '../../../Components/User/Card/HeroSection';
import Statistics from '../../../Components/Tutor/Tutordashboard/Statistics';
function Home() {
  return (

    <>
  <Navbar/> 
  <HeroSection/> 
  <Statistics/>
  <Homemain />
  <br/><br/>
  <Hello/>
  <br/>
  <TutorBanner/>
  <hr/> 
  <br/> 
    
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
  {/* <img src={image1} alt="Placeholder" /> */}
 <Tutorfooter />
     
    </>
  );
}

export default Home;
