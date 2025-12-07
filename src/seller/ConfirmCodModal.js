// src/seller/ConfirmCodModal.js
import React, { useState, useRef } from 'react';
import { X, Handshake, AlertTriangle, Camera, CheckCircle } from 'lucide-react';

const ConfirmCodModal = ({ isOpen, onClose, order, onSubmit }) => {
    // State untuk menyimpan preview gambar yang diupload
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Membuat URL sementara untuk preview gambar
            setSelectedPhoto(URL.createObjectURL(file));
        }
    };

    const handleUploadClick = () => {
        // Memicu klik pada input file yang tersembunyi
        fileInputRef.current.click();
    };

    const handleSubmit = () => {
        if (!selectedPhoto) {
            alert('Harap upload foto bukti serah terima terlebih dahulu.');
            return;
        }
        // Mengubah status pesanan menjadi 'Selesai'
        onSubmit(order.id, 'Selesai');
        onClose();
        // Reset foto setelah submit
        setSelectedPhoto(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-toast-in">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
                <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                    <h2 className="text-xl font-bold text-gray-800">Konfirmasi Serah Terima & Pembayaran</h2>
                </div>
                <p className="text-sm text-gray-500 mb-4">Anda akan menyelesaikan pesanan COD untuk:</p>
                <p className="font-semibold text-green-800 bg-green-50 p-3 rounded-md mb-6">{order.product}</p>

                {/* Bagian Upload Foto */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bukti Serah Terima</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            {selectedPhoto ? (
                                <img src={selectedPhoto} alt="Preview Bukti" className="mx-auto h-32 w-auto rounded-md" />
                            ) : (
                                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                            )}
                            <div className="flex text-sm text-gray-600 justify-center">
                                <button
                                    type="button"
                                    onClick={handleUploadClick}
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                                >
                                    <span>{selectedPhoto ? 'Ganti Foto' : 'Upload Foto Bukti'}</span>
                                </button>
                                <input ref={fileInputRef} id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                            </div>
                            <p className="text-xs text-gray-500">Ambil foto pembeli bersama barang.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-4 rounded-r-lg mb-6">
                    <div className="flex">
                        <div className="py-1"><AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" /></div>
                        <div>
                            <p className="font-bold text-sm">Penting!</p>
                            <p className="text-xs">Pastikan Anda sudah menerima pembayaran tunai dari pembeli sebelum menyelesaikan pesanan ini.</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={!selectedPhoto}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-150 font-semibold text-lg flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Selesaikan Pesanan
                </button>
            </div>
        </div>
    );
};

export default ConfirmCodModal;
