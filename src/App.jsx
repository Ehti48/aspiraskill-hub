import React, { createContext, useContext, useEffect, useState } from 'react';
import DashboardLayout from './Components/DashboardLayout';
import Login from './Components/LoginPage/Login'; 
import Reset from './Components/LoginPage/Reset';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        window.location.replace('/');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsResetting(false);
        localStorage.removeItem('isAuthenticated');
    };

    const handleForgotPassword = () => setIsResetting(true);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isResetting, loading, handleLogin, handleLogout, handleForgotPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

const App = () => (
    <AuthProvider>
        <MainComponent />
    </AuthProvider>
);

const MainComponent = () => {
    const { isAuthenticated, isResetting, loading, handleLogout, handleLogin, handleForgotPassword } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Prevents UI flickering
    }

    return (
        <>
            {isAuthenticated ? (
                <DashboardLayout onLogout={handleLogout} />
            ) : isResetting ? (
                <Reset onLogout={handleLogout} />
            ) : (
                <Login onLogin={handleLogin} onReset={handleForgotPassword} />
            )}
        </>
    );
};

export default App;