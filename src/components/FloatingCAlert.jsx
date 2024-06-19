import React, { useState, useEffect, useContext, useRef } from 'react';
import './floating-alert.css';
import { CAlert } from '@coreui/react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AlertContext from '../notifications/alerts/AlertContext';

const FloatingCAlert = () => {
    const { alerts, removeAlert } = useContext(AlertContext);
    const [visibleAlerts, setVisibleAlerts] = useState([]);
    const timeouts = useRef({}); // To store timeout IDs
    const nodeRefs = useRef(new Map()); // To store refs for each alert

    useEffect(() => {
        if (alerts.length >= 0) {

            for (let indexAlert = alerts.length - 1; indexAlert >= 0; indexAlert--) {
                setTimeout(() => {
                    removeAlert(alerts[indexAlert].id); 
                }, 3000);
            }

        }
        setVisibleAlerts(alerts);
    });

    const handleAlertClose = (id) => {
        clearTimeout(timeouts.current[id]);
        delete timeouts.current[id];
        removeAlert(id);
    };

    const handleAlertClick = (id) => {
        console.log(alerts.length);
        removeAlert(id);
    };
    return (
        <div className="alert-container">
            <TransitionGroup>
                {visibleAlerts.map((alert) => (
                    <CSSTransition
                        key={alert.id}
                        nodeRef={nodeRefs.current.get(alert.id)}
                        timeout={500}
                        classNames={{
                            enter: 'alert-enter',
                            enterActive: 'alert-enter-active',
                            exit: 'alert-exit',
                            exitActive: 'alert-exit-active',
                        }}
                        onExited={() => {
                            setVisibleAlerts((prev) => prev.filter((a) => a.id !== alert.id));
                            nodeRefs.current.delete(alert.id); // Limpar referências
                        }}
                    >
                        <div ref={(el) => nodeRefs.current.set(alert.id, el)}>
                            <CAlert
                                color={alert.type}
                                dismissible
                                onClick={() => handleAlertClick(alert.id)} // Fechar o alerta quando clicado
                            >
                                {alert.message}
                            </CAlert>
                        </div>
                    </CSSTransition>

                ))}
            </TransitionGroup>
        </div>
    );
};

export { FloatingCAlert };
