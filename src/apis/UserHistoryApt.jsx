import axiosInstance from "../utils/axiosInstance";

export const getAdoptHistory = (token, id) => {
    return axiosInstance.get(`/user/adopt-history/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getDonateHistory = (token, id) => {
    return axiosInstance.get(`/user/donate-history/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getEventHistory = (token, id) => {
    return axiosInstance.get(`/user/event-history/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};