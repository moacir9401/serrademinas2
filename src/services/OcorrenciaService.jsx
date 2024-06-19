 
import api from './api';

const servicesOcorrencia = {
    criarOcorrencia: async (VoOcorrencia) => {
        try {
            const response = await api.post('Ocorrencia/AddOcorrencia', VoOcorrencia);
            return response.data;
        } catch (error) {
            console.log(error)
            throw error;
        }
    },
    lerOcorrencia: async (id) => {
        try {
            const response = await api.get(`Ocorrencia/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    listarOcorrenciasComFiltro: async (filtros) => {
        try {
            const response = await api.get(`Ocorrencia/GetOcorrenciaFiltro/`, { params: filtros });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    listarOcorrencias: async () => {
        try {
            const response = await api.get(`Ocorrencia/GetAll`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    atualizarOcorrencia: async (id, dadosAtualizados) => {
        try {
            const response = await api.put(`Ocorrencia/${id}`, dadosAtualizados);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    excluirOcorrencia: async (id) => {
        try {
            const response = await api.delete(`Ocorrencia/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default servicesOcorrencia;
