import React, { useState } from 'react'
import { getDonateData, getAllDonateData } from '@/src/apis/AdminReportApi';

export default function ReportDonation() {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [donates, setDonates] = useState([])

    const handleFetchReport = async () => {
        try {
            const response = await getDonateData(startDate, endDate);
            setDonates(response.data);
            console.log("Report data:", response.data);
        } catch (error) {
            console.error("Error fetching report data:", error);
        }
    };
    const handleFetchAllReport = async () => {
        try {
            const response = await getAllDonateData();
            setDonates(response.data);

        } catch (error) {
            console.error("Error fetching report data:", error);
        }
    };
    console.log(donates, "donates")

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
                    ข้อมูลระดมทุนทั้งหมดของปีนี้
                </button>
            </div>

            {donates && donates.length > 0 ? (
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ไอดี</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ชื่อผู้ระดมทุน</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ยอดระดมทุน</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">ขั้นตอนการชำระ</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">รหัสการทำธุรกรรม</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">บิล</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">สถานะ</th>
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">วันที่ส่งข้อมูล</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {donates.map(donate => (
                                <tr key={donate.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">{donate.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{donate.user.firstname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{donate.total}</td>
                                    <td className="px-6 py-4">{donate.payment_method}</td>
                                    <td className="px-6 py-4">{donate?.transaction_id}</td>
                                    <td className="px-6 py-4">{donate?.receipt_url}</td>
                                    <td className={`px-6 py-4 ${donate.status === 'PENDING'
                                        ? 'text-yellow-500'
                                        : donate.status === 'CANCEL'
                                            ? 'text-red-500'
                                            : donate.status === 'DONE'
                                                ? 'text-green-500'
                                                : ''
                                        }`}>{donate.status}</td>
                                    <td className="px-6 py-4">{new Date(donate.created_at).toLocaleDateString()}</td>

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
