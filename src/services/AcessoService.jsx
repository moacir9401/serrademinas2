// client/src/services/servicesAcesso.js

import api from './api';

const servicesAcesso = {
    criarAcesso: async (VoAcesso) => {
        try {
            const response = await api.post('Acesso/AddAcesso', VoAcesso);
            return response.data;
        } catch (error) {
            console.log(error)
            throw error;
        }
    },
    lerAcesso: async (id) => {
        try {
            const response = await api.get(`Acesso/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    LerLogin: async (filtros) => {
        try {
            const response = await api.get(`Acesso/Login/`, { params: filtros });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    listarAcessos: async () => {
        try {
            const response = await api.get(`Acesso/GetAll`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    atualizarAcesso: async (id, dadosAtualizados) => {
        try {
            const response = await api.put(`Acesso/${id}`, dadosAtualizados);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    excluirAcesso: async (id) => {
        try {
            const response = await api.delete(`Acesso/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default servicesAcesso;
