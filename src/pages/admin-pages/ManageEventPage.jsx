import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import axiosInstance from '@/src/utils/axiosInstance'
import { toast } from "react-toastify"

const ManageEventPage = () => {
  const [banner, setBanner] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState({
    image1: null,
    image2: null,
    image3: null
  })
  const [previews, setPreviews] = useState({
    image1: '',
    image2: '',
    image3: ''
  })

  const fetchBanner = async () => {
    try {
      const response = await axiosInstance.get('/admin/event-banner')
      setBanner(response.data)
      setPreviews({
        image1: response.data.image1,
        image2: response.data.image2,
        image3: response.data.image3
      })
    } catch (error) {
      toast.error("ไม่สามารถดึงข้อมูลได้");
    }
  }

  useEffect(() => {
    fetchBanner()
  }, [])

  const handleFileChange = (e, imageKey) => {
    const file = e.target.files[0]
    if (file) {
      setFiles(prev => ({ ...prev, [imageKey]: file }))
      setPreviews(prev => ({ ...prev, [imageKey]: URL.createObjectURL(file) }))
    }
  }

  const handleSubmit = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const formData = new FormData()
      Object.keys(files).forEach(key => {
        if (files[key]) {
          formData.append(key, files[key])
        } else if (banner[key]) {
          formData.append(key, banner[key])
        }
      })

      await axiosInstance.put(`/admin/event-banner/${banner.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      toast.success("อัพเดทแบนเนอร์หน้ากิจกรรม เรียบร้อยแล้ว")
      fetchBanner()
    } catch (error) {
      toast.error("ไม่สามารถอัพเดทได้")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">จัดการแก้ไขแบนเนอร์ หน้ากิจกรรม</h1>
      <div className=' my-2'>
      <pre className='text-red-500 text-sm'>หมายเหตุ: ควรมีขนาดรูปภาพแนวนอน 2048x853 px</pre>
      <a target='blank' href='https://bigimage.11zon.com/th/image-resize/' className='text-red-500 text-sm'>เพื่อปรับขนาดรูป กดที่นี่</a>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {[1, 2, 3].map(num => (
            <div key={num} className="space-y-4">
              <h2 className="text-xl font-semibold">รูปภาพแบนเนอร์  {num}</h2>
              <div className="flex items-center gap-4">
                {previews[`image${num}`] && (
                  <img
                    src={previews[`image${num}`]}
                    alt={`Banner ${num}`}
                    className="w-40 h-40 object-cover rounded"
                  />
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, `image${num}`)}
                  disabled={isLoading}
                />
              </div>
            </div>
          ))}
          <Button
            className="w-full mt-4"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลงทั้งหมด"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default ManageEventPage
