"use client"

import { useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BadgeCheck, Cat, Dog, PawPrint, ReceiptText, CalendarFold } from "lucide-react"

export default function ProgressHome() {
  const [openItem, setOpenItem] = useState(null)
  const [animalPositions, setAnimalPositions] = useState([])
  
  const features = [
    {
      icon: <PawPrint className="w-6 h-6 text-primary" />,
      number: "01",
      title: "Select your destiny friends",
      description:
        "The first step that you have to do is sign in to join our community, then you can access through all our website",
    },
    {
      icon: <ReceiptText className="w-6 h-6 text-primary" />,
      number: "02",
      title: "Put your detail in the form",
      description:
        "Unlike low-cost carriers (Spirit, Frontier, etc.), which have already discounted their service down to a wholesale level, normal legacy carriers have markups that shoot their prices up. We bypass them.",
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-primary" />,
      number: "03",
      title: "Wait for the confirmation",
      description:
        "Denver has tons of flights and tons of empty seats. Aspen, not so much. Major cities mean major savings. Plus, they typically have large airports which also have larger flights.",
    },
    {
      icon: <CalendarFold className="w-6 h-6 text-primary" />,
      number: "04",
      title: "Get an interview date!",
      description:
        "Unlike low-cost carriers (Spirit, Frontier, etc.), which have already discounted their service down to a wholesale level, normal legacy carriers have markups that shoot their prices up. We bypass them.",
    },
  ]

  useEffect(() => {
    const generateRandomPositions = () => {
      const positions = []
      const minDistance = 150
      
      const isValidPosition = (newPos, existingPositions) => {
        return existingPositions.every(pos => {
          const distance = Math.sqrt(
            Math.pow(newPos.top - pos.top, 2) + 
            Math.pow(newPos.left - pos.left, 2)
          )
          return distance >= minDistance
        })
      }

      for (let i = 0; i < 10; i++) {
        let newPosition
        let attempts = 0
        const maxAttempts = 50

        do {
          newPosition = {
            type: Math.random() > 0.5 ? 'dog' : 'cat',
            top: Math.random() * 800,
            left: Math.random() * 1200 - 300,
            rotation: Math.random() * 360,
          }
          attempts++
        } while (!isValidPosition(newPosition, positions) && attempts < maxAttempts)

        if (attempts < maxAttempts) {
          positions.push(newPosition)
        }
      }
      
      setAnimalPositions(positions)
    }
    
    generateRandomPositions()
  }, [])

  return (
    <div className="container w-full md:w-2/3 mx-auto py-7">
      <div>
        {animalPositions.map((position, index) => (
          position.type === 'dog' ? (
            <Dog 
              key={`animal-${index}`}
              className="absolute w-[100px] h-[100px] text-orange-100"
              style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                transform: `rotate(${position.rotation}deg)`,
              }}
            />
          ) : (
            <Cat 
              key={`animal-${index}`}
              className="absolute w-[100px] h-[100px] text-orange-100"
              style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                transform: `rotate(${position.rotation}deg)`,
              }}
            />
          )
        ))}
      </div>
      <div className="relative w-full mx-auto flex flex-col gap-4">
      <div className="absolute  left-[80%] md:left-[950px] top-0 bottom-0 w-0.5 bg-primary" aria-hidden="true" />
        {features.map((feature) => (
          <div
            key={feature.number}
            className="relative  flex items-start mb-12 last:mb-0"
          >
            <div className="absolute  left-[80%]   md:left-[950px] w-8 h-8 rounded-full bg-primary flex items-center justify-center translate-x-[-15px]">
            <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <div className="md:w-[70%]  md:ml-[20px] w-1/2 pr-1 ml-[80px]">
              <div className="flex items-center space-x-2 md:my-[-9px]  md:mx-[600px] mb-2">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-200  flex items-center justify-center">
                  {feature.icon}
                </div>
                <em className="text-[30px] text-pink-500">{feature.number}</em>
              </div>
              <Accordion type="single" collapsible className="w-full md:ml-[220px]  text-[12px] ">
  <AccordionItem value={feature.number}>
    <AccordionTrigger
      className={`md:text-[30px]   lg:text-[30px] w-full font-semibold ${
        openItem === feature.number ? "text-[#db2777]" : ""
      }`}
      onClick={() => setOpenItem(openItem === feature.number ? null : feature.number)}
    >
      {feature.title}
    </AccordionTrigger>
    <AccordionContent className="text-muted-foreground text-[18px]">
      {feature.description}
    </AccordionContent>
  </AccordionItem>
</Accordion>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
