import React, { useState } from 'react'
import useAuthStore from '../../stores/AuthStore'
import { useNavigate } from 'react-router-dom'
import validateRegister from './../../utils/RegisterValidate';

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"


import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';



export default function Register() {
    //change lang ห้ามมลบ
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const intitialState = {
        email: '',
        password: '',
        confirmPassword: ''
    }



    const [form, setForm] = useState(intitialState)

    const [formatError, setFormatError] = useState({})

    const actionRegister = useAuthStore((state) => state.actionRegister)

    const navigate = useNavigate()

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    console.log('form :>> ', form);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validateRegister(form)

        if (error) {

            return setFormatError(error)
        }


        try {

            await actionRegister(form);
            toast.success(t('register.toastRegister'));
            navigate('/login');
            setForm(intitialState);
            setFormatError({});



        } catch (err) {

            console.error("Registration failed:", err);
        }
    }
    const getPlaceholder = (name) => {
        return formatError[name] || (name === "email" ? "gmail.com" : name === "password" ? "Enter your password" : "Confirm password")
    }

    return (
        <div>
            <div className=" w-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-white p-4 md:p-8">
                <Card className="my-10 w-full max-w-4xl overflow-hidden">
                    <CardContent className="p-0">
                        <div className="grid md:grid-cols-2 gap-6">

                            <div className="p-6 md:p-8">
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="w-8 h-8 rounded-full bg-purple-500" />
                                    <h1 className="text-3xl text-purple-500">{t('register.title')}</h1>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">


                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-600">{t('register.emailLabel')} :</label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={form.email || ''}
                                            placeholder={getPlaceholder("email")}
                                            onChange={handleChange}
                                        />

                                    </div>
                                    <div className='w-2/3 ml-auto text-right'>
                                        {formatError.email && <p className='text-red-500 text-xs'>{formatError.email}</p>}
                                    </div>

                                    <div className="relative">
                                        <Input type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={form.password || ''}
                                            placeholder={t('register.passwordLabel')}
                                            onChange={handleChange}
                                        />

                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                    <line x1="1" y1="1" x2="23" y2="23" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            )}

                                        </button>
                                        {formatError.password && <p className='text-red-500 text-xs'>{formatError.password}</p>}
                                    </div>
                                    <div className="relative">
                                        <Input type={showPassword ? "text" : "password"}
                                           name="confirmPassword"
                                           value={form.confirmPassword || ''}
                                            placeholder={t('register.confirmPasswordLabel')}
                                            onChange={handleChange}
                                        />

                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                    <line x1="1" y1="1" x2="23" y2="23" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            )}

                                        </button>
                                        {formatError.confirmPassword && <p className='text-red-500 text-xs'>{formatError.confirmPassword}</p>}
                                    </div>
                                    
                                    
                                    <Button className="w-full bg-gradient-to-r from-purple-500 to-yellow-500 hover:from-purple-600 hover:to-pink-600">
                                        {t('register.signUpButton')}
                                    </Button>


                                    <div className="text-center text-sm text-gray-600">
                                        {t('register.alreadyAccount')}{" "}
                                        <Button variant="link" className="text-purple-500 p-0" onClick={() => navigate('/login')}>
                                            {t('register.logIn')}
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Right Content Section */}
                            <div className="relative hidden md:block">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-yellow-500 rounded-l-[8rem]">
                                    <div className="p-8 text-white space-y-6 mt-20">
                                        <h2 className="text-4xl font-bold">Friendly Pow</h2>
                                        <p className="text-sm opacity-90">
                                            {t('register.rightContentText')}
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>



        </div>
    )
}
