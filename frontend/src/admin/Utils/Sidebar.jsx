import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBook, FaUserAlt } from "react-icons/fa";
import {
  AiFillHome,
  AiOutlineArrowRight,
  AiOutlineLogout,
} from "react-icons/ai";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  return (
    // <div
    //   className={` fixed top-0 left-0 h-screen w-64 bg-gray-800 transition duration-300 ease-in-out ${
    //     isOpen ? "w-full" : "w-64"
    //   }
    //     `}
    // >
    //   <div className="flex items-center justify-between px-4 py-3 sm:text-white">
    //     <span className="text-xl font-bold">Admin Panel</span>
    //     <button
    //       className="text-gray-500 focus:outline-none hover:text-gray-400"
    //       onClick={handleSidebarToggle}
    //     >
    //       <AiOutlineArrowRight
    //         size={20}
    //         style={{
    //           transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    //           transition: "transform 0.3s ease-in-out",
    //         }}
    //       />
    //     </button>
    //   </div>
    //   <div className="px-4 py-6 sm:space-y-4">
    //     <Link
    //       to="/admin/dashboard"
    //       className="flex items-center text-gray-300 hover:text-gray-200 focus:outline-none focus:bg-gray-700 transition duration-300 ease-in-out p-2 rounded-md"
    //     >
    //       <AiFillHome className="mr-3 text-xl" />
    //       <span>Home</span>
    //     </Link>
    //     <Link
    //       to="/admin/course"
    //       className="flex items-center text-gray-300 hover:text-gray-200 focus:outline-none focus:bg-gray-700 transition duration-300 ease-in-out p-2 rounded-md"
    //     >
    //       <FaBook className="mr-3 text-xl" />
    //       <span>Courses</span>
    //     </Link>
    //     <Link
    //       to="/admin/users"
    //       className="flex items-center text-gray-300 hover:text-gray-200 focus:outline-none focus:bg-gray-700 transition duration-300 ease-in-out p-2 rounded-md"
    //     >
    //       <FaUserAlt className="mr-3 text-xl" />
    //       <span>Users</span>
    //     </Link>
    //     <Link
    //       to="/account"
    //       className="flex items-center text-gray-300 hover:text-gray-200 focus:outline-none focus:bg-gray-700 transition duration-300 ease-in-out p-2 rounded-md"
    //     >
    //       <AiOutlineLogout className="mr-3 text-xl" />
    //       <span>Logout</span>
    //     </Link>
    //   </div>
    // </div>

    <div
      className={`fixed top-[64px] h-screen bg-gray-800 transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <span className={`text-xl font-bold ${isOpen ? "block" : "hidden"}`}>
          Admin Panel
        </span>
        <button
          className="text-gray-500 focus:outline-none hover:text-gray-400"
          onClick={handleSidebarToggle}
        >
          <AiOutlineArrowRight
            size={20}
            className={`transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
      <div
        className={`px-4 py-6 space-y-4  ${
          isOpen ? "" : "px-0 py-0 flex flex-col items-center justify-center"
        }`}
      >
        <Link
          to="/admin/dashboard"
          className="flex items-center text-gray-300 hover:text-gray-200 focus:outline-none focus:bg-gray-700 transition duration-300 ease-in-out p-2 rounded-md"
        >
          <AiFillHome className="mr-3 text-2xl" />
          <span className={`${isOpen ? "block" : "hidden"}`}>Home</span>
        </Link>
        <Link
          to="/admin/course"
          className="flex items-center text-gray-300 hover:text-gray-200 focus:outline-none focus:bg-gray-700 transition duration-300 ease-in-out p-2 rounded-md"
        >
          <FaBook className="mr-3 text-2xl" />
          <span className={`${isOpen ? "block" : "hidden"}`}>Courses</span>
        </Link>
        <Link
          to="/admin/users"
          className="flex items-center text-gray-300 hover:text-gray-200 focus:outline-none focus:bg-gray-700 transition duration-300 ease-in-out p-2 rounded-md"
        >
          <FaUserAlt className="mr-3 text-2xl" />
          <span className={`${isOpen ? "block" : "hidden"}`}>Users</span>
        </Link>
        <Link
          to="/account"
          className="flex items-center text-gray-300 hover:text-gray-200 focus:outline-none focus:bg-gray-700 transition duration-300 ease-in-out p-2 rounded-md"
        >
          <AiOutlineLogout className="mr-3 " size={20} />
          <span className={`${isOpen ? "block" : "hidden"}`}>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
