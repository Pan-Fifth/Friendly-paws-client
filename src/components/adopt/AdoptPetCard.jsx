import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuthStore from '@/src/stores/AuthStore'
import { useState } from 'react'
import {  Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Heart } from 'lucide-react'

// Update the AdoptPetCard component:

function DesignCard({ name, image, id, gender, onClickHandler }) {
  const token = useAuthStore(state => state.token)
  const navigate = useNavigate()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const images = Array.isArray(image) ? image : [image]
  
  const handleClick = () => {
    if (!token) {
      navigate('/login')
    } else {
      onClickHandler()
    }
  }

  return (
    <div className="flex flex-col h-full">
    <div className="relative h-40 md:h-48 lg:h-56 overflow-hidden">
      <img
        src={images[currentImageIndex]}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                currentImageIndex === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
      <CardHeader className="relative p-3">
        <span className="text-xs font-medium text-primary">{gender}</span>
      </CardHeader>

      <CardContent className="flex-grow p-3">
        <h3 className="text-sm md:text-base lg:text-lg font-bold mb-2 line-clamp-2">{name}</h3>
      </CardContent>

      <CardFooter className="p-3">
      <div className="flex items-center justify-center mx-auto">
      <motion.button
      onClick={handleClick}
        whileHover={{ rotate: [-1, 1, -1, 1, 0] }}
        transition={{
          rotate: {
            duration: 0.3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }
        }}
        className="px-4 py-2 text-sm font-bold text-white rounded-full shadow-md bg-[#db2778c4] hover:bg-[#be185d] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#db2777] focus:ring-opacity-50 flex items-center space-x-1"
      >
        <span>Adopt Me!</span>
        <Heart className="w-4 h-4" />
      </motion.button>
    </div>
      </CardFooter>
    </div>
  )
}

export default function AdoptPetCard({ name, image, id, gender }) {
  const navigate = useNavigate()
  
  const hdlClick = () => {
    navigate(`/adopt/detail/${id}`)
  }
  
  return (
    <DesignCard
      name={name}
      image={image}
      id={id}
      gender={gender}
      onClickHandler={hdlClick}
    
    />
  )
}
