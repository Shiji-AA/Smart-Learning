import hero1 from "../../../assets/hero1.jpg";

function Hero1() {
  return (
    <div className="relative h-screen  bg-gray-300  pt-20 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center bg-gradient-to-t from-gray-200 to-gray-400 pt-4 sm:pt-0 ">
        <div className="content text-gray-900">
          <div className="px-6 ">
            <h1 className="text-6xl font-semibold font-serif mb-6">
              <span className="text-white-500">Education is the key<br/> to Success</span> <br />
            </h1>
            <p className="text-lg max-w-md">Helping each of our students fulfill their potential..</p>
          </div>
          <div className="flex gap-4 mt-10 ml-10">
            <button className="font-medium text-[16px] flex items-center px-5 py-3 md:py-4 md:px-8 rounded-xl capitalize bg-gradient-to-r from-blue-500 to-gray-700 hover:from-pink-700 hover:to-gray-900 relative gap-2 transition duration-300 hover:scale-105 text-white shadow-glass">
              Start Now
              <span className="animate-ping absolute right-0 top-0 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-700"></span>
            </button>
          </div>
        </div>
        <div className="relative sm:mt-0  px-6 sm:px-0">
          <img
            className="w-[900px] sm:w-[700px] animate__animated animate__fadeInRight animate__delay-.5s"
            src={hero1}
            alt="teacher"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero1;
