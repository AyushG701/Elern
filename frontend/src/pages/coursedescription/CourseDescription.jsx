import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CoursesContext";
import Loading from "../../components/loading/Loading";
import { server } from "../../main";

// const CourseDescription = ({ user, loading }) => {
//   const params = useParams();
//   const navigate = useNavigate();

//   const { fetchCourse, course } = CourseData();

//   console.log(params.id);
//   console.log(course);
//   console.log(user);

//   useEffect(() => {
//     fetchCourse(params.id);
//   }, []);
//   const checkoutHandler = () => {
//     console.log("checkout");
//   };
//   //   console.log(fetchCourse(params.id));

//   return (
//
//       <>
//         {loading ? (
//           <Loading />
//         ) : (
//           <>
//             {course && (
//               <div className="course-description bg-white shadow-md rounded-lg p-8 text-center min-h-screen">
//                 <div className="course-header flex flex-wrap items-center justify-center mb-8">
//                   <img
//                     src={`${server}/${course.image}`}
//                     alt=""
//                     className="course-image w-64 h-48 object-cover rounded-lg"
//                   />
//                   <div className="course-info text-left ml-4">
//                     <h2 className="text-3xl font-semibold text-gray-800">
//                       {course.title}
//                     </h2>
//                     <p className="text-gray-600">
//                       Instructor: {course.createdBy}
//                     </p>
//                     <p className="text-gray-600">
//                       Duration: {course.duration} weeks
//                     </p>
//                   </div>
//                 </div>

//                 <p className="text-lg text-gray-700 mb-8">
//                   {course.description}
//                 </p>

//                 <p className="text-lg text-gray-700 mb-8">
//                   Let&apos;s get started with the course at ₹{course.price}
//                 </p>
//                 {user.subscription
//                   ? console.log("User has the subscription field.")
//                   : console.log("User does not have the subscription field.")}

//                 {user && user.subscription.includes(course._id) ? (
//                   <button
//                     onClick={() => navigate(`/course/study/${course._id}`)}
//                     className="bg-black text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-900 transition duration-300 ease-in-out"
//                   >
//                     Study
//                   </button>
//                 ) : (
//                   <button
//                     onClick={checkoutHandler}
//                     className="bg-black text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-900 transition duration-300 ease-in-out"
//                   >
//                     Buy Now
//                   </button>
//                 )}
//               </div>
//             )}
//           </>
//         )}
//       </>
//
//   );
// };

import { FaHeart, FaShoppingCart, FaShare } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";

function CourseDescription({ user, loading }) {
  const params = useParams();
  const navigate = useNavigate();

  const { fetchCourse, course } = CourseData();

  console.log(params.id);
  console.log(course);
  console.log(user);

  useEffect(() => {
    fetchCourse(params.id);
  }, []);
  const checkoutHandler = () => {
    console.log("checkout");
  };
  //   console.log(fetchCourse(params.id));
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <section className="text-gray-700 body-font overflow-hidden bg-white">
              <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center">
                  <img
                    alt="ebook"
                    className="lg:w-1/2 w-[70%]   object-cover object-center rounded border border-gray-200"
                    src={`${server}/${course.image}`}
                  />
                  <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">
                      COURSE NAME
                    </h2>
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                      {course.title}
                    </h1>
                    <div className="flex mb-4">
                      <span className="flex items-center">
                        <FaHeart className="w-4 h-4 text-red-500" />
                        <FaHeart className="w-4 h-4 text-red-500" />
                        <FaHeart className="w-4 h-4 text-red-500" />
                        <FaHeart className="w-4 h-4 text-red-500" />
                        <span className="text-gray-600 ml-3">4 Reviews</span>
                      </span>
                      <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                        <FaShoppingCart className="text-gray-500" />
                        <FaShare className="ml-2 text-gray-500" />
                        {/* Add other icons if needed */}
                      </span>
                    </div>
                    <p className="leading-relaxed">{course.description}</p>
                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                      <div className="flex">
                        <p className="text-gray-600 mr-3">
                          Instructor: {course.createdBy}
                        </p>
                        <p className="text-gray-600 mr-3">
                          Duration: {course.duration} weeks
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <span className="title-font font-medium text-2xl text-gray-900">
                        ${course.price}
                      </span>

                      {user && user.subscription.includes(course._id) ? (
                        <button
                          onClick={() =>
                            navigate(`/course/study/${course._id}`)
                          }
                          className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                        >
                          Study
                        </button>
                      ) : (
                        <button
                          onClick={checkoutHandler}
                          className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                        >
                          Buy
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </section>
          )}
        </>
      )}
    </>
  );
}

export default CourseDescription;
