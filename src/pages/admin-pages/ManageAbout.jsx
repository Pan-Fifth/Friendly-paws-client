import React, { useState, useEffect } from "react";
import axiosInstance from "@/src/utils/axiosInstance";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export const ManageAbout = () => {
  const [content, setContent] = useState(null);
  const [images, setImages] = useState({ image: null });

  // กำหนด state สำหรับ textContent โดยไม่ใช้ array
  const [textContent, setTextContent] = useState({
    header_en: "",
    header_th: "",
    description_en: "",
    description_th: "",
    help_title_en: "",
    help_title_th: "",
    help_content_en: "",
    help_content_th: "",
  });

  const sectionNames = [
    "Header (EN)",
    "Header (TH)",
    "Description (EN)",
    "Description (TH)",
    "Help Title (EN)",
    "Help Title (TH)",
    "Help Content (EN)",
    "Help Content (TH)",
  ];

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axiosInstance.get("/admin/about-content");
      const data = response.data[0];
      console.log("Fetched content:", data); // ตรวจสอบข้อมูลที่ได้รับจาก API
      setContent(data);

      // แยกเนื้อหาออกเป็นฟิลด์ต่างๆ
      setTextContent({
        header_en: data.header_en || "",
        header_th: data.header_th || "",
        description_en: data.description_en || "",
        description_th: data.description_th || "",
        help_title_en: data.help_title_en || "",
        help_title_th: data.help_title_th || "",
        help_content_en: data.help_content_en || "",
        help_content_th: data.help_content_th || "",
      });
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const handleImageChange = (e) => {
    setImages({ image: e.target.files[0] });
    console.log("Selected image:", e.target.files[0]); // ตรวจสอบไฟล์ที่เลือก
  };

  const handleTextChange = (field, value) => {
    setTextContent((prev) => {
      const updatedContent = { ...prev, [field]: value };
      console.log("Updated textContent:", updatedContent); // ตรวจสอบการอัพเดตข้อความ
      return updatedContent;
    });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // ส่งค่า textContent ตรงไปยังฟิลด์ต่างๆ
      formData.append("header_en", textContent.header_en);
      formData.append("header_th", textContent.header_th);
      formData.append("description_en", textContent.description_en);
      formData.append("description_th", textContent.description_th);
      formData.append("help_title_en", textContent.help_title_en);
      formData.append("help_title_th", textContent.help_title_th);
      formData.append("help_content_en", textContent.help_content_en);
      formData.append("help_content_th", textContent.help_content_th);

      // เช็คว่าเลือกภาพใหม่หรือไม่
      if (images.image) {
        formData.append("image", images.image);
      }

      const response = await axiosInstance.put(
        `/admin/about-content/${content.id}`,
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
      toast.error("Error updating content");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage About Page Content</h1>

      <div className="space-y-8">
        {/* Image Management */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Image</h2>
          <div className="flex items-center gap-4">
            {content?.image && (
              <img
                src={content?.image}
                alt="About Image"
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

        {/* English Content */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">English Content</h2>
          <div className="flex flex-col gap-2">
            <label>{sectionNames[0]}</label>
            <input
              type="text"
              value={textContent.header_en}
              onChange={(e) => handleTextChange("header_en", e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>{sectionNames[2]}</label>
            <input
              type="text"
              value={textContent.description_en}
              onChange={(e) => handleTextChange("description_en", e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>{sectionNames[4]}</label>
            <input
              type="text"
              value={textContent.help_title_en}
              onChange={(e) => handleTextChange("help_title_en", e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>{sectionNames[6]}</label>
            <input
              type="text"
              value={textContent.help_content_en}
              onChange={(e) => handleTextChange("help_content_en", e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        </div>

        {/* Thai Content */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Thai Content</h2>
          <div className="flex flex-col gap-2">
            <label>{sectionNames[1]}</label>
            <input
              type="text"
              value={textContent.header_th}
              onChange={(e) => handleTextChange("header_th", e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>{sectionNames[3]}</label>
            <input
              type="text"
              value={textContent.description_th}
              onChange={(e) => handleTextChange("description_th", e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>{sectionNames[5]}</label>
            <input
              type="text"
              value={textContent.help_title_th}
              onChange={(e) => handleTextChange("help_title_th", e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>{sectionNames[7]}</label>
            <input
              type="text"
              value={textContent.help_content_th}
              onChange={(e) => handleTextChange("help_content_th", e.target.value)}
              className="border p-2 rounded"
            />
          </div>
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

export default ManageAbout;
