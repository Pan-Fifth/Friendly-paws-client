import React, { useState, useEffect } from 'react'
import { getListUserEventData } from '@/src/apis/AdminReportApi';
import { getExportListEventExcel } from '../../apis/AdminExportExcelApi';


export default function ReportListUserEvent({ eventId }) {

    const [events, setEvents] = useState([])

    const handleListUser = async () => {
        try {
            const response = await getListUserEventData(eventId);
            setEvents(response.data);

        } catch (error) {
            console.error("Error fetching report data:", error);
        }
    };
    useEffect(() => {
        handleListUser();
    }, []);
    console.log(events, "eventsevents")
    const handleExportExcel = async () => {

        try {
            const response = await getExportListEventExcel(events)

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


    return (
        <div >

            <button
                onClick={handleExportExcel}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
                บันทึกข้อมูล
            </button>


            {
                events && events.length > 0 ? (
                    <div className="overflow-x-auto shadow-lg rounded-lg">
                        <table className="min-w-full bg-white mt-6">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ไอดี</th>
                                    <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ชื่อ </th>
                                    <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase"> นามสกุล</th>
                                    <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">เบอร์ติดต่อ</th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {events.map(event => (
                                    <tr key={event.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">{event.user.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap " >{event.user.firstname}</td>
                                        <td className="px-6 py-4 whitespace-nowrap " >{event.user.lastname}</td>
                                        <td className="px-6 py-4">{event.user.phone}</td>


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

        </div>
    )
}
