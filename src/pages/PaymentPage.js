// src/pages/PaymentPage.js
import React, { useState, useEffect } from 'react';
import formatCurrency from '../utils/formatCurrency';
import { Clock, Copy, ChevronDown, Check } from 'lucide-react';

const PaymentPage = ({ onPageChange, orderData }) => {
    const [timeLeft, setTimeLeft] = useState(3600); // 1 jam dalam detik
    const [isCopied, setIsCopied] = useState(false);
    const [instructionsOpen, setInstructionsOpen] = useState(false);

    // Countdown Timer Logic
    useEffect(() => {
        if (!timeLeft) {
            alert('Waktu pembayaran habis!');
            onPageChange('cart'); // Arahkan kembali ke keranjang jika waktu habis
            return;
        }
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft, onPageChange]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset status "Tersalin" setelah 2 detik
    };

    if (!orderData) {
        // Pengaman jika data pesanan tidak ada
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Memuat detail pembayaran...</p>
            </div>
        );
    }

    // Contoh detail pembayaran
    const paymentDetails = {
        bank: 'BCA Virtual Account',
        vaNumber: '888081234567890',
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Selesaikan Pembayaran</h1>
                    <p className="text-gray-500 mt-1">Selesaikan pembayaran Anda sebelum waktu habis.</p>
                </div>

                {/* Countdown Timer */}
                <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-r-lg flex items-center justify-between">
                    <div className="flex items-center">
                        <Clock className="w-6 h-6 mr-3" />
                        <span className="font-medium">Selesaikan pembayaran dalam</span>
                    </div>
                    <span className="text-xl font-bold tracking-wider">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
                </div>

                {/* Detail Pembayaran */}
                <div className="border-t border-b py-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Total Pembayaran</span>
                        <span className="text-2xl font-bold text-indigo-600">{formatCurrency(orderData.total)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Metode Pembayaran</span>
                        <span className="font-semibold text-gray-800">{paymentDetails.bank}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Nomor Virtual Account</span>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-800 text-lg">{paymentDetails.vaNumber}</span>
                            <button onClick={() => handleCopy(paymentDetails.vaNumber)} className="p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition">
                                {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-500" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Instruksi Pembayaran */}
                <div>
                    <button onClick={() => setInstructionsOpen(!instructionsOpen)} className="w-full flex justify-between items-center text-left font-semibold text-gray-700">
                        Cara Pembayaran
                        <ChevronDown className={`transition-transform ${instructionsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {instructionsOpen && (
                        <div className="mt-4 text-sm text-gray-600 space-y-3 pl-2 border-l-2 border-gray-200">
                            <p><b>Via m-BCA:</b></p>
                            <ol className="list-decimal list-inside space-y-1">
                                <li>Login ke aplikasi m-BCA.</li>
                                <li>Pilih menu "m-Transfer" &gt; "BCA Virtual Account".</li>
                                <li>Masukkan Nomor Virtual Account di atas dan klik "Send".</li>
                                <li>Periksa detail transaksi lalu masukkan PIN m-BCA Anda.</li>
                                <li>Pembayaran selesai.</li>
                            </ol>
                        </div>
                    )}
                </div>

                {/* Tombol Aksi */}
                <div className="space-y-3 pt-6 border-t">
                    <button onClick={() => onPageChange('confirmation')} className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold">
                        Saya Sudah Membayar
                    </button>
                    <button onClick={() => onPageChange('cart')} className="w-full text-center text-sm text-gray-500 hover:text-indigo-600">
                        Batalkan Pesanan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
