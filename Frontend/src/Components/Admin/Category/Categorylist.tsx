import { useState } from 'react';
import { Link } from 'react-router-dom';

function CategoryList() {
  const [categories] = useState([
    { id: 1, title: 'Mern Stack', description: 'Full stack development' },
    { id: 2, title: 'React', description: 'Frontend library' },
    { id: 3, title: 'Node.js', description: 'JavaScript runtime environment' },
    // Add more categories as needed
  ]);

  return (
    <div className="px-3 mt-10"> 
      <div className="max-w-3xl mx-auto bg-pink-100 rounded-lg overflow-hidden shadow-md">
        <div className="bg-white p-4 sm:flex sm:justify-between items-center rounded-t-lg">
          <h3 className="text-2xl font-bold mb-4 sm:mb-0 sm:mr-4">Category Table</h3>
          <Link to="/createcategory">
            <button className="bg-blue-500 text-white px-3 py-1 rounded-lg" onClick={() => console.log('Create category clicked')}>
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
              <th scope="col" className="px-6 py-3 text-end text-xs font-medium uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category, index) => (
              <tr key={category.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{category.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{category.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                  <button type="button" className="text-blue-600 hover:text-blue-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryList;
