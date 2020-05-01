import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import SignUp from '../pages/signup/signup';
import LogIn from '../pages/login/login';
import Dashboard from '../pages/dashboard';
import App from '../App';
import Listings from '../pages/home/listings/listings';
import userProfile from '../pages/userProfile';



export default function Routes() {
    return (
        <Switch data="data">
            <Route path="/" exact component={Home} />
            <Route path="/register" component={SignUp} />
            <Route path="/login" component={LogIn} />
            
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/listings" component={Listings} />
            <Route path="/user/profile" component={userProfile} />

            {/* redirect if route does not exist and user not authenticated */}
            <Route component={SignUp} />
        </Switch>
    )
}