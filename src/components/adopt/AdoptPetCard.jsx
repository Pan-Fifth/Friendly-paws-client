import React from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'

// const AdoptPetCard = ({name,image,id}) => {
//     const navigate = useNavigate()
//     const hdlClick = () =>{
//         navigate(`/adopt/detail/${id}`)

//     }
//     return (
//         <div className='w-[300px] flex flex-col gap-3 justify-center items-center border border-blue-600 rounded-xl'>
//             <img className='h-[200px] w-[250px] object-cover rounded-xl p-3' src={image}/>
//             <p className=' text-2xl text-center'>{name}</p>
//             <Button onClick={hdlClick} variant="secondary" className="w-[100px] h-[50px] text-slate-800">{"Learn More"}</Button>
//         </div>
//     )
// }

// export default AdoptPetCard




'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"

function DesignCard({name,image,id,onClickHandler}) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
     <div className="relative h-60">
        {/* Full-width picture */}
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full"
        />
        
        {/* Gradient overlay */}
     
        
        {/* Geometric shapes */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-white/10 transform skew-y-6" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-white/5 transform -skew-y-6" />

        {/* Curved separator */}
        <svg
          className="absolute bottom-0 w-full text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,64L60,80C120,96,240,128,360,128C480,128,600,96,720,90.7C840,85,960,107,1080,112C1200,117,1320,107,1380,101.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
      
      
      <CardFooter className="bg-white p-4 pt-0">
        <Button 
         onClick={onClickHandler}
          className="w-full"
        >
          {showDetails ? 'Hide Details' : 'More Details'}
        </Button >
      </CardFooter>
    </Card>
  )
}

export default function AdoptPetCard({name,image,id}) {
    const navigate = useNavigate()
    const hdlClick = () =>{
        navigate(`/adopt/detail/${id}`)

    }
  return (
    <div className="container mx-auto p-4">
               
                    <DesignCard 
                        name={name} 
                        image={image} 
                        id={id} 
                        onClickHandler={hdlClick}
                    />
     
            </div>

  )
}