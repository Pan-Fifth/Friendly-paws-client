import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createEvent } from '@/src/apis/Event.Api'
import useAuthStore from '@/src/stores/AuthStore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import EventFormValidate from '@/src/utils/EventFormValidate'

export default function CreateEvent() {
    const [formatError, setFormatError] = useState({});
    const token = useAuthStore(state => state.token);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title_en: '',
        title_th: '',
        location: '',
        description_en: '',
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

    const handleFileChange = (file) => {
        setFormData((prev) => ({ ...prev, image: file }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormatError({});
        const error = EventFormValidate(formData)
        if (error) {
            return setFormatError(error)
        }
        setLoading(true);
        try {
            const body = new FormData()
            body.append("title_en", formData.title_en)
            body.append("title_th", formData.title_th)
            body.append("location", formData.location)
            body.append("description_en", formData.description_en)
            body.append("description_th", formData.description_th)
            body.append("date_start", formData.date_start)
            body.append("date_end", formData.date_end)
            body.append("status", formData.status)
            if (formData.image) body.append("image", formData.image)

            const response = await createEvent(token, body)
            console.log("สร้างกิจกรรมสำเร็จ:", response.data)
            setFormData({
                title_en: '',
                title_th: '',
                location: '',
                description_en: '',
                description_th: '',
                date_start: null,
                date_end: null,
                image: null
            })
            navigate('/admin/manage-event')
            toast.success("สร้างกิจกรรมสำเร็จ")
        } catch (error) {
            setLoading(false);
            console.error("ไม่สามารถสร้างได้ดูหน้า Create ที่ Client :", error)

        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-md rounded-md">
            <div>
                <Label htmlFor="title_th">ชื่อกิจกรรม</Label>
                <Input
                    type="text"
                    name="title_th"
                    value={formData.title_th}
                    onChange={handleInputChange}
                    placeholder="กรอกชื่อ Event"
                />
                {formatError.title_th && <p className="text-red-500 text-xs">{formatError.title_th}</p>}
            </div>
            <div>
                <Label htmlFor="title_en">ชื่อกิจกรรม (ภาษาอังกฤษ)</Label>
                <Input
                    type="text"
                    name="title_en"
                    value={formData.title_en}
                    onChange={handleInputChange}
                    placeholder="กรอกชื่อ Event"
                />
                {formatError.title_en && <p className="text-red-500 text-xs">{formatError.title_en}</p>}
            </div>

            <div>
                <Label htmlFor="location">สถานที่จัดกิจกรรม</Label>
                <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="กรอก สถานที่จัดกิจกรรม"
                />
                {formatError.location && <p className="text-red-500 text-xs">{formatError.location}</p>}
            </div>
            <div>
                <Label htmlFor="description_th">รายละเอียดกิจกรรม</Label>
                <Textarea
                    name="description_th"
                    value={formData.description_th}
                    onChange={handleInputChange}
                    placeholder="กรอกรายละเอียด Event"
                />
                {formatError.description_th && <p className="text-red-500 text-xs">{formatError.description_th}</p>}
            </div>
            <div>
                <Label htmlFor="description_en">รายละเอียดกิจกรรม (ภาษาอังกฤษ)</Label>
                <Textarea
                    name="description_en"
                    value={formData.description_en}
                    onChange={handleInputChange}
                    placeholder="กรอกรายละเอียด Event"
                />
                {formatError.description_en && <p className="text-red-500 text-xs">{formatError.description_en}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="date_start">วันที่เริ่ม</Label>
                    <Input
                        type="date"
                        name="date_start"
                        value={formData.date_start}
                        onChange={(e) => handleDateChange('date_start', e.target.value)}
                    />
                    {formatError.date_start && <p className="text-red-500 text-xs">{formatError.date_start}</p>}
                </div>
                <div>
                    <Label htmlFor="date_end">วันที่สิ้นสุด</Label>
                    <Input
                        type="date"
                        name="date_end"
                        value={formData.date_end}
                        onChange={(e) => handleDateChange('date_end', e.target.value)}
                    />
                    {formatError.date_end && <p className="text-red-500 text-xs">{formatError.date_end}</p>}
                </div>
            </div>
            <div>
                <Label htmlFor="image">อัปโหลดรูปหน้าปก</Label>
                <Input
                    type="file"
                    name="image"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                    accept="image/*"
                />
                {formatError.image && <p className="text-red-500 text-xs">{formatError.image}</p>}
            </div>
            <Button type="submit" className="w-full mt-4" disabled={loading} > {loading ? "กำลังโหลด..." : "สร้างกิจกรรม"}</Button>
        </form>
    )
}