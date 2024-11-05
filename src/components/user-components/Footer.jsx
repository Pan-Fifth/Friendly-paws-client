import React from 'react'

import { TiSocialTwitter } from "react-icons/ti";
import { FaFacebook, FaLocationDot } from "react-icons/fa6";
import { FaYoutube, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import SendEmailForm from './SendEmailForm';

export default function Footer() {
  return (
    <div className="relative">
      {/* Top cloud shape */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <svg
          className="relative block w-full h-[48px] text-blue-100 "
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-white"
          ></path>
        </svg>
      </div>


      {/* Footer */}
      <footer className="relative bg-blue-100">
        {/* Bottom cloud shape */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden">
          <svg
            className="relative rotate-180 block w-full h-[45px] text-blue-100"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-white "
            ></path>
          </svg>
        </div>

        {/* Footer content */}
        <div className="container mx-auto px-6 pt-10 pb-6">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Links</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <a href="#" className="hover:underline text-gray-600 hover:text-blue-500">FAQ</a>
                </li>
                <li className="mt-2">
                  <a href="#" className="hover:underline text-gray-600 hover:text-blue-500">Help</a>
                </li>
                <li className="mt-2">
                  <a href="#" className="hover:underline text-gray-600 hover:text-blue-500">Support</a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Legal</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <a href="#" className="hover:underline text-gray-600 hover:text-blue-500">Terms</a>
                </li>
                <li className="mt-2">
                  <a href="#" className="hover:underline text-gray-600 hover:text-blue-500">Privacy</a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Social</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <a href="#" className="hover:underline text-gray-600 hover:text-blue-500">Facebook</a>
                </li>
                <li className="mt-2">
                  <a href="#" className="hover:underline text-gray-600 hover:text-blue-500">Instagram</a>
                </li>
                <li className="mt-2">
                  <a href="#" className="hover:underline text-gray-600 hover:text-blue-500">Twitter</a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Company</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <a href="#" className="hover:underline text-gray-600 hover:text-blue-500">Blog</a>
                </li>
                <li className="mt-2">
                  <a href="#" className="hover:underline text-gray-600 hover:text-blue-500">About Us</a>
                </li>
                <li className="mt-2">
                  <a href="#" className="hover:underline text-gray-600 hover:text-blue-500">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center pt-4 pb-8">
          <p className="text-sm text-gray-600">
            © 2024 Your Company. All rights reserved.
          </p>

        </div>
      </footer>

    </div>
  )
}
