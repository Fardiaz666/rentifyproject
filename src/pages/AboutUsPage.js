// src/pages/AboutUsPage.js
import React, { useEffect, useState, useRef } from 'react';

// Hook untuk animasi saat scroll
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

const AnimatedSection = ({ children }) => {
    const [ref, entry] = useIntersectionObserver({ threshold: 0.1 });
    const isVisible = entry?.isIntersecting;
    return (
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {children}
        </div>
    );
};

const AboutUsPage = () => {
    const team = [
        { name: 'Aikal Ramadhan', role: 'Koordinator & Operasional', imageUrl: '/Man.png' },
        { name: 'Maharani Dinda Insyirah', role: 'Pemasaran & Konten', imageUrl: '/Woman.png' },
        { name: 'Novi Fitriani', role: 'Riset Pasar & Pelanggan', imageUrl: '/Woman.png' },
        { name: 'Fardiaz Dwi Arafat', role: 'Kemitraan & Logistik', imageUrl: '/Man.png' },
        { name: 'M. Rio Regi Mauludhi', role: 'Keuangan & Data', imageUrl: '/Man.png' },
        { name: 'Shidqi Azzam Fadhillah', role: 'Dokumentasi & Legalitas', imageUrl: '/Man.png' },
    ];

    return (
        <div className="bg-white">
            <div className="container mx-auto px-6 py-16 space-y-20">
                <AnimatedSection>
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900">Tentang Rentify</h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Misi kami adalah menciptakan ekosistem berbagi yang efisien, aman, dan bermanfaat bagi semua orang.</p>
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="bg-gray-50 p-8 rounded-lg">
                        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Ringkasan Eksekutif</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Rentify adalah sebuah platform e-commerce modern yang menghadirkan konsep unik “Sewa Apa Saja, Kapan Saja, di Mana Saja”, dengan fokus utama pada layanan penyewaan properti dan berbagai barang premium. Platform ini hadir sebagai jawaban atas kebutuhan masyarakat masa kini yang semakin peduli pada pengelolaan keuangan yang efisien dan gaya hidup yang berorientasi pada keberlanjutan.
                        </p>
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 text-center">Tim Manajemen Rentify</h2>
                        <p className="text-center text-gray-600 mt-2">Dibentuk oleh enam mahasiswa Prodi Manajemen Universitas Negeri Jakarta.</p>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {team.map(member => (
                                <div key={member.name} className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                                    <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto shadow-lg" />
                                    <h4 className="mt-4 text-xl font-semibold text-gray-800">{member.name}</h4>
                                    <p className="text-indigo-600">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
};

export default AboutUsPage;
