import React from 'react';

function Statistics() {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-6 py-12 mx-auto">
                <div className="flex flex-wrap w-full mb-8">                   
                </div>
                <div className="flex flex-wrap -m-4 text-center">
                    <div className="p-4 sm:w-1/4 w-1/2">
                        <div className="bg-indigo-500 rounded-lg p-2 xl:p-6">
                            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">62M</h2>
                            <p className="leading-relaxed text-gray-100 font-bold">Students</p>
                        </div>
                    </div>
                    <div className="p-4 sm:w-1/4 w-1/2">
                        <div className="bg-indigo-500 rounded-lg p-2 xl:p-6">
                            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">75+</h2>
                            <p className="leading-relaxed text-gray-100 font-bold">Languages</p>
                        </div>
                    </div>
                    <div className="p-4 sm:w-1/4 w-1/2">
                        <div className="bg-indigo-500 rounded-lg p-2 xl:p-6">
                            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">830M</h2>
                            <p className="leading-relaxed text-gray-100 font-bold">Enrollmentss</p>
                        </div>
                    </div>
                    <div className="p-4 sm:w-1/4 w-1/2">
                        <div className="bg-indigo-500 rounded-lg p-2 xl:p-6">
                            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">180+</h2>
                            <p className="leading-relaxed text-gray-100 font-bold">Countries</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Statistics;
