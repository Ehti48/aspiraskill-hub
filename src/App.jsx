import React, { createContext, useContext, useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import DashboardLayout from './Components/DashboardLayout';
import Login from './Components/LoginPage/Login';
import Reset from './Components/LoginPage/Reset';
import Loader from './Components/Loader';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(storedAuth);
        setLoading(false);
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

const App = () => {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowLoader(false), 2400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AuthProvider>
            {showLoader ? (
                <Loader />
            ) : (
                <Routes>
                    <Route path="/login" element={<LoginRoute />} />
                    <Route path="/reset" element={<Reset />} />
                    <Route path="/reset/:token" element={<Reset />} />
                    <Route path="/*" element={<ProtectedRoute />} />
                </Routes>
            )}
        </AuthProvider>
    );
};

const LoginRoute = () => {
    const { isAuthenticated, handleLogin } = useAuth();
    const navigate = useNavigate();

    return isAuthenticated ? (
        <Navigate to="/" />
    ) : (
        <Login onLogin={handleLogin} onForgotPassword={() => navigate('/reset')} />
    );
};

const ProtectedRoute = () => {
    const { isAuthenticated, handleLogout } = useAuth();
    return isAuthenticated ? <DashboardLayout onLogout={handleLogout} /> : <Navigate to="/login" />;
};

export default App;
