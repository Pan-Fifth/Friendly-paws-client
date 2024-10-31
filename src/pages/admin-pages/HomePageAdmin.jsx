import Navbar from '@/src/components/admin-components/AdminNavbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function HomePageAdmin() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}
