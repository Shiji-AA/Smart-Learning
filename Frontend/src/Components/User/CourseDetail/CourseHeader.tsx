import React from 'react';
import mongodb3 from'../../../assets/mongodb3.jpeg';
import {Link} from 'react-router-dom';

function CourseHeader() {
    return (
        <div className="bg-blue-200">
            <div className="m-auto max-w-7xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row">
                    
                    <div className="md:w-1/2 max-w-md flex flex-col justify-center">                        
                        <div className="md:text-5xl text-2xl uppercase font-black">MongoDB Course For Beginners</div>
                        <div className="text-xl mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                        <div className="my-5 h-16">
                            <div className="shadow-md font-medium py-2 px-4 text-yellow-100 cursor-pointer bg-yellow-600 hover:bg-yellow-500 rounded text-lg text-center w-48">Join now</div>
                        </div>
                    </div>

                    <div className="flex md:justify-end w-full md:w-1/2 -mt-5">
                        {/* Product Card Container */}
                        <div className="flex flex-col items-center justify-center mt-32">
                            {/* Product Card */}
                            <div className="flex flex-col shadow-md cursor-pointer w-96 hover:-translate-y-1 duration-300">
                                {/* Preview */}
                                <div className="inline relative group h-48">
                                    {/* Thumbnail */}
                                    <img className="absolute rounded-t object-cover h-full w-full"
                                        src={mongodb3}
                                        alt="Product Preview" />

                                        {/* Hover Bar */}
                                        <div className="flex flex-row absolute justify-end
                                            h-16 w-full bottom-0 px-3 space-x-2
                                            bg-none opacity-0 group-hover:opacity-100
                                            group-hover:bg-gradient-to-t from-black/20 via-gray-800/20 to-transparent 
                                            transition-all ease-in-out duration-200 delay-100">

                                            {/* Add to Bookmarks Button */}
                                            <button className="bg-gray-50/10 rounded-full 
                                                px-1 h-9 w-9 my-auto hover:bg-gray-50/20
                                                transition-colors duration-200">
                                                <i className="mdi mdi-playlist-plus text-xl text-gray-200
                                                    hover:text-white transition-all duration-200"
                                                    title="Add to Bookmarks"></i>
                                            </button>

                                            {/* Add to Favorites Button */}
                                            <button className="bg-gray-50/10 rounded-full 
                                                px-1 h-9 w-9 my-auto hover:bg-gray-50/20
                                                transition-colors duration-200">
                                                <i className="mdi mdi-heart text-xl text-gray-200 p-1
                                                    hover:text-white transition-all duration-200"
                                                    title="Add to Favorites"></i>
                                            </button>
                                        </div>
                                </div>

                                {/* Body */}
                                <div className="flex flex-col bg-white rounded-b p-3">
                                    {/* Title */}
                                    <div className="text-sm font-semibold text-gray-900 hover:underline truncate">
                                        Awesome Fantastic Super Uber Harika Merveilleux Pro Ultra Max Plus Plus Makeup Stuff
                                    </div>

                                    {/* Author - Category */}
                                    <div className="text-xxs text-gray-400 truncate mt-1">
                                        by

                                        {/* Author */}
                                        <a className="font-semibold hover:underline"> EgoistDeveloper </a>

                                        in
                                        {/* Category */}
                                        <a className="font-semibold hover:underline"> e-commerce </a>
                                    </div>

                                    {/* Price */}
                                    <div className="text-sm text-gray-600 font-bold mt-4 mb-1">
                                        $23
                                    </div>

                                    {/* Body */}
                                    <div className="flex flex-row mt-2">
                                        {/* Detail Column */}
                                        <div className="flex flex-col flex-auto">
                                            {/* Rating */}
                                            <div className="flex flex-row group">
                                                {/* Stars */}
                                                {[...Array(5)].map((_, index) => (
                                                    <i key={index} className="mdi mdi-star text-xs text-amber-400 
                                                        hover:text-amber-500 transition-all duration-200"
                                                        title={`Star ${index + 1}`}></i>
                                                ))}
                                                
                                              
                                            </div>

                                            {/* Statistic */}
                                            <div className="text-xxs text-gray-400 mt-1" title="34k Downloads in this year">
                                                34k Downloads
                                            </div>
                                        </div>

                                        {/* Button Column */}
                                        <div className="flex flex-row flex-auto justify-end">
                                            {/* Cart Button */}
                                          

                                            {/* Preview Link Button */}
                                            <a className="flex text-xs border px-3 my-auto py-2 
                                                border-amber-500 group hover:bg-amber-500 
                                                rounded-xss
                                                transition-all duration-200">
                                                
                                                {/* Icon */}
                                                <i className="mdi mdi-eye-outline text-amber-700
                                                    group-hover:text-white delay-100"></i>

                                                {/* Text */}
                                                    <Link to = '/checkout'>
                                                    <div className="text-xxs text-amber-700 font-semibold ml-2
                                                    group-hover:text-white delay-100">
                                                 <b>Buy Now</b> 
                                                </div>
                                                    </Link>
                                               

                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

            
        </div>
        
    );
}

export default CourseHeader;
