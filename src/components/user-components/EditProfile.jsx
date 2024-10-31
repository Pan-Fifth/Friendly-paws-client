import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';


import EditProfileValidate from '../../utils/EditProfileValidate';
import { getProfile, editProfile } from '../../apis/UserApi';
import useAuthStore from '@/src/stores/AuthStore';

export default function EditProfile() {


    const [user, setUser] = useState({});
    const [formatError, setFormatError] = useState({})

    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        if (!token) {
            return;
        }
        fetchProfile();
    }, [token]);
    console.log(token, "tokennnn")
    const fetchProfile = async () => {
        try {

            const resp = await getProfile(token);
            console.log(resp, "edit udssererr")
            setUser(resp.data);

        } catch (err) {
            toast.error('Error fetching profile');
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        // รีเซ็ต error ก่อนทำการตรวจสอบใหม่
        setFormatError({});

        const error = EditProfileValidate(user);

        if (error) {
            return setFormatError(error);
        }

        try {
            const resp = await editProfile(user.id, token, user);
            fetchProfile();
            toast.success(`updated successfully!`);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    const inputs = [
        { label: 'firstname', name: 'firstname', type: 'text', placeholder: "Firstname" },
        { label: 'lastname', name: 'lastname', type: 'text', placeholder: "Lastname" },
        { label: 'phone', name: 'phone', type: 'text', placeholder: "Phone number" },
        { label: 'email', name: 'email', type: 'email', placeholder: "Email" },
    ];

    return (
        <div className='my-40 bg-red-gradient w-1/3 mx-auto p-6 rounded-lg'>
            <h1 className='text-center font-main text-yellow my-4'>Edit Profile</h1>

            <form onSubmit={handleUpdateProfile} className='space-y-4 w-full flex flex-col '>
                {inputs.map((input, index) => (
                    <div key={index} className='justify-start items-center mb-2'>
                        <div className='flex flex-col'>
                            <p className='w-32 text-left'>{input.label} :</p>
                            <input
                                className='p-2 border rounded-md outline-none'
                                type={input.type}
                                name={input.name}
                                value={user[input.name] || ''}
                                onChange={(e) => setUser({ ...user, [input.name]: e.target.value })}
                                placeholder={input.placeholder}
                            />
                        </div>
                        {formatError[input.name] && <p className="text-red-500 text-sm">{formatError[input.name]}</p>}
                    </div>
                ))}
                <button type='submit' className='bg-yellow text-white p-5 font-head rounded-xl w-1/3 mx-auto cursor-pointer '>
                    Confirm
                </button>
            </form>
        </div>
    );
}

