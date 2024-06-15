import React from "react";
import { Link, useParams } from "react-router-dom";

const PaymentSuccess = ({ user }) => {
  const params = useParams();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {user && (
        <div className="bg-white rounded shadow-md p-8 text-center">
          <h2 className="text-2xl text-green-500 font-medium mb-4">
            Payment Successful
          </h2>
          <p className="text-gray-700 mb-6">
            Your course subscription has been activated.
          </p>
          <p className="text-gray-500">
            Reference no - <span className="font-medium">{params.id}</span>
          </p>
          <Link to={`/${user._id}/dashboard`} className="btn btn-green mt-6">
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
