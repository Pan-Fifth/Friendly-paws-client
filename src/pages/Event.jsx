import React, { useEffect, useState } from "react";
import useEventStore from "../stores/EventStore";
import useAuthStore from "../stores/AuthStore";
import { useTranslation } from "react-i18next";
import useLanguageStore from "../stores/LanguageStore";
import { t } from "i18next";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, X, Heart } from 'lucide-react'
import { motion } from "framer-motion";

const images = [
  "https://scontent.fbkk7-2.fna.fbcdn.net/v/t39.30808-6/463721703_122116729292516599_4376622466092872756_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=v60Xjf44aCkQ7kNvgFxi-CR&_nc_zt=23&_nc_ht=scontent.fbkk7-2.fna&_nc_gid=A95Ci2R9iXzNvveBapHt-ew&oh=00_AYARb5juLz46D_qWvE6t1p6s_PUoRs-69Sgpnv4sDStp_A&oe=6727B257",
  "https://scontent.fbkk7-2.fna.fbcdn.net/v/t39.30808-6/457359756_122094396200516599_167661491692975046_n.png?stp=dst-jpg&_nc_cat=109&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=tcHO914JIxcQ7kNvgE6xYKp&_nc_zt=23&_nc_ht=scontent.fbkk7-2.fna&_nc_gid=AaYgnzawWHiu0AsycYTnrRL&oh=00_AYD7_idGe2CwLknzVDNz3CzmJnFNadKkRl4O9FeSxsSBqA&oe=6727E442",
  "https://scontent.fbkk7-3.fna.fbcdn.net/v/t39.30808-6/444782816_862961605876621_8788554679762370599_n.jpg?stp=dst-jpg_s2048x2048&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=yFwj0l0uydIQ7kNvgFMr92r&_nc_zt=23&_nc_ht=scontent.fbkk7-3.fna&_nc_gid=ABDcs8HLNQhj-q6wDHs4j1H&oh=00_AYBl0B3CtuI6YTs-Vml7eW2tQhPOv1Xp1t1BLpjwVFg0nA&oe=672E3618",
];

const Event = () => {

  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const regisEventForm = {
    eventId: '',
  };
  const regisEvent = useEventStore((state) => state.regisEvent);
  const registerEvent = useEventStore((state) => state.registerEvent);
  const token = useAuthStore((state) => state.token);
  const [bannerImages, setBannerImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [expireEvent, setExpireEvent] = useState(null);
  const pastEvent = useEventStore((state) => state.pastEvent);
  const events = useEventStore((state) => state.events);
  const getEvents = useEventStore((state) => state.getEvents);
  const navigate = useNavigate()
  const fetchBannerImages = async () => {
    try {
      const response = await axiosInstance.get("/admin/event-banner");
      setBannerImages(
        [response.data.image1, response.data.image2, response.data.image3].filter(Boolean)
      );
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load banner images",
      });
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); //ม็อค

    return () => clearInterval(interval);
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const openExpireEvent = (event) => {
    setExpireEvent(event);
  };
  const closeExpireEvent = () => {
    setExpireEvent(null);
  };

  // เรียกใช้งาน get events จาก store
  // -------------------------------------

  console.log("ไหนขอดู events", events)
  useEffect(() => {
    getEvents();
    fetchBannerImages();
  }, []);


  if (events.length === 0) {
    return <div>Loading...</div>;
  }

  // -------------------------------------

  // เรียกใช้งาน register event จาก store


  const handleRegister = (eventId) => {
    if (!token) {
      Swal.fire({
        title: t('alerteventRegister.noTokenTitle'),
        text: t('alerteventRegister.noTokenText'),
        icon: 'warning',
        confirmButtonText: t('alerteventRegister.confirmButton'),
      });
      return;
    }
    registerEvent(token, { eventId });
    toast.success(t('alerteventRegister.registerSuccess'));
    closeModal()
  };

  // -------------------------------------

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-center m-6">
        <div className="relative md:w-3/4 h-1/2 rounded-lg overflow-hidden  ">
          <img
            src={bannerImages[currentIndex] || ""}
            alt="Event Banner"
            className="object-contain  w-full h-full md:h-[400px] transition-opacity duration-500"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {bannerImages.map((_, index) => (
              <span
                key={index}
                className={`block w-2 h-2 rounded-full ${index === currentIndex ? "bg-gray-800" : "bg-gray-400"}`}
              />
            ))}
          </div>
        </div>
      </div>



      <div className=" m-8 text-2xl font-bold text-center">
        <h1>{t('eventPage.newEvents')}</h1>
      </div>


      {/* Event Cards */}
      <div className="md:w-full w-4/5 mx-auto p-6 space-y-12 justify-center items-center flex flex-col">
  {events?.events?.map((event,index) => (
    <div key={index} className="grid grid-cols-1 md:grid-cols-[180px_300px_1fr] gap-8 md:gap-20 items-center">
      <div className="md:order-1 order-2">
        <div className="flex items-center justify-center space-x-2 text-[#db2777] text-lg md:hidden">
          <div>
            {new Date(event.date_start).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', {
              day: 'numeric',
            })}
          </div>
          <div>
            {new Date(event.date_start).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', {
              month: 'long',
            })}
          </div>
        </div>
        <div className="hidden md:block bg-[#ffeed8] p-4 text-center rounded-lg shadow-sm">
          <div className="font-bold text-[#db2777] flex flex-col">
            <div className="text-[30px]">
              {new Date(event.date_start).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', {
                day: 'numeric',
              })}
            </div>
            <div>
              {new Date(event.date_start).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', {
                month: 'long',
              })}
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:order-2 order-1 w-full md:w-[300px] aspect-square rounded-lg overflow-hidden">
        <img
          src={event.image[0].url}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="md:order-3 order-3 space-y-4">
        <h2 className="text-2xl font-medium text-[#db2777]">
          {language === 'th' ? (event.title_th || event.title_en) : event.title_en || event.title_th}
        </h2>
        <p className="text-[#db2777]/80 leading-relaxed md:w-[200px]">
          {language === 'th' ? (event.description_th || event.description_en) : event.description_en || event.description_th}
        </p>
        <Button
          variant="outline"
          className="rounded-full border-[#db2777] text-[#db2777] hover:bg-[#db2777] hover:text-white"
          onClick={() => openModal(event)}
        >
          {t('eventPage.moreInfo')}
        </Button>
        <Separator className="my-4 w-full mx-auto" />
      </div>
    </div>
  ))}
