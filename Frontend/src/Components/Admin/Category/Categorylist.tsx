import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstanceAdmin } from '../../../api/axiosinstance';
import toast from 'react-hot-toast';

interface Category {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  }

const CategoryList = () => {
  const [categoryDetails, setCategoryDetails] = useState<Category[]>([]);

  useEffect(() => {
    axiosInstanceAdmin.get('/getallcategory')
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

  return (
    <div className="px-3 mt-10"> 
      <div className="max-w-3xl mx-auto bg-pink-100 rounded-lg overflow-hidden shadow-md">
        <div className="bg-white p-4 sm:flex sm:justify-between items-center rounded-t-lg">
          <h3 className="text-2xl font-bold mb-4 sm:mb-0 sm:mr-4">Category Table</h3>
          <Link to="/addcategory">
            <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">
              Add New Category
            </button>
          </Link>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium uppercase">Sl no</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium uppercase">Category</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium uppercase">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categoryDetails.map((category, index) => (
              <tr key={category._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{category.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{category.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryList;
