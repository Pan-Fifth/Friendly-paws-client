import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import useAuthStore from "@/src/stores/AuthStore"
import usePetStore from "@/src/stores/PetStore"
import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import { toast } from "react-toastify"
import { useTranslation } from 'react-i18next';

export function DialogAdopt({ petId }) {

  //change lang ห้ามมลบ
  const { t } = useTranslation();

  const token = useAuthStore(state => state.token)
  const fileInput = useRef(null)
  const [files, setFiles] = useState([]);
  const [houseCheck, setHouseCheck] = useState({
    hasGarden: false,
    hasFence: false,
    canWalkDog: false,
  });
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({})
  const navigate = useNavigate()
  const user = useAuthStore(state => state.user.user)
  const actionCreateAdoptRequest = usePetStore(state => state.actionCreateAdoptRequest)
  const hdlChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const hdlClick = (e) => {
    if (!user) {
      e.preventDefault()
      navigate("/login")
    }
  }
  const hdlAddClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (fileInput.current) {
      fileInput.current.click(); // Programmatically click the hidden input
    }
  }

  const hdlFileChange = (e) => {
    console.log("e files", e.target.files)
    const selectedFiles = Array.from(e.target.files)
    setFiles([...files, ...selectedFiles])

  }

  //Delete file
  const hdlDeleteFile = (indexToDelete, e) => {
    e.preventDefault()
    e.stopPropagation()
    const newFiles = files.filter((_, index) => index !== indexToDelete)
    setFiles(newFiles)
  }

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault()
      if (files.length > 5) {
        toast.error(t("adoptFormtoast.maxFiles"))
        return
      }
      if (files.length < 3) {
        toast.error(t("adoptFormtoast.minFiles"))
        return
      }
      const formData = new FormData()
      for (const key in input) {
        formData.append(key, input[key])
      }
      for (const key in houseCheck) {
        formData.append(key, houseCheck[key])
      }
      formData.append("userId", user.id)
      formData.append("petId", petId)
      formData.append("files", files)
      files.forEach((file) => {
        formData.append('files', file);
      });
      formData.forEach((value, key) => {
        console.log(key, value)
      })
      await actionCreateAdoptRequest(formData, token)
      toast.success(t("adoptFormtoast.successMessage"))
      setOpen(false)

    } catch (err) {
      setOpen(true)
      console.log(err, "err here")
      // toast.error(err.response.data.message)
    }

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={hdlClick}>{t("adoptForm.adoptMe")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl text-orange-400">{t("adoptForm.adoptionFormTitle")}</DialogTitle>
          <DialogDescription>
            {t("adoptForm.adoptionFormDescription")}
          </DialogDescription>
        </DialogHeader>

        <div className="bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">{t("adoptForm.adoptionApplication")}</h2>
          <p className="text-gray-700 mb-4">
            {t("adoptForm.welcomeMessage1")} {user.firstname}{t("adoptForm.welcomeMessage2")}
          </p>

          <form>
            {/* Personal Information Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{t("adoptForm.personalInformation")}</h3>
              <div className="flex gap-4">
                <div>
                  <label className="mb-1 flex-1">{t("adoptForm.firstName")}</label>
                  <input type="text" placeholder={user.firstname || `${t("adoptForm.firstName")}`} className="border p-2 rounded w-full" name="firstname" onChange={hdlChange} />
                </div>
                <div>
                  <label className=" mb-1 flex-1">{t("adoptForm.lastName")}</label>
                  <input type="text" placeholder={user.lastname || `${t("adoptForm.lastName")}`} className="border p-2 rounded w-full" name="lastname" onChange={hdlChange} />
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{t("adoptForm.contactInformation")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1">{t("adoptForm.dateOfBirth")}</label>
                  <input type="date" className="border p-2 rounded w-full" name="dateOfBirth" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">{t("adoptForm.phoneNo")}</label>
                  <input type="tel" placeholder={t("adoptForm.phoneNo")} className="border p-2 rounded w-full" name="phone" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">{t("adoptForm.lineContact")}</label>
                  <input type="text" placeholder={t("adoptForm.lineContact")} className="border p-2 rounded w-full" name="socialContact" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">{t("adoptForm.email")}</label>
                  <input type="email" placeholder={t("adoptForm.email")} className="border p-2 rounded w-full" name="email" onChange={hdlChange} />
                </div>
              </div>
            </div>

            {/* Living Situation Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{t("adoptForm.livingSituation")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">{t("adoptForm.address")}</label>
                  <input type="text" placeholder={t("adoptForm.address")} className="border p-2 rounded w-full" name="address" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">{t("adoptForm.career")}</label>
                  <input type="text" placeholder={t("adoptForm.career")} className="border p-2 rounded w-full" name="career" onChange={hdlChange} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block mb-1">{t("adoptForm.workPlace")}</label>
                  <input type="text" placeholder={t("adoptForm.workPlace")} className="border p-2 rounded w-full" name="workPlace" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">{t("adoptForm.workingTime")}</label>
                  <input type="text" placeholder={t("adoptForm.workingTime")} className="border p-2 rounded w-full" name="workTime" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">{t("adoptForm.dayOff")}</label>
                  <input type="text" placeholder={t("adoptForm.dayOff")} className="border p-2 rounded w-full" name="dayOff" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">{t("adoptForm.salary")}</label>
                  <input type="number" placeholder={t("adoptForm.salary")} className="border p-2 rounded w-full" name="salary" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">{t("adoptForm.familyMember")}</label>
                  <input type="number" placeholder={t("adoptForm.familyMember")} className="border p-2 rounded w-full" name="familyMemberCount" onChange={hdlChange} />
                </div>

              </div>
            </div>

            {/* Home Environment Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{t("adoptForm.homeEnvironment")}</h3>
              <label className="block mb-1">{t("adoptForm.homeDuringDay")}</label>
              <div className="flex gap-4 mb-2">
                <label className="flex items-center">
                  <input type="radio" className="mr-2" name="familyAlwaysHome" value={true} onChange={hdlChange} />
                  {t("adoptForm.yes")}
                </label>
                <label className="flex items-center">
                  <input type="radio" className="mr-2" name="familyAlwaysHome" value={false} onChange={hdlChange} />
                  {t("adoptForm.no")}
                </label>
              </div>
              <input
                type="number"
                placeholder={t("adoptForm.aloneHours")}
                className="border p-2 rounded w-full"
                name="aloneHours"
                onChange={hdlChange}
              />
            </div>

            {/* Adoption Checklist Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{t("adoptForm.adoptionChecklist")}</h3>
              <label className="block mb-1">{t("adoptForm.houseHolder")}</label>
              <select className="border p-2 rounded w-full" onChange={hdlChange} name="housingType" required>
                <option disabled>{t("adoptForm.select")}</option>
                <option value={"OWN_HOUSE"}>{t("adoptForm.ownHouse")}</option>
                <option value={"RENTAL_HOUSE"}>{t("adoptForm.rentalHouse")}</option>
                <option value={"CONDO"}>{t("adoptForm.condo")}</option>
                <option value={"APARTMENT"}>{t("adoptForm.apartment")}</option>
              </select>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" name="hasGarden"
                    onChange={(e) => setHouseCheck({
                      ...houseCheck,
                      hasGarden: e.target.checked
                    })} />
                  {t("adoptForm.hasGarden")}
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" name="hasFence"
                    onChange={(e) => setHouseCheck({
                      ...houseCheck,
                      hasFence: e.target.checked
                    })} />
                  {t("adoptForm.hasFence")}
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" name="canWalkDog"
                    onChange={(e) => setHouseCheck({
                      ...houseCheck,
                      canWalkDog: e.target.checked
                    })}
                  />
                  {t("adoptForm.canWalkDog")}
                </label>
              </div>
            </div>

            {/* Owner Pet Preference Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{t("adoptForm.petInformation")}</h3>
              <div className="flex gap-2">
                <div>
                  <label className="block mb-1">{t("adoptForm.currentPetCount")}</label>
                  <input type="number" placeholder={t("adoptForm.numberOfPets")} className="border p-2 rounded w-full" name="currentPetCount" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">{t("adoptForm.currentPetDetail")}</label>
                  <input type="text" placeholder={t("adoptForm.petDetail")} className="border p-2 rounded w-full" name="currentPetDetails" onChange={hdlChange} />
                </div>
              </div>
            </div>

            {/* Delivery Preference Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{t("adoptForm.deliveryChecklist")}</h3>
              <label className="block mb-1">{t("adoptForm.homeDuringDay")}</label>
              <div className="flex gap-4 mb-2">
                <label className="flex items-center">
                  <input type="radio" className="mr-2" name="deliveryType" value={"PICK_UP"} onChange={hdlChange} />
                  {t("adoptForm.canPickup")}
                </label>
                <label className="flex items-center">
                  <input type="radio" className="mr-2" name="deliveryType" value={"REQUIRE_DELIVERY"} onChange={hdlChange} />
                  {t("adoptForm.requestForDelivery")}
                </label>
              </div>
            </div>


            {/* Upload Accommodation Images Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{t("adoptForm.uploadImages")} </h3>

              <Button onClick={hdlAddClick} >{t("adoptForm.addPicture")}</Button>
              {files.length > 0 ? <p>{files.length} {t("adoptForm.selectedFiles")}</p> : <p>{t("adoptForm.noSelectedFile")}</p>}
              <input
                type="file"
                accept="image/*"
                ref={fileInput}
                multiple
                className="border p-2 rounded w-full no "
                style={{ display: "none" }}
                onChange={hdlFileChange}
              />
            </div>

            {files.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {files.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      onMouseDown={(e) => hdlDeleteFile(index, e)}
                      onClick={(e) => e.preventDefault()}
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                      size="sm"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            )}



            {/*Explain why want to adopt Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">  {t("adoptForm.adoptionReason")}</h3>
              <div>
                <textarea type="text" className="border p-2 rounded w-full h-[300px]" name="why" onChange={hdlChange} />
              </div>
            </div>


            {/* Submit Button */}
            <DialogFooter>
              <Button type="submit" className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded" onClick={hdlSubmit}>
                {t("adoptForm.submitApplication")}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>

  )
}



