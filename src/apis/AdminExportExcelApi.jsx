import axiosInstance from "../utils/axiosInstance";

export const getExportDonatationExcel = (token, donates) => {
    return axiosInstance.post('/export/donations-report?format=excel',
        { donates },
        {
            responseType: 'blob',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
};
export const getExportAdoptExcel = (token, adopts) => {
    return axiosInstance.post('/export/adopts-report?format=excel',
        { adopts },
        {
            responseType: 'blob',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
};
export const getExportEventExcel = (token, events) => {
    return axiosInstance.post('/export/events-report?format=excel',
        { events },
        {
            responseType: 'blob',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
};
export const getExportListEventExcel = (token, events) => {
    return axiosInstance.post('/export/events-list-report?format=excel',
        { events },
        {
            responseType: 'blob',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
};


export const getExportPetsExcel = (token, pets) => {
    return axiosInstance.post('/export/pets-report?format=excel',
        { pets },
        {
            responseType: 'blob',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
};