import React, { useState } from 'react'
import useAuthStore from '../../stores/AuthStore'
import { useNavigate } from 'react-router-dom'
import validateRegister from './../../utils/RegisterValidate';


export default function Register() {

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
        console.log("object111")

        try {

            await actionRegister(form);
            console.log("Action register succeeded");
            navigate('/login');
            setForm(intitialState);
            setFormatError({});
            console.log("object222")


        } catch (err) {

            console.error("Registration failed:", err);
        }
    }
    const inputs = [

        { label: "Email", name: 'email', type: 'email', placeholder: "Email" },
        { label: "Password", name: 'password', type: 'password', placeholder: "Password" },
        { label: "Confirm Password", name: 'confirmPassword', type: 'password', placeholder: "Confirm Password" }

    ];

    return (
        <div>
            <form onSubmit={handleSubmit} className='bg-red-500 w-1/3 mx-auto mt-40 p-6 flex flex-col justify-center items-center gap-4 rounded-lg'>
                <h1 className='font-main text-yellow mt-3'>Register</h1>

                {inputs.map((input, index) => (
                    <div key={index} className='w-full flex flex-col'>
                        <div className='flex items-center h-12'>
                            <label className='text-yellow font-bold w-1/3 text-right pr-4' htmlFor={input.name}>
                                {input.label} :
                            </label>
                            <input
                                name={input.name}
                                value={form[input.name] || ''}
                                onChange={handleChange}
                                className='p-2 outline-yellow-500 w-2/3 rounded-md'
                                type={input.type}
                                placeholder={input.placeholder}
                            />
                        </div>
                        <div className='w-2/3 ml-auto text-right'>
                            {formatError[input.name] && <p className='text-gray-300 text-xs'>{formatError[input.name]}</p>}
                        </div>
                    </div>
                ))}

                <button className='bg-yellow p-4 m-2 font-head rounded-xl text-white'>Submit</button>
            </form>
        </div>
    )
}
