import axios from 'axios'

export const getEventData = (startDate, endDate) => {
    return axios.get(`http://localhost:3000/admin/report-event?startDate=${startDate}&endDate=${endDate}`);
};
export const getAllEventData = () => {
    return axios.get(`http://localhost:3000/admin/report-event-all`);
};

export const getAdoptData = (startDate, endDate) => {
    return axios.get(`http://localhost:3000/admin/report-adopt?startDate=${startDate}&endDate=${endDate}`);
};
export const getAllAdoptData = () => {
    return axios.get(`http://localhost:3000/admin/report-adopt-all`);
};
export const getDonateData = (startDate, endDate) => {
    return axios.get(`http://localhost:3000/admin/report-donation?startDate=${startDate}&endDate=${endDate}`);
};
export const getAllDonateData = () => {
    return axios.get(`http://localhost:3000/admin/report-donation-all`);
};
