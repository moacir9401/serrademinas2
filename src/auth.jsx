import { createContext, useContext, useState } from 'react';
import servicesAcesso from './services/AcessoService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Tente obter o estado de autentica��o do localStorage (ou qualquer outro m�todo de persist�ncia)
        const savedAuthState = localStorage.getItem('isAuthenticated');
        return savedAuthState ? JSON.parse(savedAuthState) : false;
    });

    const login = async (login, senha) => {
        try {
            // Chamar a fun��o LerLogin para autenticar o usu�rio
            const userData = await servicesAcesso.LerLogin({ login, senha });
            // Aqui voc� pode adicionar l�gica para verificar a resposta da autentica��o

            // Definir o estado de autentica��o como verdadeiro
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', true); // Persistir o estado de autentica��o
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            throw error;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated'); // Remover o estado de autentica��o persistido
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
