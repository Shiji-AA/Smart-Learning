
//import tutor22 from '../../../assets/tutor22.jpg'
import tutor33 from '../../../assets/tutor33.webp'

function CourseIntroBanner() {
  return (
    <>
      <section className="grid grid-cols-1 gap-0 bg-gray-400 md:grid-cols-2">
        <div className="flex flex-col items-start justify-center px-4 py-24 lg:px-20">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">Come teach <br/>with us...</h1>
          <form className="w-full mb-6">
            <label className="sr-only">Your Email</label>
            <div className="block lg:hidden">
              <input className="text-blue-900 form-input form-input-lg" type="email" placeholder="Enter your email..." required />
              <button className="w-full mt-2 text-white bg-blue-900 hover:bg-blue-800 btn btn-lg" type="submit">Get Started</button>
            </div>          
          </form>
          <p className="pr-0 mb-4 text-lg text-gray-900 tracking-relaxed lg:pr-16">Become an instructor and change  <br/>lives - including your own</p>
          <button className="w-48 py-2 mt-4 text-lg bg-gray-800 text-white hover:bg-gray-700">Get Started</button>
        </div>
        
        <div>
          <img
            src={tutor33}
            alt="tutor"
            className="object-cover w-full h-64 bg-gray-100 md:h-full"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}

export default CourseIntroBanner;
