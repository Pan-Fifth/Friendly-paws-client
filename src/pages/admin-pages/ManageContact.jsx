import React, { useState, useEffect } from "react";
import axiosInstance from "@/src/utils/axiosInstance";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const ManageContact = () => {
  const [content, setContent] = useState(null);

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
    { label: "Header EN", field: "header_en" },
    { label: "Header TH", field: "header_th" },
    { label: "Content EN", field: "content_en" },
    { label: "Content TH", field: "content_th" },
    { label: "General Info EN", field: "generalInfo_en" },
    { label: "General Info TH", field: "generalInfo_th" },
    { label: "Email", field: "email" },
    { label: "Phone", field: "phone" },
    { label: "Opening Times EN", field: "openingTimes_en" },
    { label: "Opening Times TH", field: "openingTimes_th" },
    { label: "Address EN", field: "address_en" },
    { label: "Address TH", field: "address_th" },
    { label: "Latitude", field: "latitude" },
    { label: "Longitude", field: "longitude" }
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
      console.error("Error fetching content:", error.response?.data || error.message);
      toast.error("Failed to fetch content");
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
      toast.error("Content not loaded. Please try again later.");
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/admin/contact-info/${content.id}`,
        contactContent
      );

      console.log("Update successful:", response.data);
      fetchContent();
      toast.success("Content updated successfully");
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("Failed to update content");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Contact Page Content</h1>

      <div className="space-y-8">
        {/* Contact Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Contact Information</h2>
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
        >
          Update Content
        </Button>
      </div>
    </div>
  );
};

export default ManageContact;
