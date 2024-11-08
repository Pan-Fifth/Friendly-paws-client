'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';





  export default function CardHome({cards}) {
    const { t, i18n } = useTranslation()
    const [activeIndex, setActiveIndex] = useState(2)
    const totalCards = cards.length
    const navigate = useNavigate()
  
    const getCardStyle = (index) => {
      const position = index - activeIndex
      const translateX = position * 100
      const scale = 1 - Math.abs(position) * 0.1
      const zIndex = 5 - Math.abs(position)
      let opacity = 1 - Math.abs(position) * 0.2
  
      return {
        transform: `translateX(${translateX}px) scale(${scale})`,
        zIndex,
        opacity,
      }
    }
  
    const handleNext = () => {
      setActiveIndex((prev) => (prev + 1) % totalCards)
    }
  
    const handlePrev = () => {
      setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards)
    }

    const getName = (card) => {
      return i18n.language === 'th' ? card.name_th : card.name_en
    }
  
    const getBreed = (card) => {
      return i18n.language === 'th' ? card.breed_th : card.breed_en
    }
  
    return (
<div className="absolute top-[-450px] md:top-[-360px]  w-full z-20 p-4 md:p-8 flex flex-col md:flex-row items-center justify-center">
  <div className='flex flex-col w-full md:w-1/4 text-center md:text-left mb-8 md:mb-0 '>
    <em className='hidden md:block text-[150px] md:text-[200px] lg:text-[250px] relative'>M</em>
    <p className='hidden md:block text-[40px] md:text-[80px] md:absolute md:left-[460px] md:top-[170px]'>eet</p>
    <p className='hidden md:block text-[40px] md:text-[80px] md:absolute md:left-[450px] md:top-[230px]'>Our</p>
    <p className='hidden md:block text-[40px] md:text-[80px] md:absolute md:left-[440px] md:top-[290px]'>Friends</p>
    <div className="flex items-center justify-center mt-4 md:mt-8 md:bottom-[450px] md:left-[-1000px] fixed bottom-[100px] left-0 right-0 z-50 top-0">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-pink-600 text-white px-12 py-3 rounded-full md:text-[20px] text-sm font-medium hover:bg-pink-700 transition-colors"
        onClick={()=>navigate('/adopt')}
      >
        Adopt
      </motion.button>
    </div>
               
        </div>
        
        <div className="relative w-[1000px] h-[500px]">
          <button
            onClick={handlePrev}
            className="absolute left-[180px]  md:left-4 top-1/2 -translate-y-1/2 z-30 bg-pink-500 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="absolute right-[180px] md:right-4 top-1/2 -translate-y-1/2 z-30 bg-pink-500 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm"
          >
            →
          </button>
  
          <div className="relative h-full flex items-center justify-center">
          {cards.map((card, index) => (
            <div
              key={index}
              className="absolute w-[200px] md:w-[400px] h-[300px] md:h-[500px] transition-all duration-500 ease-out cursor-pointer"
              style={getCardStyle(index)}
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={card.image[0].url}
                  alt={getName(card)}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
                
                <div className="absolute top-4 right-4 text-white/80 text-sm">
                  {index + 1} / {totalCards}
                </div>
                
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{getName(card)}</h3>
                  <p className="text-white/80">{getBreed(card)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}