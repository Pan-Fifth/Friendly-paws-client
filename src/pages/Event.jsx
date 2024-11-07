import React, { useEffect, useState } from "react";
import useEventStore from "../stores/EventStore";
import useAuthStore from "../stores/AuthStore";
import { useTranslation } from 'react-i18next';
import useLanguageStore from "../stores/LanguageStore";
import { t } from "i18next";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [expireEvent, setExpireEvent] = useState(null);
    const pastEvent = useEventStore((state) => state.pastEvent);
    const events = useEventStore((state) => state.events);
    const getEvents = useEventStore((state) => state.getEvents);
    const navigate = useNavigate()
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
        setExpireEvent(event)
    }
    const closeExpireEvent = () => {
        setExpireEvent(null)
    }

    // เรียกใช้งาน get events จาก store
    // -------------------------------------




    // console.log("ไหนขอดู events", events)
    useEffect(() => {
        getEvents()
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
    };

    // -------------------------------------


    return (
        <div className="min-h-screen bg-white">
            {/* Banner */}
            <div className="flex justify-center my-6">
                <div className="relative w-full max-w-4xl h-70 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src={images[currentIndex]}
                        alt="Event Banner"
                        className="object-cover w-full h-full transition-opacity duration-500" />

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={`block w-2 h-2 rounded-full ${index === currentIndex ? "bg-gray-800" : "bg-gray-400"
                                    }`}
                            ></span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 mb-8">
                <h1>{t('eventPage.newEvents')}</h1>
            </div>


            {/* Event Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 container mx-auto px-4 mb-8 justify-items-center">
                {events?.events?.map((event) => (
                    <div
                        key={event.id}
                        className="bg-white rounded-lg shadow-lg p-4 text-center max-w-[350px]">
                        <div className="bg-cover bg-center h-80 rounded-t-lg overflow-hidden">
                            <img
                                src={event.image[0].url}
                                alt="Cat Event"
                                className="object-cover w-full h-full" />
                        </div>
                        <h2 className="text-xl font-semibold mt-4 whitespace-pre-line">
                            {language === 'th' ? (event.title_th || event.title_en) : event.title_en || event.title_th}
                        </h2>
                        <h2>{new Date(event.date_start).toLocaleDateString()}</h2>
                        <button
                            className="mt-4 px-4 py-2 bg-yellow-300 text-white font-bold rounded-lg"
                            onClick={() => openModal(event)}>
                            {t('eventPage.moreInfo')}
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg p-5 rounded-lg relative transform translate-y-6 mx-4 sm:mx-6 md:mx-8 lg:mx-12 shadow-lg">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                            ✕
                        </button>
                        <div className="bg-cover bg-center h-80 rounded-t-lg overflow-hidden">
                            <img
                                src={selectedEvent.image[0].url}
                                alt="Cat Event"
                                className="object-cover w-full h-full" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">{language === 'th' ? (selectedEvent.title_th || selectedEvent.title_en) : selectedEvent.title_en || selectedEvent.title_th}</h2>
                        <p><strong>{t('eventPage.date')}</strong> {selectedEvent.date_start}</p>
                        <p><strong>{t('eventPage.location')}</strong> {selectedEvent.location}</p>
                        <p className="mt-2"><strong>{t('eventPage.description')}</strong>{language === 'th' ? (selectedEvent.description_th || selectedEvent.description_en) : selectedEvent.description_en || selectedEvent.description_th}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg"
                            onClick={() => handleRegister(selectedEvent.id)}
                        >
                            {t('eventPage.register')}
                        </button>

                    </div>
                </div>
            )}



            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 mb-8">
                <h1>{t('eventPage.pastEvents')}</h1>
            </div>
            {/* Event Cards กิจกรรมที่ผ่านมาแล้ว */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 container mx-auto px-4 mb-8 justify-items-center" >
                {events?.pastEvent?.map((event) => (
                    <div
                        key={event.id}
                        className="bg-white rounded-lg shadow-lg p-4 text-center max-w-[350px]">
                        <div className="bg-cover bg-center h-80 rounded-t-lg overflow-hidden">
                            <img
                                src={event.image[0].url}
                                alt="Cat Event"
                                className="object-cover w-full h-full" />
                        </div>
                        <h2 className="text-xl font-semibold mt-4 whitespace-pre-line">
                            {language === 'th' ? (event.title_th || event.title_en) : event.title_en || event.title_th}
                        </h2>
                        <h2>{new Date(event.date_start).toLocaleDateString()}</h2>
                        <button
                            className="mt-4 px-4 py-2 bg-yellow-300 text-white font-bold rounded-lg"
                            onClick={() => openExpireEvent(event)}>
                            {t('eventPage.moreInfo')}
                        </button>
                    </div>
                ))}
            </div>


            {/* Modal กิจกรรมที่ผ่านมาแล้ว*/}
            {expireEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg p-5 rounded-lg relative transform translate-y-6 mx-4 sm:mx-6 md:mx-8 lg:mx-12 shadow-lg">
                        <button
                            onClick={closeExpireEvent}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                            ✕
                        </button>
                        <div className="bg-cover bg-center h-80 rounded-t-lg overflow-hidden">
                            <img
                                src={expireEvent.image[0].url}
                                alt="Cat Event"
                                className="object-cover w-full h-full" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">{language === 'th' ? (expireEvent.title_th || expireEvent.title_en) : expireEvent.title_en || expireEvent.title_th}</h2>
                        <p><strong>{t('eventPage.date')}</strong> {expireEvent.date_start}</p>
                        <p><strong>{t('eventPage.location')}</strong> {expireEvent.location}</p>
                        <p className="mt-2"><strong>{t('eventPage.description')}</strong> {language === 'th' ? (expireEvent.description_th || expireEvent.description_en) : expireEvent.description_en || expireEvent.description_th}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg"
                            onClick={closeExpireEvent}
                        >
                            {t('eventPage.close')}
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Event;