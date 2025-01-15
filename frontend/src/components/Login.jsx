import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FiLock, FiMail } from 'react-icons/fi';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await dispatch(login({ email, password }));
    setLoading(false);

    if (response?.payload) {
      navigate('/');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center mb-8">Welcome Back!</h2>
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
          <div className="flex items-center border border-gray-300 rounded-md">
            <span className="px-3 text-gray-600">
              <FiMail />
            </span>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 focus:outline-none"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-lg font-medium mb-2">Password</label>
          <div className="flex items-center border border-gray-300 rounded-md">
            <span className="px-3 text-gray-600">
              <FiLock />
            </span>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 focus:outline-none"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="mt-6 text-center">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
