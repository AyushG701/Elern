import React from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CoursesContext";
import { server } from "../../main";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();

  const { fetchCourses } = CourseData();
  const deleteHandler = () => {
    console.log("this is delete handler");
  };
  return (
    <div>
      <div className="border border-gray-400 bg-[#fafafa] rounded-lg flex flex-col justify-between leading-normal shadow-lg p-6 text-center w-64 transition duration-500 ease-in-out transform hover:shadow-xl">
        <img
          src={`${server}/${course.image}`}
          alt=""
          className="w-full h-40 object-cover rounded-lg mb-4"
        />

        <div className="p-4 pt-2">
          <div className="mb-8">
            <p className="text-sm text-gray-600 flex items-center">
              <svg
                className="fill-current text-gray-500 w-3 h-3 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"></path>
              </svg>
              Members only
            </p>
            <a
              href="#"
              className="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 inline-block"
            >
              {course.title}
            </a>
            <p className="text-gray-700 text-sm">{course.category}</p>
            <p className="text-gray-700 text-sm">Duration: {course.duration}</p>
            <p className="text-gray-700 text-sm">Price: ${course.price}</p>
            {isAuth ? (
              <>
                {user && user.role !== "admin" ? (
                  <>
                    {user.subscription.includes(course._id) ? (
                      <button
                        onClick={() => navigate(`/course/study/${course._id}`)}
                        className="common-btn"
                      >
                        Study
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/course/${course._id}`)}
                        className=" "
                      >
                        Get Started
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="common-btn"
                  >
                    Study
                  </button>
                )}
              </>
            ) : (
              <button onClick={() => navigate("/login")} className="common-btn">
                Get Started
              </button>
            )}

            <br />

            {user && user.role === "admin" && (
              <button
                onClick={() => deleteHandler(course._id)}
                className="common-btn"
                style={{ background: "red" }}
              >
                Delete
              </button>
            )}
          </div>
          <div className="flex items-center">
            <a href="#">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={"img"}
                alt={course.createdBy}
              />
            </a>
            <div className="text-sm flex flex-col line-clamp-1">
              <a
                href="#"
                className="text-gray-900 font-semibold leading-none hover:text-indigo-600"
              >
                {course.createdBy}
              </a>
              <p className="text-gray-600">{course.createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
