import React, { useEffect, useState } from "react";
import { DropdownWithArrow } from "@/components/ui/dropdown-with-arrow";
import { Button } from "@/components/ui/button";
import AdoptPetCard from "../components/adopt/AdoptPetCard";
import usePetStore from "../stores/PetStore";
import { useTranslation } from "react-i18next";
import { Card, CardFooter } from "@/components/ui/card";
import Lottie from "lottie-react"; // นำเข้า Lottie
import AnimationDownload from "../assets/AnimationDownload.json"; // นำเข้าไฟล์ Lottie

const Adopt = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // สร้างสถานะ loading
  const actionGetAvaiPet = usePetStore((state) => state.actionGetAvaiPet);
  const avaiPets = usePetStore((state) => state.avaiPets);
  const filter = usePetStore((state) => state.filter);
  const setFilter = usePetStore((state) => state.setFilter);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setLoading(true); // ตั้งค่าค่า loading เป็น true ขณะเริ่มต้นโหลดข้อมูล
    setFilter({});
    actionGetAvaiPet(6, page).finally(() => setLoading(false)); // เมื่อโหลดเสร็จให้ตั้งค่า loading เป็น false
  }, [page]);

  const hdlPageChange = (n) => {
    try {
      if (page + n < 1) return;
      if (n > 0 && avaiPets.length < 6) return;
      setPage((prev) => prev + n);
      setLoading(true); // เมื่อเปลี่ยนหน้าให้แสดงสถานะโหลด
      actionGetAvaiPet(6, page + n).finally(() => setLoading(false)); // เมื่อข้อมูลโหลดเสร็จให้ตั้งค่า loading เป็น false
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      setLoading(false); // เมื่อเกิดข้อผิดพลาดให้ตั้งค่า loading เป็น false
    }
  };

  const hdlChangeFilter = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  const hdlSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // เมื่อส่งฟอร์มให้แสดงสถานะโหลด
    actionGetAvaiPet(12, page, filter).finally(() => setLoading(false)); // เมื่อข้อมูลโหลดเสร็จให้ตั้งค่า loading เป็น false
    console.log(filter);
  };

  if (loading) {
    return (
      <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="rounded-lg shadow-lg flex flex-col items-center">
          <div className="flex flex-col items-center space-y-2">
            <Lottie animationData={AnimationDownload} loop={true} className="w-1/2 h-1/2" />
            <Button className="w-1/5 items-center my-5 group relative overflow-hidden bg-black text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl active:scale-95">
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span className="text-lg">Loading...</span>
              </span>
              <span className="absolute inset-0 z-0 bg-black opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <div className="rounded-3xl h-[180px] md:h-[300px] mx-auto w-full my-10 ">
          <img src="/src/assets/AdoptBg.png" className="absolute md:top-[-450px]" alt="" />
        </div>
      </div>
      <div className="absolute top-20 w-full h-[250px] md:h-[500px]">
        <div className="h-full flex flex-col items-center justify-center">
          <p className="w-full h-[150px] z-20 text-3xl md:text-[70px] absolute md:top-5 md:left-[-200px]  font-bold flex items-center justify-center text-center">
            {t("adoptPageMain.maincontent")}
          </p>
          <div className=" relative flex flex-col gap-12 md:gap-24 z-20 justify-center">
            <form
              onSubmit={hdlSubmit}
              className="w-full flex flex-col md:flex-row gap-3 items-center absolute md:top-[-90px] md:left-[-10px] justify-center"
            >
              <div className="flex gap-3">
                <DropdownWithArrow
                  name="gender"
                  array={["Male", "Female"]}
                  className="w-full md:w-[300px] text-lg md:text-xl"
                  onChange={hdlChangeFilter}
                  value={filter.gender}
                />
                <DropdownWithArrow
                  name="age"
                  array={["Kid", "Junior", "Senior", "Adult"]}
                  className="w-full md:w-[300px] text-lg md:text-xl"
                  onChange={hdlChangeFilter}
                  value={filter.age}
                />
                <Button
                  className={`
                    bg-pink-400 w-1/4 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-full
                    transform transition-all duration-300 ease-in-out
                    ${isClicked ? "scale-95" : "animate-pulse-pink"}
                  `}
                >
                  {t("adoptPageMain.search")}
                </Button>
                <style jsx global>{`
                  @keyframes pulse-pink {
                    0%,
                    100% {
                      box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.7);
                    }
                    50% {
                      box-shadow: 0 0 0 10px rgba(236, 72, 153, 0);
                    }
                  }
                  .animate-pulse-pink {
                    animation: pulse-pink 2s infinite;
                  }
                `}</style>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        {avaiPets?.length === 0 && (
          <div className="flex items-start justify-center">
            <p className="text-3xl font-bold">no pet found</p>
          </div>
        )}
      </div>

      <div className="container mx-auto p-4">
        <div className="w-full lg:w-2/3 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {avaiPets?.map((el, index) => (
              <Card
                key={el.id}
                className={`overflow-hidden group ${
                  index === 0 || index === avaiPets.length - 1 ? "col-span-2" : ""
                }`}
              >
                <AdoptPetCard
                  id={el.id}
                  name={language === "th" ? el.name_th || el.name_en : el.name_en || el.name_th}
                  image={el.image?.map((img) => img.url) || []}
                  gender={el.gender}
                />
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 mb-12">
        {avaiPets.length > 0 && (
          <div className="flex justify-center items-center gap-6 mb-24">
            <Button
              onClick={() => hdlPageChange(-1)}
              className="bg-white border-2 border-pink-400 text-pink-500 hover:bg-pink-50 rounded-lg px-8 py-3 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={page === 1}
            >
              {t("adoptPageMain.previous")}
            </Button>
            <div className="flex items-center justify-center bg-pink-50 rounded-lg px-6 py-3 min-w-[120px]">
              <p className="text-xl font-semibold text-pink-600">
                {t("adoptPageMain.page")} {page}
              </p>
            </div>
            <Button
              onClick={() => hdlPageChange(+1)}
              className="bg-white border-2 border-pink-400 text-pink-500 hover:bg-pink-50 rounded-lg px-8 py-3 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={avaiPets.length < 6}
            >
              {t("adoptPageMain.next")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Adopt;
