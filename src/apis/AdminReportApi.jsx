import axiosInstance from "../utils/axiosInstance";

export const getEventData = (startDate, endDate) => {
    return axiosInstance.get(`/admin/report-event?startDate=${startDate}&endDate=${endDate}`);
};
export const getAllEventData = () => {
    return axiosInstance.get(`/admin/report-event-all`);
};

export const getAdoptData = (startDate, endDate) => {
    return axiosInstance.get(`/admin/report-adopt?startDate=${startDate}&endDate=${endDate}`);
};
export const getAllAdoptData = () => {
    return axiosInstance.get(`/admin/report-adopt-all`);
};
export const getDonateData = (startDate, endDate) => {
    return axiosInstance.get(`/admin/report-donation?startDate=${startDate}&endDate=${endDate}`);
};
export const getAllDonateData = () => {
    return axiosInstance.get(`/admin/report-donation-all`);
};
export const getAllPetData = () => {
    return axiosInstance.get(`/admin/report-pet-all`);
};

export const getAllAdoptRequest = (token)=>{
    return axiosInstance.get(`/admin/all-adopts`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}