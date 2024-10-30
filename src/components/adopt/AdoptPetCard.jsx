import React from 'react'
import { Button } from "@/components/ui/button"

const AdoptPetCard = ({name,image}) => {
    return (
        <div className='w-[300px] flex flex-col gap-3 justify-center items-center border border-blue-600 rounded-xl'>
            <img className='h-[200px] rounded-xl p-3' src={image}/>
            <p className=' text-2xl text-center'>{name}</p>
            <Button variant="secondary" className="w-[100px] h-[50px] text-slate-800">{"Learn More"}</Button>
            
        </div>
    )
}

export default AdoptPetCard