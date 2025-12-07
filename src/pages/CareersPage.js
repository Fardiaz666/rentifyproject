// src/pages/CareersPage.js
import React, { useState } from 'react';
import { MapPin, Briefcase, Lightbulb, Users, TrendingUp, Target } from 'lucide-react';

const CareersPage = () => {
    const companyValues = [
        { icon: Lightbulb, title: 'Inovasi', description: 'Kami selalu mencari cara baru untuk memecahkan masalah dan memberikan yang terbaik.' },
        { icon: Users, title: 'Kolaborasi', description: 'Kerja tim adalah kunci. Kami percaya ide terbaik datang dari kerja sama.' },
        { icon: TrendingUp, title: 'Pertumbuhan', description: 'Kami mendukung pertumbuhan karir dan personal setiap anggota tim.' },
        { icon: Target, title: 'Berdampak', description: 'Jadilah bagian dari perubahan yang memberikan dampak positif bagi masyarakat.' },
    ];

    const jobListings = [
        { title: 'Frontend Developer (React)', department: 'Teknik', location: 'Jakarta Selatan', type: 'Full-time' },
        { title: 'Digital Marketing Specialist', department: 'Pemasaran', location: 'Remote', type: 'Full-time' },
        { title: 'Operations Associate', department: 'Operasional', location: 'Jakarta Pusat', type: 'Internship' },
        { title: 'UI/UX Designer', department: 'Teknik', location: 'Jakarta Selatan', type: 'Full-time' },
        { title: 'Customer Support Hero', department: 'Operasional', location: 'Remote', type: 'Full-time' },
    ];

    const [filter, setFilter] = useState('Semua');

    const filteredJobs = jobListings.filter(job => filter === 'Semua' || job.department === filter);

    const FilterButton = ({ label }) => (
        <button onClick={() => setFilter(label)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${filter === label ? 'bg-indigo-600 text-white' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'}`}>
            {label}
        </button>
    );

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-gray-800 text-white text-center py-20 md:py-32">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30" 
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80')" }}
                ></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold">Bergabung dengan Tim Rentify</h1>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-200">Jadilah bagian dari revolusi ekonomi berbagi di Indonesia.</p>
                </div>
            </div>

            {/* Company Values Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Kenapa Bergabung dengan Kami?</h2>
                    <p className="mt-3 text-gray-600">Kami bukan sekadar tempat kerja, kami adalah komunitas.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {companyValues.map((value, index) => (
                        <div key={index} className="text-center p-6">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mx-auto mb-4">
                                <value.icon className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                            <p className="text-gray-500 text-sm">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Open Positions Section */}
            <div className="bg-gray-50">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Posisi yang Tersedia</h2>
                        <p className="mt-3 text-gray-600">Temukan peran yang tepat untuk Anda dan mari berkembang bersama.</p>
                    </div>
                    <div className="flex justify-center space-x-2 mb-8 flex-wrap gap-2">
                        <FilterButton label="Semua" />
                        <FilterButton label="Teknik" />
                        <FilterButton label="Pemasaran" />
                        <FilterButton label="Operasional" />
                    </div>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {filteredJobs.map((job, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-indigo-700">{job.title}</h3>
                                    <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
                                        <span className="flex items-center"><Briefcase size={14} className="mr-1.5" /> {job.type}</span>
                                        <span className="flex items-center"><MapPin size={14} className="mr-1.5" /> {job.location}</span>
                                    </div>
                                </div>
                                <a href="mailto:hr@rentify.com?subject=Lamaran%20Pekerjaan:%20Frontend%20Developer" className="mt-4 sm:mt-0 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition text-sm font-semibold whitespace-nowrap">
                                    Lamar Sekarang
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareersPage;
