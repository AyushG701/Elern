import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { server } from "../../main";
import { CourseData } from "../../context/CoursesContext";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);
  // Redirect if user is not subscribed (for non-admins)
  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    navigate("/");
    return null; // Return null to avoid rendering anything else
  }

  return (
    <>
      {course && (
        <div className="course-study-page bg-gray-100 min-h-screen flex flex-col items-center py-10">
          <img
            src={`${server}/${course.image}`}
            alt={course.title}
            className="w-64 h-64 rounded-lg shadow-lg mb-4"
          />
          <h2 className="text-3xl font-bold text-purple-800 mb-2">
            {course.title}
          </h2>
          <h4 className="text-xl text-purple-800 mb-2">{course.description}</h4>
          <h5 className="text-lg text-purple-800 mb-2">
            by - {course.createdBy}
          </h5>
          <h5 className="text-lg text-purple-800 mb-4">
            Duration - {course.duration} weeks
          </h5>
          <Link
            to={`/lectures/${course._id}`}
            className="bg-white text-purple-800 px-4 py-2 rounded-lg shadow-md hover:bg-purple-800 hover:text-white transition duration-300 ease-in-out"
          >
            Lectures
          </Link>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
