// src/components/ReturnShipmentModal.js
import React, { useState } from 'react';
import { X, Send, MapPin, AlertTriangle } from 'lucide-react';

const ReturnShipmentModal = ({ isOpen, onClose, order, onSubmit }) => {
    const [courier, setCourier] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!courier || !trackingNumber) {
            alert('Harap isi nama kurir dan nomor resi pengembalian.');
            return;
        }
        onSubmit(order.id, courier, trackingNumber);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative animate-toast-in">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
                <div className="flex items-center mb-4">
                    <Send className="w-6 h-6 mr-3 text-orange-500" />
                    <h2 className="text-xl font-bold text-gray-800">Atur Pengembalian Barang</h2>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">Silakan kembalikan barang berikut:</p>
                    <p className="font-semibold text-indigo-700">{order.product}</p>
                    <hr className="my-3"/>
                    <div className="flex items-start">
                        <MapPin className="w-5 h-5 mr-3 mt-1 text-gray-400"/>
                        <div>
                            <p className="text-xs text-gray-500">Alamat Pengembalian (Penjual)</p>
                            <p className="font-semibold text-gray-800">{order.seller}</p>
                            <p className="text-sm text-gray-600">Jl. Raya Lenteng Agung No. 20, Jagakarsa, Jakarta Selatan, 12610</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    <div>
                        <label htmlFor="returnCourier" className="block text-sm font-medium text-gray-700">Nama Kurir Pengembalian</label>
                        <input
                            type="text"
                            id="returnCourier"
                            value={courier}
                            onChange={(e) => setCourier(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="cth: JNE, TIKI, Anteraja"
                        />
                    </div>
                    <div>
                        <label htmlFor="returnTrackingNumber" className="block text-sm font-medium text-gray-700">Nomor Resi Pengembalian</label>
                        <input
                            type="text"
                            id="returnTrackingNumber"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Masukkan nomor resi di sini"
                        />
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={!courier || !trackingNumber}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold text-lg flex items-center justify-center disabled:bg-gray-400"
                >
                    Konfirmasi Pengiriman Kembali
                </button>
            </div>
        </div>
    );
};

export default ReturnShipmentModal;
