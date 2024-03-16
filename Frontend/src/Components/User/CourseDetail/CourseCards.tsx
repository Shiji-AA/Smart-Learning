import React from 'react';
import mongodb3 from '../../../assets/mongodb3.jpeg'; // Importing the mongodb3 image
import python from '../../../assets/python.jpeg'

function CourseCards() {
  return (
    <div className="flex justify-between">

      <div className="py-4">
        <div className="shadow-lg group container rounded-md bg-white max-w-sm flex justify-center items-center mx-auto content-div">
          <div>
            <div className="w-full image-cover rounded-t-md">
              
            </div>
            <div className="py-8 px-4 bg-white rounded-b-md group-hover:opacity-25">
              <span className="block text-lg text-gray-800 font-bold tracking-wide">Python BASICS course</span>
              <span className="block text-gray-600 text-sm">Vivamus ac ligula sit amet erat luctus laoreet ac quis ligula. Donec bibendum faucibus purus eget cursus. Proin enim ante, scelerisque vel sem sit amet, ultrices mollis risus. Praesent justo felis, ullamcorper a cursus sed, condimentum at dui.
              </span>
            </div>
          </div>
          <div className="absolute opacity-0 group-hover:opacity-100">
            <span className="text-3xl font-bold text-white tracking-wider leading-relaxed font-sans">Python Basics</span>
            <div className="pt-8 text-center">
              <button className="text-center rounded-lg p-4 bg-white text-gray-700 font-bold text-lg">Learn more</button>
            </div>
          </div>
        </div>
        <style jsx>{`
          .content-div {
            background-image: url(${python}); // Using mongodb3 image
            background-repeat: no-repeat;
            background-size: 400px;300px;
            background-position: center;
          }
          .content-div:hover {
            background-image: linear-gradient(to right, rgba(126, 213, 111, 0.801), hsla(160, 64%, 43%, 0.801)), url(${mongodb3}); // Using mongodb3 image
          }
          .image-cover {
            height: 260px;
          }
        `}</style>
      </div>

      <div className="py-4">
        <div className="shadow-lg group container rounded-md bg-white max-w-sm flex justify-center items-center mx-auto content-div">
          <div>
            <div className="w-full image-cover rounded-t-md">
              
            </div>
            <div className="py-8 px-4 bg-white rounded-b-md group-hover:opacity-25">
              <span className="block text-lg text-gray-800 font-bold tracking-wide">Python BASICS course</span>
              <span className="block text-gray-600 text-sm">Vivamus ac ligula sit amet erat luctus laoreet ac quis ligula. Donec bibendum faucibus purus eget cursus. Proin enim ante, scelerisque vel sem sit amet, ultrices mollis risus. Praesent justo felis, ullamcorper a cursus sed, condimentum at dui.
              </span>
            </div>
          </div>
          <div className="absolute opacity-0 group-hover:opacity-100">
            <span className="text-3xl font-bold text-white tracking-wider leading-relaxed font-sans">Python Basics</span>
            <div className="pt-8 text-center">
              <button className="text-center rounded-lg p-4 bg-white text-gray-700 font-bold text-lg">Learn more</button>
            </div>
          </div>
        </div>
        <style jsx>{`
          .content-div {
            background-image: url(${python}); // Using mongodb3 image
            background-repeat: no-repeat;
            background-size: 400px;300px;
            background-position: center;
          }
          .content-div:hover {
            background-image: linear-gradient(to right, rgba(126, 213, 111, 0.801), hsla(160, 64%, 43%, 0.801)), url(${mongodb3}); // Using mongodb3 image
          }
          .image-cover {
            height: 260px;
          }
        `}</style>
      </div>


      <div className="py-4">
        <div className="shadow-lg group container rounded-md bg-white max-w-sm flex justify-center items-center mx-auto content-div">
          <div>
            <div className="w-full image-cover rounded-t-md">
              
            </div>
            <div className="py-8 px-4 bg-white rounded-b-md group-hover:opacity-25">
              <span className="block text-lg text-gray-800 font-bold tracking-wide">Python BASICS course</span>
              <span className="block text-gray-600 text-sm">Vivamus ac ligula sit amet erat luctus laoreet ac quis ligula. Donec bibendum faucibus purus eget cursus. Proin enim ante, scelerisque vel sem sit amet, ultrices mollis risus. Praesent justo felis, ullamcorper a cursus sed, condimentum at dui.
              </span>
            </div>
          </div>
          <div className="absolute opacity-0 group-hover:opacity-100">
            <span className="text-3xl font-bold text-white tracking-wider leading-relaxed font-sans">Python Basics</span>
            <div className="pt-8 text-center">
              <button className="text-center rounded-lg p-4 bg-white text-gray-700 font-bold text-lg">Learn more</button>
            </div>
          </div>
        </div>
        <style jsx>{`
          .content-div {
            background-image: url(${python}); // Using mongodb3 image
            background-repeat: no-repeat;
            background-size: 400px;300px;
            background-position: center;
          }
          .content-div:hover {
            background-image: linear-gradient(to right, rgba(126, 213, 111, 0.801), hsla(160, 64%, 43%, 0.801)), url(${mongodb3}); // Using mongodb3 image
          }
          .image-cover {
            height: 260px;
          }
        `}</style>
      </div>

 
      
    </div>
  );
}

export default CourseCards;
