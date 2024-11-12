// import { motion } from "framer-motion"
// import { Users, Phone, Home, Building2, ClipboardCheck, PawPrint, Truck, MessageCircle, Camera, Upload, X, Heart } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { DialogFooter } from "@/components/ui/dialog"
// import usePetStore from "@/src/stores/PetStore"
// import { useEffect } from "react"

// export function AdoptFormContent({ 
//   t,
//   user,
//   hdlChange,
//   formatError,
//   houseCheck,
//   setHouseCheck,
//   files,
//   fileInput,
//   hdlAddClick,
//   hdlFileChange,
//   hdlDeleteFile,
//   hdlSubmit 
// }) {
//     const adoptFormData = usePetStore(state => state.adoptFormData)
//     useEffect(() => {
//         if (adoptFormData) {
//             // Your form fields will automatically populate with stored data
//         }
//     }, [adoptFormData])
// return (

// <form className="space-y-8">
// {/* Personal Information */}
// <motion.div
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
// >
//   <div className="flex items-center gap-2 mb-4">
//     <Users className="w-5 h-5 text-pink-600" />
//     <h3 className="text-xl font-semibold">{t("adoptForm.personalInformation")}</h3>
//   </div>
  
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{t("adoptForm.firstName")}</label>
//       <input
//         type="text"
//         name="firstname"
//         onChange={hdlChange}
//         placeholder={user.firstname || t("adoptForm.firstName")}
//         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
//       />
//       {formatError.firstname && (
//         <p className="text-red-500 text-sm">{formatError.firstname}</p>
//       )}
//     </div>
    
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{t("adoptForm.lastName")}</label>
//       <input
//         type="text"
//         name="lastname"
        
//         onChange={hdlChange}
//         placeholder={user.lastname || t("adoptForm.lastName")}
//         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
//       />
//       {formatError.lastname && (
//         <p className="text-red-500 text-sm">{formatError.lastname}</p>
//       )}
//     </div>
//   </div>
// </motion.div>

// {/* Contact Information */}
// <motion.div
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
// >
//   <div className="flex items-center gap-2 mb-4">
//     <Phone className="w-5 h-5 text-pink-600" />
//     <h3 className="text-xl font-semibold">{t("adoptForm.contactInformation")}</h3>
//   </div>
  
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{t("adoptForm.dateOfBirth")}</label>
//       <input
//         type="date"
//         name="dateOfBirth"
//         onChange={hdlChange}
//         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//       />
//       {formatError.dateOfBirth && (
//         <p className="text-red-500 text-sm">{formatError.dateOfBirth}</p>
//       )}
//     </div>

//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{t("adoptForm.phoneNo")}</label>
//       <input
//         type="tel"
//         name="phone"
//         onChange={hdlChange}
//         placeholder={t("adoptForm.phoneNo")}
//         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//       />
//       {formatError.phone && (
//         <p className="text-red-500 text-sm">{formatError.phone}</p>
//       )}
//     </div>

//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{t("adoptForm.lineContact")}</label>
//       <input
//         type="text"
//         name="socialContact"
//         onChange={hdlChange}
//         placeholder={t("adoptForm.lineContact")}
//         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//       />
//       {formatError.socialContact && (
//         <p className="text-red-500 text-sm">{formatError.socialContact}</p>
//       )}
//     </div>

//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{t("adoptForm.email")}</label>
//       <p className="px-4 py-2 bg-gray-100 rounded-lg">{user.email}</p>
//     </div>
//   </div>
// </motion.div>

// {/* Living Situation */}
// <motion.div
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
// >
//   <div className="flex items-center gap-2 mb-4">
//     <Home className="w-5 h-5 text-pink-600" />
//     <h3 className="text-xl font-semibold">{t("adoptForm.livingSituation")}</h3>
//   </div>

//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{t("adoptForm.address")}</label>
//       <input
//         type="text"
//         name="address"
//         onChange={hdlChange}
//         placeholder={t("adoptForm.address")}
//         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//       />
//       {formatError.address && (
//         <p className="text-red-500 text-sm">{formatError.address}</p>
//       )}
//     </div>

