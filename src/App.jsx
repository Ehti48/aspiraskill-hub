import React, { createContext, useContext, useEffect, useState } from 'react';
import DashboardLayout from './Components/DashboardLayout';
import Login from './Components/LoginPage/Login';
import Reset from './Components/LoginPage/Reset';

// Create a context for authentication
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsResetting(false);
        localStorage.removeItem('isAuthenticated');
    };

    const handleForgotPassword = () => {
        setIsResetting(true);
        console.log("Resetting password...");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isResetting, handleLogin, handleLogout, handleForgotPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <MainComponent />
        </AuthProvider>
    );
};

const MainComponent = () => {
    const { isAuthenticated, isResetting, handleLogout, handleLogin, handleForgotPassword } = useAuth();

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