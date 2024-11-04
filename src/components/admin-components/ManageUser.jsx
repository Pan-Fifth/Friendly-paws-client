import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
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
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(users.map(user => (user.id === editingUser.id ? response.data : user)));
            setEditingUser(null);
            setFormData({ email: '', firstname: '', lastname: '', phone: '', role: '' });
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/admin/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Manage Users</h1>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Phone</th> {/* เพิ่มคอลัมน์สำหรับหมายเลขโทรศัพท์ */}
                        <th className="px-4 py-2">Role</th>
                        <th className="px-4 py-2">Actions</th>
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
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDeleteUser(user.id)} 
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingUser && (
                <div className="mt-5 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Edit User</h2>
                    <form onSubmit={handleUpdateUser}>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className="border rounded px-2 py-1"
                                required
                            />
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
                                <option value="">Select Role</option>
                                <option value="ADMIN">Admin</option>
                                <option value="USER">User</option>
                                <option value="GUEST">VOLUNTEER</option>
                            </select>
                        </div>
                        <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                            Update User
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ManageUser;
