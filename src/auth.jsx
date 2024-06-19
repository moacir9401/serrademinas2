import { createContext, useContext, useState } from 'react';
import servicesAcesso from './services/AcessoService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Tente obter o estado de autenticação do localStorage (ou qualquer outro método de persistência)
        const savedAuthState = localStorage.getItem('isAuthenticated');
        return savedAuthState ? JSON.parse(savedAuthState) : false;
    });

    const login = async (login, senha) => {
        try {
            // Chamar a função LerLogin para autenticar o usuário
            const userData = await servicesAcesso.LerLogin({ login, senha });
            // Aqui você pode adicionar lógica para verificar a resposta da autenticação

            // Definir o estado de autenticação como verdadeiro
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', true); // Persistir o estado de autenticação
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            throw error;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated'); // Remover o estado de autenticação persistido
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
