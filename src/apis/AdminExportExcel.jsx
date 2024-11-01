import axios from 'axios'

export const getExportDonatationExcel = (donates) => {
    return axios.post('http://localhost:3000/export/donations-report?format=excel',
        { donates },
        { responseType: 'blob' }
    );
};