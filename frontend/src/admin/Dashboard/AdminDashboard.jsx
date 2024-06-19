import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  const [stats, setStats] = useState([]);
  useEffect(() => {
    fetchStats();
  }, []);

  if (user && user.role !== "admin") return navigate("/");

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-500 text-white rounded shadow-md p-4 flex justify-center items-center">
            <div>
              <p className="text-xl font-bold">{stats.totalCourses}</p>
              <p className="text-sm">Total Courses</p>
            </div>
            <svg
              className="h-8 w-8 ml-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.394 2.08a1 1 0 01-.086 1.414L4.8 8.606a1 1 0 01-1.414-1.414L8.606 1.6a1 1 0 011.414.086zM7.778 8.283L2.794 13.717a1 1 0 01-1.414-1.414l4.984-4.984a1 1 0 011.414 0zM10.394 17.914a1 1 0 01-.086-1.414L4.8 11.394a1 1 0 01-1.414 1.414L8.606 18.4a1 1 0 011.414-.086zM7.778 12.717L2.794 7.283a1 1 0 01-1.414 1.414l4.984 4.984a1 1 0 010 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="bg-green-500 text-white rounded shadow-md p-4 flex justify-center items-center">
            <div>
              <p className="text-xl font-bold">{stats.totalLectures}</p>
              <p className="text-sm">Total Lectures</p>
            </div>
            <svg
              className="h-8 w-8 ml-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="bg-orange-500 text-white rounded shadow-md p-4 flex justify-center items-center">
            <div>
              <p className="text-xl font-bold">{stats.totalUsers}</p>
              <p className="text-sm">Total Users</p>
            </div>
            <svg
              className="h-8 w-8 ml-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6 -2a2 2 0 11-4 0 2 2 0 014 0zM9 14a1 1 0 00-2 0v4a1 1 0 001 1h2a1 1 0 001-1v-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Recent Courses Section (Dummy content) */}
        <div className="bg-white rounded shadow-md mt-8 p-4">
          <h3 className="text-xl font-medium mb-4">Recent Courses</h3>
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  className="w-10 h-10 rounded object-cover"
                  src="https://via.placeholder.com/150"
                  alt="Course thumbnail"
                />
                <div>
                  <p className="text-gray-700 font-medium">
                    Introduction to Machine Learning
                  </p>
                  <p className="text-gray-500 text-sm">John Doe</p>
                </div>
              </div>
              <span className="text-green-500 font-medium">Active</span>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  className="w-10 h-10 rounded object-cover"
                  src="https://via.placeholder.com/150"
                  alt="Course thumbnail"
                />
                <div>
                  <p className="text-gray-700 font-medium">
                    Web Development Fundamentals
                  </p>
                  <p className="text-gray-500 text-sm">Jane Smith</p>
                </div>
              </div>
              <span className="text-red-500 font-medium">Pending Approval</span>
            </li>
          </ul>
        </div>

        {/* Charts Section (Dummy content) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-white rounded shadow-md p-4">
            <h3 className="text-xl font-medium mb-4">
              Course Enrollments (Last Month)
            </h3>
            <canvas id="courseEnrollmentsChart"></canvas>
          </div>
          <div className="bg-white rounded shadow-md p-4">
            <h3 className="text-xl font-medium mb-4">
              User Activity (Last Week)
            </h3>
            <canvas id="userActivityChart"></canvas>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
