import React from 'react'

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'



import NotFoundPage from '../pages/NotFoundPage';
import Navbar from '../components/user-components/Navbar';
import Footer from '../components/user-components/Footer';
import ScrollToTop from '../utils/ScrollToTop';
import Test from '../components/user-components/Test';
import Login from '../components/user-components/Login';
import Register from '../components/user-components/Register';
import ForgetPassword from '../components/user-components/ForgetPassword';
import ResetPassword from '../components/user-components/ResetPassword';
import Homepage from '../components/user-components/Homepage';






const pageRouter = createBrowserRouter([

    // {
    //     path: '/admin',
    //     element: <ProtectRoute
    //         element={<HomePageAdmin />}
    //         allow={["ADMIN"]} />,
    //     children: [
    //         { index: true, element: <Dashboard /> },
    //         { path: 'manage/menu', element: <MenuAdminPage /> },
    //         { path: 'manage/create-menu', element: <CreateMenu /> },
    //         { path: 'manage/edit-orders', element: <EditOrderTable /> },
    //         { path: 'report/comments', element: <ShowAllComment /> },
    //         { path: 'report/total-unit-sold', element: <ShowAllMenuCount /> },
    //         { path: 'report/total-sales', element: <ShowAllSaleReport /> },
    //         { path: 'setting/edit-users', element: <EditUser /> },
    //     ]
    // },
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
            { path: 'forget-password', element: <ForgetPassword /> },
            { path: 'reset-password/:token', element: <ResetPassword /> },
            { path: 'about', element: <Test /> },
            { path: 'adopt', element: <Test /> },
            { path: 'donate', element: <Test /> },
            { path: 'event', element: <Test /> },
            { path: 'contact', element: <Test /> },
            { path: 'register', element: <Register /> },
            { path: 'login', element: <Login /> },


            // { path: 'payment', element: <PaymentCredit /> },
            // { path: 'completion', element: <Completion /> },

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

