import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen text-gray-900 dark:text-gray-100 dark:bg-gray-950">
      <div>
        <h1 className="text-xl md:text-7xl font-bold flex items-center">
          L
          <FaSpinner className="animate-spin" />
          ading . . .
        </h1>
      </div>
    </div>
  );
};

export default Loading;
