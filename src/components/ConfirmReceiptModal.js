// src/components/ConfirmReceiptModal.js
import React, { useState, useRef } from 'react';
import { X, Camera, CheckCircle } from 'lucide-react';

const ConfirmReceiptModal = ({ isOpen, onClose, order, onSubmit }) => {
    const [proofPhoto, setProofPhoto] = useState(null);
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProofPhoto(URL.createObjectURL(file));
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = () => {
        if (!proofPhoto) {
            alert('Harap upload foto bukti penerimaan barang.');
            return;
        }
        onSubmit(order.id, 'Masa Sewa Berakhir', proofPhoto);
        onClose();
        setProofPhoto(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-toast-in">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
                <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 mr-3 text-teal-600" />
                    <h2 className="text-xl font-bold text-gray-800">Konfirmasi Penerimaan Barang</h2>
                </div>
                <p className="text-sm text-gray-500 mb-4">Anda akan mengkonfirmasi penerimaan untuk:</p>
                <p className="font-semibold text-teal-800 bg-teal-50 p-3 rounded-md mb-6">{order.product}</p>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Foto Bukti</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            {proofPhoto ? (
                                <img src={proofPhoto} alt="Preview Bukti" className="mx-auto h-32 w-auto rounded-md" />
                            ) : (
                                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                            )}
                            <div className="flex text-sm text-gray-600 justify-center">
                                <button type="button" onClick={handleUploadClick} className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                                    <span>{proofPhoto ? 'Ganti Foto' : 'Pilih Foto'}</span>
                                </button>
                                <input ref={fileInputRef} type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                            </div>
                            <p className="text-xs text-gray-500">Contoh: Foto diri Anda bersama barang.</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={!proofPhoto}
                    className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition font-semibold text-lg flex items-center justify-center disabled:bg-gray-400"
                >
                    Saya Sudah Menerima Barang
                </button>
            </div>
        </div>
    );
};

export default ConfirmReceiptModal;
