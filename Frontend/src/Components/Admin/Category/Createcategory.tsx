import { Link } from 'react-router-dom';

function AddCategory() {
  return (
    <div className="max-w-md mx-auto mt-8 bg-pink-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold px-6 py-4 bg-blue-500 text-white rounded-t-lg">Add Category</h2>
      <div className="p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Category Title</label>
          <input type="text" id="title" name="title" placeholder="Enter category title" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" name="description"  placeholder="Enter description" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"></textarea>
        </div>
        <div className="flex justify-end">
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Submit</button>
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link to="/categorylist" className="block text-blue-500 hover:underline py-4">Go back to Category List</Link>
      </div>
    </div>
  );
}

export default AddCategory;
