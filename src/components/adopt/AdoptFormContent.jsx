import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useEffect, useState } from "react";
import validateAdoptForm from "@/src/utils/AdoptFormValidate";

const formSchema = z.object({
  firstname: z.string().min(1, "Required"),
  lastname: z.string().min(1, "Required"),
  dateOfBirth: z.string().min(1, "Required"),
  phone: z.string().min(10, "Valid phone required"),
  socialContact: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  career: z.string().min(1, "Required"),
  workPlace: z.string().min(1, "Required"),
  workTime: z.string().min(1, "Required"),
  dayOff: z.string(),
  salary: z.string().min(1, "Required"),
  familyMemberCount: z.string().min(1, "Required"),
  familyAlwaysHome: z.string(),
  aloneHours: z.string(),
  housingType: z.enum(["OWN_HOUSE", "RENTAL_HOUSE", "CONDO", "APARTMENT"]),
  houseCheck: z.object({
    hasGarden: z.boolean(),
    hasFence: z.boolean(),
    canWalkDog: z.boolean(),
  }),
  currentPetCount: z.string(),
  currentPetDetails: z.string(),
  deliveryType: z.enum(["PICK_UP", "REQUIRE_DELIVERY"]),
  why: z.string().min(10, "Please provide more details"),
});

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
  hdlAddClick,
  hdlFileChange,
  hdlDeleteFile,
  handleFormSubmit,
}) {
  const [formatError, setFormatError] = useState({});
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
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: adoptFormData,
  });

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

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "files" && key !== "houseCheck") {
        formData.append(key, value);
      }
    });
    // // Housing Details - Matching schema mapping
    formData.append("hasGarden", Boolean(data.houseCheck.hasGarden));
    formData.append("hasFence", Boolean(data.houseCheck.hasFence));
    formData.append("canWalkDog", Boolean(data.houseCheck.canWalkDog));
    setFormatError({})
    const error = validateAdoptForm(input, t)
    
    handleFormSubmit(formData);
  };

  const inputClass =
    "w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent";
  // console.log(files)
  return (
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
          <input
            {...register("dateOfBirth")}
            onChange={(e) => {
              handleInputChange(e);
              register("dateOfBirth").onChange(e);
            }}
            type="date"
            className={inputClass}
            
          />
          <input
            {...register("phone")}
            onChange={(e) => {
              handleInputChange(e);
              register("phone").onChange(e);
            }}
            placeholder={t("adoptForm.phoneNo")}
            className={inputClass}
          />
          <input
            {...register("socialContact")}
            onChange={(e) => {
              handleInputChange(e);
              register("socialContact").onChange(e);
            }}
            placeholder={t("adoptForm.lineContact")}
            className={inputClass}
          />
          <p className="px-4 py-2 bg-gray-100 rounded-lg">{user.email}</p>
        </div>
      </FormSection>

      <FormSection
        icon={<Building2 className="w-5 h-5 text-pink-600" />}
        title={t("adoptForm.livingSituation")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            {...register("address")}
            onChange={(e) => {
              handleInputChange(e);
              register("address").onChange(e);
            }}
            placeholder={t("adoptForm.address")}
            className={inputClass}
          />
          <input
            {...register("career")}
            onChange={(e) => {
              handleInputChange(e);
              register("career").onChange(e);
            }}
            placeholder={t("adoptForm.career")}
            className={inputClass}
          />
          <input
            {...register("workPlace")}
            onChange={(e) => {
              handleInputChange(e);
              register("workPlace").onChange(e);
            }}
            placeholder={t("adoptForm.workPlace")}
            className={inputClass}
          />
          <input
            {...register("workTime")}
            onChange={(e) => {
              handleInputChange(e);
              register("workTime").onChange(e);
            }}
            placeholder={t("adoptForm.workingTime")}
            className={inputClass}
          />
          <input
            {...register("dayOff")}
            onChange={(e) => {
              handleInputChange(e);
              register("dayOff").onChange(e);
            }}
            placeholder={t("adoptForm.dayOff")}
            className={inputClass}
          />
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
          </div>
        </div>
      </FormSection>

      <FormSection
        icon={<PawPrint className="w-5 h-5 text-pink-600" />}
        title={t("adoptForm.petInformation")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <input
            {...register("currentPetDetails")}
            onChange={(e) => {
              handleInputChange(e);
              register("currentPetDetails").onChange(e);
            }}
            placeholder={t("adoptForm.currentPetDetail")}
            className={inputClass}
          />
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
        </div>
      </FormSection>

      <FormSection
        icon={<Camera className="w-5 h-5 text-pink-600" />}
        title={t("adoptForm.uploadImages")}
      >
        <div className="space-y-4">
          <Button onClick={hdlAddClick} type="button" className="bg-pink-600 text-white">
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
        {errors.why && <span className="text-red-500 text-sm">{errors.why.message}</span>}
      </FormSection>

      <DialogFooter>
        <Button type="submit" className="bg-pink-600 text-white hover:bg-pink-700">
          <Heart className="w-5 h-5 mr-2" />
          {t("adoptForm.submitApplication")}
        </Button>
      </DialogFooter>
    </form>
  );
}
