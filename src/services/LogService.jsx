// client/src/services/servicesLog.js

import api from './api';

const servicesLog = { 
    lerLog: async (id) => {
        try {
            const response = await api.get(`Log/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    listarLogsComFiltro: async (filtros) => {
        try {
            const response = await api.get(`Log/GetLogFiltro/`, { params: filtros });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    listarLogs: async () => {
        try {
            const response = await api.get(`Log/GetAll`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

}

export default servicesLog;
