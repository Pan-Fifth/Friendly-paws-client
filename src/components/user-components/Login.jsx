
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../stores/AuthStore'
import validateLogin from './../../utils/LoginValidate';
import ForgetPassword from './ForgetPassword';
import LoginGoogle from './LoginGoogle';

export default function Login() {

    const [form, setForm] = useState({

        email: '',
        password: ''
    })

    const [formatError, setFormatError] = useState({})

    const token = useAuthStore((state) => state.token)
    const user = useAuthStore((state) => state.user)

    const isOpen = useAuthStore((state) => state.isOpen);
    const setIsOpen = useAuthStore((state) => state.setIsOpen);
    const actionLogin = useAuthStore((state) => state.actionLogin)
    const navigate = useNavigate()

    console.log('token :>> ', token);
    console.log('user :>> ', user);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const error = validateLogin(form)

        if (error) {

            return setFormatError(error)
        }
        const role = await actionLogin(form)

        if (role) {

            roleRedirect(role)
        }
    }

    const roleRedirect = (role) => {

        const checkRole = role.data.user.user.role

        if (checkRole === "ADMIN") {

            navigate('/admin')
        } else {
            navigate('/')
        }
    }

    return (
        <div className='bg-red-500  w-1/3 mx-auto mt-40 py-4 rounded-md flex flex-col justify-center items-center gap-4'>
            <form onSubmit={handleSubmit}
                className='flex flex-col justify-center items-center gap-4 w-full'>
                <h1 className=' text-yellow-500 my-4 '>Login</h1>
                <input name="email" onChange={handleChange} value={form.email}
                    className='p-2 outline-none w-2/3 rounded-lg ' type="email" placeholder="Email" />
                <div className='w-2/3 '>
                    {formatError && <p className='text-gray-300 text-xs'>{formatError.email}</p>}
                </div>
                <input name="password" onChange={handleChange} value={form.password}
                    className='p-2 outline-none w-2/3 rounded-lg' type="password" placeholder="Password" />
                <div className='w-2/3 '>
                    {formatError && <p className='text-gray-300 text-xs'>{formatError.password}</p>}
                </div>
                <button className=' text-white py-4 px-6 rounded-xl'>Login </button>
                <div>
                    <LoginGoogle />
                </div>
            </form>
            <p onClick={() => setIsOpen(!isOpen)} className='text-white cursor-pointer underline hover:text-yellow'>Forget Password ?</p>
            {isOpen && <ForgetPassword />}
        </div>
    )
}
