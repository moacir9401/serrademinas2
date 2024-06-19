// client/src/services/servicesEncomenda.js

import api from './api';

const servicesEncomenda = {
    criarEncomenda: async (VoEncomenda) => {
        try {
            const response = await api.post('Encomenda/AddEncomenda', VoEncomenda);
            return response.data;
        } catch (error) {
            console.log(error)
            throw error;
        }
    },
    lerEncomenda: async (id) => {
        try {
            const response = await api.get(`Encomenda/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    listarEncomendasComFiltro: async (filtros) => {
        try {
            const response = await api.get(`Encomenda/GetEncomendaFiltro/`, { params: filtros });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    listarEncomendas: async () => {
        try {
            const response = await api.get(`Encomenda/GetAll`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    atualizarEncomenda: async (id, dadosAtualizados) => {
        try {
            const response = await api.put(`Encomenda/${id}`, dadosAtualizados);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    excluirEncomenda: async (id) => {
        try {
            const response = await api.delete(`Encomenda/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default servicesEncomenda;
