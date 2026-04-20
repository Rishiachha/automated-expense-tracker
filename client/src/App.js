import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// This component checks if a user is logged in before allowing access to the Dashboard
const ProtectedRoute = ({ children }) => {
    const { user, loading } = React.useContext(AuthContext);
    
    // While checking for a valid token in localStorage, show a loading state
    if (loading) {
        return <div className="flex justify-center mt-20">Loading...</div>;
    }
    
    // If the user state is set, render the Dashboard; otherwise, send them to login
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Routes */}
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />

                    {/* If the user types a URL that doesn't exist, send them to login */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

// CRITICAL: Vercel needs this default export to find your App component
export default App;