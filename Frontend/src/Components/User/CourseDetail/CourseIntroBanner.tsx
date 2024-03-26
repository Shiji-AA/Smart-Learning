import {Link} from 'react-router-dom'
import tutor44 from '../../../assets/tutor44.png'
import TutorFooter from "../../../Components/Tutor/Tutordashboard/Tutorfooter";

function CourseIntroBanner() {
  return (
    <>
    <div className='bg-gray-300 ' >
    <div className="relative grid grid-cols-1 gap-0 bg-gray-300 md:grid-cols-2">
  <div className="flex flex-col items-start justify-center px-4 py-24 lg:px-20">
    <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">Welcome to <br/>Smart Learning...</h1>
    <form className="w-full mb-6">
      <label className="sr-only">Your Email</label>
      <div className="block lg:hidden">
        <input className="text-blue-900 form-input form-input-lg" type="email" placeholder="Enter your email..." required />
        <button className="w-full mt-2 text-white bg-blue-900 hover:bg-blue-800 btn btn-lg" type="submit">Get Started</button>
      </div>          
    </form>
    <p className="pr-0 mb-4 text-lg text-gray-900 tracking-relaxed lg:pr-16">Only Education <br/>changes lives - including your own</p>
    <button className="w-48 py-2 mt-4 text-lg bg-gray-800 text-white hover:bg-gray-700">Get Started</button>
  </div>
  
  <div>
    <img
      src={tutor44}
      alt="tutor"
      className="object-cover w-full h-64 bg-gray-100 md:h-full"
      loading="lazy"
    />
  </div>



</div>
<div className="max-w-md mx-auto cursor-pointer rounded-lg p-4 mb-4 shadow duration-150 hover:scale-105 hover:shadow-md h-full flex flex-col justify-center items-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
  <h4 className="my-4 pl-4 font-bold text-white text-center">
    Welcome to the course. You can access the course materials.
  </h4>
  <Link to ='/postenrollmentcourseview/:orderId'>
  <button className="text-gray-600 bg-white hover:bg-gray-300 py-2 px-4 rounded-md">
    Start Learning
  </button>
  </Link>
 
</div>
    </div>
   

<TutorFooter />

    </>
  );
}

export default CourseIntroBanner;
