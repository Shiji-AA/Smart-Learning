//import image1 from '../../../assets/image1.jpg'
import Footer from '../../../Components/User/Footer/Footer';
import Navbar from '../../../Components/User/Navbar/Navbar';
import Homemain from '../../../Components/User/Homemain/Homemain';
import TutorBanner from '../../../Components/User/Banner/TutorBanner';
import Hello from '../../../Components/User/Card/Hello';
import Carousal from '../../../Components/User/Card/Carousel'
import Testimonial from '../../../Components/User/Card/Testimonial'
function Home() {
  return (

    <>
  <Navbar/>  
  <Homemain />
  <br/><br/>
  <Hello/>
  <br/>
  <TutorBanner/>
  <hr/> 
  <br/> 
    
 <Carousal/>
  <br/><br/>
  <Carousal/>
  <br/><br/>
  <Carousal/>
  <br/><br/>
  <Carousal/>
  <hr/>
  <Testimonial/>
<br/>   
<hr/>
  {/* <img src={image1} alt="Placeholder" /> */}
 <Footer />
     
    </>
  );
}

export default Home;
