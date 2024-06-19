
import api from './api';

const ApartamentoService = {
    lerApartamento: async (id) => {
        try {
            const response = await api.get(`Apartamento/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    listarApartamento: async () => {
        try {
            const response = await api.get(`Apartamento/GetAll`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

}

export default ApartamentoService;
