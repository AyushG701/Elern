import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
