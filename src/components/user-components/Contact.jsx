import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "@/src/utils/axiosInstance";
import Map from "../user-components/Map";
import ContactForm from "../user-components/SendEmailForm";
import {
  Email,
  Information,
  Phone,
  Opening,
  Adress,
} from "../../icon/IContact";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const [aboutInfo, setAboutInfo] = useState(null);

  const getContactInfo = () => {
    axiosInstance
      .get("/admin/contact-info")
      .then((response) => {
        setAboutInfo(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getContactInfo();
  }, []);

  if (!aboutInfo) return <div>Loading...</div>;

  const getLocalizedContent = (key) => {
    const currentLang = i18n.language;
    return (
      aboutInfo[`${key}_${currentLang}`] ||
      aboutInfo[`${key}_en`] ||
      aboutInfo[`${key}_th`]
    );
  };

  const content = getLocalizedContent("content");
  const contentParagraphs = content ? content.split("|") : [];

  return (
    <div className="bg-gradient-to-b from-[#ffeed8] to-[#ffffff] text-black min-h-screen relative">
      {/* Image Background with opacity */}
      <div
        className="absolute inset-0 z-[-1] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://thestandard.co/wp-content/uploads/2022/05/%E0%B8%AA%E0%B8%B8%E0%B8%99%E0%B8%B1%E0%B8%82-%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B9%81%E0%B8%A1%E0%B8%A7.jpg')",
          opacity: 0.1, // ทำให้ภาพพื้นหลังจางลง
        }}
      ></div>

<header className="bg-[#db2777] text-white p-6 text-center rounded-b-lg shadow-lg">
  <h1 className="text-4xl font-bold">
    Contact Us{" "}
    <span role="img" aria-label="dog-and-cat" className="animate-shake">
      🐶🐱
    </span>
  </h1>
</header>
      <section className="mx-auto py-10 px-4 lg:px-20 w-full max-w-7xl">
        <h2 className="text-4xl font-bold mb-6 text-[#db2777]">
          {getLocalizedContent("header")}
        </h2>

        {/* Contact Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#f0f7ff] rounded-lg p-6 flex items-center gap-4">
            <Phone className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <div className="font-semibold text-slate-800 text-base">Phone</div>
              <div className="text-slate-600 text-sm">{aboutInfo.phone}</div>
            </div>
          </div>

          <div className="bg-[#f0f7ff] rounded-lg p-6 flex items-center gap-4">
            <Email className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <div className="font-semibold text-slate-800 text-base">Email</div>
              <div className="text-slate-600 text-sm">{aboutInfo.email}</div>
            </div>
          </div>

          <div className="bg-[#f0f7ff] rounded-lg p-6 flex items-center gap-4">
            <Opening className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <div className="font-semibold text-slate-800 text-base">
                Opening Times
              </div>
              <div className="text-slate-600 text-sm">
                {getLocalizedContent("openingTimes")}
              </div>
            </div>
          </div>

          <div className="bg-[#f0f7ff] rounded-lg p-6 flex items-center gap-4">
            <Adress className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <div className="font-semibold text-slate-800 text-base">Location</div>
              <div className="text-slate-600 text-sm">
                {getLocalizedContent("address")}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-8 relative">
          <Map
            defaultPosition={[aboutInfo.latitude, aboutInfo.longitude]}
            width="100%"
            height="h-72" // หรือความสูงที่คุณต้องการ
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location map"
          />
          <div className="absolute bottom-4 right-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-sm transition-colors duration-300"
              onClick={() => window.open("https://www.google.com/maps", "_blank")}
            >
              View in Google Maps →
            </button>
          </div>
        </div>

        {/* Content and Contact Form Section */}
        <div className="mt-12 flex flex-wrap gap-8 justify-between">
          {/* Content Paragraphs */}
          <div className="w-full lg:w-[48%] bg-white p-6 rounded-lg shadow-lg border-2 border-[#db2777]">
            {contentParagraphs.map((paragraph, index) => (
              <p key={index} className="text-xl mb-6 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Contact Form Section */}
          <div className="w-full lg:w-[48%] bg-white p-6 rounded-lg shadow-lg border-2 border-[#db2777]">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
