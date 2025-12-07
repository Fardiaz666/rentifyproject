// src/seller/SellerDashboardPage.js
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Package, DollarSign, CheckCircle, Clock, Check, PlusCircle, Eye, Star } from 'lucide-react';
import formatCurrency from '../utils/formatCurrency';
import RevenueChart from './RevenueChart';

const SellerDashboardPage = ({ productCount, orders, setViewMode, setActivePage }) => {
    const { user } = useContext(AuthContext); // Mengambil data pengguna untuk pesan selamat datang

    // Contoh data untuk grafik pendapatan
    const revenueData = [
        { month: 'Jan', revenue: 1200000 },
        { month: 'Feb', revenue: 1800000 },
        { month: 'Mar', revenue: 1500000 },
        { month: 'Apr', revenue: 2500000 },
        { month: 'Mei', revenue: 2200000 },
        { month: 'Jun', revenue: 3100000 },
        { month: 'Jul', revenue: 1900000 },
    ];
    
    // Contoh data untuk ulasan terbaru
    const recentReviews = [
        { customer: 'Budi Santoso', rating: 5, product: 'Kamera Sony A6400' },
        { customer: 'Citra Lestari', rating: 4, product: 'Sewa NMAX Harian' },
        { customer: 'Rian Ardianto', rating: 5, product: 'Paket Nobar' },
    ];

    const totalRevenue = orders.reduce((sum, order) => sum + (order.status === 'Selesai' ? order.total : 0), 0);
    const pendingOrders = orders.filter(order => order.status === 'Menunggu Konfirmasi').length;

    const stats = [
        { label: "Total Pendapatan", value: formatCurrency(totalRevenue), icon: DollarSign, color: "text-green-500 bg-green-50" },
        { label: "Pesanan Menunggu", value: pendingOrders, icon: Clock, color: "text-yellow-500 bg-yellow-50" },
        { label: "Total Produk", value: productCount, icon: Package, color: "text-purple-500 bg-purple-50" },
    ];

    const getStatusChip = (status) => {
        const statuses = {
            'Menunggu Konfirmasi': { icon: Clock, color: 'yellow' },
            'Selesai': { icon: Check, color: 'green' },
        };
        const current = statuses[status] || { icon: Clock, color: 'gray' };
        return <span className={`inline-flex items-center bg-${current.color}-100 text-${current.color}-800 text-xs font-medium px-2.5 py-0.5 rounded-full`}><current.icon className="w-3 h-3 mr-1.5"/>{status}</span>;
    };

    return (
        <div className="space-y-8">
            {/* Header Dashboard */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Selamat Datang, {user?.name.split(' ')[0]}!</h1>
                    <p className="text-gray-500 mt-1">Berikut adalah ringkasan aktivitas tokomu hari ini.</p>
                </div>
                <div className="flex space-x-3">
                    <button onClick={() => setViewMode('buyer', 'seller-storefront')} className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 border border-gray-200 text-sm font-semibold flex items-center">
                        <Eye size={16} className="mr-2"/>
                        Lihat Toko
                    </button>
                    <button onClick={() => setActivePage('products')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 text-sm font-semibold flex items-center">
                        <PlusCircle size={16} className="mr-2"/>
                        Tambah Produk
                    </button>
                </div>
            </div>

            {/* Kartu Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map(stat => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex justify-between items-center">
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                <stat.icon className="w-6 h-6"/>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800 mt-4">{stat.value}</p>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Grafik Pendapatan */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg h-96 flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Grafik Pendapatan</h2>
                    <RevenueChart data={revenueData} />
                </div>
                
                {/* Aktivitas Terbaru */}
                <div className="space-y-8">
                    {/* Pesanan Terbaru */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Pesanan Terbaru</h2>
                            <button onClick={() => setActivePage('orders')} className="text-sm font-medium text-indigo-600 hover:underline">Lihat Semua</button>
                        </div>
                        <div className="space-y-4">
                            {orders.slice(0, 3).map(order => (
                                <div key={order.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-sm text-gray-800">{order.customer}</p>
                                        <p className="text-xs text-gray-500">{order.product}</p>
                                    </div>
                                    {getStatusChip(order.status)}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Ulasan Terbaru */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Ulasan Terbaru</h2>
                        </div>
                        <div className="space-y-4">
                            {recentReviews.map((review, index) => (
                                <div key={index} className="flex items-start">
                                    <img src={`https://i.pravatar.cc/40?u=${review.customer}`} alt={review.customer} className="w-10 h-10 rounded-full mr-3"/>
                                    <div>
                                        <p className="font-medium text-sm text-gray-800">{review.customer}</p>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                 <Star key={i} size={14} className={`mr-0.5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboardPage;
