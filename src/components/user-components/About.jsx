import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "@/src/utils/axiosInstance";
import { Link } from "react-router-dom";

function About() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const [aboutContent, setAboutContent] = useState(null);
  
  // ฟังก์ชันเพื่อดึงข้อมูลจาก API
  const getAbout = () => {
    axiosInstance
      .get("/admin/about-content")
      .then((response) => {
        setAboutContent(response.data[0]); // สมมติว่า response.data เป็น array และเราใช้แค่ item แรก
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ดึงข้อมูลและตั้งค่า event listener สำหรับ scroll
  useEffect(() => {
    getAbout(); // ดึงข้อมูลจาก API เมื่อ component ถูก mount
  }, []);

  // ตรวจสอบว่า aboutContent มีข้อมูลหรือยัง
  if (!aboutContent) return <div>...loading</div>;

    // ดึงข้อมูลจาก aboutContent ตามภาษาและแยกด้วย split('|')
    const content = aboutContent?.[`content_${i18n.language}`];
    let splitContent = [];

  // ตรวจสอบว่า content เป็น string หรือไม่
  if (content && typeof content === 'string') {
    splitContent = content.split('|');
  }

  console.log("Split Content:", splitContent);

  return (
    <div className="about-page mx-auto max-w-full">
      {/* Video Section */}
      <section className="video-section py-20 px-4 sm:px-8 bg-pink-100 text-center shadow-md rounded-lg mb-8 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          FRIENDLY & PAW🐾
        </h2>
        <div className="video-container max-w-5xl mx-auto flex justify-center">
          {/* Aspect Ratio Wrapper */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/ehAD2GUJef4?autoplay=1&loop=1&playlist=ehAD2GUJef4"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </section>

{/* Header */}
<header className="header bg-blue-50 py-8 text-center shadow-md rounded-lg mb-8 w-full">
  {/* แสดงหัวข้อและคำอธิบายตามภาษาที่เลือก */}
  <h1 className="text-3xl font-bold text-gray-800">
    {aboutContent[`header_${i18n.language}`]} {/* แสดงผลตามภาษา */}
  </h1>
  <p className="mt-4 max-w-2xl mx-auto text-gray-600">
    {aboutContent[`description_${i18n.language}`]} {/* แสดงผลตามภาษา */}
  </p>

  {/* แสดงผลข้อมูลที่แยกจาก content */}
  <div className="content-list mt-6">
    {content && typeof content === "string" ? (
      content.split("|").map((item, index) => (
        <p key={index} className="text-gray-600 mt-2">
          {item}
        </p>
      ))
    ) : (
      <p className="text-gray-600 mt-2">No content available.</p>
    )}
  </div>
</header>

      {/* Help Section */}
<section className="help-section py-12 px-4 sm:px-8 bg-white text-center shadow-md rounded-lg mb-8 w-full">
  <div className="flex flex-col md:flex-row items-center justify-center">
    <img
      src="https://www.thaipedigree.com/static/articles/e1897f9e541c2cbd531886fc07931d8b2d31932b85c991f268955bd5acc7c305.jpeg"
      alt="สุนัขในรถเข็น"
      className="md:w-1/2 w-full rounded-md shadow-lg"
    />
    <div className="md:w-1/2 mt-4 md:mt-0 md:ml-8 text-left px-4">
      <h2 className="text-2xl font-semibold text-gray-800">
        {aboutContent[`help_title_${i18n.language}`]} {/* แสดงผลตามภาษา */}
      </h2>
      <p className="mt-4 text-gray-600">
        {aboutContent[`help_content_${i18n.language}`]} {/* แสดงผลตามภาษา */}
      </p>
      <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded shadow hover:bg-orange-400">
        <Link to="/donate" className="block w-full h-full">
          {t("aboutPage.supportButton")}
        </Link>
      </button>
    </div>
  </div>
</section>

      {/* Adoption Checklist (Optional Section) */}
      {/* <section className="adoption-checklist py-12 px-4 sm:px-8 bg-gray-100 rounded-lg shadow-md mb-8 w-full">
        <h2 className="text-center text-2xl font-semibold mb-8 text-gray-800">
          {t('aboutPage.adoptionChecklistTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t('aboutPage.checklist', { returnObjects: true }).map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start text-center md:text-left p-4 bg-white rounded-lg shadow-md border border-gray-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 md:w-32 md:h-32 mr-4 rounded-md border border-orange-200"
              />
              <div>
                <h3 className="font-bold text-orange-500">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
}

export default About;
