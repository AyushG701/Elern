import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    // <div className="flex ">
    //   <Sidebar />
    //   <div className="flex-grow bg-gray-100 p-4 overflow-y-auto">
    //     {children}
    //   </div>
    // </div>

    <div className="flex h-screen">
      <div className="bg-gray-800 text-white  overflow-y-auto">
        <Sidebar />
      </div>
      <div className="flex-1  flex justify-center items-center bg-gray-100 p-6 overflow-y-auto md:p-8 lg:p-12 xl:p-16">
        {children}
      </div>
    </div>
  );
};

export default Layout;
