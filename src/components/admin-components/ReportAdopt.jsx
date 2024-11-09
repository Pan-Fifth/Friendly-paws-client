import React, { useState } from 'react'
import { getAdoptData, getAllAdoptData } from '../../apis/AdminReportApi';
import { getExportAdoptExcel } from '../../apis/AdminExportExcelApi';
import Swal from 'sweetalert2';


export default function ReportAdopt() {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [adopts, setAdopts] = useState([])
    const [selectedStatus, setSelectedStatus] = useState('');

    const handleFetchReport = async () => {
        try {
            const response = await getAdoptData(startDate, endDate);
            filterAdopts(response.data);
        } catch (error) {
            console.error("Error fetching report data:", error);
        }
    };
    const handleFetchAllReport = async () => {
        try {
            const response = await getAllAdoptData();
            filterAdopts(response.data);

        } catch (error) {
            console.error("Error fetching report data:", error);
        }
    };

    const filterAdopts = (data) => {
        const filteredData = selectedStatus
            ? data.filter(adopt => adopt.status === selectedStatus)
            : data;
        setAdopts(filteredData);
    };
    const handleExportExcel = async () => {
        if (adopts.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'กรุณาเลือกข้อมูล',
                text: 'โปรดเลือกข้อมูลก่อนทำการบันทึก',
                confirmButtonText: 'ตกลง'
            });
            return;
        }

        try {
            const response = await getExportAdoptExcel(adopts)

            // สร้างลิงก์สำหรับดาวน์โหลดไฟล์ Excel
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'adopts-report.xlsx');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error exporting to Excel:', error);
        }
    };
    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        filterAdopts(adopts);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">รายงานการรับเลี้ยงสัตว์</h1>
            <div className="flex justify-between gap-4 mb-6">
                <div className='flex gap-6'>
                    <p className='flex justify-center items-center'>วันที่สร้างข้อมูล : </p>

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
                        <option value="REJECT">REJECT</option>
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="UNAVAILABLE">UNAVAILABLE</option>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="ADOPTED">ADOPTED</option>
                        <option value="FOSTERED">FOSTERED</option>
                    </select>
                    <button
                        onClick={handleFetchReport}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        ดูข้อมูล
                    </button>
                </div>
                <div className='flex gap-6'>
                    <button
                        onClick={handleFetchAllReport}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        ข้อมูลรับเลี้ยงสัตว์ทั้งหมดของปีนี้
                    </button>
                    <button
                        onClick={handleExportExcel}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        บันทึกข้อมูล
                    </button>
                </div>
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
                                <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase">เบอร์โทร</th>
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
                                    <td className="px-6 py-4 whitespace-nowrap">{adopt.user?.firstname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{adopt.pet?.name_th}</td>
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
                                    <td className="px-6 py-4">{adopt.user?.phone}</td>
                                    <td className="px-6 py-4">{adopt.socialContact}</td>
                                    <td className="px-6 py-4">{adopt?.approved_at}</td>
                                    <td className="px-6 py-4">{adopt?.approvedByAdmin?.firstname}</td>
                                    <td className="px-6 py-4">{adopt.why}</td>
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
