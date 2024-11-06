import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "@/src/utils/axiosInstance";
import Map from "../user-components/Map";
import ContactForm from "../user-components/SendEmailForm";
import { Email, Information, Phone, Opening, Adress } from "../../icon/IContact";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const [aboutInfo, setAboutInfo] = useState(null);

  // ฟังก์ชันเพื่อดึงข้อมูลจาก API
  const getContactInfo = () => {
    axiosInstance
      .get("/admin/contact-info")
      .then((response) => {
        setAboutInfo(response.data[0]); // สมมติว่า response.data เป็น array และเราใช้แค่ item แรก
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ดึงข้อมูลจาก API เมื่อ component ถูก mount
  useEffect(() => {
    getContactInfo();
  }, []);

  // ตรวจสอบว่า aboutInfo มีข้อมูลหรือยัง
  if (!aboutInfo) return <div>...loading</div>;

  // ดึงข้อมูลจาก aboutInfo ตามภาษาและแยกด้วย split('|')
  const content = aboutInfo?.[`content_${i18n.language}`];
  let splitContent = [];

  // ตรวจสอบว่า content เป็น string หรือไม่
  if (content && typeof content === 'string') {
    splitContent = content.split('|');
  }

  return (
    <div className="bg-blue-50 text-black min-h-screen">
      <header className="bg-blue-400 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Contact Us 🐶🐱</h1>
      </header>
      <section className="mx-auto py-10 px-4 lg:px-20 w-4/5">
        <h2 className="text-4xl font-bold mb-6">{aboutInfo[`header_${i18n.language}`]}</h2>
        <p className="mb-6 text-lg">
        {aboutInfo[`content_${i18n.language}`]}
        </p>
        
        {/* Contact Information Section */}
        <div className="mb-10 bg-white p-6 rounded-lg shadow-md border border-blue-300">
          <p className="flex items-center mb-4">
            <Information height="20px" width="20px" className="mr-2" />
            : {aboutInfo[`generalInfo_${i18n.language}`]}
          </p>
          <p className="flex items-center mb-4">
            <Email height="20px" width="20px" className="mr-2" />
            : {aboutInfo[`generalInfo_${i18n.language}`]}
          </p>
          <p className="flex items-center mb-4">
            <Phone height="20px" width="20px" className="mr-2" />
            : {aboutInfo.phone}
          </p>
          <p className="flex items-center mb-4">
            <Opening height="20px" width="20px" className="mr-2" />
            : {aboutInfo[`openingTimes_${i18n.language}`]}
          </p>
          <p className="flex items-center">
            <Adress height="20px" width="20px" className="mr-2" />
            : {aboutInfo[`address_${i18n.language}`]}
          </p>
        </div>
        
        {/* About Content Section */}
        <div className="mb-10 bg-white p-6 rounded-lg shadow-md border border-blue-300">
          {splitContent.length > 0 && splitContent.map((part, index) => (
            <p key={index} className="text-lg mb-4">{part}</p>
          ))}
        </div>

        {/* Map and Contact Form Section */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-blue-300">
            <Map />
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
