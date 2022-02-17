import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import SignUp from "../pages/signup/signup";
import LogIn from "../pages/login/login";
import Dashboard from "../pages/dashboard";
import Listings from "../pages/home/listings/listings";
import UserProfile from "../pages/userProfile";
import Dashboardindex from "pages/dashboard/dashboard";
import Others from "pages/dashboard/others";
import DMessages from "pages/dashboard/d-message";
import DashboardProperties from "pages/dashboard/properties";
import AddProperty from "pages/dashboard/add-property/addproperty";
import DashMessages from "pages/dashboard/dashMessages";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/user/profile" element={<UserProfile />} />

      <Route path="/dashboard" element={<Dashboardindex />} />
      <Route path="/dashboard/properties" element={<DashboardProperties />} />
      <Route path="/dashboard/others" element={<Others />} />
      <Route path="/dashboard/messages" element={<DashMessages />} />
      <Route path="/dashboard/add-property" element={<AddProperty />} />

      <Route path="/dashbaord/messagesdash" element={<DMessages />} />
      {/* <Route path="/dashboard/profile" element={<UserProfile />} /> */}

      {/* redirect if route does not exist and user not authenticated */}
      <Route element={<LogIn />} />
    </Routes>
  );
}