//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{t("adoptForm.career")}</label>
//       <input
//         type="text"
//         name="career"
//         onChange={hdlChange}
//         placeholder={t("adoptForm.career")}
//         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//       />
//       {formatError.career && (
//         <p className="text-red-500 text-sm">{formatError.career}</p>
//       )}
//     </div>

//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{t("adoptForm.workPlace")}</label>
//       <input
//         type="text"
//         name="workPlace"
//         onChange={hdlChange}
//         placeholder={t("adoptForm.workPlace")}
//         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//       />
//       {formatError.workPlace && (
//         <p className="text-red-500 text-sm">{formatError.workPlace}</p>
//       )}
//     </div>

//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{t("adoptForm.workingTime")}</label>
//       <input
//         type="text"
//         name="workTime"
//         onChange={hdlChange}
//         placeholder={t("adoptForm.workingTime")}
//         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//       />
//       {formatError.workTime && (
//         <p className="text-red-500 text-sm">{formatError.workTime}</p>
//       )}
//     </div>

//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{t("adoptForm.dayOff")}</label>
//       <input
//         type="text"
//         name="dayOff"
//         onChange={hdlChange}
//         placeholder={t("adoptForm.dayOff")}
//         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//       />
//       {formatError.dayOff && (
//         <p className="text-red-500 text-sm">{formatError.dayOff}</p>
//       )}
//     </div>

//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{t("adoptForm.salary")}</label>
//       <input
//         type="number"
//         name="salary"
//         onChange={hdlChange}
//         placeholder={t("adoptForm.salary")}
//         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//       />
//       {formatError.salary && (
//         <p className="text-red-500 text-sm">{formatError.salary}</p>
//       )}
//     </div>

//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{t("adoptForm.familyMember")}</label>
//       <input
//         type="number"
//         name="familyMemberCount"
//         onChange={hdlChange}
//         placeholder={t("adoptForm.familyMember")}
//         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//       />
//       {formatError.familyMemberCount && (
//         <p className="text-red-500 text-sm">{formatError.familyMemberCount}</p>
//       )}
//     </div>
//   </div>
// </motion.div>

// {/* Home Environment */}
// <motion.div
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
// >
//   <div className="flex items-center gap-2 mb-4">
//     <Building2 className="w-5 h-5 text-pink-600" />
//     <h3 className="text-xl font-semibold">{t("adoptForm.homeEnvironment")}</h3>
//   </div>

//   <div className="space-y-4">
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-2">{t("adoptForm.homeDuringDay")}</label>
//       <div className="flex gap-6">
//         <label className="flex items-center gap-2 cursor-pointer">
//           <input
//             type="radio"
//             name="familyAlwaysHome"
//             value={true}
//             onChange={hdlChange}
//             className="w-4 h-4 text-pink-600 focus:ring-pink-500"
//           />
//           <span>{t("adoptForm.yes")}</span>
//         </label>
//         <label className="flex items-center gap-2 cursor-pointer">
//           <input
//             type="radio"
//             name="familyAlwaysHome"
//             value={false}
//             onChange={hdlChange}
//             className="w-4 h-4 text-pink-600 focus:ring-pink-500"
//           />
//           <span>{t("adoptForm.no")}</span>
//         </label>
//       </div>
//     </div>

//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{t("adoptForm.aloneHours")}</label>
//       <input
//         type="number"
//         name="aloneHours"
//         onChange={hdlChange}
//         placeholder={t("adoptForm.aloneHours")}
//         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//       />
//     </div>
//   </div>
// </motion.div>

// {/* Adoption Checklist */}
// <motion.div
// initial={{ opacity: 0, y: 20 }}
// animate={{ opacity: 1, y: 0 }}
// className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
// >
// <div className="flex items-center gap-2 mb-4">
//   <ClipboardCheck className="w-5 h-5 text-pink-600" />
//   <h3 className="text-xl font-semibold">{t("adoptForm.adoptionChecklist")}</h3>
// </div>

