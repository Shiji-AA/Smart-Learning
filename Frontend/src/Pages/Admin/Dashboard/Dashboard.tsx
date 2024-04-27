import Adminnavbar from "../../../Components/Admin/Adminnavbar/Adminnavbar";
import Tutorfooter from "../../../Components/Tutor/Tutordashboard/Tutorfooter";
import Adminstatistics from "../../../Components/Admin/Admindashboardview/Adminstatistics";
import Admingraph from "../../../Components/Admin/Admindashboardview/Admingraph";

function Dashboard() {
  return (
    <div className="bg-gray-100">
      <Adminnavbar />
      <Adminstatistics />
      <br />
      <br/>
      <br/>
      <Admingraph />
      <br />
      <br/>
      <br/>
      <hr />
      <Tutorfooter />
    </div>
  );
}

export default Dashboard;
