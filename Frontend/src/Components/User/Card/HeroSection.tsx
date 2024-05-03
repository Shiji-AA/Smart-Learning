import { Link } from 'react-router-dom';
import heroBackground from '../../../assets/hero-background.jpg';

function HeroSection() {
  return (
    <section className="bg-gray-900">
      <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${heroBackground})` }}>
        <div className="container mx-auto px-6 lg:px-20 py-24">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-8 leading-tight">
            <span className="block">Education is the key</span>
            <span className="block">to Success</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">Helping each of our students fulfill their potential.</p>
          <Link to='/usercourselist'>
            <button className="inline-block px-8 py-3 bg-blue-600 text-lg text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Start Now</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
