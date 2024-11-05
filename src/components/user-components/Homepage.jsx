import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { useTranslation } from 'react-i18next';
import axiosInstance from '@/src/utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

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
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-orange-200 via-pink-100 to-orange-300 overflow-hidden relative">
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
           className={` min-h-screen w-full flex items-center justify-center relative overflow-hidden
             ${page.id !== 'home'&& page.id !=='mission' ? 'bg-[#FFF3E9]' : ''}`}
             
          >
          {page.id === 'mission' && (
          <div className='absolute bottom-[-750px]  w-full h-full'>
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
                {index === 0 && (
                  <div className="flex items-center justify-between relative w-full bg-white px-[300px]">
                    <div className="relative z-10">
                      <img src="/src/assets/dog.png" alt="img" className='h-screen' />
                    </div>
                    <div className="absolute left-[250px] top-1/2 -translate-y-1/2 w-2/3 h-3/5 bg-orange-100 transform -skew-x-12 z-0" />
                    <div className="absolute w-full left-0 right-0 top-0 bottom-0 z-0" />
                    <div className="max-w-xl z-10">
                      <h1 className="text-xl mb-4">
                        {t("adoptPage.adoptMe")}<span className="text-pink-600"> {t("adoptPage.adoptMe1")}</span>
                      </h1>
                      <h2 className="text-[150px] font-bold leading-tight mb-8">
                        {t("adoptPage.friendlyPow")}
                      </h2>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-pink-600 text-white px-12 py-3 rounded-full text-lg font-medium hover:bg-pink-700 transition-colors"
                        onClick={()=>navigate('/adopt')}
                      >
                        {t("Adoptttttt")}
                      </motion.button>
                    </div>
                  </div>
                )}

                {index === 1 && (
                  <div className="relative bg-white/90 rounded-3xl p-12 backdrop-blur-sm">

                    
                    <div className="text-center mb-12">
                      <h2 className="text-4xl font-bold mb-4">{content?.[0]}</h2>
                      <p className="text-gray-600 max-w-2xl mx-auto">
                        {content?.[1]}
                      </p>
                    
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="text-center">
                        <div className="relative w-48 h-48 mx-auto mb-4">
                          <div className="absolute inset-0 rounded-full overflow-hidden">
                            <img src={homeContent?.image1} alt="" className='w-full h-full' />
                          </div>
                          <div className="absolute inset-0 bg-white/30 rounded-full"></div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{content?.[2]}</h3>
                        <p className="text-gray-600">{content?.[3]}</p>
                      </div>
                      <div className="text-center">
                        <div className="relative w-48 h-48 mx-auto mb-4">
                          <div className="absolute inset-0 rounded-full overflow-hidden">
                            <img src={homeContent?.image2} alt="" className='w-full h-full' />
                          </div>
                          <div className="absolute inset-0 bg-white/30 rounded-full"></div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{content?.[4]}</h3>
                        <p className="text-gray-600">{content?.[5]}</p>
                      </div>
                      <div className="text-center">
                        <div className="relative w-48 h-48 mx-auto mb-4">
                          <div className="absolute inset-0 rounded-full overflow-hidden">
                            <img src={homeContent?.image3} alt="" className='w-full h-full' />
                          </div>
                          <div className="absolute inset-0 bg-white/30 rounded-full"></div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{content?.[6]}</h3>
                        <p className="text-gray-600">{content?.[7]}</p>
                      </div>
                    </div>
                    <div className="text-center mt-8">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-pink-600 text-white px-8 py-2 rounded-full text-sm font-medium hover:bg-pink-700 transition-colors"
                      >
                        {t("adoptPage.viewMoreButton")}
                      </motion.button>
                    </div>
                  </div>
                )}

                {index === 2 && (
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-pink-600 mb-4">{t("adoptPage.adoptionProcessTitle")}</h2>
                    <p className="text-xl text-orange-900">{t("adoptPage.adoptionProcessDescription")}</p>
                  </div>
                )}

                {index === 3 && (
                  <section className=" relative w-full h-full py-12 md:py-24 lg:py-32 bg-white flex justify-center gap-4">
                    <div className="container px-4 md:px-6">
                      <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("adoptPage.makeDifferenceTitle")}</h2>
                          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            {t("adoptPage.makeDifferenceDescription")}
                          </p>
                        </div>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" size="lg" onClick={()=>{navigate("/donate")}}>
                          {t("adoptPage.donateNowButton")}
                        </Button>
                      </div>
                      {/* <img className='absolute bottom-[-260px]  z-[100]  ' src="/src/assets/DedogHome.png" alt="" /> */}
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
