import teacher3 from "../../../assets/teacher3.jpg";

import { Link } from 'react-router-dom';

function TutorBanner() {
  return (
    <div className="flex">
      {/* Left side - Image */}
      <div className="w-1/2">
        <img src={teacher3} alt="Tutor Banner" className="w-10/12 h-10/12 object-cover" />
      </div>

      {/* Right side - Tutors and View Button */}
      <div className="w-3/2 flex flex-col justify-center p-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Meet Our Tutors</h2>
      
        <p className='text-1xl font-bold text-black dark:text-white'>
        Dedicated Educators, Exceptional Results
        </p>
        <Link to="/tutorslist">
        <button className="bg-black hover:bg-gray-700 text-white dark:text-white font-bold py-2 px-1 mt-4 rounded">
          View Tutors
        </button>
      </Link>

      </div>
    </div>
  );
}

export default TutorBanner;