import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store?.auth?.isLoggedIn);
  const role = useSelector((store) => store?.auth?.role);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    dispatch(logout()); // Dispatch logout action
    navigate('/');
  };

  // Function to close the menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-white text-gray-800 py-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-6">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
          ContentPro
        </h1>
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu />
        </button>
        <nav
          className={`w-full md:w-auto ${
            menuOpen ? 'block' : 'hidden'
          } md:block`}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <li>
              <Link
                to={'/'}
                className="hover:underline text-lg"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            {role === 'SUPERADMIN' && (
              <li>
                <Link
                  to={'/dashboard'}
                  className="hover:underline text-lg"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link
                to={'/domains'}
                className="hover:underline text-lg"
                onClick={closeMenu}
              >
                Domains
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu(); // Close the menu on logout
                  }}
                  className="hover:underline text-lg"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to={'/login'}
                  className="hover:underline text-lg"
                  onClick={closeMenu}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
