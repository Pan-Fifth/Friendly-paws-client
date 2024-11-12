import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAuthStore from "@/src/stores/AuthStore";
import usePetStore from "@/src/stores/PetStore";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import validateAdoptForm from "../../utils/AdoptFormValidate";
import Lottie from "lottie-react";
import AnimationDownload from "../../assets/AnimationDownload.json";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart
} from "lucide-react";
import { AdoptFormContent } from "./AdoptFormContent";

export function DialogAdopt({ petId }) {
  const { t } = useTranslation();
  const [formatError, setFormatError] = useState({});
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state) => state.token);
  const fileInput = useRef(null);
  const [files, setFiles] = useState([]);
  const [input, setInput] = useState(usePetStore((state) => state.adoptFormData));
  const [houseCheck, setHouseCheck] = useState(
    usePetStore((state) => state.adoptFormData.houseCheck)
  );
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user.user);
  const actionCreateAdoptRequest = usePetStore((state) => state.actionCreateAdoptRequest);
  const { updateAdoptFormData } = usePetStore();
  const hdlChange = (e) => {
    const { name, value } = e.target;
    updateAdoptFormData({ [name]: value });
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const hdlClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
    }
  };
  const hdlAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInput.current) {
      fileInput.current.click(); // Programmatically click the hidden input
    }
  };

  const hdlFileChange = (e) => {
    console.log("e files", e.target.files);
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  //Delete file
  const hdlDeleteFile = (indexToDelete, e) => {
    e.preventDefault();
    e.stopPropagation();
    const newFiles = files.filter((_, index) => index !== indexToDelete);
    setFiles(newFiles);
  };

  // In AdoptForm.jsx
  const handleFormSubmit = async (formData) => {
    console.log(input)
    setLoading(true);
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });

      if (files.length > 5) {
        toast.error(t("adoptFormtoast.maxFiles"));
        return;
      }
      if (files.length < 3) {
        toast.error(t("adoptFormtoast.minFiles"));
        return;
      }

      // Add user and pet IDs
      formData.append("userId", user.id);
      formData.append("petId", petId);

      // Add files
      files.forEach((file) => {
        formData.append("files", file);
      });

      const submit = await actionCreateAdoptRequest(formData, token);
      toast.success(t("adoptFormtoast.successMessage"));
      usePetStore.getState().clearAdoptFormData();
      setOpen(false);
    } catch (err) {
      setOpen(true);
      console.log(err, "err here");
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={hdlClick}
          className="group relative overflow-hidden bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl active:scale-95"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            <Heart className="w-5 h-5 animate-pulse" />
            <span>{t("adoptForm.adoptMe")}</span>
          </span>
          <span className="absolute inset-0 z-0 bg-gradient-to-r from-pink-600 to-pink-500 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
        </Button>
      </DialogTrigger>

      {loading ? (
        <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <Lottie animationData={AnimationDownload} loop={true} className="w-64 h-64" />
            <p className="text-xl font-semibold mt-4">Processing your application...</p>
          </div>
        </div>
      ) : (
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#ffeed8] via-white to-pink-50">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-pink-600 flex items-center gap-2">
              <Heart className="w-6 h-6" />
              {t("adoptForm.adoptionFormTitle")}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {t("adoptForm.adoptionFormDescription")}
            </DialogDescription>
          </DialogHeader>

          <AdoptFormContent
            t={t}
            user={user}
            hdlChange={hdlChange}
            formatError={formatError}
            houseCheck={houseCheck}
            setHouseCheck={setHouseCheck}
            files={files}
            fileInput={fileInput}
            hdlAddClick={hdlAddClick}
            hdlFileChange={hdlFileChange}
            hdlDeleteFile={hdlDeleteFile}
            handleFormSubmit={handleFormSubmit}
          />
        </DialogContent>
      )}
    </Dialog>
  );
}
