// src/pages/MyOrdersPage.js
import React, { useState } from 'react';
import { Search, RotateCw, CheckCircle, Truck, Package, Check, Clock, ShoppingBag } from 'lucide-react';
import formatCurrency from '../utils/formatCurrency';
import ConfirmReceiptModal from '../components/ConfirmReceiptModal';
import TrackingDetailModal from '../seller/TrackingDetailModal';
import ReturnShipmentModal from '../components/ReturnShipmentModal';

const MyOrdersPage = ({ onPageChange }) => {
    // --- PERUBAHAN DI SINI: Tanggal pesanan telah diperbarui ---
    const [orders, setOrders] = useState([
        { id: 'ORD001', product: 'Kamera Mirrorless Sony A6400', date: '2025-07-04', status: 'Belum Dikirim', total: 400000, seller: 'KameraKita', imageUrl: '/Kamera.jpg' },
        { id: 'ORD003', product: 'Paket Nobar (Proyektor Full HD + Layar)', date: '2025-07-03', status: 'Dalam Pengiriman', total: 360000, seller: 'LayarTancep Modern', imageUrl: '/Proyektor.jpg', kurir: 'GoSend Instant', noResi: 'GK-123456789' },
        { id: 'ORD004', product: 'Sepeda Lipat Element', date: '2025-07-02', status: 'Tiba di Tujuan', total: 120000, seller: 'Gowes Kuy', imageUrl: '/Sepeda.jpg', kurir: 'JNE', noResi: 'JNE12345XYZ', proofOfDeliveryUrl: 'https://placehold.co/600x400/22C55E/FFFFFF?text=Bukti+Diterima' },
        { id: 'ORD007', product: 'Sewa NMAX Harian', date: '2025-06-27', status: 'Masa Sewa Berakhir', total: 180000, seller: 'JuraganSewa Motor', imageUrl: '/Nmax.jpg' },
        { id: 'ORD008', product: 'Koper Kabin Kece', date: '2025-07-04', status: 'Dalam Proses Pengembalian', total: 100000, seller: 'SewaKoper Aja', imageUrl: '/Koper.jpeg', returnCourier: 'SiCepat', returnTrackingNumber: 'SC-987654321' },
        { id: 'ORD005', product: 'Drone DJI Mini 2', date: '2025-06-25', status: 'Selesai', total: 350000, seller: 'Terbangin Drone', imageUrl: '/Drone.jpg' },
    ]);
    
    const [activeTab, setActiveTab] = useState('Semua');
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
    const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleOpenReceiptModal = (order) => { setSelectedOrder(order); setIsReceiptModalOpen(true); };
    const handleCloseReceiptModal = () => { setIsReceiptModalOpen(false); setSelectedOrder(null); };
    const handleOpenTrackingModal = (order) => { setSelectedOrder(order); setIsTrackingModalOpen(true); };
    const handleCloseTrackingModal = () => { setIsTrackingModalOpen(false); setSelectedOrder(null); };
    const handleOpenReturnModal = (order) => { setSelectedOrder(order); setIsReturnModalOpen(true); };
    const handleCloseReturnModal = () => { setIsReturnModalOpen(false); setSelectedOrder(null); };

    const handleConfirmReceipt = (orderId, newStatus, proofPhoto) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus, proofOfDeliveryUrl: proofPhoto } : o));
    };

    const handleSubmitReturn = (orderId, returnCourier, returnTrackingNumber) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'Dalam Proses Pengembalian', returnCourier, returnTrackingNumber } : o));
    };

    const getStatusInfo = (status) => {
        const statuses = {
            'Belum Dikirim': { icon: Package, color: 'purple', text: 'Pesananmu sedang disiapkan penjual.', progress: 25 },
            'Dalam Pengiriman': { icon: Truck, color: 'blue', text: 'Barang sedang dalam perjalanan ke lokasimu.', progress: 50 },
            'Tiba di Tujuan': { icon: CheckCircle, color: 'teal', text: 'Barang sudah sampai! Mohon konfirmasi.', progress: 75 },
            'Masa Sewa Berakhir': { icon: RotateCw, color: 'orange', text: 'Waktunya mengembalikan barang.', progress: 75 },
            'Dalam Proses Pengembalian': { icon: Truck, color: 'blue', text: 'Barang sedang dalam perjalanan kembali ke penjual.', progress: 90 },
            'Selesai': { icon: Check, color: 'green', text: 'Transaksi sewa telah selesai.', progress: 100 },
        };
        return statuses[status] || { icon: Clock, color: 'gray', text: 'Status tidak diketahui.', progress: 0 };
    };

    const filteredOrders = orders.filter(order => {
        if (activeTab === 'Semua') return true;
        if (activeTab === 'Belum Dikirim') return order.status === 'Belum Dikirim';
        if (activeTab === 'Dikirim') return ['Dalam Pengiriman', 'Tiba di Tujuan', 'Masa Sewa Berakhir', 'Dalam Proses Pengembalian'].includes(order.status);
        if (activeTab === 'Selesai') return order.status === 'Selesai';
        return false;
    });

    const TabButton = ({ label }) => (
        <button onClick={() => setActiveTab(label)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeTab === label ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 bg-white hover:bg-gray-100'}`}>
            {label}
        </button>
    );

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Pesanan Saya</h1>
                    <p className="text-gray-500 mb-8">Lacak dan kelola semua riwayat sewa Anda di sini.</p>

                    <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
                        <TabButton label="Semua" />
                        <TabButton label="Belum Dikirim" />
                        <TabButton label="Dikirim" />
                        <TabButton label="Selesai" />
                    </div>

                    <div className="space-y-6">
                        {filteredOrders.length > 0 ? filteredOrders.map(order => {
                            const statusInfo = getStatusInfo(order.status);
                            return (
                                <div key={order.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4 mb-4">
                                            <div>
                                                <p className="text-xs font-semibold text-indigo-600">{order.id}</p>
                                                <p className="text-sm text-gray-500">Tanggal: {order.date}</p>
                                            </div>
                                            <div className={`inline-flex items-center bg-${statusInfo.color}-100 text-${statusInfo.color}-800 text-xs font-bold px-3 py-1 rounded-full mt-2 sm:mt-0`}>
                                                <statusInfo.icon className={`w-4 h-4 mr-1.5`} />
                                                {order.status}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-5">
                                            <img src={order.imageUrl} alt={order.product} className="w-24 h-24 object-cover rounded-lg" />
                                            <div className="flex-1">
                                                <p className="font-bold text-lg text-gray-800">{order.product}</p>
                                                <p className="text-sm text-gray-500">Disewa dari <span className="font-semibold">{order.seller}</span></p>
                                                <p className="font-bold text-gray-800 mt-2">{formatCurrency(order.total)}</p>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <p className="text-xs text-gray-500 mb-1">{statusInfo.text}</p>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className={`bg-${statusInfo.color}-500 h-2 rounded-full transition-all duration-500`} style={{ width: `${statusInfo.progress}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-6 py-4 flex justify-end">
                                        {order.status === 'Dalam Pengiriman' && <button onClick={() => handleOpenTrackingModal(order)} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">Lacak Kiriman</button>}
                                        {order.status === 'Tiba di Tujuan' && <button onClick={() => handleOpenReceiptModal(order)} className="bg-teal-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-teal-700 transition">Konfirmasi Penerimaan</button>}
                                        {order.status === 'Masa Sewa Berakhir' && <button onClick={() => handleOpenReturnModal(order)} className="bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition">Atur Pengembalian</button>}
                                        {order.status === 'Dalam Proses Pengembalian' && <button onClick={() => handleOpenTrackingModal(order)} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">Lacak Pengembalian</button>}
                                        {order.status === 'Selesai' && <button onClick={() => onPageChange('products')} className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">Sewa Lagi</button>}
                                    </div>
                                </div>
                            )
                        }) : (
                            <div className="text-center py-20 bg-white rounded-xl shadow-lg">
                                <ShoppingBag size={56} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-2xl font-bold text-gray-800">Belum Ada Pesanan</h3>
                                <p className="text-gray-500 mt-2 mb-6">Yuk, mulai sewa barang pertama Anda di Rentify!</p>
                                <button onClick={() => onPageChange('products')} className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition text-sm font-semibold">
                                    Mulai Menyewa Sekarang
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ConfirmReceiptModal isOpen={isReceiptModalOpen} onClose={handleCloseReceiptModal} order={selectedOrder} onSubmit={handleConfirmReceipt} />
            <TrackingDetailModal isOpen={isTrackingModalOpen} onClose={handleCloseTrackingModal} order={selectedOrder} />
            <ReturnShipmentModal isOpen={isReturnModalOpen} onClose={handleCloseReturnModal} order={selectedOrder} onSubmit={handleSubmitReturn} />
        </>
    );
};

export default MyOrdersPage;
