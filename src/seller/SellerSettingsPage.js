// src/seller/SellerSettingsPage.js
import React, { useState } from 'react';
import { Building, Banknote, Save } from 'lucide-react';

const SellerSettingsPage = () => {
    const [storeInfo, setStoreInfo] = useState({
        storeName: 'Toko Sewa Serbaguna',
        description: 'Menyewakan berbagai macam barang berkualitas untuk segala kebutuhan Anda.',
    });

    const [bankInfo, setBankInfo] = useState({
        bankName: 'BCA',
        accountHolder: 'Fardiaz Dwi Arafat',
        accountNumber: '8881234567',
    });

    const handleStoreChange = (e) => {
        setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value });
    };
    
    const handleBankChange = (e) => {
        setBankInfo({ ...bankInfo, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Pengaturan Toko</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Informasi Toko */}
                <div className="bg-white p-8 rounded-xl shadow-md">
                    <div className="flex items-center mb-6">
                        <Building className="w-6 h-6 mr-3 text-indigo-600" />
                        <h2 className="text-xl font-bold text-gray-800">Informasi Toko</h2>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">Nama Toko</label>
                            <input type="text" name="storeName" id="storeName" value={storeInfo.storeName} onChange={handleStoreChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi Toko</label>
                            <textarea name="description" id="description" rows="3" value={storeInfo.description} onChange={handleStoreChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                        </div>
                    </div>
                </div>

                {/* Informasi Bank */}
                <div className="bg-white p-8 rounded-xl shadow-md">
                    <div className="flex items-center mb-6">
                        <Banknote className="w-6 h-6 mr-3 text-green-600" />
                        <h2 className="text-xl font-bold text-gray-800">Rekening Pencairan Dana</h2>
                    </div>
                     <div className="space-y-4">
                        <div>
                            <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Nama Bank</label>
                            <select name="bankName" id="bankName" value={bankInfo.bankName} onChange={handleBankChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option>BCA</option>
                                <option>Mandiri</option>
                                <option>BRI</option>
                                <option>BNI</option>
                            </select>
                        </div>
                         <div>
                            <label htmlFor="accountHolder" className="block text-sm font-medium text-gray-700">Nama Pemilik Rekening</label>
                            <input type="text" name="accountHolder" id="accountHolder" value={bankInfo.accountHolder} onChange={handleBankChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">Nomor Rekening</label>
                            <input type="number" name="accountNumber" id="accountNumber" value={bankInfo.accountNumber} onChange={handleBankChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <button className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-bold text-base shadow-lg">
                    <Save className="w-5 h-5 mr-2"/>
                    Simpan Semua Perubahan
                </button>
            </div>
        </div>
    );
};

export default SellerSettingsPage;
