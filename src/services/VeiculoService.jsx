// client/src/services/servicesVeiculo.js

import api from './api';

const VeiculoService = {
    criarVeiculo: async (VoVeiculo) => {
        try {
            const response = await api.post('Veiculo/AddVeiculo', VoVeiculo);
            return response.data;
        } catch (error) {
            console.log(error)
            throw error;
        }
    },
    lerVeiculo: async (id) => {
        try {
            const response = await api.get(`Veiculo/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    listarVeiculosComFiltro: async (filtros) => {
        try {
            const response = await api.get(`Veiculo/GetVeiculoFiltro/`, { params: filtros });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    listarVeiculos: async () => {
        try {
            const response = await api.get(`Veiculo/GetAll`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    atualizarVeiculo: async (id, dadosAtualizados) => {
        try {
            const response = await api.put(`Veiculo/${id}`, dadosAtualizados);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    excluirVeiculo: async (id) => {
        try {
            const response = await api.delete(`Veiculo/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default VeiculoService;
