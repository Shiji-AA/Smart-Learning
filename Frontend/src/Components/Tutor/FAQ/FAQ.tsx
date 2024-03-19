import React from 'react';

function FAQ() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <section className="px-10 lg:px-40">
                <div className="mb-24 text-center">
                    <h3 className="block font-sans font-semibold relative mb-5 mt-10 text-2xl leading-tight tracking-normal text-black"> We’ve got answers </h3>
                    <h1 className="block font-sans relative my-5 text-center text-4xl font-bold leading-tight tracking-normal text-black md:text-5xl"> Frequently Asked Questions </h1>
                    <p className="block font-sans relative my-5 mx-auto text-center text-lg font-normal leading-relaxed tracking-normal text-gray-600 md:text-xl lg:max-w-4xl"> Check out what other people are usually interested in! </p>
                </div>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 lg:col-start-4 lg:col-span-6">
                        <h5 className="block font-sans text-xl leading-snug text-inherit mt-6 mb-1 font-semibold text-black"> What is David UI Angular? </h5>
                        <div className="block font-sans text-base leading-relaxed mb-4 font-normal text-gray-600"> David UI Angular is the components library based on Tailwind CSS and Angular frontend frameworks that is designed to help developers build good-looking websites and applications faster and in a more organized way. </div>
                        <hr className="my-6 border-blue-gray-50" />
                        <h5 className="block font-sans text-xl leading-snug text-inherit mt-6 mb-1 font-semibold text-black"> Can you use Tailwind CSS with Angular? </h5>
                        <div className="block font-sans text-base leading-relaxed mb-4 font-normal text-gray-600"> Yes, you can surely use the Tailwind CSS framework with Angular. Tailwind CSS is a popular utility-first CSS framework that can be integrated into Angular projects. It provides a set of pre-designed utility classes that can help streamline your styling and layout efforts when building Angular applications. Check our documentation that explains how you can easily integrate them. </div>
                        <hr className="my-6 border-blue-gray-50" />
                        <h5 className="block font-sans text-xl leading-snug text-inherit mt-6 mb-1 font-semibold text-black"> What is Tailwind CSS in Angular? </h5>
                        <div className="block font-sans text-base leading-relaxed mb-4 font-normal text-gray-600"> Tailwind CSS in Angular refers to the integration of the Tailwind CSS framework into Angular applications. It allows Angular developers to leverage Tailwind's utility classes to style and design user interfaces. </div>
                        <hr className="my-6 border-blue-gray-50" />
                        <h5 className="block font-sans text-xl leading-snug text-inherit mt-6 mb-1 font-semibold text-black"> Is Tailwind CSS faster than CSS? </h5>
                        <div className="block font-sans text-base leading-relaxed mb-4 font-normal text-gray-600"> Tailwind CSS and traditional CSS serve different purposes. Tailwind CSS is not inherently faster or slower than CSS; instead, it focuses on providing utility classes to expedite the development process. Whether Tailwind CSS is faster for your project depends on factors like your familiarity with the framework and your project's specific requirements. </div>
                        <hr className="my-6 border-blue-gray-50" />
                        <h5 className="block font-sans text-xl leading-snug text-inherit mt-6 mb-1 font-semibold text-black"> Is Tailwind CSS good to use? </h5>
                        <div className="block font-sans text-base leading-relaxed mb-4 font-normal text-gray-600"> Yes, Tailwind CSS is considered a valuable tool in web development, and it's becoming more and more popular nowadays. It offers a structured approach to styling, streamlining the design process and making it easier to maintain and scale projects. </div>
                        <hr className="my-6 border-blue-gray-50" />
                        <h5 className="block font-sans text-xl leading-snug text-inherit mt-6 mb-1 font-semibold text-black"> Is Tailwind CSS good for Angular? </h5>
                        <div className="block font-sans text-base leading-relaxed mb-4 font-normal text-gray-600"> Tailwind CSS can be a great choice for styling Angular applications. Its utility classes can help maintain consistency and speed up development. However, the suitability of Tailwind CSS for Angular depends on your project's requirements and your team's familiarity with both technologies. It's often a matter of personal or team preference, so consider your specific context when deciding whether to use it with Angular. </div>
                    </div>
                </div>
                <div className="w-full pt-5 px-4 mb-8 mx-auto">
                    <div className="text-sm text-gray-700 py-1">
                        Made with <a className="text-gray-700 font-semibold" href="https://david-ui-angular.com/?ref=tailwindcomponents" target="_blank" rel="noopener noreferrer">David UI Angular</a> by <a href="https://www.creative-tim.com?ref=tailwindcomponents" className="text-gray-700 font-semibold" target="_blank" rel="noopener noreferrer">Creative Tim</a>.
                    </div>
                </div>
            </section>
        </div>
    );
}

export default FAQ;
