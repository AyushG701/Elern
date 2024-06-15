import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import { toast, Toaster } from "react-hot-toast";

const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [Auth, setAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setAuth(true);
      setBtnLoading(false);
      navigate("/");
    } catch (err) {
      setBtnLoading(false);
      setAuth(false);
      toast.error(err.response.data.message);
    }
  }
  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });
      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);

      setBtnLoading(false);
      navigate("/verify");
    } catch (err) {
      setBtnLoading(false);

      toast.error(err.response.data.message);
    }
  }

  async function verifyOtp(otp1, navigate) {
    setBtnLoading(true);
    let otp = otp1.toString();
    const activationToken = localStorage.getItem("activationToken");
    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken,
      });

      toast.success(data.message);
      navigate("/login");
      localStorage.clear();
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }
  const getToken = () => {
    return localStorage.getItem("token");
  };

  async function fetchUser() {
    try {
      const token = getToken();
      const { data } = await axios.get(`${server}/api/user/userprofile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          //   token: localStorage.getItem("token"),
        },
      });
      setAuth(true);
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setAuth,
        Auth,
        btnLoading,
        loading,
        loginUser,
        registerUser,
        verifyOtp,
        fetchUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => {
  return useContext(UserContext);
};
