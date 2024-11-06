'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const cards = [
  { id: 1, title: "Rosa khutor", location: "Krasnodar", image: "https://i.pinimg.com/564x/ee/00/20/ee0020e9d7586708083aecdb77be6293.jpg" },
  { id: 2, title: "Teletskiy", location: "Alta Republic", image: "https://i.pinimg.com/564x/fa/98/82/fa988290ed5db0af24e733cdc5522158.jpg" },
  { id: 3, title: "Sheregesh", location: "Siberia", image: "https://i.pinimg.com/564x/a6/8a/ba/a68abadc337799911f4db1adb36a4cf1.jpg" },
  { id: 4, title: "Big wood", location: "Kamchatka", image: "https://i.pinimg.com/564x/fa/82/bc/fa82bc582fd33946eb7a6cbb3f915329.jpg" },
  { id: 5, title: "Dombay", location: "Karachay-Cherkessia", image: "https://i.pinimg.com/564x/1b/23/b5/1b23b5e16b3f318e61fdc5af3ea4579e.jpg" },
]

export default function CardHome() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(2)
  const totalCards = cards.length
  const navigate = useNavigate();

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

  return (
    <div className="absolute top-[-440px] w-full z-20 p-8 flex items-center justify-center">
      <div className='flex flex-col w-1/4'>
        <em className='text-[250px] relative'>M </em>
        <p className='absolute text-[80px] left-[460px] top-[170px]'>eet</p>
        <p className='absolute text-[80px] left-[450px] top-[230px]'>Our</p>
        <p className='absolute text-[80px] left-[440px] top-[290px]'>Friends</p>
        <div className="flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-pink-600 text-white px-12 py-3 rounded-full text-lg font-medium hover:bg-pink-700 transition-colors"
            onClick={() => navigate('/adopt')}
          >
            {t("adoptPage.adoptButton")}
          </motion.button>
        </div>

      </div>

      <div className="relative w-[1000px] h-[500px]">
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-pink-500 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-pink-500 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm"
        >
          →
        </button>

        <div className="relative h-full flex items-center justify-center">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="absolute w-[300px] h-[400px] transition-all duration-500 ease-out cursor-pointer"
              style={getCardStyle(index)}
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />

                <div className="absolute top-4 right-4 text-white/80 text-sm">
                  {index + 1} / {totalCards}
                </div>

                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                  <p className="text-white/80">{card.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}