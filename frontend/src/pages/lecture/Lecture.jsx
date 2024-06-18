import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../main";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../components/loading/Loading";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setvideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    fetchLectures();
  }, []);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setvideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setvideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Toaster />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-between min-h-[80vh] flex-col md:flex-row items-center md:items-start">
            <div className="w-full md:w-7/10 p-4">
              {lecLoading ? (
                <Loading />
              ) : (
                <>
                  {lecture.video ? (
                    <>
                      <video
                        src={`${server}/${lecture.video}`}
                        width="100%"
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        autoPlay
                      ></video>
                      <h1>{lecture.title}</h1>
                      <h3>{lecture.description}</h3>
                    </>
                  ) : (
                    <h1>Please Select a Lecture</h1>
                  )}
                </>
              )}
            </div>
            <div className="w-full md:w-3/10 p-4">
              {user && user.role === "admin" && (
                <button
                  className="bg-purple-700 text-white py-2 px-4 rounded-md mb-4"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Close" : "Add Lecture +"}
                </button>
              )}

              {show && (
                <div className="bg-white p-6 rounded-md shadow-md text-center">
                  <h2 className="text-2xl text-purple-700 mb-4">Add Lecture</h2>
                  <form onSubmit={submitHandler} className="text-left">
                    <label className="block mb-2 text-sm text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full p-2 mb-4 border border-black rounded-md"
                    />

                    <label className="block mb-2 text-sm text-gray-700">
                      Description
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      className="w-full p-2 mb-4 border border-black rounded-md"
                    />

                    <input
                      type="file"
                      placeholder="choose video"
                      onChange={changeVideoHandler}
                      required
                      className="w-full p-2 mb-4"
                    />

                    {videoPrev && (
                      <video
                        src={videoPrev}
                        width={300}
                        controls
                        className="mb-4"
                      ></video>
                    )}

                    <button
                      disabled={btnLoading}
                      type="submit"
                      className={`w-full py-2 rounded-md ${
                        btnLoading ? "bg-gray-500" : "bg-purple-700"
                      } text-white`}
                    >
                      {btnLoading ? "Please Wait..." : "Add"}
                    </button>
                  </form>
                </div>
              )}

              {lectures && lectures.length > 0 ? (
                lectures.map((e, i) => {
                  console.log(e);
                  return (
                    <div key={e._id} className="flex flex-col">
                      <div
                        onClick={() => fetchLecture(e._id)}
                        className={`p-2 border border-black rounded-md mt-2 text-center cursor-pointer hover:bg-purple-700 hover:text-white ${
                          lecture._id === e._id && "bg-purple-700 text-white"
                        }`}
                      >
                        {i + 1}. {e.title}
                      </div>
                      {user && user.role === "admin" && (
                        <button
                          className="bg-red-600 text-white py-2 px-4 rounded-md mt-2"
                          onClick={() => deleteHandler(e._id)}
                        >
                          Delete {e.title}
                        </button>
                      )}
                    </div>
                  );
                })
              ) : (
                <p>No Lectures Yet!</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Lecture;
