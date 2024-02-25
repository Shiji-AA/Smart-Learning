//import Sidebar from "../../../Components/Admin/Admindashboardview/Sidebar";
import Adminnavbar from "../../../Components/Admin/Adminnavbar/Adminnavbar";
import Adminfooter from "../../../Components/Admin/Admindashboardview/Adminfooter";
import Adminstatistics from "../../../Components/Admin/Admindashboardview/Adminstatistics";
import Admingraph from "../../../Components/Admin/Admindashboardview/Admingraph";
function Dashboard() {
    return (
        <div>

            <Adminnavbar />            
         
            <Adminstatistics />
            {/* <Sidebar /> */}
            <Admingraph/>
            <br/>
            <hr/>
            <Adminfooter />
        </div>
    )
}

export default Dashboard
