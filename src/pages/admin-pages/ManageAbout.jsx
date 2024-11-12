import React, { useState, useEffect, useRef } from "react";
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
  const inputImg1 = useRef()
  const inputImg2 = useRef()
  const inputImg3 = useRef()
  const inputImg4 = useRef()
  const [content, setContent] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); ``
  const [imagePreview, setImagePreview] = useState([]);
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
    en: ['พันธกิจ', 'วิสัยทัศน์', 'ค่านิยม', 'ผลกระทบของเรา'],
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
      toast.error("ไม่สามารถดึงข้อมูลได้");

    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("รูปภาพควรมีขนาดน้อยกว่า 5MB");
        return;
      }
      setImages(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(prev => ({ ...prev, [e.target.name]: previewUrl }));
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
      const newFields = { ...prev };
      newFields[lang][index] = value;
      return newFields;
    });
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    if (!validateForm()) return;
    try {
      setIsLoading(true);
      const formData = new FormData();

      Object.keys(textContent).forEach((key) => {
        if (textContent[key]) {
          formData.append(key, textContent[key]);
        }
      });

      formData.append('content_en', contentFields.en.join('|'));
      formData.append('content_th', contentFields.th.join('|'));

      if(images.image1){
        formData.append("image1", images.image1)
      }
      if(images.image2){
        formData.append("image2", images.image2)
      }
      if(images.image3){
        formData.append("image3", images.image3)
      }
      if(images.image4){
        formData.append("image4", images.image4)
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
      const formDataObj = Object.fromEntries(formData.entries());
      console.log(formDataObj);
      await fetchContent();
      toast.success("อัพเดทคอนเทนต์หน้าเกี่ยวกับเรา เรียบร้อยแล้ว");
    } catch (error) {
      console.log(error)
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    fetchContent();
    setImages({ image: null });
    setImagePreview(null);

  };

  const validateForm = () => {

    const isTextContentValid = Object.values(textContent).every((value) => value.trim() !== "");

    const isContentFieldsValid = Object.values(contentFields).every((fields) =>
      fields.every((value) => value.trim() !== "")
    );

    if (!isTextContentValid) {
      toast.error("กรุณากรอกข้อมูลทุกช่องในคอนเทนต์หลักและคอนเทนต์หัวข้อสนับสนุน");
      return false;
    }

    if (!isContentFieldsValid) {
      toast.error("กรุณากรอกข้อมูลทุกช่องในคอนเทนต์เพิ่มเติม");
      return false;
    }

    return true;
  };

  if (!content) {
    return <p>Loading...</p>
  }

  console.log(content)
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">จัดการแก้ไข หน้าเกี่ยวกับเรา</h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">ล้างข้อมูล</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>คุณแน่ใจ ที่จะดำเนิกการต่อ หรือไม่? </AlertDialogTitle>
              <AlertDialogDescription>
                การดำเนินการนี้จะรีเซ็ตการเปลี่ยนแปลงทั้งหมดกลับไปสู่สถานะที่บันทึกล่าสุด
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
              <AlertDialogAction onClick={handleReset}>ตกลง</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>คอนเทนต์หลัก</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="video_url">URL วิดีโอ </Label>
            <Input
              id="video_url"
              value={textContent.video_url}
              onChange={(e) => handleTextChange("video_url", e.target.value)}
              placeholder="Enter video URL"
            />
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Label htmlFor="image">รูปภาพ คลิกที่รูปเพื่อเปลี่ยน</Label>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <img
                  src={imagePreview?.image1 || content?.image1}
                  onClick={() => inputImg1.current.click()}
                  className=" cursor-pointer"
                  style={{
                    width: '300px',
                    height: '300px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  }}
                />
                <img
                  src={imagePreview?.image2 || content?.image2}
                  onClick={() => inputImg2.current.click()}
                  className=" cursor-pointer"
                  style={{
                    width: '300px',
                    height: '300px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  }}
                />
                <img
                  src={imagePreview?.image3 || content?.image3}
                  onClick={() => inputImg3.current.click()}
                  className=" cursor-pointer"
                  style={{
                    width: '300px',
                    height: '300px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  }}
                />
                <img
                  src={imagePreview?.image4 || content?.image4}
                  onClick={() => inputImg4.current.click()}
                  className=" cursor-pointer"
                  style={{
                    width: '300px',
                    height: '300px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  }}
                />
                <input name="image1" type="file" accept="image/*" className="hidden" ref={inputImg1} onChange={handleImageChange} />
                <input name="image2" type="file" accept="image/*" className="hidden" ref={inputImg2} onChange={handleImageChange} />
                <input name="image3" type="file" accept="image/*" className="hidden" ref={inputImg3} onChange={handleImageChange} />
                <input name="image4" type="file" accept="image/*" className="hidden" ref={inputImg4} onChange={handleImageChange} />


              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* English Column */}
        <Card>
          <CardHeader>
            <CardTitle>คอนเทนต์ ภาษาอังกฤษ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="header_en">คอนเทนต์หลัก</Label>
              <Textarea
                id="header_en"
                value={textContent.header_en}
                onChange={(e) => handleTextChange("header_en", e.target.value)}
                className="min-h-[100px] resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_en">รายละเอียดคอนเทนต์หลัก</Label>
              <Textarea
                id="description_en"
                value={textContent.description_en}
                onChange={(e) => handleTextChange("description_en", e.target.value)}
                className="min-h-[100px] resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="help_title_en">คอนเทนต์หัวข้อ สนับสนุน</Label>
              <Input
                id="help_title_en"
                value={textContent.help_title_en}
                onChange={(e) => handleTextChange("help_title_en", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="help_content_en">รายละเอียดคอนเทนต์หัวข้อ สนับสนุน</Label>
              <Textarea
                id="help_content_en"
                value={textContent.help_content_en}
                onChange={(e) => handleTextChange("help_content_en", e.target.value)}
                className="min-h-[100px] resize-y"
              />
            </div>
            <Separator />
            <div className="space-y-4">
              <Label>คอนเทนต์เพิ่มเติมที่อยู่ในคอนเทนต์หลัก</Label>
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
            <CardTitle>คอนเทนต์ ภาษาไทย</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="header_th">คอนเทนต์หลัก</Label>
              <Textarea
                id="header_th"
                value={textContent.header_th}
                onChange={(e) => handleTextChange("header_th", e.target.value)}
                className="min-h-[100px] resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_th">รายละเอียดคอนเทนต์หลัก</Label>
              <Textarea
                id="description_th"
                value={textContent.description_th}
                onChange={(e) => handleTextChange("description_th", e.target.value)}
                className="min-h-[100px] resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="help_title_th">คอนเทนต์หัวข้อ สนับสนุน</Label>
              <Input
                id="help_title_th"
                value={textContent.help_title_th}
                onChange={(e) => handleTextChange("help_title_th", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="help_content_th">ายละเอียดคอนเทนต์หัวข้อ สนับสนุน</Label>
              <Textarea
                id="help_content_th"
                value={textContent.help_content_th}
                onChange={(e) => handleTextChange("help_content_th", e.target.value)}
                className="min-h-[100px] resize-y"
              />
            </div>
            <Separator />
            <div className="space-y-4">
              <Label>คอนเทนต์เพิ่มเติมที่อยู่ในคอนเทนต์หลัก</Label>
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
        {isLoading ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลงทั้งหมด"}
      </Button>
    </div>
  );
};

export default ManageAbout;
