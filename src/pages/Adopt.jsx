import React, { useEffect } from 'react'
import { DropdownWithArrow } from '@/components/ui/dropdown-with-arrow'
import { Button } from "@/components/ui/button"
import AdoptPetCard from '../components/adopt/AdoptPetCard'
import usePetStore from '../stores/PetStore'
import { PaginationDemo } from '../components/adopt/PageSelect'

const Adopt = () => {
    useEffect(()=>{
        actionGetAvaiPet()
    },[])
    const actionGetAvaiPet = usePetStore(state=>state.actionGetAvaiPet)
    const avaiPets = usePetStore(state=>state.avaiPets)
    console.log(avaiPets)
    if (!avaiPets) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>
    }
    return (
        <div>
            <div className='w-full h-[200px] text-3xl font-bold flex justify-center items-center overflow-auto'>
                <p>Our friends who are looking for a house</p>
            </div>
            <div className=' w-full h-[300px] bg-slate-400'>
                <div className='h-full flex flex-col gap-3 items-center justify-center'>
                    <div className='flex gap-3 justify-center'>
                        <p className='text-3xl'>Furreal You've found 7,634 listings for</p>
                        <div className='flex gap-3'>
                            <DropdownWithArrow name={"Gender"} array={["Male", "Female"]} className={"w-[300px] text-xl"} />
                            <DropdownWithArrow name={"Age"} array={["Kid", "Junior", "Senior", "Adult"]} className={"w-[300px] text-xl"} />
                            <DropdownWithArrow name={"Size"} array={["Small", "Medium", "Large"]} className={"w-[300px] text-xl"} />
                        </div>
                    </div>
                    <p className='text-3xl'>Including pets located interstate</p>
                </div>
            </div>
                <div className='h-[400px] flex gap-2 justify-center items-center'>
                    <div className='flex gap-2 border border-black rounded-2xl p-10'>
                        <Button variant="secondary" className="w-[100px] h-[100px] text-slate-800" >{"Small"}</Button>
                        <Button variant="secondary" className="w-[100px] h-[100px] text-slate-800" >{"Medium"}</Button>
                        <Button variant="secondary" className="w-[100px] h-[100px] text-slate-800" >{"Large"}</Button>
                    </div>
                    <div className='flex gap-2 border border-black rounded-2xl p-10'>
                        <Button variant="secondary" className="w-[100px] h-[100px] text-slate-800" >{"Kid"}</Button>
                        <Button variant="secondary" className="w-[100px] h-[100px] text-slate-800" >{"Junior"}</Button>
                        <Button variant="secondary" className="w-[100px] h-[100px] text-slate-800" >{"Senior"}</Button>
                        <Button variant="secondary" className="w-[100px] h-[100px] text-slate-800" >{"Adult"}</Button>
                    </div>
                    <div className='flex gap-2 border border-black rounded-2xl p-10'>
                        <Button variant="secondary" className="w-[100px] h-[100px] text-slate-800" >{"Male"}</Button>
                        <Button variant="secondary" className="w-[100px] h-[100px] text-slate-800" >{"Female"}</Button>
                    </div>
                </div>
                <div className='flex gap-3 flex-wrap justify-center items-center'>
                    {avaiPets?.map((el)=>(<AdoptPetCard key={el?.id} id={el?.id} name ={el?.name_en} image={el.image[0]?.url}/>))}
                </div>
                <div className='mt-10'>
                <PaginationDemo className={"rounded-full bg-green-300"}/>
                </div>


        </div>
    )
}

export default Adopt