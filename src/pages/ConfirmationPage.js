// src/pages/ConfirmationPage.js
import React, { useEffect, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import formatCurrency from '../utils/formatCurrency';
import { CheckCircle, Home, Truck, MapPin, User, Mail, Phone, CreditCard } from 'lucide-react';

const ConfirmationPage = ({ onPageChange, orderData, setTrackingOrder }) => {
    const { clearCart } = useContext(CartContext);

    // Mengosongkan keranjang setelah pesanan berhasil dibuat
    useEffect(() => {
        if (orderData) {
            clearCart();
        }
    }, [orderData, clearCart]);

    const handleTrackOrder = () => {
        setTrackingOrder(orderData);
        onPageChange('tracking');
    };

    if (!orderData) {
        // Pengaman jika pengguna me-refresh halaman atau data hilang
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
                <h2 className="text-2xl font-semibold text-gray-700">Oops! Data pesanan tidak ditemukan.</h2>
                <p className="text-gray-500 mt-2 mb-6">Mungkin Anda telah me-refresh halaman ini.</p>
                <button onClick={() => onPageChange('home')} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
                    Kembali ke Beranda
                </button>
            </div>
        );
    }
    
    // Simulasi estimasi tanggal tiba (2-4 hari dari sekarang)
    const getEstimatedDelivery = () => {
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 3); // Estimasi 3 hari
        return deliveryDate.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    const estimatedDelivery = getEstimatedDelivery();

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                {/* Header Sukses */}
                <div className="text-center border-b-2 border-dashed pb-8 mb-8">
                    <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4">Pembayaran Berhasil!</h1>
                    <p className="text-gray-600 mt-2">Terima kasih! Pesanan Anda sedang kami siapkan.</p>
                    <p className="text-sm text-gray-500 mt-1">ID Pesanan: <span className="font-semibold text-indigo-600">{orderData.orderId}</span></p>
                </div>

                {/* Detail Pesanan */}
                <div className="space-y-8">
                    {/* Ringkasan Item */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Pesanan</h2>
                        <div className="space-y-4">
                            {orderData.items.map(item => (
                                <div key={item.product.id} className="flex items-center gap-4">
                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded-md"/>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-800">{item.product.name}</p>
                                        <p className="text-xs text-gray-500">{item.quantity} hari</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-800">{formatCurrency(item.product.pricePerDay * item.quantity)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rincian Biaya */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Rincian Biaya</h2>
                        <div className="space-y-2 text-sm border-t pt-4">
                            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatCurrency(orderData.subtotal)}</span></div>
                            <div className="flex justify-between text-gray-600"><span>Biaya Penanganan</span><span>{formatCurrency(orderData.handlingFee)}</span></div>
                            <div className="flex justify-between text-gray-600"><span>Biaya Layanan Rentify</span><span>{formatCurrency(orderData.platformFee)}</span></div>
                            {orderData.shippingFee > 0 && (<div className="flex justify-between text-gray-600"><span>Biaya Pengiriman</span><span>{formatCurrency(orderData.shippingFee)}</span></div>)}
                            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 mt-2 border-t">
                                <span>Total Dibayar</span>
                                <span>{formatCurrency(orderData.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Detail Pengiriman & Pembayaran */}
                    <div className="grid md:grid-cols-2 gap-8 border-t pt-8">
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Detail Pengiriman</h2>
                            <div className="text-sm space-y-2 text-gray-600">
                                <p className="font-semibold text-gray-800">{orderData.name}</p>
                                <p>{orderData.phone}</p>
                                <p>{orderData.address}</p>
                                <div className="pt-2">
                                    <p className="font-semibold">Estimasi Tiba:</p>
                                    <p className="text-indigo-600 font-bold">{estimatedDelivery}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Info Pembayaran</h2>
                            <div className="text-sm space-y-2 text-gray-600">
                                <p className="font-semibold">Metode Pembayaran:</p>
                                <p className="capitalize">{orderData.paymentMethod.replace('_', ' ')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tombol Aksi */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <button onClick={() => onPageChange('home')} className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition font-semibold flex items-center justify-center">
                        <Home size={18} className="mr-2"/> Kembali ke Beranda
                    </button>
                    <button onClick={handleTrackOrder} className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold flex items-center justify-center">
                        <Truck size={18} className="mr-2"/> Lacak Pesanan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;
