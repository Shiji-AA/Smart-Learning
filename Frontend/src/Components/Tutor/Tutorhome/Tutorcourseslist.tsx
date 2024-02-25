

function Tutorcourseslist() {
  const courses = [
    {
      _id: 1,
      photo: 'https://example.com/course1.jpg',
      courseName: 'Course 1',
      coursedescription: 'Description of Course 1',
      courseduration: 10 // duration in hours
    },
    {
      _id: 2,
      photo: 'https://example.com/course2.jpg',
      courseName: 'Course 2',
      coursedescription: 'Description of Course 2',
      courseduration: 15 // duration in hours
    },
    {
      _id: 3,
      photo: 'https://example.com/course3.jpg',
      courseName: 'Course 3',
      coursedescription: 'Description of Course 3',
      courseduration: 8 // duration in hours
    }
  ];

  return (     
    <div className="flex flex-wrap">
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        courses.map((course, index) => (
          <div className="mt-6 w-96" key={index}>
            <div className="relative h-56">
              <img
                src={`${course.photo}`}
                alt="card-image"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div>
              <h5 className="mb-2">{course.courseName}</h5>
              <p>{course.coursedescription}</p>
            </div>
            <div>
              <span className="font-bold m-6">Duration: {course.courseduration} hrs</span>
            </div>
            <div className="pt-0">
              <a href={`/singleView/${course._id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none hover:bg-blue-700">Read More</button>
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Tutorcourseslist;
