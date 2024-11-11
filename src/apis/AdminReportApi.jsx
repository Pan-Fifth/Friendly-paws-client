import axiosInstance from "../utils/axiosInstance";

export const getEventData = (token, startDate, endDate) => {
    return axiosInstance.get(`/admin/report-event?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getAllEventData = (token) => {
    return axiosInstance.get(`/admin/report-event-all`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getListUserEventData = (token, eventId) => {
    return axiosInstance.get(`/admin/report-list-user-event/${eventId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getAdoptData = (token, startDate, endDate) => {
    return axiosInstance.get(`/admin/report-adopt?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getAllAdoptData = (token) => {
    return axiosInstance.get(`/admin/report-adopt-all`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getDonateData = (token, startDate, endDate) => {
    return axiosInstance.get(`/admin/report-donation?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getAllDonateData = (token) => {
    return axiosInstance.get(`/admin/report-donation-all`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getAllPetData = (token) => {
    return axiosInstance.get(`/admin/report-pet-all`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};



export const getAllAdoptRequest = (token, page) => {
    return axiosInstance.get(`/admin/all-adopts/6/${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
};

export const getRequestScore = (token, requestId) => {
    return axiosInstance.get(`/admin/score/${requestId}/th`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const editAdoptRequest = (token, data, id) => {
    return axiosInstance.patch(`/admin/edit-adopt-request/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
