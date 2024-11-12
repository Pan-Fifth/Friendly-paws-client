import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import axiosInstance from "@/src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import ProgressHome from "./ProgressHome";
import CardHome from "./CardHome";
import { Separator } from "@/components/ui/separator";
import { Heart, HeartHandshake, PawPrint } from "lucide-react";
import { Image } from "@radix-ui/react-avatar";
import ImageHome from "./ImageHome";
import TextHome from "./TextHome";

("use client");

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
};

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
};


const Bubble = ({ size, left, top, delay }) => (
  <motion.div
    className="absolute rounded-full bg-white/20 backdrop-blur-sm z-0"
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
);

const pages = [
  { id: "home", title: "Home" },
  { id: "mission", title: "Our Mission" },
  { id: "adoption", title: "Adoption Process" },
  { id: "stories", title: "Success Stories" },
];

export default function Homepage() {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [homeContent, setHomeContent] = useState(null);
  const [randomPets, setRandomPets] = useState([]);
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const containerRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const backgroundImages = [
  'https://cdn.pixabay.com/photo/2022/06/29/14/39/dogs-7291913_960_720.jpg',
  'https://cdn.pixabay.com/photo/2022/02/11/14/41/animal-7007448_960_720.jpg',
  'https://cdn.pixabay.com/photo/2023/01/13/13/20/dog-7716035_960_720.jpg',
  
  ]

  const getHome = () => {
    axiosInstance
      .get("/admin/home-content")
      .then((response) => {
        setHomeContent(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRandomPets = () => {
    axiosInstance.get('/pet/random')
      .then((response) => {
        console.log('Random pets data:', response.data);
        setRandomPets(response.data);
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
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 3000)
    getHome()
    getRandomPets();


    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(intervalId);
    }
  }, []);

  const handleCircleClick = (index) => {
    if (containerRef.current) {
      const targetScrollPosition = index * window.innerHeight;
      window.scrollTo({
        top: targetScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  const content = homeContent?.[`content_${i18n.language}`]?.split("|");
  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-orange-500 overflow-hidden relative"
    >
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
         className={`min-h-[90vh] w-full flex items-center justify-center relative 
           ${
             page.id === "stories"
               ? "bg-white"
               : page.id !== "home" && page.id !== "mission"
               ? "bg-[#FFF3E9]"
               : ""
           }`}
       >
            {page.id === "mission" && (
              <>
                {backgroundImages.map((image, index) => (
                  <div>
                  <div
                    key={index}
                    className="absolute inset-0 transition-opacity duration-1000 ease-in-out mix-blend-darken opacity-60" // Added opacity-75
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: index === currentImageIndex ? 0.60 : 0, // Changed from 1 to 0.75
                    }}
                  />
                </div>
              ))}

              <div className="absolute bottom-[-990px] w-full h-full">
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
              </>
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
                  <div className="flex flex-col md:flex-row items-center justify-between relative w-full bg-white px-4 md:px-[300px] min-h-[100vh]">
                     {/* <video 
                    src="/src/assets/bubble2.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  /> */}
                    <div className="relative z-10 order-2 md:order-1">
                      <img
                        src="/src/assets/dogGif.gif"
                        alt=""
                        className="hidden md:block md:absolute top-[0px] left-[-170px] rotate-[-40deg]"
                      />
                     
                      <motion.div
                        variants={item}
                        initial="hidden"
                        animate="show"
                        className="space-y-2"
                      >
        
                        <img
                          src="/src/assets/dog.png"
                          alt="img"
                          className="md:block h-screen w-full object-contain md:h-screen md:w-[700px] md:aspect-auto"
                        />
                        {/* <PawPrint className="absolute top-[100px] left-[-100px] md:top-[-200px] md:left-[40px] z-10 md:h-[300px] md:w-[300px]" /> */}
                      </motion.div>
                    </div>
                    {/* <div className="hidden md:block absolute left-[250px] top-1/2 -translate-y-1/2 w-2/3 h-3/5 bg-orange-100 transform -skew-x-12 z-0" /> */}
                    <div className="absolute w-full left-0 right-0 top-0 bottom-0 z-0" />
                    <div className="max-w-xl z-10 order-1 md:order-2 text-center md:text-left px-4 md:px-0">
                      <h1 className="text-lg md:text-xl mb-2 md:mb-4">
                        {content?.[0]} <span className="text-pink-600">{content?.[1]}</span>
                      </h1>
                      <h2 className="text-[80px] md:text-[150px] font-sans font-bold leading-tight mb-4 md:mb-8">
                        {content?.[2]}
                      </h2>
                      <motion.button
                        variants={buttonVariants}
                        initial="hidden"
                        animate="show"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-pink-600 flex gap-2 text-white px-8 md:px-12 py-2 md:py-3 rounded-full text-base md:text-lg font-medium hover:bg-pink-700 transition-colors mx-auto md:mx-0"
                        onClick={() => navigate("/adopt")}
                      >
                        <Heart />
                        {t("Adopt")}
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* /////////////////////////////////////////////////////////////////////////////////////// */}

                {index === 1 && (
                  
                  <div className="relative backdrop-blur-md bg-white/30 border-white/50 shadow-lg w-full md:w-2/3 mx-auto my-4 md:m-10 rounded-3xl px-2 md:px-3">
  <div className="container mx-auto p-2 md:p-10 min-h-[500px] md:h-[700px] flex flex-col justify-center">
    <div className="space-y-4 md:space-y-8">
      {/* Cards Container - Horizontal Layout */}
      <div className="flex flex-row gap-2 md:gap-8 justify-between items-stretch w-full px-2 md:px-20">
        {/* Card 1 */}
        <Card className="w-1/3 flex flex-col opacity-90">
          <CardContent className="p-2 md:p-6 h-full flex flex-col justify-between gap-2 md:gap-3">
            <div className="aspect-square relative overflow-hidden rounded-lg h-[100px] md:h-auto">
              <img
                src={homeContent?.image2}
                alt="Care Advice"
                className="object-cover w-full h-full"
              />
            </div>
            <p className="font-semibold text-center text-[10px] md:text-lg">{content?.[5]}</p>
            <p className="text-[8px] md:text-sm text-muted-foreground">
              {content?.[6]}
            </p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="w-1/3 flex flex-col opacity-90">
          <CardContent className="p-2 md:p-6 h-full flex flex-col justify-between gap-2 md:gap-3">
            <div className="aspect-square relative overflow-hidden rounded-lg h-[100px] md:h-auto">
              <img
                src={homeContent?.image3}
                alt="Veterinary Help"
                className="object-cover w-full h-full"
              />
            </div>
            <p className="font-semibold text-center text-[10px] md:text-lg">{content?.[7]}</p>
            <p className="text-[8px] md:text-sm text-muted-foreground">
              {content?.[8]}
            </p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="w-1/3 flex flex-col opacity-90">
          <CardContent className="p-2 md:p-6 h-full flex flex-col justify-between gap-2 md:gap-3">
            <div className="aspect-square relative overflow-hidden rounded-lg h-[100px] md:h-auto">
              <img
                src={homeContent?.image4}
                alt="Our Tips"
                className="object-cover w-full h-full"
              />
            </div>
            <p className="font-semibold text-center text-[10px] md:text-lg">{content?.[9]}</p>
            <p className="text-[8px] md:text-sm text-muted-foreground">
              {content?.[10]}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Text Content */}
      <div className="text-center space-y-2 md:space-y-4 px-2 md:px-0">
        <h1 className="text-xl md:text-4xl font-bold tracking-tighter">
          {content?.[3]}
        </h1>
        <p className="mx-auto max-w-[600px] text-xs md:text-lg">
          {content?.[4]}
        </p>
        <Button
          size="lg"
          className="bg-pink-500 hover:bg-pink-600 text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
          onClick={() => navigate("/about")}
        >
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
                    <h1 className="text-3xl md:text-5xl lg:text-[70px]">{content?.[11]}</h1>
                    <div className="flex w-full justify-center">
                      <div className="w-full md:w-1/2">
                        <ProgressHome />
                      </div>
                      <div className="w-1/2 hidden md:block">
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
              <section className="relative w-full  h-[300px] md:h-[600px] py-8 md:py-12 flex flex-col justify-center gap-4 ">
                <CardHome className="absolute z-20" cards={randomPets} />
                <Separator orientation="horizontal" className="shrink-0 absolute left-1/2 transform -translate-x-1/2 bg-border h-[1.5px] w-[80%] sm:w-2/3 md:w-1/2 lg:w-2/3 top-[200px] md:top-[290px]" />
                <div className="container absolute md:top-[300px] md:left-0 md:right-0 md:w-screen lg:top-[320px] mx-auto px-4 md:px-6 top-[170px]">
                <div className="flex flex-col items-center justify-center gap-6 text-center max-w-4xl mx-auto">
                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter">
                      {content?.[13]}
                    </h2>
                    <p className="text-sm md:text-base lg:text-xl text-gray-500 dark:text-gray-400">
                      {content?.[14]}
                    </p>
                  </div>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 w-[200px] md:w-auto"
                    size="lg"
                    onClick={() => {navigate("/donate")}}
                  >
                    {content?.[16]}
                  </Button>
                  <HeartHandshake className="h-[70px] w-[70px] md:h-[70px] md:w-[70px]  text-pink-500" />
                </div>
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
            className={`w-4 h-4 rounded-full ${
              i === currentPage ? "bg-pink-600" : "bg-orange-300"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Scroll to ${pages[i].title}`}
          />
        ))}
      </div>
    </div>
  );
}
