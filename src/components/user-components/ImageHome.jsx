'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const images = [
  "https://i.pinimg.com/564x/6c/3f/79/6c3f793a11a7c8f807ff0d0bf2a006e9.jpg",
  "https://i.pinimg.com/564x/24/86/4f/24864fa604c48845ee9e64ebc6441c3c.jpg",
  "https://i.pinimg.com/564x/e5/e6/17/e5e617f23c4a1e8f768ee78307b9b330.jpg",
]

export default function ImageHome() {
    const [visibleImages, setVisibleImages] = useState([])
    const imageRefs = useRef([])
    

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.findIndex((ref) => ref === entry.target)
            if (index !== -1 && !visibleImages.includes(index)) {
              setVisibleImages((prev) => [...prev, index])
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [visibleImages])

  const imageVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 1,
        ease: "easeOut"
      }
    }
  }

  const outlineVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 10,
        ease: "linear",
        repeat: Infinity,
      }
    }
  }

  return (
    <div className="min-h-screen py-2 px-20">
      <div className="container mx-auto px-4 max-w-4xl">
      <div className="space-y-2">
          {images.map((src, index) => (
            <motion.div
              key={src}
              ref={(el) => (imageRefs.current[index] = el)}
              initial="hidden"
              animate={visibleImages.includes(index) ? "visible" : "hidden"}
              variants={imageVariants}
              className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-evenly'}`}
            >
              <div className="w-1/2 md:w-1/3 relative">
                <div className="aspect-square overflow-hidden rounded-full  shadow-lg relative">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={src}
                      alt={`Circular image ${index + 1}`}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <svg
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="49"
                    stroke="#e25594"
                    strokeWidth="0.5"
                    variants={outlineVariants}
                    initial="initial"
                    animate="animate"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}