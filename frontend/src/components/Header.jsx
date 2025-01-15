import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // Importing the FiX icon
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../redux/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(store => store?.auth?.isLoggedIn);

  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false); // State for showing login form
  const [isRegisterForm, setIsRegisterForm] = useState(false); // State to toggle between login and register forms

  // States to store input values
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  });

  const [registerInput, setRegisterInput] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Loading and success states
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Toggle login form visibility
  const handleLoginClick = () => {
    setLoginOpen(!loginOpen);
  };

  // Close login form
  const handleCloseLogin = () => {
    if (loginSuccess || registerSuccess) {
      setLoginOpen(false);
    }
  };

  // Toggle between login and register forms
  const handleToggleForm = () => {
    setIsRegisterForm(!isRegisterForm);
  };

  // Handle input changes for the register form
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes for the login form
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle register form submission
  const handleRegister = async (e) => { 
    e.preventDefault();
    setLoading(true);

    const response = await dispatch(register({ 
      name: registerInput?.name,
      email: registerInput?.email,
      password: registerInput?.password,
    }));
    
    // Assuming the response is successful
    if (response?.payload) {
      setRegisterSuccess(true);
      setLoginOpen(!loginInput);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // You can dispatch login action here
    console.log("Logging in...");

    // Assuming login is successful
    setLoginSuccess(true);
    setLoading(false);
  };

  // handle logout
  const handleLogout = () => {
    //  
  }

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
              {isLoggedIn ? <button
                onClick={handleLogout}
                className="hover:underline text-lg"
              >
                Logout
              </button> : <button
                onClick={handleLoginClick}
                className="hover:underline text-lg"
              >
                Login
              </button>}
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
              disabled={loading} // Prevent close during loading
            >
              <FiX />
            </button>

            <h2 className="text-2xl font-bold mb-4">{isRegisterForm ? 'Register' : 'Login'}</h2>

            {/* Form Content */}
            <form onSubmit={isRegisterForm ? handleRegister : handleLogin}>
              {/* If Register Form */}
              {isRegisterForm ? (
                <>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-lg">Username</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={registerInput.name}
                      onChange={handleRegisterChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter your username"
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-lg">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={registerInput.email}
                      onChange={handleRegisterChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter your email"
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="block text-lg">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={registerInput.password}
                      onChange={handleRegisterChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter your password"
                      disabled={loading}
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Login Form Fields */}
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-lg">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={loginInput.email}
                      onChange={handleLoginChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter your email"
                      disabled={loading}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-lg">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={loginInput.password}
                      onChange={handleLoginChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter your password"
                      disabled={loading}
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Processing...' : isRegisterForm ? 'Register' : 'Login'}
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
