// src/components/Toast.js
import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Toast = ({ message, type, onDismiss }) => {
    // Atur timer untuk menghilangkan toast secara otomatis setelah 3 detik
    useEffect(() => {
        const timer = setTimeout(onDismiss, 3000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    const baseStyle = "fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white flex items-center transition-all transform-gpu animate-toast-in z-[100]";
    
    // Gaya berdasarkan tipe toast (sukses, error, info)
    const typeStyles = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500'
    };

    return (
        <div className={`${baseStyle} ${typeStyles[type] || 'bg-gray-800'}`}>
            {type === 'success' && <CheckCircle className="mr-3" />}
            {type === 'error' && <AlertCircle className="mr-3" />}
            {type === 'info' && <AlertCircle className="mr-3" />}
            <span>{message}</span>
        </div>
    );
};

export default Toast;
