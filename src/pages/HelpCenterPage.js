// src/pages/HelpCenterPage.js
import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MessageSquare, Send, Bot, User, X } from 'lucide-react';

// Komponen untuk Live Chat
const LiveChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const chatEndRef = useRef(null);

    const initialBotMessage = {
        id: Date.now(),
        text: 'Halo! Saya Robi, asisten virtual Rentify. Ada yang bisa saya bantu?',
        sender: 'bot',
        options: ['Masalah Pesanan', 'Cara Mengembalikan Barang', 'Pembayaran Gagal']
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setTimeout(() => setMessages([initialBotMessage]), 500);
        }
    }, [isOpen]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleOptionClick = (option) => {
        const userMessage = { id: Date.now() + 1, text: option, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);

        let botResponseText = '';
        switch (option) {
            case 'Masalah Pesanan':
                botResponseText = 'Baik, untuk masalah pesanan, Anda bisa melihat detailnya di halaman "Pesanan Saya" atau hubungi kami langsung melalui WhatsApp untuk bantuan lebih cepat.';
                break;
            case 'Cara Mengembalikan Barang':
                botResponseText = 'Untuk mengembalikan barang, silakan masuk ke halaman "Pesanan Saya", pilih pesanan yang sudah selesai, lalu klik "Atur Pengembalian".';
                break;
            case 'Pembayaran Gagal':
                botResponseText = 'Jika pembayaran gagal, coba ulangi beberapa saat lagi atau gunakan metode pembayaran lain. Jika masih bermasalah, silakan hubungi tim support kami.';
                break;
            default:
                botResponseText = 'Maaf, saya belum mengerti. Silakan pilih salah satu opsi di atas.';
        }
        
        const botResponse = { id: Date.now() + 2, text: botResponseText, sender: 'bot' };
        setTimeout(() => setMessages(prev => [...prev, botResponse]), 1000);
    };

    return (
        <>
            {/* Chat Bubble */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110 z-50"
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 h-[28rem] bg-white rounded-xl shadow-2xl flex flex-col animate-toast-in z-50">
                    <div className="bg-indigo-600 text-white p-4 rounded-t-xl">
                        <h3 className="font-bold">Butuh Bantuan?</h3>
                        <p className="text-xs">Chat dengan asisten virtual kami</p>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex items-start gap-2.5 mb-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                {msg.sender === 'bot' && <div className="bg-gray-200 p-2 rounded-full"><Bot className="w-5 h-5 text-gray-600"/></div>}
                                <div className={`flex flex-col gap-1 max-w-[200px] ${msg.sender === 'user' ? 'items-end' : ''}`}>
                                    <div className={`p-3 rounded-xl ${msg.sender === 'bot' ? 'bg-gray-100 text-gray-800 rounded-tl-none' : 'bg-indigo-500 text-white rounded-tr-none'}`}>
                                        <p className="text-sm">{msg.text}</p>
                                        {msg.options && (
                                            <div className="mt-3 space-y-2">
                                                {msg.options.map(opt => (
                                                    <button key={opt} onClick={() => handleOptionClick(opt)} className="w-full text-left text-sm text-indigo-600 font-semibold bg-indigo-50 p-2 rounded-lg hover:bg-indigo-100">
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                 {msg.sender === 'user' && <div className="bg-gray-200 p-2 rounded-full"><User className="w-5 h-5 text-gray-600"/></div>}
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                </div>
            )}
        </>
    );
};

const HelpCenterPage = () => {
    const contactOptions = [
        { icon: Mail, title: 'Kirim Email', description: 'Dapatkan bantuan detail melalui email.', actionText: 'support@rentify.com', href: 'mailto:support@rentify.com' },
        { icon: Phone, title: 'Hubungi Kami', description: 'Bicara langsung dengan tim support kami.', actionText: '021-1234-5678', href: 'tel:02112345678' },
        { icon: MessageSquare, title: 'Chat WhatsApp', description: 'Cara tercepat untuk mendapatkan jawaban.', actionText: 'Mulai Chat', href: 'https://wa.me/6281234567890' },
        { icon: Send, title: 'Telegram', description: 'Hubungi kami melalui aplikasi Telegram.', actionText: 'Hubungi via Telegram', href: 'https://t.me/rentifysupport' },
    ];

    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-gray-900">Pusat Bantuan</h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Kami siap membantu! Pilih salah satu cara di bawah ini untuk terhubung dengan kami.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactOptions.map((option, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center flex flex-col items-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                <div className="bg-indigo-100 p-4 rounded-full mb-4">
                                    <option.icon className="w-8 h-8 text-indigo-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{option.title}</h3>
                                <p className="text-sm text-gray-500 flex-grow">{option.description}</p>
                                <a 
                                    href={option.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="mt-6 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition text-sm font-semibold w-full"
                                >
                                    {option.actionText}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <LiveChatWidget />
        </>
    );
};

export default HelpCenterPage;
