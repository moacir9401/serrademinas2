import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AlertProvider from './notifications/alerts/AlertProvider';
import { FloatingCAlert } from './components/FloatingCAlert';
import { CSpinner, useColorModes } from '@coreui/react';
import { AuthProvider } from './auth';
import ProtectedRoute from './ProtectedRoute';
import './scss/style.scss';

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const Login = React.lazy(() => import('./views/pages/login/Login')); 

const App = () => {
    const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
    const storedTheme = useSelector((state) => state.theme);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
        const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
        if (theme) {
            setColorMode(theme);
        }

        if (isColorModeSet()) {
            return;
        }

        setColorMode(storedTheme);
    }, [isColorModeSet, setColorMode, storedTheme]);

    return (
        <AuthProvider>
            <AlertProvider>
                <FloatingCAlert />
                <BrowserRouter>
                    <Suspense
                        fallback={
                            <div className="pt-3 text-center">
                                <CSpinner color="primary" variant="grow" />
                            </div>
                        }
                    >
                        <Routes>
                            <Route path="/login" element={<Login />} /> 
                            <Route element={<ProtectedRoute />}>
                                <Route path="*" element={<DefaultLayout />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </AlertProvider>
        </AuthProvider>
    );
};

export default App;
