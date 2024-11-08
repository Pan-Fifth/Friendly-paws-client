import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from 'react-i18next';
import axiosInstance from '@/src/utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import ProgressHome from './ProgressHome';
import CardHome from './CardHome';
import { Separator } from "@/components/ui/separator"
import { Heart, HeartHandshake, PawPrint } from 'lucide-react';
import { Image } from '@radix-ui/react-avatar';
import ImageHome from './ImageHome';
import TextHome from './TextHome';

'use client'

const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 3.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
}

const buttonVariants = {
  hidden: { y: 50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 1.2,
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
}

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
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [homeContent, setHomeContent] = useState(null);
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const containerRef = useRef(null);


  const getHome = () => {
    axiosInstance.get('/admin/home-content').then((response) => {
      setHomeContent(response.data[0]);

    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = window.scrollY;
        const sectionHeight = window.innerHeight;
        const newPage = Math.round(scrollPosition / sectionHeight);
        setCurrentPage(Math.min(newPage, pages.length - 1));
      }
    };
    getHome();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCircleClick = (index) => {
    if (containerRef.current) {
      const targetScrollPosition = index * window.innerHeight;
      window.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  const content = homeContent?.[`content_${i18n.language}`]?.split('|');
  console.log(homeContent)
  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-orange-500 overflow-hidden relative">
      {/* Vertical scroll progress indicator */}
      <motion.div
        className="fixed left-0 top-0 bottom-0 w-1 bg-pink-500 origin-top z-50"
        style={{ scaleY }}
      />

      <main>
        {pages.map((page, index) => (
          <section
            key={page.id}
            id={page.id}
           className={` min-h-screen w-full flex items-center justify-center relative 
              ${page.id === 'stories' ? 'bg-white' : page.id !== 'home' && page.id !== 'mission' ? 'bg-[#FFF3E9]' : ''}`}
             
          >
          {page.id === 'mission' && (
          <div className='absolute bottom-[-990px] w-full h-full'>
            <svg
              viewBox="0 0 1440 98"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0 0C240 98 480 98 720 98C960 98 1200 98 1440 0V98H0V0Z"
                fill="#FFF3E9"
              />
            </svg>
          </div>
        )}
            
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
                {/* /////////////////////////////////////////////////////////////////////////////////////// */}

                {index === 0 && (
                <div className="flex flex-col md:flex-row items-center justify-between relative w-full bg-white px-4 md:px-[400px] min-h-[100vh] md:h-auto">
                  <div className="relative z-10 order-2 md:order-1">

                  <img src="/src/assets/dogGif.gif" alt="" className='hidden md:block md:absolute top-[-60px] left-[-150px] rotate-[-40deg]' />


                  <motion.div
                    variants={item}
                    initial="hidden"
                    animate="show"
                    className="space-y-2"
                  >
                    <img 
                      src="/src/assets/dog.png" 
                      alt="img" 
                      className=' md:block h-screen w-auto object-contain' 
                    />
                    </motion.div>
                  </div>
                  <div className="hidden md:block absolute left-[250px] top-1/2 -translate-y-1/2 w-2/3 h-3/5 bg-orange-100 transform -skew-x-12 z-0" />
                  <div className="absolute w-full left-0 right-0 top-0 bottom-0 z-0" />
                  <div className="max-w-xl z-10 order-1 md:order-2 text-center md:text-left px-4 md:px-0">
                    <h1 className="text-lg md:text-xl mb-2 md:mb-4">
                      {t("adoptPage.adoptMe")}<span className="text-pink-600"> {t("adoptPage.adoptMe1")}</span>
                    </h1>


                    <h2 className="text-[80px] md:text-[150px] font-bold leading-tight mb-4 md:mb-8">
                      {t("adoptPage.friendlyPow")}
                      {/* <TextHome /> */}
                    </h2>
                    
                    <motion.button
                      variants={buttonVariants}
                      initial="hidden"
                       animate="show"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-pink-600 flex gap-2 text-white px-8 md:px-12 py-2 md:py-3 rounded-full text-base md:text-lg font-medium hover:bg-pink-700 transition-colors mx-auto md:mx-0"
                      onClick={()=>navigate('/adopt')}
                    >
                      <Heart />
                      {t("Adopt")}
                    </motion.button>
                  </div>
                </div>
)}

                {/* /////////////////////////////////////////////////////////////////////////////////////// */}

                {index === 1 && (
        <div className="relative backdrop-blur-md bg-white/30 border-white/50 shadow-lg w-full  md:w-2/3 rounded-3xl min-h-700 md:h-full px-4">
        <div className="container mx-auto p-2 md:p-10 md:h-[800px] md:flex md:flex-col md:justify-center h-[500px] ">
          <div className="space-y-4 md:space-y-8">
            <div className="flex flex-row gap-2 md:gap-6 overflow-x-scroll md:scrollbar-hide justify-start md:justify-center">
              <Card className="w-[250px] h-[300px] md:w-[300px] md:h-[300px] flex-shrink-0 flex justify-center items-center mx-auto "> 
                <CardContent className="p-2 md:p-4 space-y-2 flex flex-col justify-center items-center ">
                  <div className="aspect-square relative overflow-hidden rounded-lg h-[150px] md:h-auto">
                    <img
                      src={homeContent?.image1}
                      alt="Black dog looking at camera"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className='font-semibold text-center md:text-lg'>{content?.[2]}</p>
                  <p className='text-xs md:text-sm text-muted-foreground'>{content?.[3]}</p>
                </CardContent>
              </Card>
              <Card className="w-[250px] md:w-[300px] flex-shrink-0 flex justify-center items-center mx-auto">
                <CardContent className="p-2 md:p-4 space-y-2 flex flex-col justify-center items-center">
                  <div className="aspect-square relative overflow-hidden rounded-lg h-[150px] md:h-auto">
                    <img
                      src={homeContent?.image1}
                      alt="Black dog looking at camera"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className='font-semibold text-center-base md:text-lg'>{content?.[4]}</p>
                  <p className='text-xs md:text-sm text-muted-foreground'>{content?.[5]}</p>
                </CardContent>
              </Card>
              <Card className="w-[250px] md:w-[300px] flex-shrink-0 flex justify-center items-center mx-auto">
                <CardContent className="p-2 md:p-4 space-y-2 flex flex-col justify-center items-center">
                  <div className="aspect-square relative overflow-hidden rounded-lg h-[150px] md:h-auto">
                    <img
                      src={homeContent?.image1}
                      alt="Black dog looking at camera"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className='font-semibold text-center md:text-lg'>{content?.[6]}</p>
                  <p className='text-xs md:text-sm text-muted-foreground'>{content?.[7]}</p>
                </CardContent>
              </Card>
              </div>
                            
                      <div className="text-center space-y-2 md:space-y-4">
                      <h1 className="text-2xl md:text-4xl font-bold tracking-tighter">WELCOME TO OUR CLUB!</h1>
                      <p className="mx-auto max-w-[600px] text-sm md:text-base text-muted-foreground">
                        Join our community of pet lovers and discover everything you need to know about pet care, health, and happiness.
                      </p>
                      <Button size="lg" className="bg-pink-500 hover:bg-pink-600" onClick={()=>navigate('/about')}>
                        ABOUT US
                      </Button>
                    </div>
                    </div>
                  </div>
                </div>
              )}

                  {/* /////////////////////////////////////////////////////////////////////////////////////// */}

                  {index === 2 && (
                  <div className="relative text-center my-10 w-full min-h-screen flex flex-col gap-4">
                    
                    <h1 className='text-3xl md:text-5xl lg:text-[70px]'>Adopt Progress</h1>
                    <div className='flex w-full justify-center '>
                    <div className='w-full md:w-1/2 '>
                      <ProgressHome />
                    </div>
                    <div className='w-1/2 hidden md:block'>
                      <ImageHome />
                    </div>
                    </div>

                    <div className="bg-gradient from-red-300 to-white h-[150px] w-full">
                      <div className="absolute bottom-[-50px] left-0 right-0">
                        <svg
                          viewBox="0 0 1440 320"
                          className="w-full h-48"
                          preserveAspectRatio="none"
                        >
                          <path
                            fill="white"
                            fillOpacity="1"
                            d="M0,160L26.7,165.3C53.3,171,107,181,160,192C213.3,203,267,213,320,213.3C373.3,213,427,203,480,181.3C533.3,160,587,128,640,128C693.3,128,747,160,800,181.3C853.3,203,907,213,960,208C1013.3,203,1067,181,1120,176C1173.3,171,1227,181,1280,176C1333.3,171,1387,149,1413,138.7L1440,128L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* /////////////////////////////////////////////////////////////////////////////////////// */}


                {index === 3 && (
                  <section className="relative w-full h-[300px] md:h-[600px] md: py-8 md:py-12  flex flex-col justify-center gap-4">
                    <CardHome className="absolute z-20" />
                    <Separator orientation="horizontal" className="shrink-0 md:left-[350px] bg-border h-[1px] w-2/3 absolute left-[120px] top-[190px] md:top-[250px]" />
                    
                    <div className="container w-full h-full z-0 px-4 md:px-6 py-[60px] md:py-[100px] lg:py-[200px] mx-auto">
                    <div className=" flex flex-col gap-3 mx-auto justify-center my-[150px] items-center space-y-4 md:space-y-6 text-center md:my-[30px]">
                    <div className="space-y-2 md:space-y-4 flex flex-col gap-4">
                      <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter">Make a Difference Today</h2>
                      <p className="max-w-[900px] text-sm md:text-base lg:text-xl text-gray-500 dark:text-gray-400 px-2 md:px-4">
                        Your donation helps us provide food, shelter, and medical care to animals in need. Every contribution, no matter how small, can change a life.
                      </p>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-[200px] md:w-auto" size="lg" onClick={()=>{navigate("/donate")}}>
                      Donate
                    </Button>
                    <HeartHandshake className="h-[80px] w-[80px] md:h-[150px] md:w-[150px] lg:h-[200px] lg:w-[200px] text-pink-500" />
                  </div>
                  <Separator orientation="horizontal" className="hidden md:block md:top-[800px]  shrink-0 bg-border h-[1px] w-1/3 absolute left-1/2 transform -translate-x-1/2 top-[650px]" />
                </div>
                  </section>
                )}
              </motion.div>
            </AnimatePresence>

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

      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-20">
        {pages.map((_, i) => (
          <motion.button
            key={i}
             onClick={() => handleCircleClick(i)}
            className={`w-4 h-4 rounded-full ${i === currentPage ? 'bg-pink-600' : 'bg-orange-300'}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Scroll to ${pages[i].title}`}
            
          />
        ))}
        
      </div>
    </div>
  );
}
