
import {Link} from 'react-router-dom';

function HeroSection() {
    return (
        <section className="">
      <div className="bg-[url('https://i.imgur.com/jAXaawT.jpg')] min-h-[119vh] bg-cover bg-center flex justify-items-center items-center">
        <div className="px-10 lg:px-32 xl:px-40">
          <h1 className="text-6xl font-semibold font-serif mb-6">
            <span className="text-white-500">Education is the key<br/> to Success</span> <br />
          </h1>
          <p className="text-lg max-w-md">Helping each our students fulfill their potential..</p>
          <Link to ={'/usercourselist'}>
          <button className="inline-block mt-10 px-10 py-3 bg-blue-600 text-lg text-white font-semibold">Start Now</button>
          </Link>
         
        </div>
      </div>
    </section>  
    )
}

export default HeroSection
