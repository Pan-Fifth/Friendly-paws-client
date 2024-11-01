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
import ManagePet from '../components/admin-components/ManagePet';
import Donation from '../components/user-components/Donation';
import Event from '../pages/Event';
import ManageEvent from './../components/admin-components/ManageEvent';
import ManageDonate from '../components/admin-components/ManageDonate';
import ManageAdopt from '../components/admin-components/ManageAdopt';
import ReportPet from '../components/admin-components/ReportPet';
import ReportDonation from '../components/admin-components/ReportDonation';
import ReportAdopt from '../components/admin-components/ReportAdopt';
import ReportEvent from '../components/admin-components/ReportEvent';
import About from '../components/user-components/About';
import Contact from '../components/user-components/Contact';




[']']

const pageRouter = createBrowserRouter([

    {
        path: '/admin',
        element: <ProtectRoute
            element={<HomePageAdmin />}
            allow={["ADMIN"]} />,
        children: [
            { index: true, element: <DashBoard /> },
            { path: 'profile', element: <EditProfile /> },
            { path: 'manage-pet', element: <ManagePet /> },
            { path: 'manage-event', element: <ManageEvent /> },
            { path: 'manage-donation', element: <ManageDonate /> },
            { path: 'manage-adopt', element: <ManageAdopt /> },
            { path: 'report-pet-list', element: <ReportPet /> },
            { path: 'report-donation', element: <ReportDonation /> },
            { path: 'report-adopt', element: <ReportAdopt /> },
            { path: 'report-event', element: <ReportEvent /> },
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
            { path: 'about', element: <About /> },
            { path: 'adopt', element: <Adopt /> },
            { path: 'adopt/detail/:id', element: <AdoptDetail /> },
            { path: 'donate', element: <Donation /> },
            { path: 'event', element: <Event /> },
            { path: 'contact', element: <Contact /> },
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

