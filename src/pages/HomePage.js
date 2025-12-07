// src/pages/HomePage.js
import React from 'react';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/mockData';
import { Search, ArrowRight, Star, ShieldCheck, Zap, Repeat } from 'lucide-react';

const HomePage = ({ onPageChange, setSelectedProduct }) => {
    
    // Ambil beberapa produk untuk ditampilkan sebagai pilihan teratas
    const featuredProducts = mockProducts.slice(0, 4);

    const categories = [
        { name: 'Kendaraan', icon: '🚗' },
        { name: 'Properti', icon: '🏠' },
        { name: 'Elektronik', icon: '📷' },
        { name: 'Pakaian', icon: '👕' },
        { name: 'Hobi', icon: '🎮' },
    ];

    const howItWorksSteps = [
        { icon: Zap, title: 'Cari & Pilih', description: 'Temukan barang yang kamu butuhkan dari ribuan pilihan.' },
        { icon: ShieldCheck, title: 'Sewa Aman', description: 'Lakukan pembayaran aman dan atur pengiriman dengan mudah.' },
        { icon: Repeat, title: 'Nikmati & Kembalikan', description: 'Gunakan barang sesuai kebutuhan, lalu kembalikan tepat waktu.' },
    ];

    const testimonials = [
        { name: 'Budi Santoso', comment: '"Proses sewa kameranya cepet banget dan barangnya berkualitas. Bikin konten jadi makin pede!"', avatar: 'https://i.pravatar.cc/150?u=budi' },
        { name: 'Citra Lestari', comment: '"Nggak perlu beli koper mahal buat liburan sekali-sekali. Di Rentify, semuanya jadi lebih hemat dan praktis."', avatar: 'https://i.pravatar.cc/150?u=citra' },
        { name: 'Rian Ardianto', comment: '"Aplikasi andalan buat sewa motor harian di Jakarta. Harganya jujur dan motornya terawat. Mantap!"', avatar: 'https://i.pravatar.cc/150?u=rian' },
    ];

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-indigo-700 text-white py-20 md:py-32">
                <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80')" }}></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Sewa Apapun Jadi Lebih Mudah</h1>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-indigo-200">Temukan semua yang kamu butuhkan, mulai dari motor untuk wara-wiri hingga kamera untuk konten kece.</p>
                    <div className="mt-8 max-w-xl mx-auto">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Cari motor, kamera, drone..." 
                                className="w-full py-4 px-6 pr-16 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition">
                                <Search size={20} />
                            </button>
                        </div>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {categories.map(cat => (
                                <button key={cat.name} className="bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full hover:bg-white/30 transition">
                                    {cat.icon} {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Cuma 3 Langkah Mudah</h2>
                        <p className="mt-3 text-gray-600">Menyewa di Rentify itu gampang, aman, dan cepat.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {howItWorksSteps.map((step, index) => (
                             <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mx-auto mb-5">
                                    <step.icon className="w-8 h-8 text-indigo-600" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                                <p className="text-gray-500 text-sm">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Pilihan Teratas Minggu Ini</h2>
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
            </section>

             {/* Testimonials Section */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Kata Mereka Tentang Rentify</h2>
                        <p className="mt-3 text-gray-600">Lihat pengalaman nyata dari para pengguna kami.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center mb-4">
                                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                                    <div>
                                        <p className="font-bold text-gray-800">{testimonial.name}</p>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seller CTA Section */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="bg-indigo-600 text-white p-10 rounded-2xl shadow-2xl flex flex-col lg:flex-row justify-between items-center text-center lg:text-left">
                        <div>
                            <h2 className="text-3xl font-bold">Punya Barang Nganggur?</h2>
                            <p className="mt-2 text-indigo-200 max-w-lg">Jangan biarkan barangmu berdebu. Hasilkan uang tambahan dengan menyewakannya di Rentify!</p>
                        </div>
                        <button onClick={() => onPageChange('login')} className="mt-6 lg:mt-0 bg-white text-indigo-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-transform hover:scale-105 whitespace-nowrap">
                            Mulai Menyewakan
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
