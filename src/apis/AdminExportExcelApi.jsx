import axiosInstance from "../utils/axiosInstance";

export const getExportDonatationExcel = (donates) => {
    return axiosInstance.post('/export/donations-report?format=excel',
        { donates },
        { responseType: 'blob' }
    );
};
export const getExportAdoptExcel = (adopts) => {
    return axiosInstance.post('/export/adopts-report?format=excel',
        { adopts },
        { responseType: 'blob' }
    );
};
export const getExportEventExcel = (events) => {
    return axiosInstance.post('/export/events-report?format=excel',
        { events },
        { responseType: 'blob' }
    );
};


export const getExportPetsExcel = (pets) => {
    return axiosInstance.post('/export/pets-report?format=excel',
        { pets },
        { responseType: 'blob' }
    );
};