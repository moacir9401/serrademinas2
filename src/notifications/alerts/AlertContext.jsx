import React, { createContext } from 'react';

const AlertContext = createContext({
    alerts: [],
    addAlert: () => { },
    removeAlert: () => { },
});

export default AlertContext;