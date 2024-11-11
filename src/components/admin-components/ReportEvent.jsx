import React, { useState } from 'react'
import { getEventData, getAllEventData } from '@/src/apis/AdminReportApi';
import { getExportEventExcel } from '../../apis/AdminExportExcelApi';
import Swal from 'sweetalert2';
import ReportListUserEvent from './ReportListUserEvent';
import useAuthStore from '../../stores/AuthStore';


export default function ReportEvent() {

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [events, setEvents] = useState([])
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const token = useAuthStore((state) => state.token);

    const handleFetchReport = async () => {
        try {
            const response = await getEventData(token, startDate, endDate);
            filterEvents(response.data);
        } catch (error) {
            console.error("Error fetching report data:", error);
        }
    };
    const handleFetchAllReport = async () => {
        try {
            const response = await getAllEventData(token);
            filterEvents(response.data);

        } catch (error) {
            console.error("Error fetching report data:", error);
        }
    };

    const filterEvents = (data) => {
        const filteredData = selectedStatus
            ? data.filter(event => event.status === selectedStatus)
            : data;
        setEvents(filteredData);
    };
    const handleExportExcel = async () => {
        if (events.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'กรุณาเลือกข้อมูล',
                text: 'โปรดเลือกข้อมูลก่อนทำการบันทึก',
                confirmButtonText: 'ตกลง'
            });
            return;
        }

        try {
            const response = await getExportEventExcel(token, events)

            // สร้างลิงก์สำหรับดาวน์โหลดไฟล์ Excel
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'events-report.xlsx');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error exporting to Excel:', error);
        }
    };
    const handleEventClick = (id) => {
        setSelectedEventId(id);
    };
    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        filterEvents(events);
    };
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">รายงานกิจกรรม</h1>
            <div className="flex justify-between gap-4 mb-6">
                <div className='flex gap-6'>
                    <p className='flex justify-center items-center'>วันที่เริ่มกิจกรรม : </p>
                    <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        className="border px-4 py-2 rounded-lg"
                    >
                        <option value="">ทั้งหมด</option>
                        <option value="PENDING">PENDING</option>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="POSTPONED">POSTPONED</option>
                    </select>
                    <button
                        onClick={handleFetchReport}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        ดูข้อมูล
                    </button>
                </div>
                <div className=' flex gap-6'>
                    <button
                        onClick={handleFetchAllReport}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        กิจกรรมทั้งหมดของปีนี้
                    </button>
                    <button
                        onClick={handleExportExcel}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        บันทึกข้อมูล
                    </button>
                </div>
            </div>

            {
                events && events.length > 0 ? (
                    <div className="overflow-x-auto shadow-lg rounded-lg">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ไอดี</th>
                                    <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ชื่อกิจกรรม</th>
                                    <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">รายละเอียด</th>
                                    <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">วันที่เริ่มงาน</th>
                                    <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">วันที่จบงาน</th>
                                    <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">สถานที่จัดงาน</th>
                                    <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">สถานะ</th>
                                    <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">วันที่สร้าง</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {events.map(event => (
                                    <tr key={event.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">{event.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold cursor-pointer hover:text-blue-500 hover:underline " onClick={() => handleEventClick(event.id)}>{event.title_th}</td>
                                        <td className="px-6 py-4">{event.description_th}</td>
                                        <td className="px-6 py-4">{new Date(event.date_start).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">{new Date(event.date_end).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">{event.location}</td>
                                        <td className={`px-6 py-4 ${event.status === 'PENDING'
                                            ? 'text-yellow-500'
                                            : event.status === 'CANCELLED'
                                                ? 'text-red-500'
                                                : event.status === 'ACTIVE'
                                                    ? 'text-green-500'
                                                    : event.status === 'COMPLETED'
                                                        ? 'text-blue-500'
                                                        : ''
                                            }`}>{event.status}</td>
                                        <td className="px-6 py-4">{new Date(event.created_at).toLocaleDateString()}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
                    : (
                        <div className="bg-gray-800 h-96 mt-20 flex justify-center items-center">
                            <p className="text-gray-500">ไม่พบข้อมูล</p>
                        </div>
                    )
            }
            {selectedEventId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-2xl p-5 rounded-lg relative transform translate-y-6 mx-4 shadow-lg ">
                        <div className="flex justify-end items-center">
                            <button
                                onClick={() => setSelectedEventId(null)}
                                className=" bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition duration-200">
                                Close
                            </button>
                        </div>
                        <div className="mb-4">
                            <ReportListUserEvent eventId={selectedEventId} />
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}

