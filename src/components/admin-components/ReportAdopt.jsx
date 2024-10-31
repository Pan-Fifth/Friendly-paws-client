import React, { useState } from 'react'
import { getAdoptData, getAllAdoptData } from '../../apis/AdminReportApi';

export default function ReportAdopt() {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [adopts, setAdopts] = useState([])

    const handleFetchReport = async () => {
        try {
            const response = await getAdoptData(startDate, endDate);
            setAdopts(response.data);
            console.log("Report data:", response.data);
        } catch (error) {
            console.error("Error fetching report data:", error);
        }
    };
    const handleFetchAllReport = async () => {
        try {
            const response = await getAllAdoptData();
            setAdopts(response.data);

        } catch (error) {
            console.error("Error fetching report data:", error);
        }
    };
    console.log(adopts, "adopttt")

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
                    ข้อมูลรับเลี้ยงสัตว์ทั้งหมดของปีนี้
                </button>
            </div>

            {adopts && adopts.length > 0 ? (
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ไอดี</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ชื่อผู้รับเลี้ยง</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ชื่อสัตว์เลี้ยง</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">สถานะ</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ข้อมูลติดต่อ</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">อนุมัติวันที่</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">อนุมัติโดย</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">รายละเอียดเพิ่มเติม</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">วันที่ส่งข้อมูล</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {adopts.map(adopt => (
                                <tr key={adopt.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">{adopt.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{adopt.user.firstname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{adopt.pet.name_th}</td>
                                    <td className={`px-6 py-4 ${adopt.status === 'PENDING'
                                        ? 'text-yellow-500'
                                        : adopt.status === 'FOSTERED'
                                            ? 'text-red-500'
                                            : adopt.status === 'ACTIVE'
                                                ? 'text-green-500'
                                                : adopt.status === 'ADOPTED'
                                                    ? 'text-blue-500'
                                                    : ''
                                        }`}>{adopt.status}</td>
                                    <td className="px-6 py-4">{adopt.socialContact}</td>
                                    <td className="px-6 py-4">{adopt?.approved_at}</td>
                                    <td className="px-6 py-4">{adopt?.approvedByAdmin?.firstname}</td>
                                    <td className="px-6 py-4">{adopt.note}</td>
                                    <td className="px-6 py-4">{new Date(adopt.created_at).toLocaleDateString()}</td>

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
