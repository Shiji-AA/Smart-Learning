import Navbar from "../../../Components/User/Navbar/Navbar";

import BuyNow1 from "../../../Components/User/CourseDetail/BuyNow1";
import TutorFooter from "../../../Components/Tutor/Tutordashboard/Tutorfooter";
import Carousal from "../../../Components/User/Card/Carousel";

import PricingPlan from "../../../Components/User/CourseDetail/PricingPlan";
import ClientsOpinion from "../../../Components/User/CourseDetail/ClientsOpinion";
import ExecutiveTeam from "../../../Components/User/CourseDetail/ExecutiveTeam";
import FAQ from "../../../Components/Tutor/FAQ/FAQ";

function CourseDetailPage() {
  return (
    <div>
      <Navbar />
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
    </div>
  );
}

export default CourseDetailPage;
