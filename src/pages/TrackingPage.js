// src/pages/TrackingPage.js
import React, { useState } from 'react';
import { CheckCircle, Package, Clipboard, ClipboardCheck } from 'lucide-react';

const TrackingPage = ({ onPageChange, orderData }) => {
    const [isCopied, setIsCopied] = useState(false);

    if (!orderData) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-semibold">Pesanan tidak ditemukan.</h2>
                <button onClick={() => onPageChange('home')} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
                    Kembali ke Beranda
                </button>
            </div>
        );
    }

    const trackingNumber = `RNTFY${orderData.orderId.slice(-8)}`;
    const copyToClipboard = () => {
        navigator.clipboard.writeText(trackingNumber).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    // Simulasi status pesanan
    const trackingSteps = ["Pesanan Diterima", "Diproses Penjual", "Dalam Pengiriman", "Tiba di Tujuan"];
    const currentStep = 2; // Contoh: Pesanan sedang dikirim

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Lacak Pesanan</h1>
            <p className="text-gray-500 mb-8">ID Pesanan: <span className="font-medium text-gray-700">{orderData.orderId}</span></p>

            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
                <h2 className="text-xl font-semibold mb-6">Status Pengiriman</h2>
                <div className="flex justify-between items-center">
                    {trackingSteps.map((step, index) => (
                        <React.Fragment key={step}>
                            <div className="flex flex-col items-center text-center w-1/4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    {index < currentStep ? <CheckCircle/> : <Package/>}
                                </div>
                                <p className={`mt-2 text-xs md:text-sm font-medium ${index <= currentStep ? 'text-indigo-600' : 'text-gray-500'}`}>{step}</p>
                            </div>
                            {index < trackingSteps.length - 1 && <div className={`flex-1 h-1 mx-2 ${index < currentStep ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Informasi Pengiriman</h3>
                    <div className="space-y-2 text-sm">
                        <p><strong className="font-medium text-gray-600">Kurir:</strong> Rentify Express</p>
                        <div className="flex items-center">
                            <strong className="font-medium text-gray-600">No. Resi:</strong>
                            <span className="ml-2 text-indigo-600 font-mono bg-indigo-50 px-2 py-1 rounded">{trackingNumber}</span>
                            <button onClick={copyToClipboard} className="ml-2 text-gray-500 hover:text-indigo-600">
                                {isCopied ? <ClipboardCheck size={18}/> : <Clipboard size={18} />}
                            </button>
                        </div>
                        <p><strong className="font-medium text-gray-600">Alamat:</strong> {orderData.address}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Ringkasan Barang</h3>
                    <ul className="space-y-2">
                        {orderData.items.map(item => (
                            <li key={item.product.id} className="flex items-center text-sm">
                                <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 rounded-md object-cover mr-4"/>
                                <span>{item.product.name} (x{item.quantity} hari)</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TrackingPage;
