import React, { useEffect, useState } from 'react'
import useAdoptStore from '@/src/stores/AdoptStore'
import useAuthStore from '@/src/stores/AuthStore'
import { useNavigate } from 'react-router-dom'
import AdminAdoptCard from '../adopt/AdminAdoptCard'
import { Button } from '@/components/ui/button'


export default function ManageAdopt() {
    const actionGetAllAdoptRequest = useAdoptStore(state => state.actionGetAllAdoptRequest)
    const allAdoptRequest = useAdoptStore(state => state.allAdoptRequest)
    const token = useAuthStore(state => state.token)
    const navigate = useNavigate()
    const [page, setPage] = useState(1);
    const [filter,setFilter] =useState("ALL")
    useEffect(() => {
        actionGetAllAdoptRequest(token, page,filter)
    }, [filter])
    console.log(allAdoptRequest)
    if (!token) {
        navigate("/login")
    }
    console.log(allAdoptRequest?.length)

    const hdlPageChange = (n) => {
        try {
            if (page + n < 1) {
                return;
            }
            if (n > 0 && allAdoptRequest.length < 6) {
                return;
            }
            actionGetAllAdoptRequest(token, page + n,filter);
            setPage((prev) => prev + n);
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } catch (err) {
            return;
        }
    };

    const hdlChange = (e)=>{
        setFilter(e.target.value)
    }
    return (
        <div>
        <div className='flex gap-3 w-[600px]'>
        <label className="text-lg font-semibold p-auto flex-1 self-center text-center">เลือกสถานะ</label>
        <select className="p-2 rounded w-full border border-black flex-1"  name="filter" required defaultValue={""} onChange={hdlChange}>
                <option disabled value={""}>เลือก</option>
                <option value={"ALL"}>ทั้งหมด</option>
                <option value={"REJECT"}>ปฏิเสธ</option>
                <option value={"INTERVIEW"}>นัดสัมภาษณ์</option>
                <option value={"ADOPTED"}>รับรองการเลี้ยงดู</option>
        </select>
        </div>
        
            {/* Card */}
            {allAdoptRequest?.length === 0
                ? <p>ไม่มีข้อมูลสำหรับการขอรับเลี้ยง....</p>
                : allAdoptRequest?.map((el, index) => (<AdminAdoptCard
                    key={index}
                    requestId={el.id}
                    img={el.pet.image[0].url}
                    name={el.user.firstname}
                    email={el.user.email}
                    phone={el.user.phone}
                    petName={el.pet.name_th}
                    data={el}
                    page={page}
                />))
            }


            {/* button */}
            <div className="mt-10">
                <div className="flex justify-center items-center gap-2">
                    {page > 1 &&
                        <Button
                            onClick={() => hdlPageChange(-1)}
                            className="border text-xl"
                        >
                            ก่อนหน้า
                        </Button>
                    }
                    <p className="text-2xl">หน้า {page}</p>
                    {
                        allAdoptRequest?.length === 6 &&
                        <Button
                            onClick={() => hdlPageChange(+1)}
                            className="border text-xl"
                        >
                            ถัดไป
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}
