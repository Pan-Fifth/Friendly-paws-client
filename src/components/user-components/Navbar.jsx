import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowDropdown } from "react-icons/io";

import useAuthStore from './../../stores/AuthStore';
import { Button } from "@/components/ui/button"

//เปลี่ยนภาษา ห้ามลบบรรทัดนี้  only frontend
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../i18n.js';
import useLanguageStore from '@/src/stores/LanguageStore';



export default function Navbar() {

  //เปลี่ยนภาษา ห้ามลบบรรทัดนี้  only frontend
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    changeLanguage(lang);
    // เปลี่ยนภาษาที่ใช้ใน i18n
    window.location.reload();

  };

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

    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm  w-full flex  px-4 md:px-8 h-24 items-center ">
      <div className="w-full max-w-7xl mx-auto px-4 ">
        <div className="flex justify-between items-center">

          <Link to="/" className="flex items-center">
            {/* ใส่ Logo friendly paws */}
            <MountainIcon className="h-6 w-6" />
          </Link>



          <div className="hidden md:flex gap-8 ">
            <Link to="/" className="font-head">{t('navbar.home')}</Link>
            <Link to="/about" className="font-head">{t('navbar.about')}</Link>
            <Link to="/adopt" className="font-head">{t('navbar.adopt')}</Link>
            <Link to="/donate" className="font-head">{t('navbar.donate')}</Link>
            <Link to="/event" className="font-head">{t('navbar.event')}</Link>
            <Link to="/contact" className="font-head">{t('navbar.contact')}</Link>
          </div>
          <div className="hidden md:flex gap-8 text-white">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* วงกลมที่แสดงตัวอักษร */}
                <div className='flex items-center relative'>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white font-bold">
                    <span className="text-white">
                      {((user?.user?.firstname?.charAt(0).toUpperCase() || user?.user?.role?.charAt(0).toUpperCase())) || ((user?.firstname?.charAt(0).toUpperCase() || user?.role?.charAt(0).toUpperCase()))}
                    </span>

                  </div>
                  <IoMdArrowDropdown className="cursor-pointer text-black" onClick={toggleDropdownUser} />
                  {isDropdownUserOpen && (
                    <div className="absolute mt-5 w-32 top-6 right-0 bg-white rounded-md shadow-lg">
                      <ul className="py-2">
                        <li>
                          <Link to="/profile" onClick={() => setDropdownUserOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            {t('navbar.editProfile')}
                          </Link>
                        </li>

                      </ul>
                    </div>
                  )}
                </div>

                <Link onClick={hdlClickLogout} to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  {t('navbar.logout')}
                </Link>
              </div>
            )
              : (
                <div className='flex gap-10 text-black'>
                  <Link to="/register" className="font-head">{t('navbar.register')}</Link>
                  <Link to="/login" className="font-head">{t('navbar.login')}</Link>
                </div>
              )}

          </div>

        </div>
      </div>
      <button onClick={() => handleLanguageChange('en')} className=" hover:text-blue-800">EN  </button>
      <p>/</p>
      <button onClick={() => handleLanguageChange('th')} className="hover:text-blue-800"> TH</button>
    </nav>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}