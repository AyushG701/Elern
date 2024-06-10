import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Verify = () => {
  const [otp, setOtp] = useState("");
  //   const { btnLoading, verifyOtp } = UserData();
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    // await verifyOtp(Number(otp), navigate);
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Verify Account
              </h1>
              <form onSubmit={submitHandler} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="otp"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    OTP
                  </label>
                  <input
                    type="text"
                    pattern="[0-9]*" // Only allow numeric input
                    inputMode="numeric" // Show numeric keyboard on mobile devices
                    value={otp}
                    onChange={(e) => {
                      // Remove non-numeric characters
                      const numericValue = e.target.value.replace(/\D/g, "");
                      setOtp(numericValue);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex  justify-end">
                  <button
                    type="submit"
                    //   disabled={btnLoading}
                    className={` bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white transition duration-300 
                     ${
                       btnLoading
                         ? "opacity-50 cursor-not-allowed"
                         : "hover:shadow-lg"
                     }
                    `}
                    // Set a minimum width for better sizing
                  >
                    Send
                    {/* {btnLoading ? "Please Wait..." : "Verify"} */}
                  </button>
                </div>
              </form>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Go to{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </Link>{" "}
                page
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Verify;
