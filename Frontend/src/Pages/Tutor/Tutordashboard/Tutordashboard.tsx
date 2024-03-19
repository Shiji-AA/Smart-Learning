import Tutornavbar from "../../../Components/Tutor/Tutordashboard/Tutornavbar";
import Tutorfooter from "../../../Components/Tutor/Tutordashboard/Tutorfooter";
//import Tutormain from "../../../Components/Tutor/Tutormain/Tutormain";
import Carousaltutor from "../../../Components/Tutor/Tutordashboard/Carousaltutor";
import Banner from "../../../Components/Tutor/Tutordashboard/Banner";
import BottomBanner from "../../../Components/Tutor/Tutordashboard/BottomBanner";
import Statistics from '../../../Components/Tutor/Tutordashboard/Statistics';
import Tutortestimonials from "../../../Components/Tutor/Tutordashboard/Tutortestimonials";


function Tutordashboard() {
  return (
    <div>    
     <Tutornavbar />
     <Banner/>
     <br/><br/>
     <Carousaltutor/>     
     <Statistics/>
    <Tutortestimonials/>
    <hr/>
     
     <br/>  
     <BottomBanner/>
     <hr/>

<Tutorfooter />
    </div>
  )
}

export default Tutordashboard
