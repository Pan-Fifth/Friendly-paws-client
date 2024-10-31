import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import usePetStore from '../stores/PetStore'
import { Button } from '@/components/ui/button'
import { DialogAdopt } from '../components/adopt/AdoptForm'

const AdoptDetail = () => {
    const {id} = useParams()
    const actionGetCurrentPet = usePetStore(state=>state.actionGetCurrentPet)
    const currentPet = usePetStore(state=>state.currentPet)
    useEffect(()=>{
        actionGetCurrentPet(id)
    },[])
    console.log(currentPet)
  return (
    <div className=' flex w-full p-10 gap-9'>
        <div className='flex-1'>
              <div className=' flex flex-col gap-3 items-center'>
                <img src={currentPet.image[0].url} className='h-[800px] object-cover'/>
                <DialogAdopt/>
                <Button  variant="secondary" className="w-[100px] h-[50px] text-slate-800">{"Chat?"}</Button>
              </div>
        </div>
        <div className=' flex flex-col flex-1 items-center'>
          <p className='flex-1'>{currentPet.description_en}</p>
          <div className=' grid grid-cols-2 flex-1'>
              <p >Breed</p>
              <p >{currentPet.breed_en}</p>
              <p >Color</p>
              <p >{currentPet.color}</p>
              <p >Birth day</p>
              <p >{currentPet.birthDay}</p>
              <p >Weight</p>
              <p >{currentPet.weight}</p>
              <p >Gender</p>
              <p >{currentPet.gender}</p>
              <p >Vacine Taken</p>
              <p >{currentPet.is_vaccinated === "true" ?"Yes" : "No"}</p>
              <p >Neuteration</p>
              <p >{currentPet.is_neutered === "true" ?"Yes" : "No"}</p>
          </div>
        </div>
    </div>
  )
}

export default AdoptDetail