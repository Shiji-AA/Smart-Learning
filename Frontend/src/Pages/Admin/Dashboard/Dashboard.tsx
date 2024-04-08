//import Sidebar from "../../../Components/Admin/Admindashboardview/Sidebar";
import Adminnavbar from "../../../Components/Admin/Adminnavbar/Adminnavbar";
import Tutorfooter from '../../../Components/Tutor/Tutordashboard/Tutorfooter'
import Adminstatistics from "../../../Components/Admin/Admindashboardview/Adminstatistics";
import Admingraph from "../../../Components/Admin/Admindashboardview/Admingraph";
//import Test from "../../../Components/Admin/Admindashboardview/Test"
function Dashboard() {
    return (
        <div className="bg-gray-100">
            <Adminnavbar />            
     
            <Adminstatistics /> 
             {/* <Sidebar />  */}
             <br/>
             <Admingraph/> 
            <br/>
            <hr/>
            <Tutorfooter />
        </div>
    )
}

export default Dashboard
