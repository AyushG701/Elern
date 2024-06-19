import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Header from "./components/header/Header.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Verify from "./pages/auth/Verify.jsx";
import Footer from "./pages/footer/Footer.jsx";
import Account from "./pages/account/Account.jsx";
import About from "./pages/about/About.jsx";
import { UserData } from "./context/UserContext.jsx";
import Loading from "./components/loading/Loading.jsx";
import Courses from "./pages/courses/Courses.jsx";
import CourseDescription from "./pages/coursedescription/CourseDescription.jsx";
import PaymentSuccess from "./pages/paymentsuccess/PaymentSuccess.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import CourseStudy from "./pages/coursestudy/CourseStudy.jsx";
import Lecture from "./pages/lecture/Lecture.jsx";
import AdminDashboard from "./admin/Dashboard/AdminDashboard.jsx";
import AdminCourses from "./admin/Courses/AdminCourses.jsx";

const App = () => {
  const { Auth, user, loading } = UserData();
  console.log(Auth);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Header Auth={Auth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route
              path="/account"
              element={Auth ? <Account user={user} /> : <Login />}
            />
            <Route path="/login" element={!Auth ? <Login /> : <Home />} />

            <Route path="/register" element={!Auth ? <Register /> : <Home />} />
            <Route path="/verify" element={!Auth ? <Verify /> : <Home />} />
            <Route
              path="/course/:id"
              element={
                Auth ? (
                  <CourseDescription user={user} loading={loading} />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/payment-success/:id"
              element={Auth ? <PaymentSuccess user={user} /> : <Login />}
            />
            <Route
              path="/:id/dashboard"
              element={Auth ? <Dashboard user={user} /> : <Login />}
            />
            <Route
              path="/course/study/:id"
              element={Auth ? <CourseStudy user={user} /> : <Login />}
            />
            <Route
              path="/lectures/:id"
              element={Auth ? <Lecture user={user} /> : <Login />}
            />
            <Route
              path="/admin/dashboard"
              element={Auth ? <AdminDashboard user={user} /> : <Login />}
            />
            <Route
              path="/admin/course"
              element={Auth ? <AdminCourses user={user} /> : <Login />}
            />
          </Routes>

          <Footer />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
