import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstanceAdmin } from "../../../api/axiosinstance";
import toast from "react-hot-toast";
import Adminnavbar from "../../../Components/Admin/Adminnavbar/Adminnavbar";
import Pagination from '../../Pagination/Pagination';
import Swal from 'sweetalert2';

interface Category {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const CategoryList = () => {
  const [categoryDetails, setCategoryDetails] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedDisplayData, setPaginatedDisplayData] = useState<Category[]>([]);
  const itemsPerPage = 5;
  //responsible for updating the current page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
//currentPage display
useEffect(() => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  setPaginatedDisplayData(categoryDetails.slice(startIndex, endIndex));
}, [currentPage, categoryDetails]);

  useEffect(() => {
    axiosInstanceAdmin
      .get("/getallcategory")
      .then((response) => {
        if (response.data.categoryDetails) {
          //console.log(response.data.categoryDetails, "I am data");
          setCategoryDetails(response.data.categoryDetails);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast("Error fetching data. Please try again later.");
      });
  }, []);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete:any) => {
      if (willDelete) {
        axiosInstanceAdmin
          .delete(`/deletecategory/${id}`)
          .then(() => {
            setCategoryDetails(
              categoryDetails.filter((category) => category._id !== id)
            );
            toast.success("Category deleted successfully");
          })
          .catch((error) => {
            console.error("Error deleting category", error);
            toast.error("Error in deleting category");
          });
      }
    });
  };


  return (
    <>
      <Adminnavbar />

      <div className="bg-gradient-to-b from-blue-200 to-white p-4 rounded-lg">
        <br />
        <div className=" px-3 mt-10">
          <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden shadow-md">
            <div className="bg-white p-4 sm:flex sm:justify-between items-center rounded-t-lg">
              <h3 className="text-2xl font-bold mb-4 sm:mb-0 sm:mr-4">
                Category Table
              </h3>
              <Link to="/addcategory">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">
                  Add New Category
                </button>
              </Link>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="table text-gray-400 border-separate space-y-6 text-sm w-full">
                <thead className="bg-blue-500 text-white">
                  <tr>
                 
                    <th className="p-3" >Sl No</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Description</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedDisplayData.map((category, index) => (
                    
                    <tr
                      key={category._id}
                      className="bg-blue-100 lg:text-black"
                    >
                      <td className="p-3 font-medium capitalize">
                        {index + 1}
                      </td>
                      <td className="p-3"> {category.title}</td>
                      <td className="p-3"> {category.description}</td>

                      <td className="p-3">
                        <Link to={`/editcategory/${category._id}`}>
                          <button className="px-4 py-2 mr-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Edit
                          </button>
                        </Link>

                        <button
                          onClick={() => handleDelete(category._id)}
                          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>       
        <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(categoryDetails.length / itemsPerPage)} 
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default CategoryList;
