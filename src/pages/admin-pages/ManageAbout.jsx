import React, { useState, useEffect } from "react";
import axiosInstance from "@/src/utils/axiosInstance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const ManageAbout = () => {
  const [content, setContent] = useState(null);
  const [images, setImages] = useState({ image: null });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [contentFields, setContentFields] = useState({
    en: ['', '', '', ''],
    th: ['', '', '', '']
  });
  const [textContent, setTextContent] = useState({
    video_url: "",
    header_en: "",
    header_th: "",
    description_en: "",
    description_th: "",
    help_title_en: "",
    help_title_th: "",
    help_content_en: "",
    help_content_th: "",
  });

  const contentLabels = {
    en: ['Mission Statement', 'Vision', 'Values', 'Our Impact'],
    th: ['พันธกิจ', 'วิสัยทัศน์', 'ค่านิยม', 'ผลกระทบของเรา']
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axiosInstance.get("/admin/about-content");
      const data = response.data[0];
      setContent(data);

      const contentEn = data.content_en ? data.content_en.split('|') : ['', '', '', ''];
      const contentTh = data.content_th ? data.content_th.split('|') : ['', '', '', ''];
      
      setContentFields({
        en: contentEn,
        th: contentTh
      });

      setTextContent({
        video_url: data.video_url || "",
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
      toast.error("Failed to fetch content");
      console.error("Error fetching content:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      setImages({ image: file });
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleTextChange = (field, value) => {
    setTextContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContentFieldChange = (lang, index, value) => {
    setContentFields(prev => {
      const newFields = {...prev};
      newFields[lang][index] = value;
      return newFields;
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      // Add all text content
      Object.keys(textContent).forEach((key) => {
        if (textContent[key]) {
          formData.append(key, textContent[key]);
        }
      });

      // Add joined content fields
      formData.append('content_en', contentFields.en.join('|'));
      formData.append('content_th', contentFields.th.join('|'));

      if (images.image) {
        formData.append("image", images.image);
      }
      // ตรวจสอบข้อมูลที่ส่งไปยัง API(ถ้ามี)
      const response = await axiosInstance.put(
        `/admin/about-content/${content.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await fetchContent();
      toast.success("Content updated successfully");
      setImages({ image: null });
    } catch (error) {
      toast.error("Failed to update content");
      console.error("Error updating:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    fetchContent();
    setImages({ image: null });
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage About Page Content</h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Reset Changes</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset all changes to the last saved state.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleReset}>Reset</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Common Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="video_url">Video URL</Label>
            <Input
              id="video_url"
              value={textContent.video_url}
              onChange={(e) => handleTextChange("video_url", e.target.value)}
              placeholder="Enter video URL"
            />
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
  <Label htmlFor="image">Image</Label>
  <div className="flex flex-col gap-4">
    <div className="flex gap-4 items-center">
      {/* Current saved image */}
      {content?.image && (
        <div className="relative group">
          <img
            src={content.image}
            alt="Current About Image"
            className="w-24 h-24 object-cover rounded-lg border"
          />
          <div className="absolute inset-0 bg-black/50 text-white text-xs flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            Current Image
          </div>
        </div>
      )}
      {/* New image preview */}
      {imagePreview && (
        <div className="relative group">
          <img
            src={imagePreview}
            alt="New Image Preview"
            className="w-24 h-24 object-cover rounded-lg border"
          />
          <div className="absolute inset-0 bg-black/50 text-white text-xs flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            New Image
          </div>
        </div>
      )}
    </div>
    <Input
      id="image"
      type="file"
      onChange={handleImageChange}
      accept="image/*"
    />
  </div>
</div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* English Column */}
        <Card>
          <CardHeader>
            <CardTitle>English Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="header_en">Header</Label>
              <Textarea
                id="header_en"
                value={textContent.header_en}
                onChange={(e) => handleTextChange("header_en", e.target.value)}
                className="min-h-[100px] resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_en">Description</Label>
              <Textarea
                id="description_en"
                value={textContent.description_en}
                onChange={(e) => handleTextChange("description_en", e.target.value)}
                className="min-h-[100px] resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="help_title_en">Help Title</Label>
              <Input
                id="help_title_en"
                value={textContent.help_title_en}
                onChange={(e) => handleTextChange("help_title_en", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="help_content_en">Help Content</Label>
              <Textarea
                id="help_content_en"
                value={textContent.help_content_en}
                onChange={(e) => handleTextChange("help_content_en", e.target.value)}
                className="min-h-[100px] resize-y"
              />
            </div>
            <Separator />
            <div className="space-y-4">
              <Label>Additional Content Fields</Label>
              {contentLabels.en.map((label, index) => (
                <div key={`en-${index}`} className="space-y-2">
                  <Label htmlFor={`content-en-${index}`}>{label}</Label>
                  <Input
                    id={`content-en-${index}`}
                    value={contentFields.en[index]}
                    onChange={(e) => handleContentFieldChange('en', index, e.target.value)}
                    placeholder={`Enter ${label}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Thai Column */}
        <Card>
          <CardHeader>
            <CardTitle>Thai Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="header_th">Header</Label>
              <Textarea
                id="header_th"
                value={textContent.header_th}
                onChange={(e) => handleTextChange("header_th", e.target.value)}
                className="min-h-[100px] resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_th">Description</Label>
              <Textarea
                id="description_th"
                value={textContent.description_th}
                onChange={(e) => handleTextChange("description_th", e.target.value)}
                className="min-h-[100px] resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="help_title_th">Help Title</Label>
              <Input
                id="help_title_th"
                value={textContent.help_title_th}
                onChange={(e) => handleTextChange("help_title_th", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="help_content_th">Help Content</Label>
              <Textarea
                id="help_content_th"
                value={textContent.help_content_th}
                onChange={(e) => handleTextChange("help_content_th", e.target.value)}
                className="min-h-[100px] resize-y"
              />
            </div>
            <Separator />
            <div className="space-y-4">
              <Label>Additional Content Fields</Label>
              {contentLabels.th.map((label, index) => (
                <div key={`th-${index}`} className="space-y-2">
                  <Label htmlFor={`content-th-${index}`}>{label}</Label>
                  <Input
                    id={`content-th-${index}`}
                    value={contentFields.th[index]}
                    onChange={(e) => handleContentFieldChange('th', index, e.target.value)}
                    placeholder={`Enter ${label}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update Content"}
      </Button>
    </div>
  );
};

export default ManageAbout;
