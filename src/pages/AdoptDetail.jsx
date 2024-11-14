import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import usePetStore from '../stores/PetStore'
import { Button } from '@/components/ui/button'
import { DialogAdopt } from '../components/adopt/AdoptForm'
import { useTranslation } from 'react-i18next'
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react'

const AdoptDetail = () => {
  const { t, i18n } = useTranslation()
  const language = i18n.language
  const { id } = useParams()
  const actionGetCurrentPet = usePetStore(state => state.actionGetCurrentPet)
  const currentPet = usePetStore(state => state.currentPet)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentPet.image.length)
  }
  
  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentPet.image.length) % currentPet.image.length)
  }
  

  useEffect(() => {
    actionGetCurrentPet(id)
  }, [])

  if (!currentPet || !currentPet.image) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }
console.log(currentPet)
  return (
    <div className=" bg-gradient-to-br from-[#ffeed8] via-white to-pink-100">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid md:grid-cols-2 max-w-7xl mx-auto pt-10 pb-20 px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="relative">
          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  src={currentPet.image[currentImageIndex].url} 
                  className="w-full h-[500px] object-cover"
                  alt={currentPet.description_en}
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              <button 
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pink-100"
              >
                <ChevronLeft className="w-6 h-6 text-pink-600" />
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pink-100"
              >
                <ChevronRight className="w-6 h-6 text-pink-600" />
              </button>
            </div>
            
            <div className="flex gap-3 mt-6 justify-center">
              {currentPet.image.map((img, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    currentImageIndex === index ? 'border-pink-600' : 'border-transparent hover:border-pink-300'
                  }`}
                >
                  <img 
                    src={img.url} 
                    className="h-16 w-16 object-cover"
                    alt={`Preview ${index + 1}`}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="mt-8 flex justify-center"
          >
            <DialogAdopt 
              petId={id}
              className="group relative bg-pink-600 text-white text-xl font-semibold px-16 py-6 rounded-2xl
                transform transition-all duration-300 hover:-translate-y-1 hover:bg-pink-700
                flex items-center gap-4 overflow-hidden"
            >
              <motion.span 
                className="absolute inset-0 bg-white/20"
                initial={false}
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <Heart className="w-7 h-7 transition-transform group-hover:scale-125" />
              <span>{t("Adopt Me")}</span>
              <Sparkles className="w-7 h-7 text-yellow-300 animate-pulse" />
            </DialogAdopt>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10 md:mt-0 md:ml-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <motion.h1 
              variants={itemVariants}
              className="text-4xl font-bold text-gray-800 mb-8 flex flex-col items-center gap-2"
            >
            <div className='flex gap-2'>
              <Sparkles className="text-pink-600" />
              {language === 'th' ? (currentPet.name_th || currentPet.name_en) : currentPet.name_en || currentPet.name_th}
            </div>
              <hr/>
              <div className=' self-start text-[25px]'>
              {language === 'th' ? (currentPet.description_th || currentPet.description_en) : currentPet.description_en || currentPet.description_th}
              </div>
            </motion.h1>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: t("adoptDetail.breed"), value: language === 'th' ? (currentPet.breed_th || currentPet.breed_en) : currentPet.breed_en || currentPet.breed_th },
                { label: t("adoptDetail.color"), value: currentPet.color },
                { label: t("adoptDetail.birthday"), value: format(new Date(currentPet.birthDay), 'dd/MM/yyyy') },
                { label: t("adoptDetail.age"), value: `${Math.floor(currentPet.age / 365)}.${Math.floor(currentPet.age % 365 / 30.44)} ${t("adoptDetail.year")}` },
                { label: t("adoptDetail.weight"), value: `${(currentPet.weight).toFixed(2)} kg` },
                { label: t("adoptDetail.gender"), value: currentPet.gender },
                { label: t("adoptDetail.vaccinationStatus"), value: currentPet.is_vaccinated === "true" ? "✓ Yes" : "✗ No" },
                { label: t("adoptDetail.neuterationStatus"), value: currentPet.is_neutered === "true" ? "✓ Yes" : "✗ No" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="col-span-1 bg-white/50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <p className="text-pink-600 font-medium mb-1">{item.label}</p>
                  <p className="text-gray-800 font-semibold">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AdoptDetail
