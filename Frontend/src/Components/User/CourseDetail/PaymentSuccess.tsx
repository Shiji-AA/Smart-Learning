import React from 'react';
import {Link} from 'react-router-dom'

function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-green-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <h1 className="mt-4 text-2xl font-bold text-gray-800 text-center">Payment Successful</h1>
        <p className="mt-2 text-sm text-gray-700 text-center">Congratulations! Your payment has been successfully completed.</p>
        <div className="flex justify-center mt-6">
  <Link to ='/usercourselist'>
  <button className="mr-4 inline-block px-6 py-2 text-sm font-semibold text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:bg-green-600 transition duration-300">Browse More Courses</button>
  </Link>

  <Link to ='/courseintroduction'>
  <button className="inline-block px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">Let's Start Learning </button>
  </Link>
  
</div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
