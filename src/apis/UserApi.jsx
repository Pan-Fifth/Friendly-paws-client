import axios from 'axios';

export const sendEmailApi = async (recipient, subject, message, token) => {
    try {
        const response = await axios.post(
            'http://localhost:3000/user/send-email',
            { recipient, subject, message },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response;
    } catch (error) {
        console.error("Error in sendEmailApi:", error);
        throw error;  // เพิ่มการโยนข้อผิดพลาดออกไปเพื่อให้แสดงข้อผิดพลาดใน console
    }
};

export const getProfile = (token) => {

    return axios.get("http://localhost:3000/user/profile/",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}


export const editProfile = (id, token, user) => {
    return axios.patch(`http://localhost:3000/user/edit-profile/${id}`, user, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};