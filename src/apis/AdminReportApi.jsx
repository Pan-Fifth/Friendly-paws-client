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

export const getAllAdoptRequest = (token,page)=>{
    return axiosInstance.get(`/admin/all-adopts/6/${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
};

export const getRequestScore = (token,requestId) =>{
    return axiosInstance.get(`/admin/score/${requestId}/th`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const editAdoptRequest = (token,data,id)=>{
    return axiosInstance.patch(`/admin/edit-adopt-request/${id}`, data,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
