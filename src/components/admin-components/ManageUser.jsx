import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAuthStore from '@/src/stores/AuthStore';

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const token = useAuthStore((state) => state.token);
    const [formData, setFormData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        phone: '',
        role: ''
    });

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admin/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEditClick = (user) => {
        setEditingUser(user);
        setFormData({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            role: user.role
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/admin/users/${editingUser.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(users.map(user => (user.id === editingUser.id ? response.data : user)));
            setEditingUser(null);
            setFormData({ email: '', firstname: '', lastname: '', phone: '', role: '' });
            toast.success('แก้ไขข้อมูลผู้ใช้งานสำเร็จ');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // const handleDeleteUser = async (userId) => {
    //     const result = await Swal.fire({
    //         title: "ยืนยันที่จะลบข้อมูลใช่หรือไม่?",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "ใช่ ,ฉันจะลบ!",
    //         cancelButtonText: "ไม่ ,ฉันจะยกเลิก!"
    //     });
    //     if (result.isConfirmed) {
    //         try {
    //             await axios.delete(`http://localhost:3000/admin/users/${userId}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
    //             setUsers(users.filter(user => user.id !== userId));
    //             toast.success('ลบข้อมูลผู้ใช้งานสำเร็จ');
    //         } catch (error) {
    //             console.error('Error deleting user:', error);
    //         }
    //     }
    // };
    const closeEditModal = () => {
        setEditingUser(false);

    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">จัดการ ผู้ใช้งาน</h1>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-2">ไอดี</th>
                        <th className="px-4 py-2">อีเมล</th>
                        <th className="px-4 py-2">ชื่อ นามสกุล</th>
                        <th className="px-4 py-2">เบอร์ติดต่อ</th> {/* เพิ่มคอลัมน์สำหรับหมายเลขโทรศัพท์ */}
                        <th className="px-4 py-2">บทบาท</th>
                        <th className="px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-100">
                            <td className="border px-4 py-2">{user.id}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.firstname} {user.lastname}</td>
                            <td className="border px-4 py-2">{user.phone}</td> {/* แสดงหมายเลขโทรศัพท์ */}
                            <td className="border px-4 py-2">{user.role}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleEditClick(user)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mr-2"
                                >
                                    แก้ไข
                                </button>
                                {/* <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                    ลบ
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingUser && (
                <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="mt-5 p-4 bg-gray-100 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">แก้ไขข้อมูลผู้ใช้งาน</h2>
                        <form onSubmit={handleUpdateUser}>
                            <div className="grid grid-cols-2 gap-4">

                                <input
                                    type="text"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                    className="border rounded px-2 py-1"
                                    required
                                />
                                <input
                                    type="text"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                    className="border rounded px-2 py-1"
                                    required
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone"
                                    className="border rounded px-2 py-1"
                                    required
                                />
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="border rounded px-2 py-1"
                                    required
                                >
                                    <option value="">เลือกบทบาท</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="USER">User</option>
                                </select>
                            </div>
                            <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 me-6 rounded hover:bg-green-600 transition">
                                อัพเดท
                            </button>
                            <button onClick={closeEditModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded ">
                                ยกเลิก
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUser;
