// import axios from "axios";

// export const getEvents = async () => {
//     try {
//         const response = await axios.get('http://localhost:3000/event/showpages',);
//         console.log(response.data);

//         return response;
//     } catch (error) {
//         console.error("Error in getEvents:", error);
//         throw error;  // เพิ่มการโยนข้อผิดพลาดออกไปเพื่อให้แสดงข้อผิดพลาดใน console
//     }
// };

// export const registerEvent = async (token, eventId) => {
//     console.log(token)
//     try {
//         const response = await axios.post('http://localhost:3000/event/regisevent', eventId, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         return response;
//     } catch (error) {
//         console.error("Error in registerEvent:", error);
//         throw error;  // เพิ่มการโยนข้อผิดพลาดออกไปเพื่อให้แสดงข้อผิดพลาดใน console
//     }
// };

import axiosInstance from "../utils/axiosInstance";

export const getEvents = async () => {
    try {
        const response = await axiosInstance.get('/event/showpages',);
        console.log(response.data);

        return response;
    } catch (error) {
        console.error("Error in getEvents:", error);
        throw error;  // เพิ่มการโยนข้อผิดพลาดออกไปเพื่อให้แสดงข้อผิดพลาดใน console
    }
};

export const registerEvent = async (token, eventId) => {
    console.log(token)
    try {
        const response = await axiosInstance.post('/event/regisevent', { eventId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error in registerEvent:", error);
        throw error;  // เพิ่มการโยนข้อผิดพลาดออกไปเพื่อให้แสดงข้อผิดพลาดใน console
    }
};

export const createEvent = async (token, eventData) => {
    try {
        const response = await axiosInstance.post('/admin/events', eventData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error in createEvent:", error);
        throw error;  // เพิ่มการโยนข้อผิดพลาดออกไปเพื่อให้แสดงข้อผิดพลาดใน console
    }
};
