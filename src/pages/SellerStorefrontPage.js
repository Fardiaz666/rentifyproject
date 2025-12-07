// src/pages/SellerStorefrontPage.js
import React, { useState, useEffect } from 'react';
import { mockProducts, mockReviews } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { ChevronLeft, MapPin, Package, Star, Search } from 'lucide-react';

const SellerStorefrontPage = ({ seller, onPageChange, setSelectedProduct }) => {
    const [searchTerm, setSearchTerm] = useState('');

    if (!seller) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Penjual tidak ditemukan. Silakan kembali.</p>
                <button onClick={() => onPageChange('products')} className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-lg">Kembali</button>
            </div>
        );
    }

    // Filter produk dan ulasan yang hanya milik penjual ini
    const sellerProducts = mockProducts.filter(p => p.owner === seller.name);
    const sellerReviews = Object.values(mockReviews)
        .flat()
        .filter(review => {
            const product = mockProducts.find(p => p.id === Object.keys(mockReviews).find(key => mockReviews[key].includes(review)));
            return product && product.owner === seller.name;
        })
        .slice(0, 3); // Ambil 3 ulasan terbaru sebagai contoh

    const totalReviews = sellerProducts.reduce((acc, p) => acc + (p.reviews || 0), 0);
    
    const filteredProducts = sellerProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Seller Banner */}
            <div className="bg-white pt-12">
                <div className="container mx-auto px-6">
                    <button onClick={() => onPageChange('productDetail')} className="flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors mb-6">
                        <ChevronLeft size={18} className="mr-1" />
                        Kembali ke Detail Produk
                    </button>
                    <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gray-50 rounded-2xl shadow-inner">
                        <img src={`https://i.pravatar.cc/150?u=${seller.name}`} alt={seller.name} className="w-32 h-32 rounded-full border-4 border-white shadow-lg"/>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-extrabold text-gray-900">{seller.name}</h1>
                            <p className="mt-2 text-gray-600">Menyewakan barang berkualitas untuk kebutuhan harian dan hobi Anda.</p>
                            <div className="flex justify-center md:justify-start items-center text-sm text-gray-500 mt-4 space-x-6">
                                <span className="flex items-center"><MapPin size={16} className="mr-1.5 text-indigo-500"/> Jakarta Selatan</span>
                                <span className="flex items-center"><Package size={16} className="mr-1.5 text-indigo-500"/> {sellerProducts.length} Produk</span>
                                <span className="flex items-center"><Star size={16} className="mr-1.5 text-indigo-500"/> {totalReviews} Ulasan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Kolom Kiri: Ulasan */}
                    <aside className="lg:col-span-4 xl:col-span-3">
                        <div className="bg-white p-6 rounded-xl shadow-lg sticky top-28">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Ulasan Pelanggan</h2>
                            <div className="space-y-5">
                                {sellerReviews.length > 0 ? sellerReviews.map(review => (
                                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                                        <div className="flex items-center mb-2">
                                            <div className="flex text-yellow-400">
                                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} className="fill-current"/>)}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
                                        <p className="text-right text-xs font-bold text-gray-500 mt-2">- {review.author}</p>
                                    </div>
                                )) : <p className="text-sm text-gray-500">Belum ada ulasan untuk toko ini.</p>}
                            </div>
                        </div>
                    </aside>

                    {/* Kolom Kanan: Produk Penjual */}
                    <main className="lg:col-span-8 xl:col-span-9">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                            <h2 className="text-2xl font-bold text-gray-900 whitespace-nowrap">Semua Produk</h2>
                            <div className="relative w-full sm:w-auto">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                                <input 
                                    type="text"
                                    placeholder="Cari di toko ini..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full sm:w-64 bg-white py-2.5 pl-11 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} onPageChange={onPageChange} setSelectedProduct={setSelectedProduct} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SellerStorefrontPage;