// <div className="space-y-4">
//   <div className="space-y-2">
//     <label className="block text-sm font-medium text-gray-700">{t("adoptForm.houseHolder")}</label>
//     <select 
//       name="housingType" 
//       onChange={hdlChange}
//       className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//       defaultValue=""
//     >
//       <option value="" disabled>{t("adoptForm.select")}</option>
//       <option value="OWN_HOUSE">{t("adoptForm.ownHouse")}</option>
//       <option value="RENTAL_HOUSE">{t("adoptForm.rentalHouse")}</option>
//       <option value="CONDO">{t("adoptForm.condo")}</option>
//       <option value="APARTMENT">{t("adoptForm.apartment")}</option>
//     </select>
//     {formatError.housingType && (
//       <p className="text-red-500 text-sm">{formatError.housingType}</p>
//     )}
//   </div>

//   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//     <label className="flex items-center gap-2 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors">
//       <input
//         type="checkbox"
//         name="hasGarden"
//         onChange={(e) => setHouseCheck({
//           ...houseCheck,
//           hasGarden: e.target.checked
//         })}
//         className="w-4 h-4 text-pink-600 focus:ring-pink-500 rounded"
//       />
//       <span>{t("adoptForm.hasGarden")}</span>
//     </label>

//     <label className="flex items-center gap-2 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors">
//       <input
//         type="checkbox"
//         name="hasFence"
//         onChange={(e) => setHouseCheck({
//           ...houseCheck,
//           hasFence: e.target.checked
//         })}
//         className="w-4 h-4 text-pink-600 focus:ring-pink-500 rounded"
//       />
//       <span>{t("adoptForm.hasFence")}</span>
//     </label>

//     <label className="flex items-center gap-2 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors">
//       <input
//         type="checkbox"
//         name="canWalkDog"
//         onChange={(e) => setHouseCheck({
//           ...houseCheck,
//           canWalkDog: e.target.checked
//         })}
//         className="w-4 h-4 text-pink-600 focus:ring-pink-500 rounded"
//       />
//       <span>{t("adoptForm.canWalkDog")}</span>
//     </label>
//   </div>
// </div>
// </motion.div>

// {/* Pet Information */}
// <motion.div
// initial={{ opacity: 0, y: 20 }}
// animate={{ opacity: 1, y: 0 }}
// className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
// >
// <div className="flex items-center gap-2 mb-4">
//   <PawPrint className="w-5 h-5 text-pink-600" />
//   <h3 className="text-xl font-semibold">{t("adoptForm.petInformation")}</h3>
// </div>

// <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//   <div className="space-y-2">
//     <label className="block text-sm font-medium text-gray-700">{t("adoptForm.currentPetCount")}</label>
//     <input
//       type="number"
//       name="currentPetCount"
//       onChange={hdlChange}
//       placeholder={t("adoptForm.numberOfPets")}
//       className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//     />
//     {formatError.currentPetCount && (
//       <p className="text-red-500 text-sm">{formatError.currentPetCount}</p>
//     )}
//   </div>

//   <div className="space-y-2">
//     <label className="block text-sm font-medium text-gray-700">{t("adoptForm.currentPetDetail")}</label>
//     <input
//       type="text"
//       name="currentPetDetails"
//       onChange={hdlChange}
//       placeholder={t("adoptForm.petDetail")}
//       className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//     />
//     {formatError.currentPetDetails && (
//       <p className="text-red-500 text-sm">{formatError.currentPetDetails}</p>
//     )}
//   </div>
// </div>
// </motion.div>

// {/* Delivery Preference */}
// <motion.div
// initial={{ opacity: 0, y: 20 }}
// animate={{ opacity: 1, y: 0 }}
// className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
// >
// <div className="flex items-center gap-2 mb-4">
//   <Truck className="w-5 h-5 text-pink-600" />
//   <h3 className="text-xl font-semibold">{t("adoptForm.deliveryChecklist")}</h3>
// </div>

// <div className="flex gap-6">
//   <label className="flex items-center gap-2 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors">
//     <input
//       type="radio"
//       name="deliveryType"
//       value="PICK_UP"
//       onChange={hdlChange}
//       className="w-4 h-4 text-pink-600 focus:ring-pink-500"
//     />
//     <span>{t("adoptForm.canPickup")}</span>
//   </label>

