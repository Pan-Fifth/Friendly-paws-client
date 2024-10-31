import axios from 'axios'

export const getEventData = (startDate, endDate) => {
    return axios.get(`http://localhost:3000/admin/report-event?startDate=${startDate}&endDate=${endDate}`);
};
export const getAllEventData = () => {
    return axios.get(`http://localhost:3000/admin/report-event-all`);
};
