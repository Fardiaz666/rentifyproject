// src/App.js
import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ToastContext } from './contexts/ToastContext';
import BuyerApp from './BuyerApp';
import SellerApp from './seller/SellerApp';
import Toast from './components/Toast';

function App() {
    const [viewMode, setViewMode] = useState('buyer');
    // State baru untuk menentukan halaman awal saat beralih ke mode pembeli
    const [initialBuyerPage, setInitialBuyerPage] = useState(null); 
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'info') => {
        setToast({ id: Date.now(), message, type });
    };

    // Fungsi baru untuk menangani perpindahan mode dan halaman awal
    const handleSetViewMode = (mode, page = null) => {
        setViewMode(mode);
        setInitialBuyerPage(page);
    };
    
    const dismissToast = () => setToast(null);

    return (
        <ToastContext.Provider value={showToast}>
            {viewMode === 'buyer'
                ? <BuyerApp 
                    setViewMode={handleSetViewMode} 
                    initialPage={initialBuyerPage} 
                    setInitialPage={setInitialBuyerPage} 
                  />
                : <SellerApp setViewMode={handleSetViewMode} />}
            {toast && (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onDismiss={dismissToast}
                />
            )}
        </ToastContext.Provider>
    );
}

const AppWrapper = () => (
    <AuthProvider>
        <CartProvider>
            <App />
        </CartProvider>
    </AuthProvider>
);

export default AppWrapper;
