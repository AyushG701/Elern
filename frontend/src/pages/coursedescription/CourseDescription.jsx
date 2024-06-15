import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CoursesContext";
import Loading from "../../components/loading/Loading";
import { server } from "../../main";

import { FaHeart, FaShoppingCart, FaShare } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";

function CourseDescription({ user }) {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { fetchCourse, fetchCourses, course } = CourseData();
  const { fetchUser } = UserData();
  useEffect(() => {
    fetchCourse(params.id);
  }, []);
  // console.log(params.id);
  // console.log(course);
  // console.log(user);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const {
      data: { order },
    } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      {
        headers: {
          token,
        },
      },
    );

    const options = {
      key: "rzp_test_HlwQdRNHUPitjP", // Enter the Key ID generated from the Dashboard
      amount: order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "E learning", //your business name
      description: "Learn with us",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            {
              headers: {
                token,
              },
            },
          );

          await fetchUser();
          await fetchCourses();
          // await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: {
        color: "#8a4baf",
      },
    };
    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  //   console.log(fetchCourse(params.id));
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <section className="text-gray-700 body-font overflow-hidden bg-white">
              <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center">
                  <img
                    alt="ebook"
                    className="lg:w-1/2 w-[70%]   object-cover object-center rounded border border-gray-200"
                    src={`${server}/${course.image}`}
                  />
                  <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">
                      COURSE NAME
                    </h2>
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                      {course.title}
                    </h1>
                    <div className="flex mb-4">
                      <span className="flex items-center">
                        <FaHeart className="w-4 h-4 text-red-500" />
                        <FaHeart className="w-4 h-4 text-red-500" />
                        <FaHeart className="w-4 h-4 text-red-500" />
                        <FaHeart className="w-4 h-4 text-red-500" />
                        <span className="text-gray-600 ml-3">4 Reviews</span>
                      </span>
                      <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                        <FaShoppingCart className="text-gray-500" />
                        <FaShare className="ml-2 text-gray-500" />
                        {/* Add other icons if needed */}
                      </span>
                    </div>
                    <p className="leading-relaxed">{course.description}</p>
                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                      <div className="flex">
                        <p className="text-gray-600 mr-3">
                          Instructor: {course.createdBy}
                        </p>
                        <p className="text-gray-600 mr-3">
                          Duration: {course.duration} weeks
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <span className="title-font font-medium text-2xl text-gray-900">
                        ${course.price}
                      </span>

                      {user && user.subscription.includes(course._id) ? (
                        <button
                          onClick={() =>
                            navigate(`/course/study/${course._id}`)
                          }
                          className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                        >
                          Study
                        </button>
                      ) : (
                        <button
                          onClick={checkoutHandler}
                          className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                        >
                          Buy
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </section>
          )}
        </>
      )}
    </>
  );
}

export default CourseDescription;
