import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = ({ Auth }) => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: "Home", path: "/" },
    { id: 2, text: "Company", path: "/company" },
    { id: 3, text: "About", path: "/about" },
    Auth
      ? { id: 4, text: "Account", path: "/account" }
      : { id: 4, text: "Login", path: "/login" },
  ];

  return (
    <div className="bg-black flex justify-between items-center h-16  mx-auto px-6 text-white">
      {/* Logo */}
      <Link to={"/"}>
        <h1 className="w-full text-3xl font-bold text-[#00df9a]">Elern.</h1>
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li key={item.id} className="p-4 ">
            <Link
              to={item.path}
              className="hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#242724] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">Elern.</h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b rounded-xl hover:bg-[#00df9a]"
          >
            <Link
              to={item.path}
              className="duration-300 hover:text-black cursor-pointer border-gray-600 px-2 py-1 block"
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
