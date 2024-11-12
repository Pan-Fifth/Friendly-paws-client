import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "@/src/utils/axiosInstance";
import { Link } from "react-router-dom";



export default function About() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const [aboutContent, setAboutContent] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const language = i18n.language

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
    const timer = setTimeout(() => {
      setImagesLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, []);

  // ตรวจสอบว่า aboutContent มีข้อมูลหรือยัง
  if (!aboutContent) return <div>...loading</div>;

  // ดึงข้อมูลจาก aboutContent ตามภาษาและแยกด้วย split('|')
  const content = aboutContent?.[`content_${i18n.language}`];
  let splitContent = [];

  // ตรวจสอบว่า content เป็น string หรือไม่
  if (content && typeof content === "string") {
    splitContent = content.split("|");
  }

function convertToEmbedURL(youtubeUrl) {
  // Regular expression to extract the video ID from YouTube URLs
  const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = youtubeUrl.match(regex);

  if (match && match[1]) {
      const videoId = match[1];
      // Return the embed URL format
      return `https://www.youtube.com/embed/${videoId}`;
  } else {
      return null;  // Invalid URL
  }
}

console.log(aboutContent)
console.log(i18n.language)

  return (
    <div className=" about-page min-h-screen bg-gradient-to-b from-orange-100 via-orange-50 to-white text-orange-900 py-8 sm:py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 md:space-y-16">
        {/* About Us Header */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">About Us</h1>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 sm:mb-12">
          {[
            { src: aboutContent.image1 , alt: "Team members working with pets" },
            { src: aboutContent.image2, alt: "Volunteers caring for animals" },
            { src:  aboutContent.image3},
            { src: aboutContent.image4 },
          ].map((image, index) => (
            <div
              key={index}
              className={`aspect-[3/4] rounded-lg overflow-hidden shadow-lg ${index % 2 === 0 ? 'md:translate-y-8' : ''
                } transition-opacity duration-1000 ease-in-out ${imagesLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}


        </div>

        {/* Mission Statement */}
        <div className="text-center space-y-4 max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#db2777]">
           {aboutContent[`header_${i18n.language}`]}
          </h2>
          <p className="text-base sm:text-lg text-orange-700">
          {aboutContent[`description_${i18n.language}`]}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          <Card className="bg-orange-50 border-[#db2777] border-2 p-4 shadow-md">
            <div className="text-xl sm:text-2xl font-bold text-[#db2777]">2018</div>
            <div className="text-xs sm:text-sm text-orange-700">Founded</div>
          </Card>
          <Card className="bg-orange-50 border-[#db2777] border-2 p-4 shadow-md">
            <div className="text-xl sm:text-2xl font-bold text-[#db2777]">120+</div>
            <div className="text-xs sm:text-sm text-orange-700">Employees</div>
          </Card>
          <Card className="bg-orange-50 border-[#db2777] border-2 p-4 shadow-md">
            <div className="text-xl sm:text-2xl font-bold text-[#db2777]">400K</div>
            <div className="text-xs sm:text-sm text-orange-700">Users</div>
          </Card>
          <Card className="bg-orange-50 border-[#db2777] border-2 p-4 shadow-md">
            <div className="text-xl sm:text-2xl font-bold text-[#db2777]">120+</div>
            <div className="text-xs sm:text-sm text-orange-700">Partner Shelters</div>
          </Card>
          <Card className="bg-orange-50 border-[#db2777] border-2 p-4 shadow-md">
            <div className="text-xl sm:text-2xl font-bold text-[#db2777]">720K</div>
            <div className="text-xs sm:text-sm text-orange-700">Adoptions</div>
          </Card>
          <Card className="bg-orange-50 border-[#db2777] border-2 p-4 shadow-md">
            <div className="text-xl sm:text-2xl font-bold text-[#db2777]">$6B+</div>
            <div className="text-xs sm:text-sm text-orange-700">Donations</div>
          </Card>
        </div>

        {/* Our Story Section */}
        <div className="space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#db2777]">Our Story</h2>

          {/* Video Player */}
          <div className="relative mx-auto max-w-4xl rounded-xl overflow-hidden shadow-xl">
             
        <div className="video-container max-w-5xl mx-auto flex justify-center">
          {/* Aspect Ratio Wrapper */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={convertToEmbedURL(aboutContent.video_url)}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      
          </div>

          {/* Journey Description */}
          <div className="text-center space-y-4 max-w-3xl mx-auto px-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#db2777]">
             {aboutContent[`help_title_${i18n.language}`]} {/* แสดงผลตามภาษา */}
            </h3>
            <p className="text-base sm:text-lg text-orange-700">
              {aboutContent[`help_content_${i18n.language}`]} {/* แสดงผลตามภาษา */}
            </p>
          </div>
        </div>

        {/* How You Can Help Section */}
        <div className="space-y-8 bg-gradient-to-br from-orange-100 to-pink-100 p-4 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#db2777]">
            {aboutContent[`content_${i18n.language}`]} {/* แสดงผลตามภาษา */}
          </h2>
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <p className="text-base sm:text-lg text-orange-700">
              {aboutContent[`content_detail_${i18n.language}`]} {/* แสดงผลตามภาษา */}
            </p>
            <Button className="bg-[#db2777] hover:bg-[#be185d] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full text-base sm:text-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#db2777]">
              <Link to="/donate" className="block w-full h-full">
                Support Our Mission ❤️
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>

  )
}
