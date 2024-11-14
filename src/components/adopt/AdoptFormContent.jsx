import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Users,
  Phone,
  Home,
  Building2,
  PawPrint,
  Truck,
  Camera,
  Heart,
  X,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import usePetStore from "@/src/stores/PetStore";
import { useEffect, useRef, useState } from "react";

import { joiResolver } from './../../../node_modules/@hookform/resolvers/joi/src/joi';
import adoptFormAuthen from "../../utils/AdoptFormValidate";


const FormSection = ({ icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
  >
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    {children}
  </motion.div>
);

export function AdoptFormContent({
  t,
  user,
  files,
  fileInput,
  setFiles,
  // hdlFileChange,
  hdlDeleteFile,
  handleFormSubmit,
  formatError,
}) {

  const submitButton = useRef(null)

  const [input, setInput] = useState(usePetStore((state) => state.adoptFormData));
  const [houseCheck, setHouseCheck] = useState(
    usePetStore((state) => state.adoptFormData.houseCheck)
  );
  const adoptFormData = usePetStore((state) => state.adoptFormData);
  const updateAdoptFormData = usePetStore((state) => state.updateAdoptFormData);
  const hdlChange = (e) => {
    const { name, value } = e.target;
    updateAdoptFormData({ [name]: value });
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(adoptFormAuthen(t)),
    mode: "onSubmit",
    reValidateMode: "onSubmit",

  });
  const hdlAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInput.current) {
      fileInput.current.click(); // Programmatically click the hidden input
    }
  };


  const hdlFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
    console.log(register, "CHECK")
    // register("files").onChange(selectedFiles)

  };

  console.log("Joi resolver setup:", !!joiResolver(adoptFormAuthen(t)));

  useEffect(() => {
    Object.entries(adoptFormData).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [adoptFormData, setValue]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateAdoptFormData({ [name]: value });
  };

  const handleCheckboxChange = (name, checked) => {
    updateAdoptFormData({
      houseCheck: {
        ...adoptFormData.houseCheck,
        [name]: checked,
      },
    });
  };
  console.log(files)
  const onSubmit = (data) => {

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "files" && key !== "houseCheck") {

        if (key === "dateOfBirth") {
          formData.append(key, new Date(value).toISOString());
        } else {
          formData.append(key, value);
        }
      }
    });
    // // Housing Details - Matching schema mapping
    formData.append("hasGarden", Boolean(data.houseCheck.hasGarden));
    formData.append("hasFence", Boolean(data.houseCheck.hasFence));
    formData.append("canWalkDog", Boolean(data.houseCheck.canWalkDog));

    handleFormSubmit(formData);
  };

  const inputClass =
    "w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent";
  // console.log(errors, "this is errors")
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormSection
          icon={<Users className="w-5 h-5 text-pink-600" />}
          title={t("adoptForm.personalInformation")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                {...register("firstname")}
                onChange={(e) => {
                  handleInputChange(e);
                  register("firstname").onChange(e);
                }}
                placeholder={t("adoptForm.firstName")}
                className={inputClass}
              />
              {errors.firstname && (
                <span className="text-red-500 text-sm">{errors.firstname.message}</span>
              )}

            </div>
            <div>
              <input
                {...register("lastname")}
                onChange={(e) => {
                  handleInputChange(e);
                  register("lastname").onChange(e);
                }}
                placeholder={t("adoptForm.lastName")}
                className={inputClass}
              />
              {errors.lastname && (
                <span className="text-red-500 text-sm">{errors.lastname.message}</span>
              )}
            </div>
          </div>
        </FormSection>

        <FormSection
          icon={<Phone className="w-5 h-5 text-pink-600" />}
          title={t("adoptForm.contactInformation")}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                {...register("dateOfBirth")}
                onChange={(e) => {
                  handleInputChange(e);
                  register("dateOfBirth").onChange(e);
                }}
                type="date"
                className={inputClass}

              />
              {errors.dateOfBirth && (
                <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>
              )}
            </div>


            <div>
              <input
                {...register("phone")}
                onChange={(e) => {
                  handleInputChange(e);
                  register("phone").onChange(e);
                }}
                placeholder={t("adoptForm.phoneNo")}
                className={inputClass}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone.message}</span>
              )}
            </div>

            <div>
              <input
                {...register("socialContact")}
                onChange={(e) => {
                  handleInputChange(e);
                  register("socialContact").onChange(e);
                }}
                placeholder={t("adoptForm.lineContact")}
                className={inputClass}
              />
              {errors.socialContact && (
                <span className="text-red-500 text-sm">{errors.socialContact.message}</span>
              )}
            </div>

            <p className="py-3 bg-gray-100 rounded-lg">{user.email}</p>
          </div>
        </FormSection>

        <FormSection
          icon={<Building2 className="w-5 h-5 text-pink-600" />}
          title={t("adoptForm.livingSituation")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                {...register("address")}
                onChange={(e) => {
                  handleInputChange(e);
                  register("address").onChange(e);
                }}
                placeholder={t("adoptForm.address")}
                className={inputClass}
              />
              {errors.address && (
                <span className="text-red-500 text-sm">{errors.address.message}</span>
              )}
            </div>
            <div>
              <input
                {...register("career")}
                onChange={(e) => {
                  handleInputChange(e);
                  register("career").onChange(e);
                }}
                placeholder={t("adoptForm.career")}
                className={inputClass}
              />
              {errors.career && (
                <span className="text-red-500 text-sm">{errors.career.message}</span>
              )}
            </div>
            <div>
              <input
                {...register("workPlace")}
                onChange={(e) => {
                  handleInputChange(e);
                  register("workPlace").onChange(e);
                }}
                placeholder={t("adoptForm.workPlace")}
                className={inputClass}
              />
              {errors.workPlace && (
                <span className="text-red-500 text-sm">{errors.workPlace.message}</span>
              )}
            </div>
            <div>
              <input
                {...register("workTime")}
                onChange={(e) => {
                  handleInputChange(e);
                  register("workTime").onChange(e);
                }}
                placeholder={t("adoptForm.workingTime")}
                className={inputClass}
              />
              {errors.workTime && (
                <span className="text-red-500 text-sm">{errors.workTime.message}</span>
              )}
            </div>
            <div>
              <input
                {...register("dayOff")}
                onChange={(e) => {
                  handleInputChange(e);
                  register("dayOff").onChange(e);
                }}
                placeholder={t("adoptForm.dayOff")}
                className={inputClass}
              />
              {errors.dayOff && (
                <span className="text-red-500 text-sm">{errors.dayOff.message}</span>
              )}
            </div>
            <div>
              <input
                {...register("salary")}
                onChange={(e) => {
                  handleInputChange(e);
                  register("salary").onChange(e);
                }}
                type="number"
                placeholder={t("adoptForm.salary")}
                className={inputClass}
              />
              {errors.salary && (
                <span className="text-red-500 text-sm">{errors.salary.message}</span>
              )}
            </div>
            <div>
              <input
                {...register("familyMemberCount")}
                onChange={(e) => {
                  handleInputChange(e);
                  register("familyMemberCount").onChange(e);
                }}
                type="number"
                placeholder={t("adoptForm.familyMember")}
                className={inputClass}
              />
              {errors.familyMemberCount && (
                <span className="text-red-500 text-sm">{errors.familyMemberCount.message}</span>
              )}
            </div>
          </div>
        </FormSection>

        <FormSection
          icon={<Home className="w-5 h-5 text-pink-600" />}
          title={t("adoptForm.homeEnvironment")}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("adoptForm.homeDuringDay")}
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    {...register("familyAlwaysHome")}
                    onChange={(e) => {
                      handleInputChange(e);
                      register("familyAlwaysHome").onChange(e);
                    }}
                    type="radio"
                    value="true"
                  />
                  <span>{t("adoptForm.yes")}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    {...register("familyAlwaysHome")}
                    onChange={(e) => {
                      handleInputChange(e);
                      register("familyAlwaysHome").onChange(e);
                    }}
                    type="radio"
                    value="false"
                  />
                  <span>{t("adoptForm.no")}</span>
                </label>
                {errors.familyAlwaysHome && (
                  <span className="text-red-500 text-sm">{errors.familyAlwaysHome.message}</span>
                )}
              </div>
            </div>

            <input
              {...register("aloneHours")}
              onChange={(e) => {
                handleInputChange(e);
                register("aloneHours").onChange(e);
              }}
              type="number"
              placeholder={t("adoptForm.aloneHours")}
              className={inputClass}
            />
            {errors.aloneHours && (
              <span className="text-red-500 text-sm">{errors.aloneHours.message}</span>
            )}

            <select
              {...register("housingType")}
              onChange={(e) => {
                handleInputChange(e);
                register("housingType").onChange(e);
              }}
              className={inputClass}
            >
              <option value="">{t("adoptForm.select")}</option>
              <option value="OWN_HOUSE">{t("adoptForm.ownHouse")}</option>
              <option value="RENTAL_HOUSE">{t("adoptForm.rentalHouse")}</option>
              <option value="CONDO">{t("adoptForm.condo")}</option>
              <option value="APARTMENT">{t("adoptForm.apartment")}</option>
            </select>
            {errors.housingType && (
              <span className="text-red-500 text-sm">{errors.housingType.message}</span>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["hasGarden", "hasFence", "canWalkDog"].map((check) => (
                <label key={check} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register(`houseCheck.${check}`)}
                    onChange={(e) => {
                      handleCheckboxChange(check, e.target.checked);
                      register(`houseCheck.${check}`).onChange(e);
                    }}
                    className="w-4 h-4 text-pink-600"
                  />
                  <span>{t(`adoptForm.${check}`)}</span>

                </label>
              ))}
              {errors.houseCheck && (
                <span className="text-red-500 text-sm">{errors.houseCheck.message}</span>
              )}
            </div>
          </div>
        </FormSection>

        <FormSection
          icon={<PawPrint className="w-5 h-5 text-pink-600" />}
          title={t("adoptForm.petInformation")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                {...register("currentPetCount")}
                onChange={(e) => {
                  handleInputChange(e);
                  register("currentPetCount").onChange(e);
                }}
                type="number"
                placeholder={t("adoptForm.currentPetCount")}
                className={inputClass}
              />
              {errors.currentPetCount && (
                <span className="text-red-500 text-sm">{errors.currentPetCount.message}</span>
              )}
            </div>
            <div>
              <input
                {...register("currentPetDetails")}
                onChange={(e) => {
                  handleInputChange(e);
                  register("currentPetDetails").onChange(e);
                }}
                placeholder={t("adoptForm.currentPetDetail")}
                className={inputClass}
              />
              {errors.currentPetDetails && (
                <span className="text-red-500 text-sm">{errors.currentPetDetails.message}</span>
              )}
            </div>
          </div>
        </FormSection>

        <FormSection
          icon={<Truck className="w-5 h-5 text-pink-600" />}
          title={t("adoptForm.deliveryChecklist")}
        >
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                {...register("deliveryType")}
                onChange={(e) => {
                  handleInputChange(e);
                  register("deliveryType").onChange(e);
                }}
                type="radio"
                value="PICK_UP"
              />
              <span>{t("adoptForm.canPickup")}</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                {...register("deliveryType")}
                onChange={(e) => {
                  handleInputChange(e);
                  register("deliveryType").onChange(e);
                }}
                type="radio"
                value="REQUIRE_DELIVERY"
              />
              <span>{t("adoptForm.requestForDelivery")}</span>
            </label>
            {errors.deliveryType && (
              <span className="text-red-500 text-sm">{errors.deliveryType.message}</span>
            )}
          </div>
        </FormSection>



        <FormSection
          icon={<MessageCircle className="w-5 h-5 text-pink-600" />}
          title={t("adoptForm.adoptionReason")}
        >
          <textarea
            {...register("why")}
            onChange={(e) => {
              handleInputChange(e);
              register("why").onChange(e);
            }}
            className="w-full h-[200px] px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
          />
          {errors.why && (
            <span className="text-red-500 text-sm">{errors.why.message}</span>
          )}
        </FormSection>
        <DialogFooter>
          <Button type="submit" className="bg-pink-600 text-white hover:bg-pink-700 hidden" ref={submitButton}>
            <Heart className="w-5 h-5 mr-2" />
            {t("adoptForm.submitApplication")}
          </Button>
        </DialogFooter>

      </form>
      <FormSection
        icon={<Camera className="w-5 h-5 text-pink-600" />}
        title={t("adoptForm.uploadImages")}
      >
        <div className="space-y-4">
          <Button onClick={hdlAddClick} type="button" className="bg-pink-600 text-white mr-5">
            <Camera className="w-5 h-5 mr-2" />
            {t("adoptForm.addPicture")}
          </Button>
          <input
            ref={fileInput}
            type="file"
            multiple
            onChange={hdlFileChange}
            className="hidden"
            accept="image/*"
          />

          {files.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={(e) => hdlDeleteFile(index, e)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <Button onClick={() => submitButton.current.click()}  className="bg-pink-600 text-white hover:bg-pink-700 " >
            <Heart className="w-5 h-5 mr-2" />
            {t("adoptForm.submitApplication")}
          </Button>
      
          {/* {errors.files && (
         <span className="text-red-500 text-sm">{errors.files.message}</span>
       )} */}
        </div>
      </FormSection>

    </>
  );
}
