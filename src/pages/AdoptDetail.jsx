import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import usePetStore from '../stores/PetStore'
import { Button } from '@/components/ui/button'
import { DialogAdopt } from '../components/adopt/AdoptForm'
import { useTranslation } from 'react-i18next';


const AdoptDetail = () => {

  //change lang ห้ามมลบ
  const { t, i18n } = useTranslation();
  const language = i18n.language;


  const { id } = useParams()
  const actionGetCurrentPet = usePetStore(state => state.actionGetCurrentPet)
  const currentPet = usePetStore(state => state.currentPet)
  useEffect(() => {
    console.log("id", id)
    actionGetCurrentPet(id)
  }, [])
  if (!currentPet || !currentPet.image) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }
  console.log("adop detail", currentPet)
  return (
    <div className=' grid md:grid-cols-2 m-8 md:m-32'>
      <div className='grid-cols-1'>
        <div className=' flex flex-col gap-3 items-center'>
          <img src={currentPet.image[0].url} className='h-[800px] object-cover' />
          <DialogAdopt petId={id} />
          <Button variant="secondary" className="w-[100px] h-[50px] text-slate-800">{t("adoptDetail.chat")}</Button>
        </div>
      </div>
      <div className=' grid-cols-1 m-8'>
        <div className='flex justify-center items-center flex-col gap-8'>
          <p className='font-bold text-3xl'>{language === 'th' ? currentPet.description_th : currentPet.description_en}</p>
          <div className=' grid grid-cols-2 flex-1 gap-8'>
            <p >{t("adoptDetail.breed")}</p>
            <p>{language === 'th' ? currentPet.breed_th : currentPet.breed_en}</p>
            <p >{t("adoptDetail.color")}</p>
            <p >{currentPet.color}</p>
            <p >{t("adoptDetail.birthday")}</p>
            <p >{currentPet.birthDay}</p>
            <p >{t("adoptDetail.weight")}</p>
            <p >{currentPet.weight}</p>
            <p >{t("adoptDetail.gender")}</p>
            <p >{currentPet.gender}</p>
            <p >{t("adoptDetail.vaccinationStatus")}</p>
            <p >{currentPet.is_vaccinated === "true" ? "Yes" : "No"}</p>
            <p >{t("adoptDetail.neuterationStatus")}</p>
            <p >{currentPet.is_neutered === "true" ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdoptDetail