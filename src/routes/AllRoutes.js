import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import PrivateRoute from "../components/PrivateRoute";
import EmailVerificationNotice from "../pages/EmailVerificationNotice";
import ResetPasswordRequest from "../pages/ResetPasswordRequest";
import UpdatePassword from "../pages/UpdatePassword";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/verify-email" element={<EmailVerificationNotice />} />
      <Route path="/reset-password" element={<ResetPasswordRequest />} />
      <Route path="/update-password" element={<UpdatePassword />} />
    </Routes>
  );
}

export default AllRoutes;