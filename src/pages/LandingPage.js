// src/pages/LandingPage.js
import React, { useEffect, useState, useRef } from 'react';
import { Zap, ShieldCheck, Repeat, Search, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/mockData';

// Custom hook untuk animasi saat scroll
const useIntersectionObserver = (options) => {
    const [entry, setEntry] = useState(null);
    const [node, setNode] = useState(null);
    const observer = useRef(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new window.IntersectionObserver(([entry]) => setEntry(entry), options);
        if (node) observer.current.observe(node);
        return () => { if (observer.current) observer.current.disconnect() };
    }, [node, options]);

    return [setNode, entry];
};

const AnimatedSection = ({ children, className }) => {
    const [ref, entry] = useIntersectionObserver({ threshold: 0.1 });
    const isVisible = entry?.isIntersecting;
    return (
        <div ref={ref} className={`transition-all duration-1000 ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {children}
        </div>
    );
};

// Menerima prop `setSearchTerm` dan `setSelectedProduct` dari BuyerApp
const LandingPage = ({ onPageChange, setSearchTerm, setSelectedProduct }) => {
    const featuredProducts = mockProducts.slice(0, 4);
    const [inputValue, setInputValue] = useState('');

    const handleSearch = () => {
        if (inputValue.trim()) {
            setSearchTerm(inputValue);
            onPageChange('products');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative text-white py-24 md:py-40 px-6">
                <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: "url('/LandingPageGambar.png')" }}
                ></div>
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                        Satu Platform. Ribuan Solusi.
                        <br />
                        <span className="text-indigo-400">Tanpa Harus Memiliki.</span>
                    </h1>
                    <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
                        Nikmati akses tak terbatas ke barang terbaik tanpa kepemilikan, tanpa beban.
                    </p>
                    <div className="mt-10 max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text" 
                                placeholder="Cari barang apa saja yang kamu butuhkan..." 
                                className="w-full py-4 px-6 pl-14 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 shadow-lg"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-6 py-2.5 rounded-full hover:bg-indigo-700 transition font-semibold">
                                Cari
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <AnimatedSection className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Kenapa Rentify Pilihan Tepat?</h2>
                        <p className="mt-3 text-gray-600">Kami menawarkan lebih dari sekadar penyewaan.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mx-auto mb-5">
                                <Zap className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Cepat & Mudah</h3>
                            <p className="text-gray-500 text-sm">Antarmuka modern kami membuat proses pencarian dan pemesanan hanya butuh beberapa klik.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mx-auto mb-5">
                                <ShieldCheck className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Transaksi Aman</h3>
                            <p className="text-gray-500 text-sm">Dengan sistem pembayaran terenkripsi dan verifikasi pengguna, setiap transaksi dijamin aman.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mx-auto mb-5">
                                <Repeat className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Lebih Hemat & Berkelanjutan</h3>
                            <p className="text-gray-500 text-sm">Mengurangi konsumsi berlebih dengan menyewa barang berkualitas sesuai kebutuhan Anda.</p>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
            
            {/* Featured Products Section */}
            <AnimatedSection className="py-16 md:py-20">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Pilihan Populer</h2>
                        <button onClick={() => onPageChange('products')} className="text-indigo-600 font-semibold flex items-center hover:text-indigo-800 transition">
                            Lihat Semua <ArrowRight size={18} className="ml-1" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} onPageChange={onPageChange} setSelectedProduct={setSelectedProduct} />
                        ))}
                    </div>
                </div>
            </AnimatedSection>

            {/* Seller CTA Section */}
            <AnimatedSection className="bg-gray-50">
                 <div className="container mx-auto px-6 py-20">
                    <div className="bg-indigo-700 text-white p-10 rounded-2xl shadow-2xl flex flex-col lg:flex-row justify-between items-center text-center lg:text-left bg-cover" style={{ backgroundImage: "url('/cta-bg.svg')"}}>
                        <div>
                            <h2 className="text-3xl font-bold">Punya Barang Nganggur?</h2>
                            <p className="mt-2 text-indigo-200 max-w-xl">Jangan biarkan aset Anda diam. Ubah menjadi sumber penghasilan pasif dengan menyewakannya di Rentify!</p>
                        </div>
                        <button onClick={() => onPageChange('login')} className="mt-6 lg:mt-0 bg-white text-indigo-600 font-bold px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-transform hover:scale-105 whitespace-nowrap shadow-lg">
                            Mulai Menyewakan
                        </button>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
};

export default LandingPage;
