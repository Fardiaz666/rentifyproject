// src/seller/TrackingDetailModal.js
import React, { useState } from 'react';
import { X, Package, Truck, Home, Eye, RotateCw } from 'lucide-react';

// Contoh data riwayat pelacakan untuk PENGIRIMAN
const mockDeliveryHistory = {
    'ORD003': [
        { status: 'Paket telah di-pickup oleh kurir GoSend.', date: '2 Juli 2025', time: '14:30 WIB' },
        { status: 'Kurir sedang dalam perjalanan menuju lokasi Anda.', date: '2 Juli 2025', time: '14:45 WIB' },
    ],
    'ORD004': [
        { status: 'Paket telah diserahkan ke JNE.', date: '28 Juni 2025', time: '17:00 WIB' },
        { status: 'Paket sedang diproses di pusat sortir Jakarta.', date: '29 Juni 2025', time: '02:15 WIB' },
        { status: 'Paket telah tiba di hub Bekasi.', date: '29 Juni 2025', time: '09:00 WIB' },
        { status: 'Kurir sedang dalam perjalanan menuju lokasi Anda.', date: '29 Juni 2025', time: '10:30 WIB' },
        { status: 'Paket telah tiba di tujuan.', date: '29 Juni 2025', time: '11:00 WIB' },
    ],
};

// Contoh data riwayat pelacakan untuk PENGEMBALIAN
const mockReturnHistory = {
    'ORD008': [
        { status: 'Paket pengembalian telah diserahkan ke SiCepat.', date: '4 Juli 2025', time: '10:00 WIB' },
        { status: 'Paket pengembalian sedang dalam perjalanan menuju penjual.', date: '4 Juli 2025', time: '11:30 WIB' },
    ]
};

const TrackingDetailModal = ({ isOpen, onClose, order }) => {
    const [showProof, setShowProof] = useState(false);

    if (!isOpen || !order) return null;

    // Logika untuk menentukan jenis pelacakan dan data yang relevan
    const isReturnTracking = order.status === 'Dalam Proses Pengembalian';
    const title = isReturnTracking ? 'Detail Pelacakan Pengembalian' : 'Detail Pelacakan Pengiriman';
    const trackingNumber = isReturnTracking ? order.returnTrackingNumber : order.noResi;
    const courier = isReturnTracking ? order.returnCourier : order.kurir;
    const history = isReturnTracking ? mockReturnHistory[order.id] : mockDeliveryHistory[order.id] || [];

    const getIcon = (status) => {
        if (status.toLowerCase().includes('pengembalian')) return <RotateCw className="w-5 h-5 text-white" />;
        if (status.toLowerCase().includes('diserahkan') || status.toLowerCase().includes('pickup')) return <Package className="w-5 h-5 text-white" />;
        if (status.toLowerCase().includes('perjalanan') || status.toLowerCase().includes('diantar')) return <Truck className="w-5 h-5 text-white" />;
        if (status.toLowerCase().includes('tiba')) return <Home className="w-5 h-5 text-white" />;
        return <Package className="w-5 h-5 text-white" />;
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative animate-toast-in">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                        <p className="text-sm text-gray-500">Lacak posisi terakhir barang sewaan Anda.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 flex justify-between items-center">
                        <div>
                            <p className="text-xs text-gray-500">Nomor Resi</p>
                            <p className="font-bold text-indigo-600 text-lg">{trackingNumber}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 text-right">Kurir</p>
                            <p className="font-semibold text-gray-800">{courier}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-4">Riwayat Perjalanan</h3>
                        <div className="relative border-l-2 border-dashed border-indigo-300 ml-3">
                            {history.length > 0 ? history.slice().reverse().map((item, index) => (
                                <div key={index} className="mb-6 ml-8 relative">
                                    <div className="absolute -left-[2.3rem] top-1 flex items-center justify-center w-8 h-8 bg-indigo-500 rounded-full ring-4 ring-white">{getIcon(item.status)}</div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm font-medium text-gray-800">{item.status}</p>
                                        <p className="text-xs text-gray-500 mt-1">{item.date} - {item.time}</p>
                                    </div>
                                </div>
                            )) : <p className="text-sm text-gray-500 ml-4">Belum ada riwayat perjalanan.</p>}
                        </div>
                    </div>
                    {order.proofOfDeliveryUrl && !isReturnTracking && (
                        <div className="mt-6 border-t pt-4">
                            <button onClick={() => setShowProof(true)} className="w-full bg-teal-500 text-white py-2.5 rounded-lg hover:bg-teal-600 transition duration-150 font-semibold flex items-center justify-center">
                                <Eye className="w-5 h-5 mr-2" /> Lihat Bukti Penerimaan
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {showProof && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[60] p-4" onClick={() => setShowProof(false)}>
                    <div className="relative animate-toast-in">
                        <button onClick={() => setShowProof(false)} className="absolute -top-4 -right-4 text-white bg-gray-800 rounded-full p-1"><X size={24} /></button>
                        <img src={order.proofOfDeliveryUrl} alt="Bukti Penerimaan" className="max-w-full max-h-[80vh] rounded-lg shadow-2xl" />
                    </div>
                </div>
            )}
        </>
    );
};

export default TrackingDetailModal;
