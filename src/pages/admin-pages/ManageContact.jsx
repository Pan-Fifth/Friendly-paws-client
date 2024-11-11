import React, { useState, useEffect } from "react";
import axiosInstance from "@/src/utils/axiosInstance";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const ManageContact = () => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contactContent, setContactContent] = useState({
    header_en: "",
    header_th: "",
    content_en: "",
    content_th: "",
    generalInfo_en: "",
    generalInfo_th: "",
    email: "",
    phone: "",
    openingTimes_en: "",
    openingTimes_th: "",
    address_en: "",
    address_th: "",
    latitude: "",
    longitude: ""
  });

  const sectionNames = [
    { label: "คอนเทนต์หัวข้อ ติดต่อเรา ภาษาอังกฤษ", field: "header_en" },
    { label: "คอนเทนต์หัวข้อ ติดต่อเรา ภาษาไทย", field: "header_th" },
    { label: "คอนเทนต์หลัก ภาษาอังกฤษ", field: "content_en" },
    { label: "คอนเทนต์หลัก ภาษาอังกฤษ", field: "content_th" },
    { label: "ข้อมูลทั่วไป ภาษาอังกฤษ", field: "generalInfo_en" },
    { label: "ข้อมูลทั่วไป ภาษาไทย", field: "generalInfo_th" },
    { label: "อีเมล", field: "email" },
    { label: "เบอร์ติดต่อ", field: "phone" },
    { label: "เวลาเปิด-ปิดทำการ ภาษาอังกฤษ", field: "openingTimes_en" },
    { label: "เวลาเปิด-ปิดทำการ ภาษาไทย", field: "openingTimes_th" },
    { label: "ที่อยู่ ภาษาอังกฤษ", field: "address_en" },
    { label: "ที่อยู่ ภาษาไทย", field: "address_th" },
    { label: "ละติจูดที่อยู่", field: "latitude" },
    { label: "ลองจิจูดที่อยู่", field: "longitude" }
  ];

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axiosInstance.get("/admin/contact-info");
      const data = response.data[0];
      setContent(data);
      setContactContent({
        header_en: data.header_en || "",
        header_th: data.header_th || "",
        content_en: data.content_en || "",
        content_th: data.content_th || "",
        generalInfo_en: data.generalInfo_en || "",
        generalInfo_th: data.generalInfo_th || "",
        email: data.email || "",
        phone: data.phone || "",
        openingTimes_en: data.openingTimes_en || "",
        openingTimes_th: data.openingTimes_th || "",
        address_en: data.address_en || "",
        address_th: data.address_th || "",
        latitude: data.latitude || "",
        longitude: data.longitude || ""
      });
    } catch (error) {
      toast.error("ไม่สามารถดึงข้อมูลได้");
    }
  };

  const handleTextChange = (field, value) => {
    setContactContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!content) {
      toast.error("เนื้อหาไม่สามารถโหลดได้ กรุณาลองใหม่อีกครั้งในภายหลัง");
      return;
    }
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);

    try {
      await axiosInstance.put(
        `/admin/contact-info/${content.id}`,
        contactContent
      );

      fetchContent();
      toast.success("อัพเดทคอนเทนต์หน้าติดต่อเรา เรียบร้อยแล้ว");
    } catch (error) {
      toast.error("ไม่สามารถอัพเดทได้");

    }
    finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const isValid = Object.values(contactContent).every(value => value.trim() !== "");
    if (!isValid) {
      toast.error("กรุณากรอกข้อมูลให้ครบทุกช่อง");
    }
    return isValid;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">จัดการแก้ไข หน้าติดต่อเรา</h1>

      <div className="space-y-8">
        {/* Contact Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">ข้อมูลการติดต่อ</h2>
          {sectionNames.map(({ label, field }) => (
            <div key={field} className="flex flex-col gap-2">
              <label>{label}</label>
              {field.includes('content') ? (
                <textarea
                  value={contactContent[field] || ""}
                  onChange={(e) => handleTextChange(field, e.target.value)}
                  className="border p-2 rounded min-h-[100px]"
                />
              ) : (
                <input
                  type={field.includes('latitude') || field.includes('longitude') ? 'number' : 'text'}
                  value={contactContent[field] || ""}
                  onChange={(e) => handleTextChange(field, e.target.value)}
                  className="border p-2 rounded"
                  step={field.includes('latitude') || field.includes('longitude') ? 'any' : undefined}
                />
              )}
            </div>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลงทั้งหมด"}

        </Button>
      </div>
    </div>
  );
};

export default ManageContact;
