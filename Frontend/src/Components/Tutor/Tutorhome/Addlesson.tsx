function Addlesson() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="mt-6 shadow-md p-8 w-full max-w-md rounded-lg border border-gray-400">
        <form className="bg-white rounded p-4 sm:p-8">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Name
            </label>
            <select className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded">
              <option>Select Course</option>
              <option value="1">Course 1</option>
              <option value="2">Course 2</option>
              <option value="3">Course 3</option>
              {/* Add more courses as needed */}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Duration
            </label>
            <input
              type="number"
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
              placeholder="Duration"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Description
            </label>
            <input
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
              type="text"
              placeholder="Description"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Category
            </label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
              <option>Select Category</option>
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
              <option value="3">Category 3</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Video
            </label>
            <input
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
              type="file"
              accept="video/*"
            />
            {/* Video preview */}
          </div>
          <div className="mb-2">
            <button
              className="w-full py-2 px-3 text-white font-bold bg-blue-500 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-700"
              type="submit"
            >
              Add Lesson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addlesson;
