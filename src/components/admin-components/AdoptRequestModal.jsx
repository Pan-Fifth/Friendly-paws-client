import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useAuthStore from '@/src/stores/AuthStore';
import { getRequestScore } from '@/src/apis/AdminReportApi';
import { Button } from '@/components/ui/button';
import {editAdoptRequest} from "../../apis/AdminReportApi"

const InfoModal = ({ isOpen, onClose, data ,requestId}) => {
  if (!data) return null;
  const token = useAuthStore(state => state.token)
  useEffect(() => {
    setDetail('')
    setScore('')
  }, [])
  const [detail, setDetail] = useState('')
  const [score, setScore] = useState('')
  const [load, setLoad] = useState(false)
  const [select, setSelect] = useState("")
  const hdlScore = async () => {
    try {
      setLoad(true)
      const resp = await getRequestScore(token, requestId)
      console.log(resp)
      setLoad(false)
      setDetail(resp?.data?.message?.shortDetail)
      setScore(resp?.data?.message?.score)

    } catch (err) {
      console.error('Error fetching score:', err)
    }
  }

  const hdlChange = (e)=>{
    setSelect(e.target.value)
  }
  const hdlSubmit = async()=>{
    try {
      const resp = await editAdoptRequest(token,{select},requestId)
    } catch (error) {
      console.log(error)
    }finally{
      onClose()
    }
   
  }

  const renderBooleanValue = (value) => (
    <span className={value ? "text-green-600" : "text-red-600"}>
      {value ? "มี" : "ไม่มี"}
    </span>
  );

  const renderSection = (title, content) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="pl-4">{content}</div>
    </div>
  );
console.log(requestId)
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">ข้อมูลโดยละเอียด</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            
          </button>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* ข้อมูลผู้ใช้ */}
          {data.user && renderSection("ข้อมูลผู้ใช้",
            <div className="space-y-2">
              <p><span className="font-medium">ชื่อ-นามสกุล:</span> {data.user.firstname} {data.user.lastname}</p>
              <p><span className="font-medium">อีเมล:</span> {data.user.email}</p>
              <p><span className="font-medium">เบอร์โทรศัพท์:</span> {data.user.phone}</p>
            </div>
          )}

          {/* ข้อมูลสัตว์เลี้ยง */}
          {data.pet && renderSection("ข้อมูลสัตว์เลี้ยง",
            <div className="space-y-2">
              <p><span className="font-medium">ชื่อ:</span> {data.pet.name_th}</p>
              {data.pet.image?.[0]?.url && (
                <img
                  src={data.pet.image[0].url}
                  alt="รูปสัตว์เลี้ยง"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>
          )}

          {/* ข้อมูลการทำงาน */}
          {renderSection("ข้อมูลการทำงาน",
            <div className="space-y-2">
              <p><span className="font-medium">อาชีพ:</span> {renderBooleanValue(data.career)}</p>
              <p><span className="font-medium">เวลาทำงาน:</span> {data.workTime}</p>
              <p><span className="font-medium">สถานที่ทำงาน:</span> {data.workPlace}</p>
              <p><span className="font-medium">วันหยุด:</span> {data.dayOff}</p>
              <p><span className="font-medium">เงินเดือน:</span> {data.salary}</p>
            </div>
          )}

          {/* ข้อมูลที่อยู่อาศัย */}
          {renderSection("ข้อมูลที่อยู่อาศัย",
            <div className="space-y-2">
              <p><span className="font-medium">ที่อยู่:</span> {data.address}</p>
              <p><span className="font-medium">ประเภทที่อยู่อาศัย:</span> {data.housingType}</p>
              <p><span className="font-medium">สวน:</span> {renderBooleanValue(data.hasGarden)}</p>
              <p><span className="font-medium">รั้ว:</span> {renderBooleanValue(data.hasFence)}</p>
              <p><span className="font-medium">สามารถพาสุนัขเดินเล่นได้:</span> {renderBooleanValue(data.canWalkDog)}</p>
            </div>
          )}

          {/* ข้อมูลครอบครัว */}
          {renderSection("ข้อมูลครอบครัว",
            <div className="space-y-2">
              <p><span className="font-medium">จำนวนสมาชิกในครอบครัว:</span> {data.familyMemberCount} คน</p>
              <p><span className="font-medium">มีคนอยู่บ้านตลอด:</span> {renderBooleanValue(data.familyAlwaysHome)}</p>
              <p><span className="font-medium">ชั่วโมงที่ไม่มีคนอยู่บ้าน:</span> {data.aloneHours} ชั่วโมง</p>
            </div>
          )}

          {/* ข้อมูลเพิ่มเติม */}
          {renderSection("ข้อมูลเพิ่มเติม",
            <div className="space-y-2">
              <p><span className="font-medium">Line Id:</span> {data.socialContact}</p>
              <p><span className="font-medium">วิธีการจัดส่ง:</span> {data.deliveryType}</p>
            </div>
          )}

          
        </div>
        {/* รูปภาพบ้าน */}
        {data.HomeImages?.length > 0 && renderSection("รูปภาพบ้าน",
            <div className="w-full flex flex-col items-center ">
              {data.HomeImages.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`รูปบ้าน ${index + 1}`}
                  className="w-full object-cover rounded-lg"
                />
              ))}
            </div>
          )}
          {load && <p className=' self-center'>loading.......</p>}
          <Button onClick={hdlScore}>ประเมินเบื้องต้นด้วย Ai</Button>
          {score && <div className='flex-1'>
                <p><strong>คะแนน:</strong> {score} /100</p>
                <div>
                    <strong>รายละเอียด:</strong>
                    <p>{detail}</p>
                </div>
            </div>}
            <label className="text-lg font-semibold mb-2">เลือกสถานะ</label>
            <select className="border p-2 rounded w-full"  name="status" required defaultValue={""} onChange={hdlChange} >
                <option disabled value={""}>เลือก</option>
                <option value={"REJECT"}>ปฏิเสธ</option>
                <option value={"INTERVIEW"}>นัดสัมภาษณ์</option>
                <option value={"ADOPTED"}>รับรองการเลี้ยงดู</option>
            </select>
            <div className='flex gap-3'>
            <Button className="flex-1" onClick={hdlSubmit}>ตกลง</Button>
            <Button className="flex-1" onClick={onClose} >ยกเลิก</Button>
            </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;