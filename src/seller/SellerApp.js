// src/seller/SellerApp.js
import React, { useState, useEffect } from 'react';
import SellerSidebar from './SellerSidebar';
import SellerDashboardPage from './SellerDashboardPage';
import MyProductsPage from './MyProductsPage';
import OrderManagementPage from './OrderManagementPage';
import SellerSettingsPage from './SellerSettingsPage';

const SellerApp = ({ setViewMode }) => {
    const [activePage, setActivePage] = useState('dashboard');
    const [productCount, setProductCount] = useState(0);
    const [orders, setOrders] = useState([
        { id: 'ORD001', customer: 'Budi Santoso', product: 'Kamera Mirrorless Sony A6400', date: '2025-07-04', status: 'Menunggu Konfirmasi', total: 400000, kurir: null, noResi: null, paymentMethod: 'Transfer', proofOfDeliveryUrl: null },
        { id: 'ORD002', customer: 'Citra Lestari', product: 'Sewa NMAX Harian', date: '2025-07-03', status: 'Siap Dikirim', total: 180000, kurir: null, noResi: null, paymentMethod: 'Transfer', proofOfDeliveryUrl: null },
        { id: 'ORD006', customer: 'Hadi Prasetyo', product: 'Koper Kabin Kece', date: '2025-07-04', status: 'Diantar Kurir (COD)', total: 100000, kurir: null, noResi: null, paymentMethod: 'COD', proofOfDeliveryUrl: null },
        { id: 'ORD003', customer: 'Rian Ardianto', product: 'Paket Nobar (Proyektor Full HD + Layar)', date: '2025-07-02', status: 'Dalam Pengiriman', total: 360000, kurir: 'GoSend Instant', noResi: 'GK-123456789', paymentMethod: 'Transfer', proofOfDeliveryUrl: null },
        { id: 'ORD004', customer: 'Dewi Anggraini', product: 'Sepeda Lipat Element', date: '2025-06-28', status: 'Masa Sewa Berakhir', total: 120000, kurir: 'JNE', noResi: 'JNE12345XYZ', paymentMethod: 'Transfer', proofOfDeliveryUrl: 'https://placehold.co/600x400/22C55E/FFFFFF?text=Bukti+Diterima' },
        { id: 'ORD005', customer: 'Agus Setiawan', product: 'Drone DJI Mini 2', date: '2025-06-25', status: 'Selesai', total: 350000, kurir: 'J&T Express', noResi: 'JT123XYZ', paymentMethod: 'Transfer', proofOfDeliveryUrl: 'https://placehold.co/600x400/10B981/FFFFFF?text=Bukti+Selesai' },
    ]);

    useEffect(() => {
        try {
            const storedProducts = localStorage.getItem('seller_products');
            if (storedProducts) {
                setProductCount(JSON.parse(storedProducts).length);
            }
        } catch (error) {
            console.error("Gagal memuat jumlah produk untuk dashboard", error);
        }
    }, [activePage]);

    const renderPage = () => {
        switch(activePage) {
            case 'dashboard':
                // --- PERUBAHAN DI SINI: Meneruskan `setActivePage` ke dashboard ---
                return <SellerDashboardPage productCount={productCount} orders={orders} setViewMode={setViewMode} setActivePage={setActivePage} />;
            case 'products':
                return <MyProductsPage setProductCount={setProductCount} />;
            case 'orders':
                return <OrderManagementPage orders={orders} setOrders={setOrders} />;
            case 'settings':
                return <SellerSettingsPage />;
            default:
                return <SellerDashboardPage productCount={productCount} orders={orders} setViewMode={setViewMode} setActivePage={setActivePage} />;
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SellerSidebar activePage={activePage} setActivePage={setActivePage} setViewMode={setViewMode}/>
            <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
                {renderPage()}
            </main>
        </div>
    );
};

export default SellerApp;
