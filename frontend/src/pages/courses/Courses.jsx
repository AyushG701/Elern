import React from "react";
import { CourseData } from "../../context/CoursesContext";
import CourseCard from "../../components/course/CourseCard";

const Courses = () => {
  const { courses } = CourseData();

  return (
    <div>
      <div className="courses py-20 text-center min-h-screen">
        <h2 className="text-3xl text-purple-700 mb-10">Available Courses</h2>

        <div className="course-container flex flex-wrap justify-center gap-10">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            <p>No Courses Yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
