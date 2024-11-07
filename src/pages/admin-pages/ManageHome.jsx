import React, { useState, useEffect } from "react";
import axiosInstance from "@/src/utils/axiosInstance";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export const ManageHome = () => {
  const [content, setContent] = useState(null);
  const sectionNames = [
    "หัวข้อหลัก",
    "หัวข้อย่อย",
    "รูปภาพหลัก1",
    "รูปภาพคอนเทนต์1",
    "รูปภาพหลัก2",
    "รูปภาพคอนเทนต์2",
    "รูปภาพหลัก3",
    "รูปภาพคอนเทนต์3",
  ];
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  // Split content into editable fields
  const [textContent, setTextContent] = useState({
    content_en: ["", "", "", "", "", "", "", ""],
    content_th: ["", "", "", "", "", "", "", ""],
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axiosInstance.get("/admin/home-content");
      const data = response.data[0];
      setContent(data);

      // Split the content strings into arrays
      setTextContent({
        content_en: data.content_en.split("|"),
        content_th: data.content_th.split("|"),
      });
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const handleImageChange = (e, imageField) => {
    setImages({
      ...images,
      [imageField]: e.target.files[0],
    });
  };

  const handleTextChange = (language, index, value) => {
    setTextContent((prev) => ({
      ...prev,
      [language]: prev[language].map((text, i) => (i === index ? value : text)),
    }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // Always include content fields even if they haven't changed
      formData.append('content_en', textContent.content_en.join('|'));
      formData.append('content_th', textContent.content_th.join('|'));

      // Only append images if they were selected
      if (images.image1) {
        formData.append('image1', images.image1);
      }
      if (images.image2) {
        formData.append('image2', images.image2);
      }
      if (images.image3) {
        formData.append('image3', images.image3);
      }

      // Log formData to verify content
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axiosInstance.put(`/admin/home-content/${content.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Update successful:', response.data);
      fetchContent(); // Refresh content after update
      toast.success("Update successful");
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
    }
  };


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">แก้ไข คอนเทนต์หน้าหลัก</h1>

      <div className="space-y-8">
        {/* Image Management */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">รูปภาพ</h2>
          {["image1", "image2", "image3"].map((imageField) => (
            <div key={imageField} className="flex items-center gap-4">
              <img
                src={content?.[imageField]}
                alt={imageField}
                className="w-24 h-24 object-cover rounded"
              />
              <input
                type="file"
                onChange={(e) => handleImageChange(e, imageField)}
                accept="image/*"
              />
            </div>
          ))}
        </div>

        {/* English Content */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">คอนเทนต์ภาษาอังกฤษ</h2>
          {textContent.content_en.map((text, index) => (
            <div key={`en-${index}`} className="flex flex-col gap-2">
              <label>{sectionNames[index]}</label>
              <input
                type="text"
                value={text}
                onChange={(e) => handleTextChange("content_en", index, e.target.value)}
                className="border p-2 rounded"
              />
            </div>
          ))}
        </div>

        {/* Thai Content */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">คอนเทนต์ภาษาไทย</h2>
          {textContent.content_th.map((text, index) => (
            <div key={`th-${index}`} className="flex flex-col gap-2">
              <label>{sectionNames[index]}</label>
              <input
                type="text"
                value={text}
                onChange={(e) => handleTextChange("content_th", index, e.target.value)}
                className="border p-2 rounded"
              />
            </div>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90"
        >
          อัพเดท
        </Button>
      </div>
    </div>
  );
};
