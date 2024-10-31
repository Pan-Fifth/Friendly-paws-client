import React from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'

const AdoptPetCard = ({name,image,id}) => {
    const navigate = useNavigate()
    const hdlClick = () =>{
        navigate(`/adopt/detail/${id}`)

    }
    return (
        <div className='w-[300px] flex flex-col gap-3 justify-center items-center border border-blue-600 rounded-xl'>
            <img className='h-[200px] w-[250px] object-cover rounded-xl p-3' src={image}/>
            <p className=' text-2xl text-center'>{name}</p>
            <Button onClick={hdlClick} variant="secondary" className="w-[100px] h-[50px] text-slate-800">{"Learn More"}</Button>
        </div>
    )
}

export default AdoptPetCard