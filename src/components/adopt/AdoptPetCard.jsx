import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuthStore from '@/src/stores/AuthStore'
import { useState } from 'react'
import { Card, CardFooter } from "@/components/ui/card"

function DesignCard({ name, image, id, onClickHandler }) {
  const token = useAuthStore(state => state.token)
  const navigate = useNavigate()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  
  const images = Array.isArray(image) ? image : [image]

  const handleClick = () => {
    if (!token) {
      navigate('/login')
    } else {
      onClickHandler()
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
      <div className="relative h-80">
        <div className="relative w-full h-full">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={name}
            className={`absolute top-0 left-0 object-cover w-full h-full transition-opacity duration-500 ${
              currentImageIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
          
          {images.length > 1 && (
            <div className="absolute bottom-[50px] left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-5 h-5 rounded-full transition-colors ${
                    currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-white/10 transform skew-y-6 z-0" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-white/5 transform -skew-y-6 z-0" />

        <svg
          className="absolute bottom-[-20px] w-full text-white"
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

      <CardFooter className="bg-white p-4 pt-0 flex flex-col gap-5">
        <div className='text-2xl z-20'>{name}</div>
        <div>
          <div className="flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isAnimating ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={handleClick}
                className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-pink-300 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white rounded-full shadow-lg"
              >
                Adopt me!
              </Button>
            </motion.div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function AdoptPetCard({ name, image, id }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const navigate = useNavigate()
  
  const hdlClick = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
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
