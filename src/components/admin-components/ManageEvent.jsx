import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import useEventStore from '@/src/stores/EventStore';

export default function ManageEvent() {

       // เรียกใช้งาน get events จาก store
    const events = useEventStore((state) => state.events);
    const getEvents = useEventStore((state) => state.getEvents);
    console.log("ไหนขอดู events", events)
    useEffect(() => {
        getEvents()
    }, []);
    if (events.length === 0) {
        return <div>Loading...</div>;
    }

    //--------------------------------------------------

    //Click หา id event

    const hdlOnClick = (id) => {
        console.log("Editing item with ID:", id)
    }

    //--------------------------------------------------

    const navigate = useNavigate()
    const hdlCreateEvent = (e) =>{
        navigate("/admin/create-event")
    }
   

    return (
        <div>
            
            <Button variant="secondary" onClick={hdlCreateEvent}>สร้างกิจกรรม</Button>
           
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ครั้งที่</TableHead>
                        <TableHead>วันที่จัดกิจกรรม</TableHead>
                        <TableHead>ชื่ออีกิจกรมม</TableHead>
                        <TableHead>สถานะ</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    {events?.allEvent?.map((item,index) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{index+1}</TableCell>
                            <TableCell>{item.date_start}</TableCell>
                            <TableCell>{item.title_th}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell className="text-right gap-1 flex justify-end items-end w-2/3 ">
                                <Button onClick={() => hdlOnClick(item.id)}>แก้ไข</Button>
                                <Button variant="destructive" onClick={() => hdlOnClick(item.id)}>ลบ</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
        </div>

    )
}



