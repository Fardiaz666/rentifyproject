// src/seller/InputResiModal.js
import React, { useState } from 'react';
import { X, Send, Truck } from 'lucide-react';

const InputResiModal = ({ isOpen, onClose, order, onSubmit }) => {
    const [courier, setCourier] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!courier || !trackingNumber) {
            alert('Harap isi nama kurir dan nomor resi.');
            return;
        }
        onSubmit(order.id, courier, trackingNumber);
        onClose(); // Tutup modal setelah submit
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-toast-in">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
                <div className="flex items-center mb-4">
                    <Send className="w-6 h-6 mr-3 text-indigo-600" />
                    <h2 className="text-xl font-bold text-gray-800">Kirim Pesanan & Masukkan Resi</h2>
                </div>
                <p className="text-sm text-gray-500 mb-2">Anda akan mengirimkan pesanan:</p>
                <p className="font-semibold text-indigo-700 bg-indigo-50 p-2 rounded-md mb-6">{order.product}</p>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="courier" className="block text-sm font-medium text-gray-700">Nama Kurir Pengiriman</label>
                        <input
                            type="text"
                            id="courier"
                            value={courier}
                            onChange={(e) => setCourier(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="cth: JNE, SiCepat, GoSend"
                        />
                    </div>
                    <div>
                        <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700">Nomor Resi / Kode Pelacakan</label>
                        <input
                            type="text"
                            id="trackingNumber"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Masukkan nomor resi di sini"
                        />
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full mt-8 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-150 font-semibold text-lg flex items-center justify-center"
                >
                    <Truck className="w-5 h-5 mr-2" />
                    Konfirmasi Pengiriman
                </button>
            </div>
        </div>
    );
};

export default InputResiModal;
