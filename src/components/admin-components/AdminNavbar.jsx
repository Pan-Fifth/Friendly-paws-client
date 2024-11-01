import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowDropdown } from "react-icons/io";

import useAuthStore from '../../stores/AuthStore';

export default function AdminNavbar() {

    const user = useAuthStore((state) => state.user)
    const actionLogout = useAuthStore((state) => state.actionLogout);
    const [isDropdownUserOpen, setDropdownUserOpen] = useState(false);




    console.log("Current user data:", user);

    const hdlClickLogout = () => {
        actionLogout();
    };

    const toggleDropdownUser = () => {
        setDropdownUserOpen(!isDropdownUserOpen);
    };



    return (
        <div>
            <nav className="top-0 left-0 w-full flex justify-between px-4 md:px-8 h-24 items-center bg-red-500 fixed z-20">

                <div className="w-32 h-20 md:flex gap-8 flex items-center ">
                    <h1 className='text-3xl'>LOGO</h1>
                </div>


                <div className="hidden md:flex gap-8 text-white">
                    <Link to="/admin" className="font-head">Home</Link>
                    <div className="relative flex items-center">
                        <Link className="font-head">Manage</Link>
                        <IoMdArrowDropdown className="cursor-pointer" onClick={toggleDropdownUser} />
                        {isDropdownUserOpen && (
                            <div className="absolute mt-5 w-32 top-2 right-0 bg-white rounded-md shadow-lg">
                                <ul className="py-2">
                                    <li>
                                        <Link to="/admin/manage-pet" onClick={() => setDropdownUserOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            Pet
                                        </Link>
                                        <Link to="/admin/manage-event" onClick={() => setDropdownUserOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            Event
                                        </Link>
                                        <Link to="/admin/manage-donation" onClick={() => setDropdownUserOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            Donation
                                        </Link>
                                        <Link to="/admin/manage-adopt" onClick={() => setDropdownUserOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            Adopt
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        )}
                    </div>
                    <Link className="font-head">Report</Link>
                    <Link className="font-head">Donate</Link>

                </div>
                <div className="hidden md:flex gap-8 text-white">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            {/* วงกลมที่แสดงตัวอักษร */}
                            <div className='flex items-center relative'>
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white font-bold">
                                    <div className="text-white">
                                        {((user?.user?.firstname?.charAt(0).toUpperCase() || user?.user?.role?.charAt(0).toUpperCase())) || ((user?.firstname?.charAt(0).toUpperCase() || user?.role?.charAt(0).toUpperCase()))}
                                    </div>

                                </div>
                                <IoMdArrowDropdown className="cursor-pointer" onClick={toggleDropdownUser} />
                                {isDropdownUserOpen && (
                                    <div className="absolute mt-5 w-32 top-6 right-0 bg-white rounded-md shadow-lg">
                                        <ul className="py-2">
                                            <li>
                                                <Link to="/admin/profile" onClick={() => setDropdownUserOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                    EditProfile
                                                </Link>
                                            </li>

                                        </ul>
                                    </div>
                                )}
                            </div>

                            <Link onClick={hdlClickLogout} to="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Logout
                            </Link>
                        </div>
                    )
                        : (
                            <div className='flex gap-10'>
                                <Link to="/register" className="font-head">Register</Link>
                                <Link to="/login" className="font-head">Login</Link>
                            </div>
                        )}

                </div>
            </nav>
        </div>
    )
}
