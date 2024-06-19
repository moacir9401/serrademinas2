// client/src/services/servicesMorador.js

import api from './api';

const servicesMorador = {
    criarMorador: async (VoMorador) => {
        try {
            const response = await api.post('Morador/AddMorador', VoMorador);
            return response.data;
        } catch (error) {
            console.log(error)
            throw error;
        }
    },
    lerMorador: async (id) => {
        try {
            const response = await api.get(`Morador/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    listarMoradoresComFiltro: async (filtros) => {
        try {
            const response = await api.get(`Morador/GetMoradorFiltro/`, { params: filtros });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    listarMoradores: async () => {
        try {
            const response = await api.get(`Morador/GetAll`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    atualizarMorador: async (id, dadosAtualizados) => {
        try {
            const response = await api.put(`Morador/${id}`, dadosAtualizados);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    excluirMorador: async (id) => {
        try {
            const response = await api.delete(`Morador/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default servicesMorador;
