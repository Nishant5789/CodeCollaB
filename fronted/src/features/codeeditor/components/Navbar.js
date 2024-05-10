import React, { useState } from 'react';
import { MenuIcon, XIcon, SearchIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { selectLoggedInUser, signOutAsync } from '../../auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Hidden } from '@mui/material';

const Navbar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutBtn, setIsLogoutBtn] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = ()=>{
    dispatch(signOutAsync());
    setIsLogoutBtn(false);
  }

  return (
    <nav className="bg-gray-800 text-white px-4 py-2">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <a className="text-4xl font-extrabold text-white drop-shadow-lg ml-2 hover:text-gray-400 " href="#">
          CODECOLLAB
        </a>
        {/* Search Icon */}
        <div className="hidden lg:flex items-center gap-x-2">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none"
            onChange={(e) => {
              onSearch(e.target.value);
            }}
          />
           <SearchIcon className="h-6 w-6 mr-2"  />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>

        {/* Navigation Links */}
        <div
          className={`lg:flex lg:items-center ${isMobileMenuOpen ? 'block' : 'hidden'
            }`}
        >
          <Link to="/" className="block lg:inline-block hover:text-gray-400 lg:mt-0 mr-4">
            Problems
          </Link>
          <Link to="/realtimeIDE" className="block lg:inline-block hover:text-gray-400 lg:mt-0 mr-4">
            RealTimeEditor
          </Link>
        </div>
        <div>
        <div class="flex relative flex-col items-center">
          {
            loggedInUser==null ? 
            <Link to="/Auth" className="block lg:inline-block hover:text-gray-400 lg:mt-0 mr-4">
            Register Or login
            </Link> :
            <div className=' flex-col pr-4 flex items-center'>
             <div onClick={()=>setIsLogoutBtn(!isLogoutBtn)} class="w-14 h-14 rounded-full overflow-hidden border-4 border-blue-500">
              <img
                class="w-full h-full object-cover"
                src="https://via.placeholder.com/150"
                alt="Profile"
              />
            </div>
            <h1 class="font-semibold">{loggedInUser.UserName}</h1>
              <div onClick={handleLogout} className={`${isLogoutBtn ? "":"hidden"}  absolute  top-16 bg-red-500 cursor-pointer hover:bg-red-600 active:bg-red-400 py-2 px-4 rounded-md text-white`}>
                logOut
              </div>
            </div>
          }
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
