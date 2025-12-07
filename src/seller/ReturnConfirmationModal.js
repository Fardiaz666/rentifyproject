// src/seller/ReturnConfirmationModal.js
import React, { useState, useRef } from 'react';
import { X, CheckCircle, AlertCircle, Camera, ThumbsUp, ThumbsDown } from 'lucide-react';

const ReturnConfirmationModal = ({ isOpen, onClose, order, onSubmit }) => {
    const [condition, setCondition] = useState('baik'); // 'baik' atau 'rusak'
    const [notes, setNotes] = useState('');
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
        if (condition === 'rusak' && !proofPhoto) {
            alert('Harap upload foto bukti kerusakan.');
            return;
        }
        // Kirim data kondisi dan catatan jika ada
        onSubmit(order.id, 'Selesai', { condition, notes, proofPhoto });
        onClose();
        // Reset state
        setCondition('baik');
        setNotes('');
        setProofPhoto(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative animate-toast-in">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
                <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                    <h2 className="text-xl font-bold text-gray-800">Konfirmasi Pengembalian Barang</h2>
                </div>
                <p className="text-sm text-gray-500 mb-4">Anda akan menyelesaikan pesanan untuk:</p>
                <p className="font-semibold text-green-800 bg-green-50 p-3 rounded-md mb-6">{order.product}</p>

                {/* Pilihan Kondisi Barang */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bagaimana kondisi barang yang dikembalikan?</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setCondition('baik')} className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all ${condition === 'baik' ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                            <ThumbsUp className={`w-8 h-8 mb-2 ${condition === 'baik' ? 'text-green-600' : 'text-gray-400'}`} />
                            <span className={`font-semibold ${condition === 'baik' ? 'text-green-700' : 'text-gray-600'}`}>Kondisi Baik</span>
                        </button>
                        <button onClick={() => setCondition('rusak')} className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all ${condition === 'rusak' ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}>
                            <ThumbsDown className={`w-8 h-8 mb-2 ${condition === 'rusak' ? 'text-red-600' : 'text-gray-400'}`} />
                            <span className={`font-semibold ${condition === 'rusak' ? 'text-red-700' : 'text-gray-600'}`}>Ada Kerusakan</span>
                        </button>
                    </div>
                </div>

                {/* Form Kerusakan (jika dipilih) */}
                {condition === 'rusak' && (
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200 animate-toast-in">
                        <div className="flex items-center mb-3">
                            <AlertCircle className="w-5 h-5 mr-2 text-red-600"/>
                            <h4 className="font-semibold text-red-800">Laporkan Kerusakan</h4>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Catatan Kerusakan</label>
                                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" placeholder="Jelaskan kerusakan pada barang..." className="w-full border-gray-300 rounded-md shadow-sm text-sm"></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Upload Foto Bukti</label>
                                {proofPhoto ? (
                                     <div className="relative w-32 h-32">
                                        <img src={proofPhoto} alt="Bukti Kerusakan" className="w-full h-full object-cover rounded-md"/>
                                        <button onClick={() => setProofPhoto(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X size={14}/></button>
                                     </div>
                                ) : (
                                    <button onClick={handleUploadClick} className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-300 border-dashed rounded-md text-sm text-gray-600 hover:bg-gray-50">
                                        <Camera className="w-5 h-5 mr-2"/> Klik untuk upload
                                    </button>
                                )}
                                <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </div>
                        </div>
                    </div>
                )}
                
                <button
                    onClick={handleSubmit}
                    className="w-full mt-8 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-150 font-semibold text-lg flex items-center justify-center"
                >
                    Selesaikan Transaksi
                </button>
            </div>
        </div>
    );
};

export default ReturnConfirmationModal;
