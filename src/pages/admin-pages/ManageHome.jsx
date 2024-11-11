import React, { useState, useEffect } from "react";
import axiosInstance from "@/src/utils/axiosInstance";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";

export const ManageHome = () => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sectionNames = [
    "คอนเทนต์รูปพื้นหลัง 1",
    "คอนเทนต์รูปพื้นหลัง 2",
    "คอนเทนต์ชื่อเพจ",
    "คอนเทนต์หัวข้อการต้อนรับ",
    "รายละเอียดคอนเทนต์ของต้อนรับ",
    "คอนเทนต์การ์ด 1",
    "รายละเอียดคอนเทนต์การ์ด 1",
    "คอนเทนต์การ์ด 2",
    "รายละเอียดคอนเทนต์การ์ด 2",
    "คอนเทนต์การ์ด 3",
    "รายละเอียดคอนเทนต์การ์ด 3",
    "คอนเทนต์หัวข้อการรับเลี้ยง",
    "Adoption Process Description",
    "คอนเทนต์หัวข้อการบริจาค",
    "รายละเอียดคอนเทนต์การบริจาค",
    "View More Button",
    "ปุ่มการบริจาค"
  ];

  const [images, setImages] = useState({
    image1: null, // Hero section image
    image2: null, // Care Advice image
    image3: null, // Veterinary Help image
    image4: null  // Tips image
  });

  const imageLabels = {
    image1: "รูปภาพหลัก",
    image2: "รูปภาพคอนเทนต์การ์ด 1",
    image3: "รูปภาพคอนเทนต์การ์ด 2",
    image4: "รูปภาพคอนเทนต์การ์ด 3"
  };

  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null
  });

  const [textContent, setTextContent] = useState({
    content_en: Array(17).fill(""),
    content_th: Array(17).fill("")
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axiosInstance.get("/admin/home-content");
      const data = response.data[0];
      setContent(data);

      setTextContent({
        content_en: data.content_en.split("|"),
        content_th: data.content_th.split("|")
      });

      setImagePreviews({
        image1: data.image1,
        image2: data.image2,
        image3: data.image3,
        image4: data.image4
      });
    } catch (error) {
      toast.error("ไม่สามารถดึงข้อมูลได้");
    }
  };

  const handleImageChange = (e, imageField) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("รูปภาพควรมีขนาดน้อยกว่า 5MB");
        return;
      }
      setImages({
        ...images,
        [imageField]: file
      });

      const previewUrl = URL.createObjectURL(file);
      setImagePreviews({
        ...imagePreviews,
        [imageField]: previewUrl
      });
    }
  };

  const handleTextChange = (language, index, value) => {
    setTextContent((prev) => ({
      ...prev,
      [language]: prev[language].map((text, i) => (i === index ? value : text))
    }));
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append("content_en", textContent.content_en.join("|"));
      formData.append("content_th", textContent.content_th.join("|"));

      Object.entries(images).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await axiosInstance.put(`/admin/home-content/${content.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success("อัพเดทคอนเทนต์หน้าหลัก เรียบร้อยแล้ว");
      fetchContent();
    } catch (error) {
      toast.error("ไม่สามารถอัพเดทได้");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const isTextContentValid = textContent.content_en.every((text) => text.trim() !== "") &&
      textContent.content_th.every((text) => text.trim() !== "");

    if (!isTextContentValid) {
      toast.error("กรุณากรอกข้อมูลทุกช่องในคอนเทนต์ภาษาไทยและภาษาอังกฤษ");
      return false;
    }

    return true;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">จัดการแก้ไข หน้าหลัก</h1>

      <div className="space-y-8">
        {/* Image Management */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">รูปภาพ</h2>
          <div className="grid grid-cols-2 gap-6">
            {Object.keys(images).map((imageField) => (
              <div key={imageField} className="space-y-3 bg-white p-4 rounded-lg shadow">
                <label className="block font-medium text-lg">{imageLabels[imageField]}</label>
                <div className="relative">
                  <img
                    src={imagePreviews[imageField] || content?.[imageField]}
                    alt={imageField}
                    className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(e, imageField)}
                    accept="image/*"
                    className="mt-2 w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Management */}
        <div className="grid grid-cols-2 gap-8">
          {/* English Content */}
          <div className="space-y-4 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">คอนเทนต์ ภาษาอังกฤษ</h2>
            {textContent.content_en.map((text, index) => (
              <div key={`en-${index}`} className="space-y-2">
                <label className="block font-medium text-gray-700">{sectionNames[index]}</label>
                {text.length > 50 ? (
                  <Textarea
                    value={text}
                    maxLength={120}
                    onChange={(e) => handleTextChange("content_en", index, e.target.value)}
                    className="w-full min-h-[100px] p-2 border rounded-md"
                  />
                ) : (
                  <input
                    type="text"
                    value={text}
                    maxLength={80}
                    onChange={(e) => handleTextChange("content_en", index, e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Thai Content */}
          <div className="space-y-4 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">คอนเทนต์ ภาษาไทย</h2>
            {textContent.content_th.map((text, index) => (
              <div key={`th-${index}`} className="space-y-2">
                <label className="block font-medium text-gray-700">{sectionNames[index]}</label>
                {text.length > 50 ? (
                  <Textarea
                    value={text}
                    maxLength={120}
                    onChange={(e) => handleTextChange("content_th", index, e.target.value)}
                    className="w-full min-h-[100px] p-2 border rounded-md"
                  />
                ) : (
                  <input
                    type="text"
                    value={text}
                    maxLength={80}
                    onChange={(e) => handleTextChange("content_th", index, e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Button
          className="w-full py-6 text-lg font-semibold bg-pink-600 hover:bg-pink-700 text-white"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลงทั้งหมด"}
        </Button>
      </div>
    </div>
  );
};
