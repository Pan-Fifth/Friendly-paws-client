import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ManageDonate() {
    const [donations, setDonations] = useState([])
    const [pagination, setPagination] = useState({
        total: 0,
        pages: 0,
        currentPage: 1
    })
    const [filters, setFilters] = useState({
        startDate: format(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'yyyy-MM-dd'),
        endDate: format(new Date(), 'yyyy-MM-dd'),
        page: 1,
        limit: 20
    })

    const fetchDonations = async () => {
        try {
            const params = new URLSearchParams({
                ...filters,
                page: filters.page,
                limit: filters.limit
            })
            const response = await axios.get(`http://localhost:3000/admin/manage-donation?${params}`)
            setDonations(response.data.donations)
            setPagination(response.data.pagination)
        } catch (error) {
            console.error('Error fetching donations:', error)
        }
    }

    useEffect(() => {
        fetchDonations()
    }, [filters])

    const handleDateChange = (e) => {
        const { name, value } = e.target
        setFilters(prev => ({
            ...prev,
            [name]: value,
            page: 1
        }))
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.pages) {
            setFilters(prev => ({
                ...prev,
                page: newPage
            }))
        }
    }

    const handleStatusChange = async (donationId, newStatus) => {
        try {
            await axios.put(`http://localhost:3000/admin/manage-donation/${donationId}`, {
                status: newStatus
            })
            fetchDonations()
        } catch (error) {
            console.error('Error updating donation status:', error)
        }
    }

    const StatusSelector = ({ donation }) => (
        <Select
            defaultValue={donation.status}
            onValueChange={(value) => handleStatusChange(donation.id, value)}
        >
            <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="สถานะ" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="DONE">เสร็จสิ้น</SelectItem>
                <SelectItem value="PENDING">รอดำเนินการ</SelectItem>
                <SelectItem value="CANCEL">ยกเลิก</SelectItem>
            </SelectContent>
        </Select>
    )

    const ReceiptButton = ({ receiptUrl }) => (
        receiptUrl && (
            <Button
                variant="outline"
                onClick={() => window.open(receiptUrl, '_blank')}
            >
                ดูใบเสร็จ
            </Button>
        )
    )

    const PaginationControls = () => (
        <div className="flex items-center justify-center gap-2 mt-4">
            <Button
                variant="outline"
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
                หน้า {pagination.currentPage} จาก {pagination.pages}
            </span>
            <Button
                variant="outline"
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.pages}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">จัดการ การบริจาค</h1>

            <div className="flex gap-4 mb-6">
                <div>
                    <label className="block text-sm mb-1">วันที่เริ่มต้น</label>
                    <Input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleDateChange}
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1">วันที่สิ้นสุด</label>
                    <Input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleDateChange}
                    />
                </div>
            </div>

            <Table>
                <TableCaption>รายการบริจาคทั้งหมด {pagination.total} รายการ</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>รหัส</TableHead>
                        <TableHead>ผู้บริจาค</TableHead>
                        <TableHead>จำนวนเงิน</TableHead>
                        <TableHead>รหัสธุรกรรม</TableHead>
                        <TableHead>วันที่</TableHead>
                        <TableHead>สถานะ</TableHead>
                        <TableHead>การดำเนินการ</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {donations.map((donation) => (
                        <TableRow key={donation.id}>
                            <TableCell>{donation.id}</TableCell>
                            <TableCell>{donation.user.firstname}</TableCell>
                            <TableCell>฿{donation.total.toLocaleString()}</TableCell>
                            <TableCell>{donation.transaction_id}</TableCell>
                            <TableCell>
                                {format(new Date(donation.created_at), 'dd/MM/yyyy HH:mm')}
                            </TableCell>
                            <TableCell>
                                <StatusSelector donation={donation} />
                            </TableCell>
                            <TableCell>
                                <ReceiptButton receiptUrl={donation.receipt_url} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <PaginationControls />
        </div>
    )
}
