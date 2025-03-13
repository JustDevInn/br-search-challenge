'use client'

import React, { useState, useEffect, useRef} from 'react';
import { HiMenuAlt2 } from "react-icons/hi";
import { GrYoga } from "react-icons/gr";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

// Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    
    <div className="w-full shadow-lg px-10 py-5 bg-white">
      {/* Logo */}
      <div className='hidden md:flex justify-between items-center'>
      <div className="flex items-center">
        <a href="https://bookretreats.com/" target="_blank" rel="noopener noreferrer">
          <img 
            src="/bookretreats-logo-number-1.svg" 
            alt="BookRetreats" 
            className="w-[200px] cursor-pointer"
          />
        </a>
      </div>

      {/* Navbar Links */}
      <div className="flex flex-row gap-8 text-black cursor-pointer">
        <a href="https://bookretreats.com/about" target="_blank" rel="noopener noreferrer" 
        className='py-2 px-4 hover:rounded-full hover:bg-[#F1F5F9]'
        >About</a>
        <a href="https://help.bookretreats.com/en/" target="_blank" rel="noopener noreferrer"
        className='py-2 px-4 hover:rounded-full hover:bg-[#F1F5F9]'
        >Help</a>
        <a href="https://bookretreats.com/search?facets%5BpopularFilters%5D%5B0%5D=Featured&pageNumber=1&sortBy%5Bfield%5D=distance&sortBy%5Bdirection%5D=asc" 
        target="_blank" rel="noopener noreferrer"
        className='py-2 px-4 hover:rounded-full hover:bg-[#F1F5F9]'
        >Featured</a>
        <a href="https://bookretreats.com/wishlist" target="_blank" rel="noopener noreferrer"
        className='py-2 px-4 hover:rounded-full hover:bg-[#F1F5F9]'
        >Wishlist</a>
        <a href="https://bookretreats.com/work-with-us" target="_blank" rel="noopener noreferrer"
        className='py-2 px-4 hover:rounded-full hover:bg-[#F1F5F9]'
        >Add Retreat</a>
      </div>
    </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden justify-between items-center">
        {/* Logo */}
        <a href="https://bookretreats.com/" target="_blank" rel="noopener noreferrer">
          <img 
            src="/bookretreats-logo-number-1.svg" 
            alt="BookRetreats" 
            className="w-[150px]"
          />
        </a>

        {/* Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 border p-2 rounded-full shadow-sm bg-white hover:bg-gray-100 transition duration-300"
        >
          <GrYoga className="text-[#31A6FF] text-lg" />
          <span className="text-sm text-[#475569] font-semibold">Menu</span>
          <HiMenuAlt2 className="text-[#475569] text-lg" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div ref={menuRef} className="z-50 md:hidden absolute top-16 right-5 w-48 bg-white border shadow-lg rounded-lg p-4 flex flex-col gap-3 text-black">
          <a href="https://bookretreats.com/about" className="py-2 px-4 hover:rounded-full hover:bg-[#F1F5F9]">About</a>
          <a href="https://help.bookretreats.com/en/" className="py-2 px-4 hover:rounded-full hover:bg-[#F1F5F9]">Help</a>
          <a href="https://bookretreats.com/search?facets%5BpopularFilters%5D%5B0%5D=Featured&pageNumber=1&sortBy%5Bfield%5D=distance&sortBy%5Bdirection%5D=asc"
            className="py-2 px-4 hover:rounded-full hover:bg-[#F1F5F9]">Featured</a>
          <a href="https://bookretreats.com/wishlist" className="py-2 px-4 hover:rounded-full hover:bg-[#F1F5F9]">Wishlist</a>
          <a href="https://bookretreats.com/work-with-us" className="py-2 px-4 hover:rounded-full hover:bg-[#F1F5F9]">Add Retreat</a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
