// src/pages/PrivacyPolicyPage.js
import React from 'react';
import { Shield, FileText } from 'lucide-react';

const PrivacyPolicyPage = () => {
    const Section = ({ title, children }) => (
        <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
                {children}
            </div>
        </section>
    );

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <Shield className="w-16 h-16 mx-auto text-indigo-500 mb-4" />
                        <h1 className="text-4xl font-extrabold text-gray-900">Kebijakan Privasi</h1>
                        <p className="mt-4 text-lg text-gray-500">Terakhir diperbarui: 4 Juli 2025</p>
                    </div>

                    <Section title="1. Informasi yang Kami Kumpulkan">
                        <p>
                            Kami mengumpulkan informasi yang Anda berikan langsung kepada kami, seperti saat Anda membuat akun, memperbarui profil, melakukan transaksi, atau berkomunikasi dengan kami. Informasi ini dapat mencakup nama, email, nomor telepon, alamat, foto profil, dan data pembayaran.
                        </p>
                        <p>
                            Kami juga mengumpulkan informasi teknis secara otomatis, termasuk alamat IP, jenis browser, sistem operasi, dan data penggunaan aplikasi untuk meningkatkan layanan kami.
                        </p>
                    </Section>

                    <Section title="2. Bagaimana Kami Menggunakan Informasi Anda">
                        <p>
                            Informasi Anda kami gunakan untuk:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Menyediakan, mengoperasikan, dan memelihara layanan kami.</li>
                            <li>Memproses transaksi dan mengirimkan informasi terkait, termasuk konfirmasi dan faktur.</li>
                            <li>Meningkatkan, mempersonalisasi, dan memperluas layanan kami.</li>
                            <li>Berkomunikasi dengan Anda, baik secara langsung maupun melalui salah satu mitra kami, termasuk untuk layanan pelanggan, untuk memberi Anda pembaruan dan informasi lain yang berkaitan dengan layanan, dan untuk tujuan pemasaran dan promosi.</li>
                            <li>Mencegah penipuan dan melindungi keamanan platform.</li>
                        </ul>
                    </Section>

                    <Section title="3. Berbagi Informasi Anda">
                        <p>
                            Kami tidak akan membagikan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali dalam situasi berikut:
                        </p>
                         <ul className="list-disc list-inside space-y-2">
                            <li>Dengan penyedia layanan pihak ketiga yang membantu kami dalam mengoperasikan platform (misalnya, pemrosesan pembayaran).</li>
                            <li>Untuk mematuhi hukum atau proses hukum yang berlaku.</li>
                            <li>Untuk melindungi hak, properti, atau keselamatan Rentify, pengguna kami, atau publik.</li>
                        </ul>
                    </Section>
                    
                    <Section title="4. Keamanan Data">
                        <p>
                            Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang wajar untuk melindungi informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Namun, tidak ada metode transmisi melalui internet atau metode penyimpanan elektronik yang 100% aman.
                        </p>
                    </Section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
