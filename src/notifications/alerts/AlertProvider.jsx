import React, { createContext, useState } from 'react';
import AlertContext  from './AlertContext';

const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    const addAlert = (message, type = 'success') => {
        setAlerts([...alerts, { id: Date.now(), message, type }]);
    };

    const removeAlert = (id) => {
        setAlerts(alerts.filter((alert) => alert.id !== id));
        setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    };

    return ( 
        <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
            {children}
        </AlertContext.Provider>
    );
};


export default AlertProvider;