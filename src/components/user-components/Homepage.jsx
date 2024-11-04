import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'





'use client'



const Bubble = ({ size, left, top, delay }) => (
  <motion.div
    className="absolute rounded-full bg-white/20 backdrop-blur-sm"
    style={{
      width: size,
      height: size,
      left: `${left}%`,
      top: `${top}%`,
    }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      delay: delay,
    }}
  />
)

const pages = [
  { id: 'home', title: 'Home' },
  { id: 'mission', title: 'Our Mission' },
  { id: 'adoption', title: 'Adoption Process' },
  { id: 'stories', title: 'Success Stories' },
]

export default function Homepage() {
  const [currentPage, setCurrentPage] = useState(0)
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = window.scrollY
        const sectionHeight = window.innerHeight
        const newPage = Math.round(scrollPosition / sectionHeight)
        setCurrentPage(Math.min(newPage, pages.length - 1))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCircleClick = (index) => {
    if (containerRef.current) {
      const targetScrollPosition = index * window.innerHeight
      window.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth',
      })
    }
  }

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 }
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-pink-400 via-orange-300 to-yellow-300 overflow-hidden relative">
      {/* Vertical scroll progress indicator */}
      <motion.div
        className="fixed left-0 top-0 bottom-0 w-1 bg-pink-500 origin-top z-50"
        style={{ scaleY }}
      />

      {/* Main content */}
      <main>
        {pages.map((page, index) => (
          <section
            key={page.id}
            id={page.id}
            className="min-h-screen w-full flex items-center justify-center  relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="w-full mx-auto relative z-10 flex justify-center"
              >
                {index === 0 && (
                    <div className="flex items-center justify-between relative w-full bg-white px-[300px] ">
                    <div className="relative z-10">
                            <img  src="/src/assets/dog.png" 
                            alt=""  
                            className='h-screen ' />
                        </div>
                      <div className="absolute left-[250px] top-1/2 -translate-y-1/2 w-2/3 h-3/5 bg-orange-100 transform -skew-x-12 z-0" />
                    <div className="absolute w-full  left-0 right-0 top-0 bottom-0 z-0" />
                        <div className="max-w-xl z-10">
                      <h1 className="text-xl mb-4">
                        ADOPT ME<span className="text-pink-600">, PLEASE</span>
                      </h1>
                      <h2 className="text-[150px] font-bold leading-tight mb-8">
                        FRIENDLY POW
                      </h2>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-pink-600 text-white px-12 py-3 rounded-full text-lg font-medium hover:bg-pink-700 transition-colors"
                      >
                        ADOPT
                      </motion.button>
                    </div>
                    </div>
                )}




                {index === 1 && (
                  <div className="relative bg-white/90 rounded-3xl p-12 backdrop-blur-sm">
                    <div className="text-center mb-12">
                      <h2 className="text-4xl font-bold mb-4">WELCOME TO OUR CLUB!</h2>
                      <p className="text-gray-600 max-w-2xl mx-auto">
                        Join our community of pet lovers and discover everything you need to know about pet care, health, and happiness.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="text-center">
                        <div className="relative w-48 h-48 mx-auto mb-4">
                          <div className="absolute inset-0 rounded-full overflow-hidden">
                           <img src="https://res.cloudinary.com/petrescue/image/upload/b_auto:predominant,c_pad,f_auto,h_648,w_648/x9vv6s9se8byqdikbza0.jpg" 
                           alt="" 
                           className=' w-full h-full' />
                
                          </div>
                          <div className="absolute inset-0 bg-white/30 rounded-full"></div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">CARE ADVICE</h3>
                        <p className="text-gray-600">Expert tips for keeping your pets healthy and happy</p>
                      </div>
                      <div className="text-center">
                        <div className="relative w-48 h-48 mx-auto mb-4">
                          <div className="absolute inset-0 rounded-full overflow-hidden">
                          <img src="https://res.cloudinary.com/petrescue/image/upload/b_auto:predominant,c_pad,f_auto,h_648,w_648/x9vv6s9se8byqdikbza0.jpg" 
                           alt="" 
                           className='  w-full h-full' />
                
                          </div>
                          <div className="absolute inset-0 bg-white/30  rounded-full"></div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">VETERINARY HELP</h3>
                        <p className="text-gray-600">Professional medical care when you need it most</p>
                      </div>
                      <div className="text-center">
                        <div className="relative w-48 h-48 mx-auto mb-4">
                          <div className="absolute inset-0 rounded-full overflow-hidden">
                          <img src="https://res.cloudinary.com/petrescue/image/upload/b_auto:predominant,c_pad,f_auto,h_648,w_648/x9vv6s9se8byqdikbza0.jpg" 
                           alt="" 
                           className=' w-full h-full' />
                          </div>
                          <div className="absolute inset-0 bg-white/30  rounded-full"></div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">OUR TIPS</h3>
                        <p className="text-gray-600">Daily guidance for better pet parenting</p>
                      </div>
                    </div>
                    <div className="text-center mt-8">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-pink-600 text-white px-8 py-2 rounded-full text-sm font-medium hover:bg-pink-700 transition-colors"
                      >
                        VIEW MORE
                      </motion.button>
                    </div>
                  </div>
                )}
                {index === 2 && (
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-pink-600 mb-4">Adoption Process</h2>
                    <p className="text-xl text-orange-900">Learn about our simple and rewarding adoption process.</p>
                  </div>
                )}
                {index === 3 && (
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-pink-600 mb-4">Success Stories</h2>
                    <p className="text-xl text-orange-900">Read heartwarming tales of pets finding their forever homes.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Randomly positioned bubbles for each section */}
            {[...Array(15)].map((_, i) => (
              <Bubble
                key={`${page.id}-bubble-${i}`}
                size={Math.random() * 60 + 20}
                left={Math.random() * 100}
                top={Math.random() * 100}
                delay={Math.random() * 5}
              />
            ))}
          </section>
        ))}
      </main>

      {/* Vertical clickable dot navigation with z-index 20 */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-20">
        {pages.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => handleCircleClick(i)}
            className={`w-4 h-4 rounded-full ${
              i === currentPage ? 'bg-pink-600' : 'bg-orange-300'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Scroll to ${pages[i].title}`}
          />
        ))}
      </div>
    </div>
  )
}
