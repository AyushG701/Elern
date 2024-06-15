import React from "react";
import { FaMapMarkerAlt, FaBriefcase, FaUniversity } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Account({ user }) {
  const { setAuth, setUser } = UserData();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setAuth(false);
    toast.success("logged out");
    navigate("/login");
  };
  return (
    <>
      <Toaster />
      <main className="profile-page  h-[85vh] flex justify-center  items-center">
        {user && (
          <div className="w-[356px] border border-gray-300  bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg h-max ">
            <div className="border-b px-4 pb-6">
              <div className="text-center my-4">
                <img
                  className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                  src="https://randomuser.me/api/portraits/women/21.jpg"
                  alt=""
                />
                <div className="py-2">
                  <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                    {user.name}
                  </h3>
                  <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                    <MdEmail />
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 px-2">
                <button
                  onClick={() => {
                    navigate(`/${user._id}/dashboard`);
                  }}
                  className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                >
                  Dashboard
                </button>
                <button
                  onClick={logoutHandler}
                  className=" flex  px-8 justify-center items-center rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2"
                >
                  <IoMdLogOut />
                  Logout
                </button>
              </div>
            </div>
            <div className="px-4 py-4">
              <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
                <svg
                  className="h-6 w-6 text-gray-600 dark:text-gray-400"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    className=""
                    d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
                  />
                </svg>
                <span>
                  <strong className="text-black dark:text-white">12</strong>{" "}
                  Followers you know
                </span>
              </div>
              <div className="flex">
                <div className="flex justify-end mr-2">
                  {/* Images go here */}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Account;