//   <label className="flex items-center gap-2 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors">
//     <input
//       type="radio"
//       name="deliveryType"
//       value="REQUIRE_DELIVERY"
//       onChange={hdlChange}
//       className="w-4 h-4 text-pink-600 focus:ring-pink-500"
//     />
//     <span>{t("adoptForm.requestForDelivery")}</span>
//   </label>
// </div>
// </motion.div>

// {/* Image Upload */}
// <motion.div
// initial={{ opacity: 0, y: 20 }}
// animate={{ opacity: 1, y: 0 }}
// className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
// >
// <div className="flex items-center gap-2 mb-4">
//   <Camera className="w-5 h-5 text-pink-600" />
//   <h3 className="text-xl font-semibold">{t("adoptForm.uploadImages")}</h3>
// </div>

// <div className="space-y-4">
//   <Button
//     onClick={hdlAddClick}
//     className="group relative overflow-hidden bg-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
//   >
//     <Upload className="w-5 h-5 mr-2" />
//     {t("adoptForm.addPicture")}
//   </Button>

//   <input
//     type="file"
//     accept="image/*"
//     ref={fileInput}
//     multiple
//     className="hidden"
//     onChange={hdlFileChange}
//   />

//   {files.length > 0 && (
//     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//       {files.map((file, index) => (
//         <div key={index} className="relative group">
//           <img
//             src={URL.createObjectURL(file)}
//             alt={`Upload ${index + 1}`}
//             className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
//           />
//           <button
//             onClick={(e) => hdlDeleteFile(index, e)}
//             className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//       ))}
//     </div>
//   )}
// </div>
// </motion.div>

// {/* Adoption Reason */}
// <motion.div
// initial={{ opacity: 0, y: 20 }}
// animate={{ opacity: 1, y: 0 }}
// className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
// >
// <div className="flex items-center gap-2 mb-4">
//   <MessageCircle className="w-5 h-5 text-pink-600" />
//   <h3 className="text-xl font-semibold">{t("adoptForm.adoptionReason")}</h3>
// </div>

// <div className="space-y-2">
//   <textarea
//     name="why"
//     onChange={hdlChange}
//     className="w-full h-[300px] px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
//   />
// </div>
// </motion.div>

// <DialogFooter>
// <Button
//   type="submit"
//   onClick={hdlSubmit}
//   className="group relative overflow-hidden bg-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
// >
//   <span className="relative z-10 flex items-center justify-center gap-3">
//     <Heart className="w-5 h-5" />
//     <span>{t("adoptForm.submitApplication")}</span>
//   </span>
//   <span className="absolute inset-0 z-0 bg-gradient-to-r from-pink-600 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
// </Button>
// </DialogFooter>
// </form>

// )
// }


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Users, Phone, Home, Building2, PawPrint, Truck, Camera, Heart, X, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import usePetStore from "@/src/stores/PetStore";

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
    canWalkDog: z.boolean()
  }),
  currentPetCount: z.string(),
  currentPetDetails: z.string(),
  deliveryType: z.enum(["PICK_UP", "REQUIRE_DELIVERY"]),
  why: z.string().min(10, "Please provide more details")
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

