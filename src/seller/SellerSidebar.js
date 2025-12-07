// src/seller/SellerSidebar.js
import React from 'react';
import { LayoutDashboard, Package, ArrowRight, ShoppingCart, Settings } from 'lucide-react';

const SellerSidebar = ({ activePage, setActivePage, setViewMode }) => {
    const navItems = [
        { key: 'dashboard', label: 'Ringkasan', icon: LayoutDashboard },
        { key: 'products', label: 'Produk Saya', icon: Package },
        { key: 'orders', label: 'Pesanan Masuk', icon: ShoppingCart },
        { key: 'settings', label: 'Pengaturan', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-gray-900 text-gray-300 flex-col p-4 hidden md:flex">
            <div className="flex items-center justify-center mb-8">
                {/* --- PERBAIKAN DI SINI: Menghapus kelas `invert` --- */}
                <img src="/Rentify-Logo.png" alt="Rentify Logo" className="h-20" />
            </div>
            <nav className="flex flex-col space-y-2">
                {navItems.map(item => (
                    <button 
                        key={item.key}
                        onClick={() => setActivePage(item.key)} 
                        className={`flex items-center px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${activePage === item.key ? 'bg-indigo-600 text-white' : 'hover:bg-gray-700 hover:text-white'}`}
                    >
                        <item.icon className="mr-3 h-5 w-5"/> {item.label}
                    </button>
                ))}
            </nav>
            <div className="mt-auto">
                <button 
                    onClick={() => setViewMode('buyer')} 
                    className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-sm font-medium"
                >
                    <ArrowRight className="mr-2 h-5 w-5 transform rotate-180"/> Kembali ke Situs
                </button>
            </div>
        </aside>
    );
};

export default SellerSidebar;
