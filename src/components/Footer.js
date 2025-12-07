// src/components/Footer.js
import React from 'react';
import { Mail, Send, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = ({ onPageChange }) => {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Kolom Kiri: Brand & Deskripsi */}
                    <div className="md:col-span-4">
                        <div className="flex items-center mb-4">
                            <img src="/Rentify-Logo.png" alt="Rentify Logo" className="h-14" />
                        </div>
                        <p className="text-sm max-w-xs">
                            Platform penyewaan terpercaya untuk segala kebutuhan Anda, dari properti hingga peralatan hobi.
                        </p>
                    </div>

                    {/* Kolom Tengah: Navigasi */}
                    <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-bold text-white mb-4">Jelajahi</h3>
                            <ul className="space-y-3 text-sm">
                                <li><button onClick={() => onPageChange('products')} className="hover:text-white transition-colors">Produk</button></li>
                                <li><button onClick={() => onPageChange('faq')} className="hover:text-white transition-colors">FAQ</button></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-4">Perusahaan</h3>
                            <ul className="space-y-3 text-sm">
                                <li><button onClick={() => onPageChange('about')} className="hover:text-white transition-colors">Tentang Kami</button></li>
                                <li><button onClick={() => onPageChange('careers')} className="hover:text-white transition-colors">Karir</button></li>
                                <li><button onClick={() => onPageChange('help')} className="hover:text-white transition-colors">Bantuan</button></li>
                            </ul>
                        </div>
                         <div>
                            <h3 className="font-bold text-white mb-4">Legal</h3>
                            <ul className="space-y-3 text-sm">
                                <li><button onClick={() => onPageChange('terms-conditions')} className="hover:text-white transition-colors">Syarat & Ketentuan</button></li>
                                <li><button onClick={() => onPageChange('privacy-policy')} className="hover:text-white transition-colors">Kebijakan Privasi</button></li>
                            </ul>
                        </div>
                    </div>

                    {/* Kolom Kanan: Newsletter */}
                    <div className="md:col-span-3">
                        <h3 className="font-bold text-white mb-4">Dapatkan Info Promo Terbaru</h3>
                        <p className="text-sm mb-4">Daftarkan email Anda untuk tidak ketinggalan penawaran spesial dari kami.</p>
                        <form className="flex items-center">
                            <div className="relative w-full">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input 
                                    type="email" 
                                    placeholder="Alamat email Anda" 
                                    className="w-full bg-gray-800 border border-gray-700 rounded-l-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <button type="submit" className="bg-indigo-600 text-white p-3 rounded-r-lg hover:bg-indigo-700 transition-colors">
                                <Send size={20} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-center sm:text-left mb-4 sm:mb-0">
                        &copy; {new Date().getFullYear()} Rentify. Semua hak dilindungi.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
