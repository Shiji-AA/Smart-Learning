
import Footer from '../../../Components/User/Footer/Footer';
import Homemain from '../../../Components/User/Homemain/Homemain';
import TutorBanner from '../../../Components/User/Banner/TutorBanner';

import Navbar from '../../../Components/User/Navbar/Navbar';



function Landingpage (){
  return (
    <div>
      <Navbar/> 
      <div className="mt- lg:px-0">       
        <Homemain/> 
        <TutorBanner/>   
    
          
      </div>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/* Your content */}</div>
      </main>
     
      <Footer />
    </div>
  );
}

export default Landingpage;
