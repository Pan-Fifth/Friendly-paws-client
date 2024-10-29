import React from 'react'

import { TiSocialTwitter } from "react-icons/ti";
import { FaFacebook, FaLocationDot } from "react-icons/fa6";
import { FaYoutube, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import SendEmailForm from './SendEmailForm';

export default function Footer() {

    const socialIcons = [
        { icon: <TiSocialTwitter className='w-16 h-16 text-yellow-500' />, },
        { icon: <FaFacebook className='w-16 h-16 text-yellow-500' />, },
        { icon: <FaYoutube className='w-16 h-16 text-yellow-500' />, },
        { icon: <FaInstagram className='w-16 h-16 text-yellow-500' />, },
    ];
    return (
        <div>
            <footer className='bg-red-500 text-white h-auto mt-96'>
                <div className='flex justify-around items-center mx-40 py-10'>

                    <div className='w-80 h-auto space-y-2'>
                        <h1 className=' text-yellow-500 mb-4'>Contact</h1>
                        <div className='space-y-2 '>
                            <div className='flex gap-4 items-center'>
                                <FaLocationDot className='w-5 h-5' />
                                <h2 className='text-white'>adress</h2>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <FaPhoneAlt className='w-5 h-5' />
                                <h2 className='text-white'>phone</h2>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <MdEmail className='w-5 h-5' />
                                <h2 className='text-white'>email</h2>
                            </div>
                        </div>
                    </div>



                    <div className='relative'>
                        <div className='flex gap-3 mt-4'>
                            {socialIcons.map((item, index) => (
                                <a
                                    key={index}
                                    className={`w-20 h-20 rounded-full border border-slate-100 hover:bg-white transition-all duration-300 flex items-center justify-center`}
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>


                    </div>
                    <div>
                        <SendEmailForm />
                    </div>
                </div>
            </footer>
        </div>
    )
}
