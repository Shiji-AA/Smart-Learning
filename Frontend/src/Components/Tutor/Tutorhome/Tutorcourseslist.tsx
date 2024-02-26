

function Tutorcourseslist() {
  const courses = [
    {
      _id: 1,
      photo: 'https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80',
      courseName: 'Course 1',
      coursedescription: 'Description of Course 1',
      courseduration: 10 // duration in hours
    },
    {
      _id: 2,
      photo: 'https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80',
      courseName: 'Course 2',
      coursedescription: 'Description of Course 2',
      courseduration: 15 // duration in hours
    },
    {
      _id: 3,
      photo: 'https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80',
      courseName: 'Course 3',
      coursedescription: 'Description of Course 3',
      courseduration: 8 // duration in hours
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">My Courses List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course._id} className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700">
            <img
              className="w-full h-auto rounded-t-xl"
              src={course.photo}
              alt="Course Thumbnail"
            />
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">{course.courseName}</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">{course.coursedescription}</p>
              <p className="mt-1 text-gray-500 dark:text-gray-400">Duration: {course.courseduration} hours</p>
              <a
                className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="/singleview"
              >
                Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tutorcourseslist;




