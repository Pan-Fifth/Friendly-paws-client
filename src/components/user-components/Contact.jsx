import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "@/src/utils/axiosInstance";
import Map from "../user-components/Map";
import ContactForm from "../user-components/SendEmailForm";
import { Email, Information, Phone, Opening, Adress } from "../../icon/IContact";

// ... existing imports remain the same

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

  // Helper function to get content with language fallback
  const getLocalizedContent = (key) => {
    const currentLang = i18n.language;
    return aboutInfo[`${key}_${currentLang}`] || aboutInfo[`${key}_en`] || aboutInfo[`${key}_th`];
  };

  // Split content for paragraphs
  const content = getLocalizedContent('content');
  const contentParagraphs = content ? content.split('|') : [];
  // console.log(aboutInfo)

  return (
    <div className="bg-blue-50 text-black min-h-screen">
      <header className="bg-blue-400 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Contact Us 🐶🐱</h1>
      </header>
      <section className="mx-auto py-10 px-4 lg:px-20 w-4/5">
        <h2 className="text-4xl font-bold mb-6">
          {getLocalizedContent('header')}
        </h2>
        
        {/* Contact Information Section */}
        <div className="mb-10 bg-white p-6 rounded-lg shadow-md border border-blue-300">
          <p className="flex items-center mb-4">
            <Information height="20px" width="20px" className="mr-2" />
            : {getLocalizedContent('generalInfo')}
          </p>
          <p className="flex items-center mb-4">
            <Email height="20px" width="20px" className="mr-2" />
            : {aboutInfo.email}
          </p>
          <p className="flex items-center mb-4">
            <Phone height="20px" width="20px" className="mr-2" />
            : {aboutInfo.phone}
          </p>
          <p className="flex items-center mb-4">
            <Opening height="20px" width="20px" className="mr-2" />
            : {getLocalizedContent('openingTimes')}
          </p>
          <p className="flex items-center">
            <Adress height="20px" width="20px" className="mr-2" />
            : {getLocalizedContent('address')}
          </p>
        </div>
        
        {/* About Content Section */}
        <div className="mb-10 bg-white p-6 rounded-lg shadow-md border border-blue-300">
          {contentParagraphs.map((paragraph, index) => (
            <p key={index} className="text-lg mb-4">{paragraph}</p>
          ))}
        </div>

        {/* Map and Contact Form Section */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-blue-300">
            <Map defaultPosition={[aboutInfo.latitude, aboutInfo.longitude]} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-blue-300">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
