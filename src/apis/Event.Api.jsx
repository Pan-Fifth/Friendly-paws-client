import axiosInstance from "../utils/axiosInstance";

export const getEvents = async () => {
    try {
        const response = await axiosInstance.get('/event/showpages',);
       

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

export const deleteEvent = async (token, Id) => {
    try {
        const response = await axiosInstance.delete(`/admin/deleteEvent/${Id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error in deleteEvent:", error);
        throw error;  // ส่งข้อผิดพลาดออกไปเพื่อให้แสดงข้อผิดพลาดใน console
    }
};

export const updateEvent = async (token, Id, updatedData) => {
    try {
        const response = await axiosInstance.patch(`/admin/updateEvent/${Id}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error in updateEvent:", error);
        throw error;  // ส่งข้อผิดพลาดออกไปเพื่อให้แสดงข้อผิดพลาดใน console
    }
};

