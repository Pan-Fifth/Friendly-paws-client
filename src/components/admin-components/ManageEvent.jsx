import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { format } from "date-fns"
import { useNavigate } from 'react-router-dom'
import useEventStore from '@/src/stores/EventStore';
import useAuthStore from '@/src/stores/AuthStore';
import { Button } from "@/components/ui/button"
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

export default function ManageEvent() {
    const navigate = useNavigate()
    const events = useEventStore((state) => state.events);
    const getEvents = useEventStore((state) => state.getEvents);
    const updateEvent = useEventStore((state) => state.updateEvent);
    const token = useAuthStore((state) => state.token);
    const deleteEvent = useEventStore((state) => state.deleteEvent);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({
        title_en: '',
        title_th: '',
        description_en: '',
        description_th: '',
        date_start: '',
        date_end: '',
        location: ''
    });

    useEffect(() => {
        getEvents()
    }, []);

    if (events.length === 0) {
        return <div>Loading...</div>;
    }

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: " ยืนยันที่จะลบข้อมูลใช่หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ใช่ ,ฉันจะลบ!",
            cancelButtonText: "ไม่ ,ฉันจะยกเลิก!"
        });
        if (result.isConfirmed) {
            try {
                await deleteEvent(token, id);
                getEvents();
            } catch (error) {
                console.error("Error deleting event:", error);
            }
        }
    };

    const openEditModal = (event) => {
        setSelectedEvent(event);
        setFormData({
            title_en: event.title_en,
            title_th: event.title_th,
            description_en: event.description_en,
            description_th: event.description_th,
            date_start: event.date_start,
            date_end: event.date_end,
            location: event.location
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedEvent(null);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateEvent = async () => {
        if (selectedEvent) {
            await updateEvent(token, selectedEvent.id, formData);
            getEvents();
            closeEditModal();
        }
    };

    return (
        <div>
            <div className='items-center flex justify-center'>

                <Button
                    onClick={() => navigate("/admin/create-event")}
                    className="w-1/5 items-center  my-5 group relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl active:scale-95">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        <span className="text-lg">สร้างกิจกรรม</span>
                    </span>
                    <span className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
                </Button>
                {/* <Button variant="secondary" onClick={() => navigate("/admin/create-event")}>สร้างกิจกรรม</Button> */}
            </div>

            <Table>
                <TableCaption>ADMIN</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ครั้งที่</TableHead>
                        <TableHead>วันที่จัดกิจกรรม</TableHead>
                        <TableHead>ชื่อกิจกรรม</TableHead>
                        <TableHead>สถานะ</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    {events?.allEvent?.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                                {format(new Date(item.date_start), 'dd/MM/yyyy HH:mm')}
                            </TableCell>
                            <TableCell>{item.title_th}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell className="text-right gap-1 flex justify-end items-end w-2/3 ">
                                <Button onClick={() => openEditModal(item)}>แก้ไข</Button>
                                <Button variant="destructive" onClick={() => handleDelete(item.id)}>ลบ</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {isEditModalOpen && (
                <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-xl font-semibold mb-4">แก้ไขกิจกรรม</h2>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">ชื่อกิจกรรมภาษาไทย</label>
                                <input
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    name="title_th"
                                    value={formData.title_th}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">ชื่อกิจกรรมภาษาอังกฤษ</label>
                                <input
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    name="title_en"
                                    value={formData.title_en}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">สถานที่จัดกิจกรรม</label>
                                <input
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">รายละเอียดกิจกรรมภาษาไทย</label>
                                <textarea
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    name="description_th"
                                    value={formData.description_th}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">รายละเอียดกิจกรรมภาษาอังกฤษ</label>
                                <textarea
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    name="description_en"
                                    value={formData.description_en}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">วันที่เริ่มกิจรรม</label>
                                <input
                                    type="date"
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    name="date_start"
                                    value={formData.date_start}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">วันที่สิ้นสุด</label>
                                <input
                                    type="date"
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    name="date_end"
                                    value={formData.date_end}
                                    onChange={handleInputChange}
                                />
                            </div>

                        </div>

                        <div className="flex justify-end space-x-3 mt-4">
                            <Button onClick={handleUpdateEvent} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">บันทึก</Button>
                            <Button onClick={closeEditModal} variant="secondary" className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400">ยกเลิก</Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
