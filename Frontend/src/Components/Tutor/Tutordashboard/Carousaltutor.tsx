import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousaltutor1 from '../../../assets/carousaltutor1.jpeg';
import Carousaltutor2 from '../../../assets/carouseltutor2.jpg';

function Carousaltutor() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="sliderAx h-auto">
      <Slider {...settings}>
        <div>
          <div className="container mx-auto">
            <div className="bg-cover bg-center h-auto text-white py-24 px-10 object-fill" style={{ backgroundImage: `url("${Carousaltutor1}")`}}>
              <div className="md:w-1/2">
                <p className=" font-bold text-sm uppercase">Make a difference</p>
                <p className=" text-3xl font-bold">No matter how small</p>
                <p className=" text-2xl mb-10 leading-none">Every action counts............</p>
                <a href="#" className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800">Start Now</a>
              </div>
            </div>
            <br />
          </div>
        </div>
        <div>
          <div className="container mx-auto">
            <div className="bg-cover bg-top h-auto text-white py-24 px-10 object-fill" style={{ backgroundImage: `url("${Carousaltutor2}")` }}>
              <div className="md:w-1/2">
                <p className="font-bold text-sm uppercase">Lead by example</p>
                <p className="text-3xl font-bold">Your actions speak</p>
                <p className="text-2xl mb-10 leading-none">Louder than words!!!!!!!!</p>
                <a href="#" className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800">Start Now</a>
              </div>
            </div>
            <br />
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Carousaltutor;
