import React from 'react';

function SingleCoursePageView() {
  const course = {
    _id: 1,
    photo: 'https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80',
    courseName: 'Course 1',
    coursedescription: 'Description of Course 1',
    courseduration: 10 // duration in hours
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Course Details </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{course.courseName}</h2>
        <img
          className="w-full h-auto mb-4"
          src={course.photo}
          alt="Course Thumbnail"
        />
        <p className="text-gray-800 dark:text-white">{course.coursedescription}</p>
        <p className="mt-2 text-gray-800 dark:text-white">Duration: {course.courseduration} hours</p>
        {/* Add any other details you want to display */}
      </div>
    </div>
  );
}

export default SingleCoursePageView;
