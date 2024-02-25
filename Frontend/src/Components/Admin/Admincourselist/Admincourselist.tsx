
function Admincourselist() {
  const courses = [
    {
      _id: 1,
      courseName: "Python",
      courseDescription: "Learn Python programming language.",
      tutor: {
        tutorName: "John Doe"
      },
      courseFee: "$99",
      photo: "python.jpg",
      isApproved: true
    },
    {
      _id: 2,
      courseName: "React",
      courseDescription: "Learn React JavaScript library.",
      tutor: {
        tutorName: "Jane Smith"
      },
      courseFee: "$129",
      photo: "react.jpg",
      isApproved: false
    },
    {
      _id: 3,
      courseName: "Django",
      courseDescription: "Learn Django web framework.",
      tutor: {
        tutorName: "Alex Johnson"
      },
      courseFee: "$149",
      photo: "django.jpg",
      isApproved: true
    },
    {
      _id: 4,
      courseName: "Machine Learning",
      courseDescription: "Learn about Machine Learning algorithms and techniques.",
      tutor: {
        tutorName: "Emily Brown"
      },
      courseFee: "$199",
      photo: "machine_learning.jpg",
      isApproved: false
    }
  ];

  return (
    <div className="bg-pink-100 p-4 rounded-lg">
      <div className="px-3 bg-white">
        <h1 className="text-3xl p-6">Course Table</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">#</th>
                <th scope="col" className="px-6 py-3">Course</th>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Description</th>
                <th scope="col" className="px-6 py-3">Tutor</th>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Fees</th>
                <th scope="col" className="px-6 py-3">Image</th>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Status</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr className="border-b border-gray-200 dark:border-gray-700" key={course._id}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{course.courseName}</td>
                  <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{course.courseDescription}</td>
                  <td className="px-6 py-4">{course.tutor?.tutorName}</td>
                  <td className="px-6 py-4">{course.courseFee}</td>
                  <td className="px-6 py-4">
                    <img src={`${course.photo}`} alt="image" style={{ width: '40px' }} />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => console.log('Course Status toggled')}
                      className={
                        course.isApproved === false
                          ? 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 font-medium rounded-lg text-sm px-7 py-2.5 text-center mr-2 mb-2'
                          : 'text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                      }
                    >
                      {course.isApproved === false ? 'Not Approved' : 'Approved'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admincourselist;
