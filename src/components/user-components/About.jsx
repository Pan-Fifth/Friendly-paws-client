import React from "react";
import { FaPaw } from "react-icons/fa"; // Import icon
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-page mx-auto max-w-full">
      {/* Video Section */}
      <section className="video-section py-20 px-4 sm:px-8 bg-pink-100 text-center shadow-md rounded-lg mb-8 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          FRIENDLY & PAW 🐾
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
        <h1 className="text-3xl font-bold text-gray-800">... คือองค์กรการกุศล ... 🐶</h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          นับตั้งแต่ก่อตั้งขึ้นในปี 2008 Big Dog Ranch Rescue
          ได้ช่วยชีวิตสุนัขกว่า 70,000 ตัว!
          ภารกิจของเราคือการช่วยชีวิตสุนัขให้ได้ 10,000 ตัวต่อปี
          รักษาและหาบ้านที่อบอุ่นให้กับพวกเขา
          รวมถึงให้ความรู้แก่ผู้คนเกี่ยวกับการดูแลสุนัขอย่างถูกต้องและความสำคัญของการทำหมันสุนัข
        </p>
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
              คุณสามารถช่วยได้อย่างไร:
            </h2>
            <p className="mt-4 text-gray-600">
              เราพึ่งพาการบริจาคและการสนับสนุนเพื่อช่วยเหลือสุนัขที่ป่วย
              ถูกทอดทิ้ง และถูกทารุณกรรมในความดูแลของเรา
              สุนัขทุกตัวที่เราช่วยเหลือได้รับการรักษา ฉีดวัคซีน และทำหมันแล้ว
              เรายังฟื้นฟู ฝึกสังคม และพยายามหาบ้านใหม่ให้กับสุนัขของเรา
              แต่เราทำคนเดียวไม่ได้
            </p>
            <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded shadow hover:bg-orange-400">
              <Link to="/donate" className="block w-full h-full">
                สนับสนุนภารกิจของเรา ❤️
              </Link>
            </button>
          </div>
        </div>
      </section>

      {/* Adoption Checklist */}
      <section className="adoption-checklist py-12 px-4 sm:px-8 bg-gray-100 rounded-lg shadow-md mb-8 w-full">
        <h2 className="text-center text-2xl font-semibold mb-8 text-gray-800">
          เงื่อนไขการรับเลี้ยง:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              image:
                "https://www.thaipedigree.com/static/articles/e1897f9e541c2cbd531886fc07931d8b2d31932b85c991f268955bd5acc7c305.jpeg",
              title: "อายุ",
              description:
                "ผู้รับเลี้ยงต้องมีอายุมากกว่า 22 ปีและมีงานทำ หากอายุต่ำกว่า 22 ปี จำเป็นต้องได้รับอนุญาตจากผู้ปกครอง",
            },
            {
              image:
                "https://www.thaipedigree.com/static/articles/e1897f9e541c2cbd531886fc07931d8b2d31932b85c991f268955bd5acc7c305.jpeg",
              title: "กิจกรรม",
              description:
                "สุนัขต้องการการออกกำลังกาย ผู้รับเลี้ยงต้องพาสุนัขเดินเล่นสองครั้งต่อวันขึ้นไป",
            },
            {
              image:
                "https://www.thaipedigree.com/static/articles/e1897f9e541c2cbd531886fc07931d8b2d31932b85c991f268955bd5acc7c305.jpeg",
              title: "บ้าน",
              description:
                "เราชอบบ้านที่มีรั้วล้อมรอบ แต่จะพิจารณาบ้านที่อยู่ห่างจากถนนใหญ่และอยู่ในย่านที่เป็นมิตร",
            },
            {
              image:
                "https://www.thaipedigree.com/static/articles/e1897f9e541c2cbd531886fc07931d8b2d31932b85c991f268955bd5acc7c305.jpeg",
              title: "อัพเดทให้กับเรา",
              description:
                "เราต้องการให้ผู้รับเลี้ยงทุกคนปฏิบัติตามตารางการอัปเดตของเรา ซึ่งจะทำให้เราสามารถติดตามความคืบหน้าของคุณและสุนัขตัวใหม่ของคุณได้",
            },
            {
              image:
                "https://www.thaipedigree.com/static/articles/e1897f9e541c2cbd531886fc07931d8b2d31932b85c991f268955bd5acc7c305.jpeg",
              title: "เพื่อนบ้าน",
              description:
                "หากต้องการมีสิทธิ์รับเลี้ยง คุณต้องอาศัยอยู่ในละแวกบ้าน หมู่บ้าน หรือชุมชนที่เป็นมิตรกับสัตว์ และสามารถเลี้ยงสุนัขได้",
            },
          ].map((item, index) => (
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
                <FaPaw className="text-orange-500 text-2xl mb-2" />
                <h3 className="font-bold text-orange-500">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
