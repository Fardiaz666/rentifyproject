// src/pages/UserDashboardPage.js
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ArrowRight, ShoppingBag, Package, Star, User as UserIcon } from 'lucide-react';
import formatCurrency from '../utils/formatCurrency';

const UserDashboardPage = ({ onPageChange }) => {
    const { user } = useContext(AuthContext);

    // Contoh data untuk dashboard
    const stats = [
        { label: 'Sewa Aktif', value: 3, icon: ShoppingBag, color: 'text-blue-500 bg-blue-100' },
        { label: 'Barang Disewakan', value: 5, icon: Package, color: 'text-green-500 bg-green-100' },
        { label: 'Ulasan Diterima', value: 12, icon: Star, color: 'text-yellow-500 bg-yellow-100' },
    ];

    const recentOrders = [
        { id: 'ORD003', product: 'Paket Nobar (Proyektor Full HD + Layar)', status: 'Dalam Pengiriman' },
        { id: 'ORD004', product: 'Sepeda Lipat Element', status: 'Tiba di Tujuan' },
    ];

    const ActionCard = ({ icon, title, description, page, color }) => (
        <button onClick={() => onPageChange(page)} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-left w-full">
            <div className={`p-3 rounded-lg inline-block mb-4 ${color}`}>
                {icon}
            </div>
            <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 mb-4">{description}</p>
            <span className="font-semibold text-indigo-600 flex items-center text-sm">
                Lihat Detail <ArrowRight size={16} className="ml-1" />
            </span>
        </button>
    );

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                {/* Header Sambutan */}
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">Selamat Datang, {user?.name}!</h1>
                    <p className="text-gray-600 mt-2">Senang melihatmu kembali. Mari kita lihat aktivitasmu hari ini.</p>
                </div>

                {/* Kartu Statistik */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {stats.map(stat => (
                        <div key={stat.label} className="bg-white p-6 rounded-xl shadow-lg flex items-center">
                            <div className={`p-4 rounded-full mr-4 ${stat.color}`}>
                                <stat.icon className="w-6 h-6"/>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Kolom Kiri: Aksi Cepat */}
                    <div className="lg:col-span-1 space-y-6">
                        <ActionCard 
                            icon={<ShoppingBag className="w-6 h-6 text-indigo-500"/>}
                            title="Pesanan Saya"
                            description="Lacak semua pesanan sewa Anda."
                            page="my-orders"
                            color="bg-indigo-100"
                        />
                         <ActionCard 
                            icon={<UserIcon className="w-6 h-6 text-green-500"/>}
                            title="Profil & Pengaturan"
                            description="Perbarui biodata dan keamanan akun."
                            page="profile"
                            color="bg-green-100"
                        />
                         <ActionCard 
                            icon={<Package className="w-6 h-6 text-orange-500"/>}
                            title="Mode Penjual"
                            description="Kelola toko dan produk sewaan Anda."
                            page="seller-mode" // Ini akan ditangani di BuyerApp
                            color="bg-orange-100"
                        />
                    </div>

                    {/* Kolom Kanan: Aktivitas Terbaru */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Aktivitas Terbaru</h2>
                        <div className="space-y-4">
                            <p className="text-sm font-semibold text-gray-500 uppercase">Sewa Aktif</p>
                            {recentOrders.map(order => (
                                <div key={order.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">{order.product}</p>
                                        <p className="text-xs text-gray-500">ID: {order.id}</p>
                                    </div>
                                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">{order.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboardPage;
