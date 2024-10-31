import React from 'react'


import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'




import Navbar from '../components/user-components/Navbar';
import Footer from '../components/user-components/Footer';

import Test from '../components/user-components/Test';
import Login from '../components/user-components/Login';
import Register from '../components/user-components/Register';
import ForgetPassword from '../components/user-components/ForgetPassword';
import ResetPassword from '../components/user-components/ResetPassword';
import Homepage from '../components/user-components/Homepage';
import Adopt from '../pages/Adopt';
import AdoptDetail from '../pages/AdoptDetail';





import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';
import PaymentDonate from '../components/user-components/PaymentDonate';
import Completion from '../components/user-components/Completion';
import EditProfile from '../components/user-components/EditProfile';

import NotFoundPage from '../pages/NotFoundPage';
import ScrollToTop from '../utils/ScrollToTop';
import ProtectRoute from './ProtectRoute';

import HomePageAdmin from '../pages/admin-pages/HomePageAdmin';
import DashBoard from '../components/admin-components/DashBoard';
import ManagePets from '../components/admin-components/ManagePets';
import Donation from '../components/user-components/Donation';




[']']
import Event from '../pages/Event';






const pageRouter = createBrowserRouter([

    {
        path: '/admin',
        element: <ProtectRoute
            element={<HomePageAdmin />}
            allow={["ADMIN"]} />,
        children: [
            { index: true, element: <DashBoard /> },
            { path: 'profile', element: <EditProfile /> },
            { path: 'manage-pets', element: <ManagePets /> },
            { path: 'manage-pets', element: <ManagePets /> },
            { path: 'manage-pets', element: <ManagePets /> },
            { path: 'manage-pets', element: <ManagePets /> },

            // { path: 'report/comments', element: <ShowAllComment /> },
            // { path: 'report/total-unit-sold', element: <ShowAllMenuCount /> },
            // { path: 'report/total-sales', element: <ShowAllSaleReport /> },
            // { path: 'setting/edit-users', element: <EditUser /> },
        ]
    },
    {
        path: '/',
        element: (
            <div className="pt-24">
                <Navbar />
                <Outlet />
                <Footer />
                <ScrollToTop />

            </div>
        ),

        children: [
            { path: '', element: <Homepage /> },
            { path: 'register', element: <Register /> },
            { path: 'login', element: <Login /> },
            { path: 'forget-password', element: <ForgetPassword /> },
            { path: 'reset-password/:token', element: <ResetPassword /> },
            { path: 'profile', element: <EditProfile /> },
            { path: 'about', element: <Test /> },
            { path: 'adopt', element: <Adopt /> },
            { path: 'adopt/detail/:id', element: <AdoptDetail /> },
            { path: 'donate', element: <Donation /> },
            { path: 'event', element: <Event /> },
            { path: 'contact', element: <Test /> },


            { path: 'privacy-policy', element: <PrivacyPolicy /> },
            { path: 'terms', element: <TermsOfService /> },
            { path: 'payment', element: <PaymentDonate /> },
            { path: 'completion', element: <Completion /> },

        ]
    },


    {
        path: '/*', element: <NotFoundPage />
    }
])

export default function AppRouter() {
    return (
        <div>
            <RouterProvider router={pageRouter} />
        </div>
    )
}

