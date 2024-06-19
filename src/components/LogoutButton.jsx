import React from 'react';
import { useAuth } from '../auth';
import { CButton } from '@coreui/react';

const LogoutButton = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout(); 
    };

    return (
        <CButton color="primary" onClick={handleLogout}>
            Sair
        </CButton>
    );
};

export default LogoutButton;
