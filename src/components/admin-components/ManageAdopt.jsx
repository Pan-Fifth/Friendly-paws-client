import React, { useEffect, useState } from 'react'
import useAdoptStore from '@/src/stores/AdoptStore'
import useAuthStore from '@/src/stores/AuthStore'
import { useNavigate } from 'react-router-dom'
import AdminAdoptCard from '../adopt/AdminAdoptCard'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
export default function ManageAdopt() {
    const actionGetAllAdoptRequest = useAdoptStore(state => state.actionGetAllAdoptRequest)
    const allAdoptRequest = useAdoptStore(state => state.allAdoptRequest)
    const token = useAuthStore(state => state.token)
    const navigate = useNavigate()
    const [page, setPage] = useState(1);
    useEffect(() => {
        actionGetAllAdoptRequest(token, page)
    }, [])
    console.log(allAdoptRequest)
    if (!token) {
        navigate("/login")
    }
    console.log(allAdoptRequest.length)

    const hdlPageChange = (n) => {
        try {
            if (page + n < 1) {
                return;
            }
            if (n > 0 && allAdoptRequest.length < 6) {
                return;
            }
            actionGetAllAdoptRequest(token, page + n);
            setPage((prev) => prev + n);
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } catch (err) {
            return;
        }
    };
    return (
        <div>
            {/* Card */}
            {allAdoptRequest.length === 0 
            ?<p>ไม่มีข้อมูลสำหรับการขอรับเลี้ยง....</p>
            :allAdoptRequest?.map((el, index) => (<AdminAdoptCard
                key={index}
                requestId={el.id}
                img={el.pet.image[0].url}
                name={el.user.firstname}
                email={el.user.email}
                phone={el.user.phone}
                petName={el.pet.name_th}
                page={page}
            />))
            }
            

            {/* button */}
            <div className="mt-10">
                <div className="flex justify-center items-center gap-2">
                    <Button
                        onClick={() => hdlPageChange(-1)}
                        className="border text-xl"
                    >
                        previous
                    </Button>
                    <p className="text-2xl">Page {page}</p>
                    <Button
                        onClick={() => hdlPageChange(+1)}
                        className="border text-xl"
                    >
                        next
                    </Button>
                </div>
            </div>
        </div>
    )
}
