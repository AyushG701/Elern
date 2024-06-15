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
import { useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CoursesContext";
import { server } from "../../main";
import { FaClock, FaDollarSign, FaUser } from "react-icons/fa"; // Importing react-icons

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, Auth } = UserData();
  const { fetchCourses } = CourseData();

  const deleteHandler = () => {
    console.log("Delete course:", course._id); // Implement deletion logic
    // You might call fetchCourses() here to update courses after deletion
  };

  return (
    <div className="course-card rounded-lg shadow-md overflow-hidden">
      <img
        src={`${server}/${course.image}`}
        alt={course.title}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">{course.title}</h3>
        </div>

        <p className="text-center text-gray-600 text-sm mb-2">
          Category: {course.category}
        </p>

        <div className="flex justify-center items-center mb-2">
          Duration:
          <span className="text-gray-600 text-sm ml-3">{course.duration}</span>
        </div>

        <div className="flex justify-center items-center mb-4">
          <span className="text-gray-600 text-sm">Price: ${course.price}</span>
        </div>

        <div className="flex justify-center items-center mb-6">
          {Auth ? (
            user && user.role !== "admin" ? (
              user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="btn-primary px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="btn-secondary px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md"
                >
                  Get Started
                </button>
              )
            ) : (
              <button
                onClick={() => navigate(`/course/${course._id}`)}
                className="btn-primary px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
              >
                Study
              </button>
            )
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="btn-primary px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
            >
              Get Started
            </button>
          )}
        </div>

        {Auth && user && user.role === "admin" && (
          <div className="text-center mb-4">
            <button
              onClick={deleteHandler}
              className="inline-flex items-center px-3 py-1 text-xs font-bold leading-none bg-red-500 hover:bg-red-600 rounded-full text-white"
            >
              Delete
            </button>
          </div>
        )}

        <div className="flex justify-center items-center">
          <img
            className="w-10 h-10 rounded-full mr-3"
            src={!course.image ? <FaUser /> : course.image}
            alt="Instructor"
          />{" "}
          {/* Replace with default or actual image */}
          <div className="text-sm flex flex-col">
            <a
              href="#"
              className="text-gray-800 font-semibold leading-none hover:text-indigo-600"
            >
              {course.createdBy}
            </a>
            <p className="text-gray-600 text-xs">{course.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