export function AdoptFormContent({ t, user, files, fileInput, hdlAddClick, hdlFileChange, hdlDeleteFile, hdlSubmit }) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...usePetStore(state => state.adoptFormData),
      firstname: user.firstname || '',
      lastname: user.lastname || ''
    }
  });

  const updateAdoptFormData = usePetStore(state => state.updateAdoptFormData);

  const onSubmit = (data) => {
    updateAdoptFormData(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    files.forEach(file => formData.append('files', file));
    hdlSubmit(formData);
  };

  const inputClass = "w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <FormSection icon={<Users className="w-5 h-5 text-pink-600" />} title={t("adoptForm.personalInformation")}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input {...register("firstname")} placeholder={t("adoptForm.firstName")} className={inputClass} />
            {errors.firstname && <span className="text-red-500 text-sm">{errors.firstname.message}</span>}
          </div>
          <div>
            <input {...register("lastname")} placeholder={t("adoptForm.lastName")} className={inputClass} />
            {errors.lastname && <span className="text-red-500 text-sm">{errors.lastname.message}</span>}
          </div>
        </div>
      </FormSection>

      <FormSection icon={<Phone className="w-5 h-5 text-pink-600" />} title={t("adoptForm.contactInformation")}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input {...register("dateOfBirth")} type="date" className={inputClass} />
          <input {...register("phone")} placeholder={t("adoptForm.phoneNo")} className={inputClass} />
          <input {...register("socialContact")} placeholder={t("adoptForm.lineContact")} className={inputClass} />
          <p className="px-4 py-2 bg-gray-100 rounded-lg">{user.email}</p>
        </div>
      </FormSection>

      <FormSection icon={<Building2 className="w-5 h-5 text-pink-600" />} title={t("adoptForm.livingSituation")}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register("address")} placeholder={t("adoptForm.address")} className={inputClass} />
          <input {...register("career")} placeholder={t("adoptForm.career")} className={inputClass} />
          <input {...register("workPlace")} placeholder={t("adoptForm.workPlace")} className={inputClass} />
          <input {...register("workTime")} placeholder={t("adoptForm.workingTime")} className={inputClass} />
          <input {...register("dayOff")} placeholder={t("adoptForm.dayOff")} className={inputClass} />
          <input {...register("salary")} type="number" placeholder={t("adoptForm.salary")} className={inputClass} />
          <input {...register("familyMemberCount")} type="number" placeholder={t("adoptForm.familyMember")} className={inputClass} />
        </div>
      </FormSection>

      <FormSection icon={<Home className="w-5 h-5 text-pink-600" />} title={t("adoptForm.homeEnvironment")}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("adoptForm.homeDuringDay")}</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input {...register("familyAlwaysHome")} type="radio" value="true" />
                <span>{t("adoptForm.yes")}</span>
              </label>
              <label className="flex items-center gap-2">
                <input {...register("familyAlwaysHome")} type="radio" value="false" />
                <span>{t("adoptForm.no")}</span>
              </label>
            </div>
          </div>
          
          <input {...register("aloneHours")} type="number" placeholder={t("adoptForm.aloneHours")} className={inputClass} />
          
          <select {...register("housingType")} className={inputClass}>
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
                  className="w-4 h-4 text-pink-600"
                />
                <span>{t(`adoptForm.${check}`)}</span>
              </label>
            ))}
          </div>
        </div>
      </FormSection>

      <FormSection icon={<PawPrint className="w-5 h-5 text-pink-600" />} title={t("adoptForm.petInformation")}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register("currentPetCount")} type="number" placeholder={t("adoptForm.currentPetCount")} className={inputClass} />
          <input {...register("currentPetDetails")} placeholder={t("adoptForm.currentPetDetail")} className={inputClass} />
        </div>
      </FormSection>

      <FormSection icon={<Truck className="w-5 h-5 text-pink-600" />} title={t("adoptForm.deliveryChecklist")}>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input {...register("deliveryType")} type="radio" value="PICK_UP" />
            <span>{t("adoptForm.canPickup")}</span>
          </label>
          <label className="flex items-center gap-2">
            <input {...register("deliveryType")} type="radio" value="REQUIRE_DELIVERY" />
            <span>{t("adoptForm.requestForDelivery")}</span>
          </label>
        </div>
      </FormSection>

      <FormSection icon={<Camera className="w-5 h-5 text-pink-600" />} title={t("adoptForm.uploadImages")}>
        <div className="space-y-4">
          <Button onClick={hdlAddClick} type="button" className="bg-pink-600 text-white">
            <Camera className="w-5 h-5 mr-2" />
            {t("adoptForm.addPicture")}
          </Button>
          <input ref={fileInput} type="file" multiple onChange={hdlFileChange} className="hidden" accept="image/*" />
          
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

      <FormSection icon={<MessageCircle className="w-5 h-5 text-pink-600" />} title={t("adoptForm.adoptionReason")}>
        <textarea
          {...register("why")}
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
