import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // Importing the FiX icon
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false); // State for showing login form
  const [isRegisterForm, setIsRegisterForm] = useState(false); // State to toggle between login and register forms

  const handleLoginClick = () => {
    setLoginOpen(!loginOpen); // Toggle login form visibility
  };

  const handleCloseLogin = () => {
    setLoginOpen(false); // Close the login form
  };

  const handleToggleForm = () => {
    setIsRegisterForm(!isRegisterForm); // Toggle between login and register forms
  };

  return (
    <header className="bg-white text-gray-800 py-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-6">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">ContentPro</h1>
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu />
        </button>
        <nav className={`w-full md:w-auto ${menuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <li><Link to={'/'} className="hover:underline text-lg">Home</Link></li>
            <li><Link to={'/domains'} className="hover:underline text-lg">Domains</Link></li>
            <li>
              <button 
                onClick={handleLoginClick} 
                className="hover:underline text-lg"
              >
                Login
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Login or Register Form */}
      {loginOpen && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-40 flex justify-center items-center h-screen backdrop-blur-md z-[1000]">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
            {/* Close Button (Cross Icon) */}
            <button
              onClick={handleCloseLogin}
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
            >
              <FiX />
            </button>

            <h2 className="text-2xl font-bold mb-4">{isRegisterForm ? 'Register' : 'Login'}</h2>

            {/* Form Content */}
            <form>
              {/* If Register Form */}
              {isRegisterForm ? (
                <>
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-lg">Username</label>
                    <input 
                      type="text" 
                      id="username" 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter your username"
                    />
                  </div>
                </>
              ) : null}

              <div className="mb-4">
                <label htmlFor="email" className="block text-lg">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-lg">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your password"
                />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                {isRegisterForm ? 'Register' : 'Login'}
              </button>
            </form>

            {/* Toggle Link */}
            <p className="text-center mt-4 text-sm text-gray-600">
              {isRegisterForm ? (
                <>
                  Already have an account?{' '}
                  <button onClick={handleToggleForm} className="text-blue-600 hover:underline">
                    Login
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button onClick={handleToggleForm} className="text-blue-600 hover:underline">
                    Register
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
