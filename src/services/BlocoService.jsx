 
import api from './api';

const BlocoService = { 
    lerBloco: async (id) => {
        try {
            const response = await api.get(`Bloco/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }, 
    listarBloco: async () => {
        try {
            const response = await api.get(`Bloco/GetAll`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
     
}

export default BlocoService;
