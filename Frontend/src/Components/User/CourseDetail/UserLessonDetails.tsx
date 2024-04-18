

function UserLessonDetails() {
    return (
        <div>
            <div className="h-12 w-full">
                <div className="h-full bg-white px-8 flex items-center justify-between border-b">
                    <div className="flex items-center">
                        <div className="py-1 px-2 bg-blue-300 rounded text-blue-800">
                            <span className="text-sm">NEW</span>
                        </div>
                        <div className="font-medium px-2">
                            <a href="" className="text-blue-900 hover:text-black">New server for php development and deployment</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-24 w-full z-10 shadow-lg">
                <div className="h-full bg-white px-8 flex items-center justify-between ">
                    <div className="flex items-center h-full">
                        <div className="text-3xl font-medium tracking-wide leading-none text-blue-900">
                            Education
                        </div>
                        <div className="flex items-center ml-8 h-full">
                            <a className="text-xl font-medium ml-4 h-full flex items-center border-b-4 border-blue-900 text-blue-900" href="">Tutorials</a>
                            <a className="text-xl font-medium ml-4 h-full flex items-center border-b-4 border-white" href="">Series</a>
                            <a className="text-xl font-medium ml-4 relative h-full flex items-center border-b-4 border-white" href="">
                                Questions <span className="text-xs bg-green-300 font-light py-1 px-2 absolute rounded-r rounded-tl" style={{ right: '-74px', top: '10px' }}>Coming soon</span>
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="rounded-full p-1 bg-blue-500">
                            <img className="rounded-full w-12" src="https://via.placeholder.com/150" alt="" />
                        </div>
                        <div className="ml-2 text-xl font-medium">
                            <a className="flex items-center" href="#profile">
                                John E. Doe
                                <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-without-header w-full z-0">
                <div className="bg-blue-500 flex flex-col items-center text-center justify-end h-3/4">
                    <div className="w-1/3">
                        <h1 className="text-6xl text-white font-bold leading-none mb-4">Tutorials</h1>
                        <p className="text-2xl text-white leading-tight tracking-wide">Follow along with one of our 2449
                            development and sysadmin tutorials.</p>
                    </div>
                    <div className="w-4/5 mt-4 mb-8">
                        <div className="relative">
                            <svg className="absolute top-0 mt-6 ml-6 w-8 h-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input className="text-3xl placeholder-gray-600 text-gray-800 pb-4 pt-5 pl-20 pr-4 rounded w-full border-b-4 focus:outline-none focus:border-blue-800" type="text" placeholder="Search in tutorials" />
                        </div>
                    </div>
                </div>
                <div className="h-1/4 bg-white w-full flex justify-center">
                    <div className="h-full flex items-center justify-between w-4/5">
                        <div className="text-xl text-blue-800 font-medium">
                            302 Tutorials
                        </div>
                        <div className="flex items-center justify-end">
                            <div className="text-xl text-blue-800 font-medium flex items-center mr-12">
                                Most Recent
                                <svg className="ml-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="8 12 12 16 16 12"></polyline>
                                    <line x1="12" y1="8" x2="12" y2="16"></line>
                                </svg>
                            </div>
                            <div className="text-xl text-blue-800 font-medium flex items-center">
                                English
                                <svg className="ml-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="8 12 12 16 16 12"></polyline>
                                    <line x1="12" y1="8" x2="12" y2="16"></line>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center">
                <div className="h-1/4 bg-white w-full border-b flex justify-center">
                    <div className="h-full flex flex-col items-center justify-between w-4/5">
                        <div className="w-full mb-16">
                            <div className="text-lg text-blue-500 uppercase">
                                Tutorials
                            </div>
                            <div className="text-3xl font-bold text-blue-800 my-3">
                                How To Add Advanced Photo Uploads in Node and Express
                            </div>
                            <div className="text-xl text-blue-800 leading-tight my-1">
                                In this tutorial, we will see how to upload a photo to an Express app and manipulate it (resize, crop, greyscale, etc) before writing it to storage.
                            </div>
                            <div className="text-lg text-blue-800 leading-tight mt-2 flex items-center">
                                <div>
                                    <span>3 months ago </span> • <span>By Glad Chinda</span>
                                </div>
                                <div className="ml-2">
                                    <span className="py-1 px-2 mx-2 bg-gray-300 text-blue-800 rounded">Ubuntu 18.04</span>
                                    <span className="py-1 px-2 mx-2 bg-gray-300 text-blue-800 rounded">Flask</span>
                                </div>
                            </div>
                        </div>
                        {/* Other tutorials here... */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserLessonDetails;
