// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { UserData } from "../../context/UserContext";
// import { CourseData } from "../../context/CoursesContext";
// import { server } from "../../main";

// const CourseCard = ({ course }) => {
//   const navigate = useNavigate();
//   const { user, Auth } = UserData();

//   const { fetchCourses } = CourseData();
//   const deleteHandler = () => {
//     console.log("this is delete handler");
//   };
//   return (
//     <div>
//       <div className="border border-gray-400 bg-[#fafafa] rounded-lg flex flex-col justify-between leading-normal shadow-lg p-6 text-center w-64 transition duration-500 ease-in-out transform hover:shadow-xl">
//         <img
//           src={`${server}/${course.image}`}
//           alt=""
//           className="w-full h-40 object-cover rounded-lg mb-4"
//         />

//         <div className="p-4 pt-2">
//           <div className="mb-8">
//             <p className="text-sm text-gray-600 flex items-center">
//               <svg
//                 className="fill-current text-gray-500 w-3 h-3 mr-2"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"></path>
//               </svg>
//               Members only
//             </p>
//             <a
//               href="#"
//               className="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 inline-block"
//             >
//               {course.title}
//             </a>
//             <p className="text-gray-700 text-sm">{course.category}</p>
//             🤞{" "}
//             <p className="text-gray-700 text-sm">Duration: {course.duration}</p>
//             <p className="text-gray-700 text-sm">Price: ${course.price}</p>
//             {Auth ? (
//               <>
//                 {user && user.role !== "admin" ? (
//                   <>
//                     {user.subscription.includes(course._id) ? (
//                       <button
//                         onClick={() => navigate(`/course/study/${course._id}`)}
//                         className="common-btn"
//                       >
//                         Study
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => navigate(`/course/${course._id}`)}
//                         className=" "
//                       >
//                         Get Started now
//                       </button>
//                     )}
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => navigate(`/course/${course._id}`)}
//                     className="common-btn"
//                   >
//                     Study
//                   </button>
//                 )}
//               </>
//             ) : (
//               <button onClick={() => navigate("/login")} className="common-btn">
//                 Get Started
//               </button>
//             )}
//             <br />
//             {user && user.role === "admin" && (
//               <button
//                 onClick={() => deleteHandler(course._id)}
//                 className="common-btn"
//                 style={{ background: "red" }}
//               >
//                 Delete
//               </button>
//             )}
//           </div>
//           <div className="flex items-center">
//             <a href="#">
//               <img
//                 className="w-10 h-10 rounded-full mr-4"
//                 src={"img"}
//                 alt={course.createdBy}
//               />
//             </a>
//             <div className="text-sm flex flex-col line-clamp-1">
//               <a
//                 href="#"
//                 className="text-gray-900 font-semibold leading-none hover:text-indigo-600"
//               >
//                 {course.createdBy}
//               </a>
//               <p className="text-gray-600">{course.createdAt}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;

// next design trial

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CoursesContext";
import { server } from "../../main";
import { FaClock, FaDollarSign, FaUser } from "react-icons/fa"; // Importing react-icons
import toast from "react-hot-toast";
import axios from "axios";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, Auth } = UserData();
  const { fetchCourses } = CourseData();

  const deleteHandler = async () => {
    console.log("Delete course:", course._id); // Implement deletion logic
    // You might call fetchCourses() here to update courses after deletion
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="course-card rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800 ">
      <img
        src={`${server}/${course.image}`}
        alt={course.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      <div className="flex flex-col px-6 py-4 space-y-4">
        <div className="text-lg font-bold text-gray-800 dark:text-gray-100">
          {course.title}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          Category: {course.category}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          Duration: {course.duration}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          Price: ${course.price}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          className="btn px-4 py-2 text-center leading-5 font-semibold rounded-md bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={!user || user.role === "admin"}
          onClick={() => navigate(`${match.path}/study/${course._id}`)} // Use dynamic route matching if needed
        >
          {user &&
          user.role !== "admin" &&
          user.subscription.includes(course._id)
            ? "Study"
            : "Get Started"}
        </button>
        {Auth && user && user.role === "admin" && (
          <button
            className="inline-flex items-center px-3 py-1 text-xs font-bold leading-none bg-red-500 hover:bg-red-600 rounded-full text-white"
            onClick={deleteHandler}
          >
            Delete
          </button>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <img
          className="w-10 h-10 rounded-full object-fit cover"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec077a61d71d2b?d=mm&s=80"
          alt="Instructor"
        />
        <div className="text-sm flex flex-col">
          <Link
            to={`/profile/${course.createdBy}`}
            className="text-gray-800 dark:text-gray-100 font-semibold leading-none hover:text-indigo-600"
          >
            {course.createdBy}
          </Link>
          <p className="text-gray-600 text-xs dark:text-gray-400">
            {course.createdAt}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
