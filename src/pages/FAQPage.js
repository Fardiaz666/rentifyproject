// src/pages/FAQPage.js
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQPage = () => {
    const faqs = [
        { q: 'Bagaimana cara menyewa barang?', a: 'Cari barang yang Anda inginkan, pilih tanggal sewa, lalu klik "Sewa Sekarang". Lanjutkan ke checkout untuk menyelesaikan pembayaran dan mengatur pengiriman atau pengambilan barang.' },
        { q: 'Apakah aman melakukan transaksi di Rentify?', a: 'Tentu. Kami menggunakan sistem pembayaran yang aman dan terverifikasi. Data Anda terlindungi, dan kami memiliki kebijakan perlindungan bagi penyewa dan pemilik barang untuk memastikan transaksi berjalan lancar.' },
        { q: 'Apa saja yang bisa disewakan?', a: 'Anda bisa menyewakan hampir semua barang yang legal dan layak pakai, mulai dari peralatan elektronik, kendaraan, properti, pakaian, hingga peralatan hobi dan olahraga.' },
        { q: 'Bagaimana cara menjadi pemilik sewa?', a: 'Setelah mendaftar, masuk ke "Mode Penjual" dari menu profil Anda. Dari sana, Anda bisa menambahkan produk, mengatur harga, dan mengelola pesanan sewa yang masuk.' },
    ];
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-6 py-16">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900">Frequently Asked Questions (FAQ)</h1>
                    <p className="mt-4 text-lg text-gray-600">Menemukan jawaban untuk pertanyaan Anda.</p>
                </div>
                <div className="mt-12 max-w-3xl mx-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800"
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                                    <p className="p-5 pt-0 text-gray-600">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
