import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 5.636l-1.414-1.414L12 9.172 7.05 4.222l-1.414 1.414L9.172 12l-3.536 3.536 1.414 1.414L12 14.828l4.95 4.95 1.414-1.414L14.828 12l3.536-3.536z"
              ></path>
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-red-600 text-center mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 text-center mb-6">
          You do not have the required permissions to access this page.
        </p>
        <div className="flex justify-center">
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-md shadow-lg hover:bg-blue-700 transition duration-200"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
