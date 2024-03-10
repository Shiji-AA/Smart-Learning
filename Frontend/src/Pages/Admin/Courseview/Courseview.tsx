
import Admincourselist from '../../../Components/Admin/Admincourselist/Admincourselist'
import Adminnavbar from '../../../Components/Admin/Adminnavbar/Adminnavbar'
import Pagination from '../../../Components/Pagination/Pagination'

function Courseview() {
  return (
  <div>
      <Adminnavbar />        
      <Admincourselist/>
      <Pagination/>
        </div>     
    )
}

export default Courseview