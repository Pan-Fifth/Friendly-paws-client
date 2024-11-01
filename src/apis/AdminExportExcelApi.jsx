import axios from 'axios'

export const getExportDonatationExcel = (donates) => {
    return axios.post('http://localhost:3000/export/donations-report?format=excel',
        { donates },
        { responseType: 'blob' }
    );
};
export const getExportAdoptExcel = (adopts) => {
    return axios.post('http://localhost:3000/export/adopts-report?format=excel',
        { adopts },
        { responseType: 'blob' }
    );
};
export const getExportEventExcel = (events) => {
    return axios.post('http://localhost:3000/export/events-report?format=excel',
        { events },
        { responseType: 'blob' }
    );
};


export const getExportPetsExcel = (pets) => {
    return axios.post('http://localhost:3000/export/pets-report?format=excel',
        { pets },
        { responseType: 'blob' }
    );
};