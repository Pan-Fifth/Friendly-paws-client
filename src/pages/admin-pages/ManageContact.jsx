import React, { useState, useEffect } from "react";
import axiosInstance from "@/src/utils/axiosInstance";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const ManageContact = () => {
  const [content, setContent] = useState(null);
  const [images, setImages] = useState({ image: null });

  // กำหนด state สำหรับ contact text content
  const [contactContent, setContactContent] = useState({
    header_en: "",
    header_th: "",
    content_en: "",
    content_th: "",
    generalInfo_en: "",
    generalInfo_th: "",
    adoptions_en: "",
    adoptions_th: "",
    phone: "",
    openingTimes_en: "",
    openingTimes_th: "",
    address_en: "",
    address_th: "",
  });

  const sectionNames = [
    "Header EN",
    "Header TH",
    "Content EN",
    "Content TH",
    "General Info EN",
    "General Info TH",
    "Adoptions EN",
    "Adoptions TH",
    "Phone",
    "Opening Times EN",
    "Opening Times TH",
    "Address EN",
    "Address TH",
  ];

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axiosInstance.get("/admin/contact-info");
      const data = response.data[0];
      console.log("Fetched content:", data); // ตรวจสอบข้อมูลที่ได้รับจาก API

      setContent(data);

      // ตรวจสอบค่าของฟิลด์
      console.log("General Info EN:", data.generalInfo_en);
      console.log("Opening Times EN:", data.openingTimes_en);

      // แยกเนื้อหาของ contact ออกเป็นฟิลด์ต่างๆ
      setContactContent({
        header_en: data.header_en || "",
        header_th: data.header_th || "",
        content_en: data.content_en || "",
        content_th: data.content_th || "",
        generalInfo_en: data.generalInfo_en || "",
        generalInfo_th: data.generalInfo_th || "",
        adoptions_en: data.adoptions_en || "",
        adoptions_th: data.adoptions_th || "",
        phone: data.phone || "",
        openingTimes_en: data.openingTimes_en || "",
        openingTimes_th: data.openingTimes_th || "",
        address_en: data.address_en || "",
        address_th: data.address_th || "",
      });
    } catch (error) {
      console.error("Error fetching content:", error.response?.data || error.message);
    }
  };

  const handleImageChange = (e) => {
    setImages({ image: e.target.files[0] });
    console.log("Selected image:", e.target.files[0]); // ตรวจสอบไฟล์ที่เลือก
  };

  const handleTextChange = (field, value) => {
    setContactContent((prev) => {
      const updatedContent = { ...prev, [field]: value };
      console.log("Updated contactContent:", updatedContent); // ตรวจสอบการอัพเดตข้อความ
      return updatedContent;
    });
  };

  const handleSubmit = async () => {
    if (!content) {
      toast.error("Content not loaded. Please try again later.");
      return;
    }

    try {
      const formData = new FormData();

      // ส่งค่า contactContent ไปยังฟิลด์ต่างๆ
      Object.keys(contactContent).forEach((field) => {
        formData.append(field, contactContent[field]);
      });

      // เช็คว่าเลือกภาพใหม่หรือไม่
      if (images.image) {
        formData.append("image", images.image);
      }

      const response = await axiosInstance.put(
        `/admin/contact-info/${content.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update successful:", response.data); // ตรวจสอบการตอบกลับจาก API
      fetchContent(); // Refresh content after update
      toast.success("Update successful");
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      console.log("Status Code:", error.response?.status); // แสดงสถานะของ error
      toast.error("Error updating content");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Contact Page Content</h1>

      <div className="space-y-8">
        {/* Image Management */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Image</h2>
          <div className="flex items-center gap-4">
            {content?.image && (
              <img
                src={content?.image}
                alt="Contact Image"
                className="w-24 h-24 object-cover rounded"
              />
            )}
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Contact Information</h2>
          {sectionNames.map((section, index) => {
            const field = section.toLowerCase().replace(" ", "_");
            return (
              <div key={index} className="flex flex-col gap-2">
                <label>{section}</label>
                <input
                  type="text"
                  value={contactContent[field] || ""}
                  onChange={(e) => handleTextChange(field, e.target.value)}
                  className="border p-2 rounded"
                />
              </div>
            );
          })}
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90"
        >
          Update Content
        </Button>
      </div>
    </div>
  );
};

export default ManageContact;
