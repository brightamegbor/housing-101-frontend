import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/home';
import SignUp from '../pages/signup/signup';
import LogIn from '../pages/login/login';
import Dashboard from '../pages/dashboard';
import App from '../App';
import Listings from '../pages/home/listings/listings';
import UserProfile from '../pages/userProfile';



export default function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/user/profile" element={<UserProfile />} />

            {/* redirect if route does not exist and user not authenticated */}
            <Route element={<LogIn />} />
        </Routes>
    )
}
