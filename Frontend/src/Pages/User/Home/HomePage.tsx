
import image1 from '../../../assets/image1.jpg'
import Footer from '../../../Components/User/Footer/Footer';
import Navbar from '../../../Components/User/Navbar/Navbar';
import Homemain from '../../../Components/User/Homemain/Homemain';
import TutorBanner from '../../../Components/User/Banner/TutorBanner';
function Home() {
  return (

    <>
  <Navbar/>  
  <Homemain />
  <TutorBanner/>
  <hr/>  
  <main>      
  <img src={image1} alt="Placeholder" />


        <Footer />
      </main>
    </>
  );
}

export default Home;
