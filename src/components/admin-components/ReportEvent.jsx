import React, { useState } from 'react'
import { getEventData, getAllEventData } from '@/src/apis/AdminReportApi';

export default function ReportEvent() {

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [events, setEvents] = useState([])

    const handleFetchReport = async () => {
        try {
            const response = await getEventData(startDate, endDate);
            setEvents(response.data);
            console.log("Report data:", response.data);
        } catch (error) {
            console.error("Error fetching report data:", error);
        }
    };
    const handleFetchAllReport = async () => {
        try {
            const response = await getAllEventData();
            setEvents(response.data);

        } catch (error) {
            console.error("Error fetching report data:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex gap-4 mb-6">
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
                <button
                    onClick={handleFetchReport}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    รายงาน
                </button>
                <button
                    onClick={handleFetchAllReport}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    กิจกรรมทั้งหมดของปีนี้
                </button>
            </div>

            {events && events.length > 0 ? (
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">อีเวนท์ไอดี</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ชื่อกิจกรรม</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">รายละเอียด</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">วันที่เริ่มงาน</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">วันที่จบงาน</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">สถานที่จัดงาน</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {events.map(event => (
                                <tr key={event.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">{event.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{event.title_th}</td>
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
                )}
        </div>
    )
}

