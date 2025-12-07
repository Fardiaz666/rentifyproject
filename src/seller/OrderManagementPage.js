// src/seller/OrderManagementPage.js
import React, { useState } from 'react';
import { Check, X, Clock, CheckCircle, Send, Search, MapPin, Handshake, RotateCw } from 'lucide-react';
import formatCurrency from '../utils/formatCurrency';
import InputResiModal from './InputResiModal';
import TrackingDetailModal from './TrackingDetailModal';
import ConfirmCodModal from './ConfirmCodModal';
import ReturnConfirmationModal from './ReturnConfirmationModal';

const OrderManagementPage = ({ orders, setOrders }) => {
    const [isResiModalOpen, setIsResiModalOpen] = useState(false);
    const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
    const [isCodModalOpen, setIsCodModalOpen] = useState(false);
    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleOpenResiModal = (order) => { setSelectedOrder(order); setIsResiModalOpen(true); };
    const handleCloseResiModal = () => { setIsResiModalOpen(false); setSelectedOrder(null); };
    const handleOpenTrackingModal = (order) => { setSelectedOrder(order); setIsTrackingModalOpen(true); };
    const handleCloseTrackingModal = () => { setIsTrackingModalOpen(false); setSelectedOrder(null); };
    const handleOpenCodModal = (order) => { setSelectedOrder(order); setIsCodModalOpen(true); };
    const handleCloseCodModal = () => { setIsCodModalOpen(false); setSelectedOrder(null); };
    const handleOpenReturnModal = (order) => { setSelectedOrder(order); setIsReturnModalOpen(true); };
    const handleCloseReturnModal = () => { setIsReturnModalOpen(false); setSelectedOrder(null); };

    const handleUpdateStatus = (orderId, newStatus) => {
        setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
    };

    const handleSubmitResi = (orderId, courier, trackingNumber) => {
        setOrders(orders.map(order =>
            order.id === orderId
            // --- PERBAIKAN DI SINI: Mengubah `kurir` menjadi `kurir: courier` ---
            ? { ...order, status: 'Dalam Pengiriman', kurir: courier, noResi: trackingNumber }
            : order
        ));
    };

    const getStatusChip = (status) => {
        const statuses = {
            'Menunggu Konfirmasi': { icon: Clock, color: 'yellow' },
            'Siap Dikirim': { icon: Send, color: 'purple' },
            'Diantar Kurir (COD)': { icon: Handshake, color: 'cyan' },
            'Dalam Pengiriman': { icon: CheckCircle, color: 'blue' },
            'Masa Sewa Berakhir': { icon: RotateCw, color: 'orange' },
            'Selesai': { icon: Check, color: 'green' },
            'Ditolak': { icon: X, color: 'red' },
        };
        const current = statuses[status] || { icon: Clock, color: 'gray' };
        return <span className={`inline-flex items-center bg-${current.color}-100 text-${current.color}-800 text-xs font-medium px-2.5 py-0.5 rounded-full`}><current.icon className="w-3 h-3 mr-1.5"/>{status}</span>;
    };

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Manajemen Pesanan</h1>
                <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">ID Pesanan</th>
                                <th scope="col" className="px-6 py-3">Pelanggan</th>
                                <th scope="col" className="px-6 py-3">Produk</th>
                                <th scope="col" className="px-6 py-3">Metode Bayar</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{order.id}</th>
                                    <td className="px-6 py-4">{order.customer}</td>
                                    <td className="px-6 py-4">{order.product}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-md ${order.paymentMethod === 'COD' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{order.paymentMethod}</span>
                                    </td>
                                    <td className="px-6 py-4">{getStatusChip(order.status)}</td>
                                    <td className="px-6 py-4 text-center">
                                        {order.status === 'Menunggu Konfirmasi' && (
                                            <div className="flex justify-center space-x-2">
                                                <button onClick={() => handleUpdateStatus(order.id, order.paymentMethod === 'COD' ? 'Diantar Kurir (COD)' : 'Siap Dikirim')} className="p-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200" title="Setujui Pesanan"><Check size={16} /></button>
                                                <button onClick={() => handleUpdateStatus(order.id, 'Ditolak')} className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200" title="Tolak Pesanan"><X size={16} /></button>
                                            </div>
                                        )}
                                        {order.status === 'Siap Dikirim' && (
                                            <button onClick={() => handleOpenResiModal(order)} className="bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 text-xs font-semibold flex items-center mx-auto"><Send size={14} className="mr-1.5"/> Kirim</button>
                                        )}
                                        {order.status === 'Diantar Kurir (COD)' && (
                                            <button onClick={() => handleOpenCodModal(order)} className="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 text-xs font-semibold flex items-center mx-auto"><CheckCircle size={14} className="mr-1.5"/> Selesaikan</button>
                                        )}
                                        {order.status === 'Dalam Pengiriman' && (
                                            <button onClick={() => handleOpenTrackingModal(order)} className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 text-xs font-semibold flex items-center mx-auto"><Search size={14} className="mr-1.5"/> Lacak</button>
                                        )}
                                        {order.status === 'Masa Sewa Berakhir' && (
                                            <button onClick={() => handleOpenReturnModal(order)} className="bg-orange-500 text-white px-3 py-1.5 rounded-md hover:bg-orange-600 text-xs font-semibold flex items-center mx-auto"><RotateCw size={14} className="mr-1.5"/> Konfirmasi Kembali</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <InputResiModal isOpen={isResiModalOpen} onClose={handleCloseResiModal} order={selectedOrder} onSubmit={handleSubmitResi}/>
            <TrackingDetailModal isOpen={isTrackingModalOpen} onClose={handleCloseTrackingModal} order={selectedOrder}/>
            <ConfirmCodModal isOpen={isCodModalOpen} onClose={handleCloseCodModal} order={selectedOrder} onSubmit={handleUpdateStatus}/>
            <ReturnConfirmationModal isOpen={isReturnModalOpen} onClose={handleCloseReturnModal} order={selectedOrder} onSubmit={handleUpdateStatus} />
        </>
    );
};

export default OrderManagementPage;
