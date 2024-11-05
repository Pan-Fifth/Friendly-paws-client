import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import axios from 'axios'
import useAuthStore from '@/src/stores/AuthStore'

const AdminAdoptCard = ({ img, petName, name, phone, email, requestId }) => {
    const token = useAuthStore(state => state.token)
    const [detail, setDetail] = useState('')
    const [score, setScore] = useState('')
    const hdlScore = async () => {
        console.log(requestId)
        const resp = await axios.get(`http://localhost:3000/pet/score/${requestId}/en`)
        setDetail(resp.data.shortDetail)
        setScore(resp.data.score)
    }
    return (
        <div className=' flex items-center'>
            <div className="h-[200px] border border-black rounded-xl p-3 m-2 flex-1">
                <div className='flex gap-3 items-center'>
                    <img
                        src={img}
                        alt="Card Image"
                        className='w-[100px] h-[100px] object-cover rounded-full'
                    />
                    <h3 className="font-bold">Pet Name</h3>
                    <p className="">{petName}</p>
                </div>
                <ul className="flex gap-2">
                    <li><strong>Name :</strong>{name}</li>
                    <li><strong>Email :</strong>{email}</li>
                    <li><strong>Phone :</strong>{phone}</li>

                </ul>
                <div className='flex gap-2 items-center'>
                    <Button onClick={hdlScore}>Scoring by Ai</Button>
                </div>
            </div>
            {score && <div className='flex-1'>
                <p>Score: {score} /100</p>
                <div>
                    <p>Detail:</p>
                    <p>{detail}</p>
                </div>
            </div>}

        </div>


    )
}

export default AdminAdoptCard