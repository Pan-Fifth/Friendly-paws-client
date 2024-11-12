import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FiMenu, FiX } from 'react-icons/fi';
import useAuthStore from './../../stores/AuthStore';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../i18n.js';
import useLanguageStore from '@/src/stores/LanguageStore';

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const { language, setLanguage } = useLanguageStore();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const actionLogout = useAuthStore((state) => state.actionLogout);
  const [isDropdownUserOpen, setDropdownUserOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    changeLanguage(lang);
    window.location.reload();
  };

  const hdlClickLogout = () => {
    actionLogout();
  };

  const activeStyles = 'border-b-2 border-pink-500';

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm w-full flex px-4 md:px-8 h-24 items-center">
      <div className="w-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <MountainIcon className="h-8 w-8" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8">
          <Link to="/" className={`font-head pb-1 ${isActive('/') ? activeStyles : ''}`}>{t('navbar.home')}</Link>
          <Link to="/about" className={`font-head pb-1 ${isActive('/about') ? activeStyles : ''}`}>{t('navbar.about')}</Link>
          <Link to="/adopt" className={`font-head pb-1 ${isActive('/adopt') ? activeStyles : ''}`}>{t('navbar.adopt')}</Link>
          <Link to="/donate" className={`font-head pb-1 ${isActive('/donate') ? activeStyles : ''}`}>{t('navbar.donate')}</Link>
          <Link to="/event" className={`font-head pb-1 ${isActive('/event') ? activeStyles : ''}`}>{t('navbar.event')}</Link>
          <Link to="/contact" className={`font-head pb-1 ${isActive('/contact') ? activeStyles : ''}`}>{t('navbar.contact')}</Link>
        </div>

        {/* User Actions */}
        <div className="hidden md:flex gap-8 text-black">
          {user ? (
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setDropdownUserOpen(!isDropdownUserOpen)}>
              <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white font-bold">
                <span className="text-white">
                  {((user?.user?.firstname?.charAt(0).toUpperCase() || user?.user?.role?.charAt(0).toUpperCase())) || ((user?.firstname?.charAt(0).toUpperCase() || user?.role?.charAt(0).toUpperCase()))}
                </span>
              </div>
              <IoMdArrowDropdown className="cursor-pointer text-black" />
              {isDropdownUserOpen && (
                <div className="absolute top-20 bg-white rounded-md shadow-lg" onClick={() => setDropdownUserOpen(false)}>
                  <ul className="py-2">
                    <li>
                      <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t('navbar.editProfile')}</Link>
                      <Link to="/adopt-history" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t('navbar.adoptHistory')}</Link>
                      <Link to="/donate-history" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t('navbar.donateHistory')}</Link>
                      <Link to="/event-history" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t('navbar.eventHistory')}</Link>
                    </li>
                    <li>
                      <Link onClick={hdlClickLogout} to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm md:text-base" style={{ fontSize: 'inherit' }}>{t('navbar.logout')}</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-10 text-black">
              <Link to="/register" className={`font-head pb-1 ${isActive('/register') ? activeStyles : ''}`}>{t('navbar.register')}</Link>
              <Link to="/login" className={`font-head pb-1 ${isActive('/login') ? activeStyles : ''}`}>{t('navbar.login')}</Link>
            </div>
          )}
          <div className="flex items-center sm:justify-end space-x-2">
            <button onClick={() => handleLanguageChange('en')} className={`hover:text-blue-800 ${language === 'en' ? 'font-bold text-blue-700' : ''} text-sm md:text-base`}>EN</button>
            <p>/</p>
            <button onClick={() => handleLanguageChange('th')} className={`hover:text-blue-800 ${language === 'th' ? 'font-bold text-blue-700' : ''} text-sm md:text-base`}>TH</button>
          </div>
        </div>
      </div>

      {/* Mobile Language Switcher */}
      <div className='flex items-center md:hidden space-x-2'>
        <button onClick={() => handleLanguageChange('en')} className={`hover:text-blue-800 ${language === 'en' ? 'font-bold text-blue-700' : ''} text-sm md:text-base`}>EN</button>
        <p>/</p>
        <button onClick={() => handleLanguageChange('th')} className={`hover:text-blue-800 ${language === 'th' ? 'font-bold text-blue-700' : ''} text-sm md:text-base`}>TH</button>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center md:hidden space-x-2">
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="ml-4">
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg z-40">
          <div className="flex flex-col p-4 space-y-4">
            <Link to="/" className={`font-head text-sm md:text-base pb-1 ${isActive('/') ? activeStyles : ''}`} onClick={() => setMobileMenuOpen(false)}>{t('navbar.home')}</Link>
            <Link to="/about" className={`font-head text-sm md:text-base pb-1 ${isActive('/about') ? activeStyles : ''}`} onClick={() => setMobileMenuOpen(false)}>{t('navbar.about')}</Link>
            <Link to="/adopt" className={`font-head text-sm md:text-base pb-1 ${isActive('/adopt') ? activeStyles : ''}`} onClick={() => setMobileMenuOpen(false)}>{t('navbar.adopt')}</Link>
            <Link to="/donate" className={`font-head text-sm md:text-base pb-1 ${isActive('/donate') ? activeStyles : ''}`} onClick={() => setMobileMenuOpen(false)}>{t('navbar.donate')}</Link>
            <Link to="/event" className={`font-head text-sm md:text-base pb-1 ${isActive('/event') ? activeStyles : ''}`} onClick={() => setMobileMenuOpen(false)}>{t('navbar.event')}</Link>
            <Link to="/contact" className={`font-head text-sm md:text-base pb-1 ${isActive('/contact') ? activeStyles : ''}`} onClick={() => setMobileMenuOpen(false)}>{t('navbar.contact')}</Link>

            {user ? (
              <>
                <Link to="/profile" className={`font-head text-sm md:text-base pb-1 ${isActive('/profile') ? activeStyles : ''}`} onClick={() => setMobileMenuOpen(false)}>{t('navbar.editProfile')}</Link>
                <Link to="/adopt-history" className={`font-head text-sm md:text-base pb-1 ${isActive('/adopt-history') ? activeStyles : ''}`} onClick={() => setMobileMenuOpen(false)}>{t('navbar.adoptHistory')}</Link>
                <Link to="/donate-history" className={`font-head text-sm md:text-base pb-1 ${isActive('/donate-history') ? activeStyles : ''}`} onClick={() => setMobileMenuOpen(false)}>{t('navbar.donateHistory')}</Link>
                <Link to="/event-history" className={`font-head text-sm md:text-base pb-1 ${isActive('/event-history') ? activeStyles : ''}`} onClick={() => setMobileMenuOpen(false)}>{t('navbar.eventHistory')}</Link>
                <Link to="/login" className="font-head text-sm md:text-base" onClick={() => { hdlClickLogout(); setMobileMenuOpen(false); }}>{t('navbar.logout')}</Link>
              </>
            ) : (
              <>
                <Link to="/register" className={`font-head text-sm md:text-base pb-1 ${isActive('/register') ? activeStyles : ''}`} onClick={() => setMobileMenuOpen(false)}>{t('navbar.register')}</Link>
                <Link to="/login" className={`font-head text-sm md:text-base pb-1 ${isActive('/login') ? activeStyles : ''}`} onClick={() => setMobileMenuOpen(false)}>{t('navbar.login')}</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
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
  );
}
