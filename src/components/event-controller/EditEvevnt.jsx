import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


export default function EditEvent() {
    const [formData, setFormData] = useState({
        title_th: '',
        location: '',
        description_th: '',
        date_start: null,
        date_end: null,
        image: null
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleDateChange = (name, date) => {
        setFormData((prev) => ({ ...prev, [name]: date }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFormData((prev) => ({ ...prev, image: file }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submitting Event Data:", formData)
        // เพิ่มโค้ดส่งข้อมูลไป backend ตรงนี้เว้ย
    }



    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-md rounded-md">
            <div>
                <Label htmlFor="title_th">ชื่อกิจกรรมภาษาไทย</Label>
                <Input
                    type="text"
                    name="title_th"
                    value={formData.title_th}
                    onChange={handleInputChange}
                    placeholder="กรอกชื่อ Event"
                />
            </div>
            <div>
                <Label htmlFor="title_th">ชื่อกิจกรรมภาษาอังกฤษ</Label>
                <Input
                    type="text"
                    name="title_th"
                    value={formData.title_th}
                    onChange={handleInputChange}
                    placeholder="กรอกชื่อ Event"
                />
            </div>
            <div>
                <Label htmlFor="title_th">สถานที่จัดกิจกรรม</Label>
                <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="กรอก สถานที่จัดกิจกรรม"
                />
            </div>
            <div>
                <Label htmlFor="description_th">รายละเอียดกิจกรรมภาษาไทย</Label>
                <Textarea
                    name="description_th"
                    value={formData.description_th}
                    onChange={handleInputChange}
                    placeholder="กรอกรายละเอียด Event"
                />
            </div>
            <div>
                <Label htmlFor="description_th">รายละเอียดกิจกรรมภาษาอังกฤษ</Label>
                <Textarea
                    name="description_th"
                    value={formData.description_th}
                    onChange={handleInputChange}
                    placeholder="กรอกรายละเอียด Event"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="date_start">วันที่เริ่มกิจรรม</Label>
                    <Input
                        type="date"
                        value={formData.date_start}
                        onChange={(e) => handleDateChange('date_start', e.target.value)}
                        placeholderText="เลือกวันที่เริ่ม"
                    />
                </div>
                <div>
                    <Label htmlFor="date_end">วันที่สิ้นสุด</Label>
                    <Input
                        type="date"
                        value={formData.date_end}
                        onChange={(e) => handleDateChange('date_end', e.target.value)}
                        placeholderText="เลือกวันที่สิ้นสุด"
                    />
                </div>

            </div>
            <div>
                <Label htmlFor="image">อัปโหลดรูปหน้าปก</Label>
                <Input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                />
            </div>
            <div>
                <Label htmlFor="image">อัปโหลดรูป</Label>
                <Input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                />
            </div>
            <Button type="submit" className="w-full mt-4">บันทึกข้อมูล</Button>
        </form>
    )
}
