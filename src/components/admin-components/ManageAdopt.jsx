import React, { useEffect } from 'react'
import useAdoptStore from '@/src/stores/AdoptStore'
import useAuthStore from '@/src/stores/AuthStore'
import { useNavigate } from 'react-router-dom'
import AdminAdoptCard from '../adopt/AdminAdoptCard'
export default function ManageAdopt() {
    const actionGetAllAdoptRequest = useAdoptStore(state=>state.actionGetAllAdoptRequest)
    const allAdoptRequest = useAdoptStore(state=>state.allAdoptRequest)
    const token = useAuthStore(state=>state.token)
    const navigate =useNavigate()
    useEffect(()=>{
        actionGetAllAdoptRequest(token)
    },[])
    console.log(allAdoptRequest)
    if(!token){
        navigate("/login")
    }
    console.log(allAdoptRequest)
    return (
        <div>
            {allAdoptRequest?.map((el,index)=>(<AdminAdoptCard 
            key={index}
            requestId={el.id}
            img={el.pet.image[0].url}
            name={el.user.firstname}
            email={el.user.email}
            phone = {el.user.phone}
            petName = {el.pet.name_en}
             />))}
        </div>
    )
}
