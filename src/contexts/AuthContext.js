// src/contexts/AuthContext.js
import React, { useState, createContext, useCallback, useMemo, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Fungsi untuk memuat state awal dari localStorage
    const getInitialState = () => {
        try {
            const savedUser = localStorage.getItem('rentifyUser');
            // Jika ada data tersimpan, parse dan kembalikan. Jika tidak, kembalikan null.
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error("Gagal mem-parse data pengguna dari localStorage", error);
            return null;
        }
    };

    const [user, setUser] = useState(getInitialState);

    // EFEK 1: Menyimpan data pengguna ke localStorage setiap kali state `user` berubah
    useEffect(() => {
        try {
            if (user) {
                // Simpan objek user sebagai string JSON
                localStorage.setItem('rentifyUser', JSON.stringify(user));
            } else {
                // Jika user logout, hapus data dari localStorage
                localStorage.removeItem('rentifyUser');
            }
        } catch (error) {
            console.error("Gagal menyimpan data pengguna ke localStorage", error);
        }
    }, [user]); // Efek ini akan berjalan setiap kali `user` berubah

    const updateUser = useCallback((newUserData) => {
        setUser(currentUser => ({...currentUser, ...newUserData}));
    }, []);

    const login = useCallback((userData) => {
        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const value = useMemo(() => ({ user, login, logout, updateUser }), [user, login, logout, updateUser]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
