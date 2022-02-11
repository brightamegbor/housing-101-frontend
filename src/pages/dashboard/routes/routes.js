import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboardindex from '../dashboard';
import dMessages from '../d-message';
import dashboardProperties from '../properties';
import addProperty from '../add-property/addproperty';
import Others from '../others';
import dashMessages from '../dashMessages';
import userProfile from '../../userProfile';



export default function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/dashboard" exact component={Dashboardindex} />
            <Route path="/dashboard/properties" component={dashboardProperties} />
            <Route path="/dashboard/others" component={Others} />
            <Route path="/dashboard/messages" component={dashMessages} />
            <Route path="/dashboard/add-property" component={addProperty} />
            
            <Route path="/dashbaord/messagesdash" component={dMessages} />
            <Route path="/dashboard/profile" component={userProfile} />
            
            <Route path="/dashboard" component={Dashboardindex} />

            {/* redirect if route does not exist and user not authenticated */}
            <Route component={Dashboardindex} />
        </Routes>
    )
}