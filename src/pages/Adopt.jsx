import React, { useEffect, useState } from "react";
import { DropdownWithArrow } from "@/components/ui/dropdown-with-arrow";
import { Button } from "@/components/ui/button";
import AdoptPetCard from "../components/adopt/AdoptPetCard";
import usePetStore from "../stores/PetStore";
import { useTranslation } from 'react-i18next';
import { Card, CardFooter } from "@/components/ui/card"



const Adopt = () => {
  //change lang ห้ามมลบ
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const [page, setPage] = useState(1);
  const actionGetAvaiPet = usePetStore((state) => state.actionGetAvaiPet);
  const avaiPets = usePetStore((state) => state.avaiPets);
  const filter = usePetStore((state) => state.filter);
  const setFilter = usePetStore((state) => state.setFilter);
  const [isClicked, setIsClicked] = useState(false)
  

  useEffect(() => {
    setFilter({})
    actionGetAvaiPet(6, page)
  }, [])

  console.log(avaiPets, "avaiPets")
  const hdlPageChange = (n) => {
    try {
      if (page + n < 1) {
        return;
      }
      if (n > 0 && avaiPets.length < 6) {
        return;
      }
      setPage((prev) => prev + n);
      actionGetAvaiPet(6, page + n);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      return;
    }
  };

  const hdlChangeFilter = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value.toUpperCase()
    })
  }

  const hdlSubmit = (e) => {
    e.preventDefault();
    actionGetAvaiPet(12, page, filter);
    console.log(filter);
  };

  if (!avaiPets) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
  console.log("available pet", avaiPets);
  return (
    <div>
      <div className="relative">
        <div className="rounded-3xl h-[180px] md:h-[300px] mx-auto w-full my-10 ">
        <img src="/src/assets/AdoptBg.png" className="absolute md:top-[-450px]" alt="" />
        </div>
      </div>
      <div className=" absolute top-20  w-full h-[250px] md:h-[500px]">
        <div className="h-full flex flex-col items-center justify-center">
          <p className="w-full h-[150px] z-20 text-3xl md:text-[70px] absolute md:top-5 md:left-[-200px]  font-bold flex items-center justify-center text-center">
            {t("adoptPageMain.maincontent")}
          </p>
          <div className=" relative flex flex-col gap-12 md:gap-24 z-20 justify-center">
            <form onSubmit={hdlSubmit} className="w-full flex flex-col md:flex-row gap-3 items-center absolute md:top-[-90px] md:left-[-10px] justify-center">
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
                    ${isClicked ? 'scale-95' : 'animate-pulse-pink'}
                    `}
                >
                  {t("adoptPageMain.search")}
                </Button>
                <style jsx global>{`
                    @keyframes pulse-pink {
                    0%, 100% {
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
        {
          avaiPets.length === 0 && (
            <div className="flex items-start justify-center ">
              <p className="text-3xl font-bold">no pet found</p>
            </div>
          )
        }
      </div>


      <div className="container mx-auto p-4">
  <div className="w-full lg:w-2/3 mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {avaiPets?.map((el, index) => (
        <Card 
          key={el.id} 
          className={`overflow-hidden group ${index === 0 || index === avaiPets.length - 1 ? 'col-span-2' : ''}`}
        >
          <AdoptPetCard
            id={el.id}
            name={language === 'th' ? (el.name_th || el.name_en) : el.name_en || el.name_th}
            image={el.image?.map(img => img.url) || []}
            gender={el.gender}
          />
        </Card>
      ))}
    </div>
  </div>
</div>

      <div className="mt-10">
        <div className="flex justify-center items-center gap-2">
          <Button
            onClick={() => hdlPageChange(-1)}
            className="border text-xl"
          >
           Previous
          </Button>
          <p className="text-2xl">{t("adoptPageMain.page")} {page}</p>
          <Button
            onClick={() => hdlPageChange(+1)}
            className="border text-xl"
          >
           Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Adopt;
