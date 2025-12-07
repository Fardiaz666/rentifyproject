// src/pages/LoginPage.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ToastContext } from '../contexts/ToastContext';
import { ArrowLeft, Mail, Lock, User as UserIcon } from 'lucide-react';

const LoginPage = ({ onPageChange }) => {
    const { login } = useContext(AuthContext);
    const showToast = useContext(ToastContext);
    const [authMode, setAuthMode] = useState('login');
    const [formData, setFormData] = useState({ email: '', password: '', fullName: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email tidak boleh kosong.';
        else if (!validateEmail(formData.email)) newErrors.email = 'Format email tidak valid.';
        
        if (!formData.password) newErrors.password = 'Password tidak boleh kosong.';
        else if (formData.password.length < 8) newErrors.password = 'Password minimal 8 karakter.';

        if (authMode === 'register') {
            if (!formData.fullName) newErrors.fullName = 'Nama lengkap tidak boleh kosong.';
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Konfirmasi password tidak cocok.';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            if (authMode === 'login') {
                if (formData.email === "user@rentify.com" && formData.password === "password123") {
                    showToast('Login berhasil!', 'success');
                    login({ name: 'User Rentify', email: formData.email, phone: '081234567890' });
                    onPageChange('user-dashboard');
                } else {
                    showToast('Email atau password salah.', 'error');
                }
            } else {
                showToast('Akun berhasil dibuat!', 'success');
                login({ name: formData.fullName, email: formData.email, phone: '' });
                onPageChange('user-dashboard');
            }
        } else {
            showToast('Harap perbaiki error pada form.', 'error');
        }
    };
    
    const inputGroupClass = "relative";
    const inputIconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400";
    const inputFieldClass = "w-full appearance-none rounded-lg border py-2 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm";
    const errorInputClass = "border-red-500";
    const normalInputClass = "border-gray-300";
    const errorTextClass = "text-red-500 text-xs mt-1"; 

    return (
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
            <div className="hidden lg:block relative">
                <img 
                    src="/LoginPageGambar.jpg" 
                    alt="Interior modern yang nyaman" 
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-10 text-white">
                    <h2 className="text-4xl font-bold leading-tight">Sewa Apapun, Kapanpun.</h2>
                    <p className="mt-4 text-lg max-w-md">Temukan ribuan barang berkualitas untuk disewa, mulai dari properti hingga peralatan hobi, semua dalam satu platform.</p>
                </div>
            </div>
            <div className="flex items-center justify-center p-6 sm:p-12 lg:p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    <button 
                        onClick={() => onPageChange('landing')} 
                        className="text-gray-600 hover:text-indigo-800 font-medium inline-flex items-center group mb-6"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        Kembali ke Beranda
                    </button>
                    <img src="/Rentify-Logo.png" alt="Rentify Logo" className="h-12 mx-auto mb-4" />
                    <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
                        {authMode === 'login' ? 'Selamat Datang Kembali!' : 'Buat Akun Baru'}
                    </h2>
                    <p className="text-center text-gray-500 mb-8">
                        {authMode === 'login' ? 'Silakan masuk untuk melanjutkan.' : 'Daftar untuk mulai menyewa.'}
                    </p>
                    <div className="bg-white p-8 shadow-lg rounded-2xl">
                        <div className="flex border-b border-gray-200 mb-6">
                            <button onClick={() => { setAuthMode('login'); setErrors({}); }} className={`flex-1 pb-3 text-center font-bold text-sm transition-colors ${authMode === 'login' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>Login</button>
                            <button onClick={() => { setAuthMode('register'); setErrors({}); }} className={`flex-1 pb-3 text-center font-bold text-sm transition-colors ${authMode === 'register' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>Register</button>
                        </div>
                        <form onSubmit={handleSubmit} noValidate>
                            {authMode === 'register' && (
                                <div className="mb-5">
                                    <div className={inputGroupClass}>
                                        <UserIcon className={inputIconClass} size={18} />
                                        <input id="fullName" name="fullName" type="text" required className={`${inputFieldClass} ${errors.fullName ? errorInputClass : normalInputClass}`} placeholder="Nama Lengkap" value={formData.fullName} onChange={handleChange} />
                                    </div>
                                    {errors.fullName && <p className={errorTextClass}>{errors.fullName}</p>}
                                </div>
                            )}
                            <div className="mb-5">
                                <div className={inputGroupClass}>
                                    <Mail className={inputIconClass} size={18} />
                                    <input id="email" name="email" type="email" autoComplete="email" required className={`${inputFieldClass} ${errors.email ? errorInputClass : normalInputClass}`} placeholder="Alamat email" value={formData.email} onChange={handleChange} />
                                </div>
                                {errors.email && <p className={errorTextClass}>{errors.email}</p>}
                            </div>
                            <div className="mb-5">
                                <div className={inputGroupClass}>
                                    <Lock className={inputIconClass} size={18} />
                                    <input id="password" name="password" type="password" required className={`${inputFieldClass} ${errors.password ? errorInputClass : normalInputClass}`} placeholder="Password" value={formData.password} onChange={handleChange} />
                                </div>
                                {errors.password && <p className={errorTextClass}>{errors.password}</p>}
                            </div>
                            {authMode === 'register' && (
                                <div className="mb-5">
                                    <div className={inputGroupClass}>
                                        <Lock className={inputIconClass} size={18} />
                                        <input id="confirmPassword" name="confirmPassword" type="password" required className={`${inputFieldClass} ${errors.confirmPassword ? errorInputClass : normalInputClass}`} placeholder="Konfirmasi Password" value={formData.confirmPassword} onChange={handleChange} />
                                    </div>
                                    {errors.confirmPassword && <p className={errorTextClass}>{errors.confirmPassword}</p>}
                                </div>
                            )}
                            <div>
                                <button type="submit" className="group mt-6 relative flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    {authMode === 'login' ? 'Login Sekarang' : 'Daftar Akun'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
