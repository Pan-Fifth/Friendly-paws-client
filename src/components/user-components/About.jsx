// import React, { useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
// import axiosInstance from "@/src/utils/axiosInstance";
// import { Link } from "react-router-dom";

// function About() {
//   const { t, i18n } = useTranslation();
//   const containerRef = useRef(null);
//   const [aboutContent, setAboutContent] = useState(null);

//   // ฟังก์ชันเพื่อดึงข้อมูลจาก API
//   const getAbout = () => {
//     axiosInstance
//       .get("/admin/about-content")
//       .then((response) => {
//         setAboutContent(response.data[0]); // สมมติว่า response.data เป็น array และเราใช้แค่ item แรก
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // ดึงข้อมูลและตั้งค่า event listener สำหรับ scroll
//   useEffect(() => {
//     getAbout(); // ดึงข้อมูลจาก API เมื่อ component ถูก mount
//   }, []);

//   // ตรวจสอบว่า aboutContent มีข้อมูลหรือยัง
//   if (!aboutContent) return <div>...loading</div>;

//   // ดึงข้อมูลจาก aboutContent ตามภาษาและแยกด้วย split('|')
//   const content = aboutContent?.[`content_${i18n.language}`];
//   let splitContent = [];

//   // ตรวจสอบว่า content เป็น string หรือไม่
//   if (content && typeof content === "string") {
//     splitContent = content.split("|");
//   }

//   console.log("Split Content:", splitContent);

//   return (
//     <div className="about-page mx-auto max-w-full">
//       {/* Video Section */}
//       <section className="video-section py-20 px-4 sm:px-8 bg-pink-100 text-center shadow-md rounded-lg mb-8 w-full">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">FRIENDLY & PAW🐾</h2>
//         <div className="video-container max-w-5xl mx-auto flex justify-center">
//           {/* Aspect Ratio Wrapper */}
//           <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
//             <iframe
//               src="https://www.youtube.com/embed/ehAD2GUJef4?autoplay=1&loop=1&playlist=ehAD2GUJef4"
//               title="YouTube video"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
//             ></iframe>
//           </div>
//         </div>
//       </section>

//       {/* Header */}
//       <header className="header bg-blue-50 py-8 text-center shadow-md rounded-lg mb-8 w-full">
//         {/* แสดงหัวข้อและคำอธิบายตามภาษาที่เลือก */}
//         <h1 className="text-3xl font-bold text-gray-800">
//           {aboutContent[`header_${i18n.language}`]} {/* แสดงผลตามภาษา */}
//         </h1>
//         <p className="mt-4 max-w-2xl mx-auto text-gray-600">
//           {aboutContent[`description_${i18n.language}`]} {/* แสดงผลตามภาษา */}
//         </p>

//         {/* แสดงผลข้อมูลที่แยกจาก content */}
//         <div className="content-list mt-6">
//           {content && typeof content === "string" ? (
//             content.split("|").map((item, index) => (
//               <p key={index} className="text-gray-600 mt-2">
//                 {item}
//               </p>
//             ))
//           ) : (
//             <p className="text-gray-600 mt-2">No content available.</p>
//           )}
//         </div>
//       </header>

//       {/* Help Section */}
//       <section className="help-section py-12 px-4 sm:px-8 bg-white text-center shadow-md rounded-lg mb-8 w-full">
//         <div className="flex flex-col md:flex-row items-center justify-center">
//           <img
//             src="https://www.thaipedigree.com/static/articles/e1897f9e541c2cbd531886fc07931d8b2d31932b85c991f268955bd5acc7c305.jpeg"
//             alt="สุนัขในรถเข็น"
//             className="md:w-1/2 w-full rounded-md shadow-lg"
//           />
//           <div className="md:w-1/2 mt-4 md:mt-0 md:ml-8 text-left px-4">
//             <h2 className="text-2xl font-semibold text-gray-800">
//               {aboutContent[`help_title_${i18n.language}`]} {/* แสดงผลตามภาษา */}
//             </h2>
//             <p className="mt-4 text-gray-600">
//               {aboutContent[`help_content_${i18n.language}`]} {/* แสดงผลตามภาษา */}
//             </p>
//             <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded shadow hover:bg-orange-400">
//               <Link to="/donate" className="block w-full h-full">
//                 {t("aboutPage.supportButton")}
//               </Link>
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default About;




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

  console.log("aboutContent", aboutContent.video_url
  );


  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-orange-50 to-white text-orange-900 py-8 sm:py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 md:space-y-16">
        {/* About Us Header */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">About Us</h1>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 sm:mb-12">
          {[
            { src: "https://cdn.pixabay.com/photo/2021/01/30/15/15/dog-5964181_1280.jpg", alt: "Team members working with pets" },
            { src: "https://cdn.pixabay.com/photo/2024/07/31/06/12/stray-8933778_1280.png", alt: "Volunteers caring for animals" },
            { src: "https://cdn.pixabay.com/photo/2023/03/14/14/57/cat-box-7852492_1280.jpg" },
            { src: "https://cdn.pixabay.com/photo/2020/11/17/18/20/dog-5753302_1280.jpg" },
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
            We Are Building A Compassionate Pet Adoption Network
          </h2>
          <p className="text-base sm:text-lg text-orange-700">
            At PetFinder, we're passionate about connecting loving homes with pets in need.
            Our network brings together shelters, veterinarians, and pet lovers to ensure
            every animal finds their forever family through a transparent and caring adoption process.
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
                  src={aboutContent.video_url}
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
              {aboutContent[`header_${i18n.language}`]} {/* แสดงผลตามภาษา */}
            </h3>
            <p className="text-base sm:text-lg text-orange-700">
              {aboutContent[`description_${i18n.language}`]} {/* แสดงผลตามภาษา */}
            </p>
          </div>
        </div>

        {/* How You Can Help Section */}
        <div className="space-y-8 bg-gradient-to-br from-orange-100 to-pink-100 p-4 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#db2777]">
            {aboutContent[`help_title_${i18n.language}`]} {/* แสดงผลตามภาษา */}
          </h2>
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <p className="text-base sm:text-lg text-orange-700">
              {aboutContent[`help_content_${i18n.language}`]} {/* แสดงผลตามภาษา */}
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