</div>




      {/* Modal */}
{selectedEvent && (
<div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50">
<Card className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-lg relative">
        <button  onClick={closeModal} className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors">
          <X className="w-6 h-6 text-[#db2777]" />
        </button>
        <CardContent className="p-0">
          <div className="relative bg-[#ffeed8] p-8 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-[#f9d5e5] opacity-50" />
            <div className="absolute top-16 right-8 w-8 h-8 rounded-full bg-[#db2777] opacity-50" />
            <div className="absolute bottom-12 left-16 w-10 h-3 rounded-full bg-[#db2777] opacity-50 rotate-45" />
            <div className="absolute top-8 right-20 w-3 h-10 rounded-full bg-[#f9d5e5] opacity-50 -rotate-45" />
            
            {/* Main image - Increased size */}
            <div className="relative z-10 flex justify-center">
              <img
                 src={selectedEvent.image[0].url}
                alt="Cute dog illustration"
                className="w-[300px] h-[300px] object-contain"
              />
            </div>
            
            <h1 className="md:text-3xl text-[30px] font-bold text-black text-center mb-2">
              {language === 'th' ? (selectedEvent.title_th || selectedEvent.title_en) : selectedEvent.title_en || selectedEvent.title_th}
              </h1>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#db2777]">
                <Calendar className="w-5 h-5" />
                 {t("eventPage.date")} {new Date(selectedEvent.date_start).toLocaleDateString('en-GB')}
              </div>
              
              <div className="flex items-center gap-2 text-[#db2777]">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">{t("eventPage.location")} {selectedEvent.location}</span>
              </div>

              <p className="text-sm text-gray-600">
              {t("eventPage.description")} {language === 'th' ? (selectedEvent.description_th || selectedEvent.description_en) : selectedEvent.description_en || selectedEvent.description_th}
              </p>
            </div>

            <Button  onClick={() => handleRegister(selectedEvent.id)} className="w-full bg-[#db2777] hover:bg-[#c81c67] text-white rounded-full h-12">
              Register Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
)}


      {/* Past Events Section */}
<div className="relative backdrop-blur-md bg-gradient-to-br from-pink-50 to-white-50 py-12">
  <div className="container mx-auto px-4">
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl font-bold text-center mb-12 text-pink-600"
    >
      {t('eventPage.pastEvents')}
    </motion.h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto px-4 md:px-0">
  {events?.pastEvent?.map((event) => (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-[300px] md:max-w-none mx-auto" 
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={event.image[0].url}
          alt={event.title_en}
          className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 md:p-4">
          <div className="text-white text-xs md:text-sm font-medium">
            {new Date(event.date_start).toLocaleDateString(language, {
              year: 'numeric',
              month: 'long', 
              day: 'numeric'
            })}
          </div>
        </div>
      </div>
      
      <div className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-800 line-clamp-2">
          {language === 'th' ? (event.title_th || event.title_en) : event.title_en || event.title_th}
        </h2>
        <Button
          onClick={() => openExpireEvent(event)}
          className="w-full bg-pink-300 hover:bg-pink-700 text-white rounded-full text-sm md:text-base flex items-center justify-center gap-2"
        >
          {t('eventPage.moreInfo')}
        </Button>
      </div>
    </motion.div>
  ))}
</div>
  </div>
</div>

{/* Expired Event Modal */}
{expireEvent && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden relative"
    >
      <div className="relative h-96">
        <img
          src={expireEvent.image[0].url}
          alt="Event"
          className="w-full h-full object-cover"
        />
        <button
          onClick={closeExpireEvent}
          className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          {language === 'th' ? (expireEvent.title_th || expireEvent.title_en) : expireEvent.title_en || expireEvent.title_th}
        </h2>
        
        <div className="space-y-4 text-gray-600">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-pink-600" />
            <span>{new Date(expireEvent.date_start).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-pink-600" />
            <span>{expireEvent.location}</span>
          </div>
          
          <p className="mt-4 text-gray-700 leading-relaxed">
            {language === 'th' ? (expireEvent.description_th || expireEvent.description_en) : expireEvent.description_en || expireEvent.description_th}
          </p>
        </div>
        
        <Button
          onClick={closeExpireEvent}
          className="mt-6 w-full bg-pink-300 hover:bg-pink-700 text-white rounded-full py-3"
        >
          {t("eventPage.close")}
        </Button>
      </div>
    </motion.div>
  </motion.div>
)}

    </div>
  );
};

export default Event;
