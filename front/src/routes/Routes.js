import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/TeacherPages/Home";
import Search from "../pages/TeacherPages/Search";
import Profile from "../pages/TeacherPages/Profile";
import Login from "../pages/TeacherPages/Login";
import Register from "../pages/TeacherPages/Register";
import ForgotPassword from "../pages/TeacherPages/ForgotPassword";
import LoginPin from "../pages/StudentPages/LoginPin";
import Experiment from "../pages/StudentPages/Experiment";
import WaitingRoom from "../pages/StudentPages/WaitingRoom";
import ExperimentRoom from "../pages/TeacherPages/ExperimentRoom";
import ExperimentDetailsTeacher from "../pages/TeacherPages/Home/experimentDetails/experimentDetails"
import HomePage from "pages/Home";
import ClinicCaseWater from "pages/StudentPages/ClinicCaseWater";
const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cliniccasewater/:pin" element={<ClinicCaseWater />} />
      <Route path="/loginPin" element={<LoginPin />} />
      <Route path="/loginTeacher" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/experiment/:pin" element={<Experiment />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/waitingroom/:pin" element={<WaitingRoom />} />
      <Route path="/experimentroom/:idValue/:pinValue" element={<ExperimentRoom />} />
      <Route path="/experimentdetails/:id" element={<ExperimentDetailsTeacher />} />
    </Routes>
  );
};

export default RoutesComponent;
