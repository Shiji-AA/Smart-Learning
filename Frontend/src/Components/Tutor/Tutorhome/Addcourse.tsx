
function Addcourse() {
  return (
    <div className="flex items-center justify-center h-screen mt-10">
     <div className="mt-8  shadow-md p-8 w-full max-w-md rounded-lg border border-gray-400">

  <form className="bg-white rounded p-4 sm:p-8">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Course Name
      </label>
      <input
        className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
        type="text"
        placeholder="Course Name"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Course Duration
      </label>
      <input
        className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
        type="text"
        placeholder="Duration"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Course Price
      </label>
      <input
        className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
        type="number"
        placeholder="Price"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Description
      </label>
      <textarea
        className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
        placeholder="Description"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Category
      </label>
      <select className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded">
        <option>Select Category</option>
        {/* categoryOptions.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            )) */}
      </select>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Image
      </label>
      <input
        className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
        type="file"
      />
      {/* {photo && (
            <img
              src={URL.createObjectURL(photo)}
              alt="Course"
              className="mt-2 h-16 w-16 object-cover rounded"
            />
          )} */}
    </div>
    <div className="flex items-center justify-center">
      <button
        className="w-full py-2 px-4 text-white font-bold bg-blue-500 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-700"
        type="submit"
      >
        Create Course
      </button>
    </div>
  </form>
</div>

    </div>
  );
}

export default Addcourse;
