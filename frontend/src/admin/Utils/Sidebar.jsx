import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout, FaBook, FaUserAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="hidden sm:fixed sm:w-64 sm:bg-gray-800 sm:overflow-y auto">
      <div className="flex items-center justify-between px-4 py-3 sm:text-white">
        <span className="text-xl font-bold">Admin Panel</span>
        <button className="text-gray-500 focus:outline-none hover:text-gray-400">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.707 3.307a1 1 0 00-1.414 0L0 6.014v10.972a1 1 0 001.414 1.414L4.707 16.7a1 1 0 001.414-1.414L3.107 14.293l9-9a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="px-4 py-6 sm:space-y-4">
        <Link
          to="/admin/dashboard"
          className="flex items-center text-gray-300 hover:text-gray-200 focus:outline-none focus:bg-gray-700 transition duration-300 ease-in-out p-2 rounded-md"
        >
          <AiFillHome className="mr-3 text-xl" />
          <span>Home</span>
        </Link>
        <Link
          to="/admin/course"
          className="flex items-center text-gray-300 hover:text-gray-200 focus:outline-none focus:bg-gray-700 transition duration-300 ease-in-out p-2 rounded-md"
        >
          <FaBook className="mr-3 text-xl" />
          <span>Courses</span>
        </Link>
        <Link
          to="/admin/users"
          className="flex items-center text-gray-300 hover:text-gray-200 focus:outline-none focus:bg-gray-700 transition duration-300 ease-in-out p-2 rounded-md"
        >
          <FaUserAlt className="mr-3 text-xl" />
          <span>Users</span>
        </Link>
        <Link
          to="/account"
          className="flex items-center text-gray-300 hover:text-gray-200 focus:outline-none focus:bg-gray-700 transition duration-300 ease-in-out p-2 rounded-md"
        >
          <AiOutlineLogout className="mr-3 text-xl" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
