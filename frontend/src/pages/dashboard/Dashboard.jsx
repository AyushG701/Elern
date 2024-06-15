import React from "react";
import { CourseData } from "../../context/CoursesContext";
import CourseCard from "../../components/course/CourseCard";

const Dashboard = () => {
  const { mycourse } = CourseData();
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <main className="flex  flex-col flex-grow p-6">
          <section className="w-full rounded-lg bg-white shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800">
              All Enrolled Courses
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {mycourse.map((e) => (
                <CourseCard key={e._id} course={e} /> // Replace with your CourseCard component
              ))}
            </div>

            {mycourse.length === 0 && (
              <p className="text-gray-600 text-center mt-4">
                No courses enrolled yet.
              </p>
            )}
          </section>

          <section className="w-full rounded-lg bg-white shadow-md p-6 mt-6">
            <h2 className="text-lg font-bold text-gray-800">Upcoming Events</h2>
            {/* Add content for upcoming events here */}
            <p className="text-gray-600">No upcoming events yet.</p>
          </section>

          <section className="w-full rounded-lg bg-white shadow-md p-6 mt-6">
            <h2 className="text-lg font-bold text-gray-800">Announcements</h2>
            {/* Add content for announcements here */}
            <p className="text-gray-600">No announcements yet.</p>
          </section>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
