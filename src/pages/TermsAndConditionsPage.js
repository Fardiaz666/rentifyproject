// src/pages/TermsAndConditionsPage.js
import React from 'react';
import { FileText } from 'lucide-react';

const TermsAndConditionsPage = () => {
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
                        <FileText className="w-16 h-16 mx-auto text-indigo-500 mb-4" />
                        <h1 className="text-4xl font-extrabold text-gray-900">Syarat & Ketentuan</h1>
                        <p className="mt-4 text-lg text-gray-500">Terakhir diperbarui: 3 Juli 2025</p>
                    </div>

                    <Section title="1. Penerimaan Ketentuan">
                        <p>
                            Dengan mengakses atau menggunakan platform Rentify ("Layanan"), Anda setuju untuk terikat oleh Syarat & Ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari ketentuan ini, Anda tidak diizinkan untuk menggunakan Layanan.
                        </p>
                    </Section>

                    <Section title="2. Akun Pengguna">
                        <p>
                            Saat Anda membuat akun dengan kami, Anda harus memberikan informasi yang akurat, lengkap, dan terkini setiap saat. Kegagalan untuk melakukannya merupakan pelanggaran terhadap Ketentuan, yang dapat mengakibatkan penghentian segera akun Anda di Layanan kami.
                        </p>
                        <p>
                            Anda bertanggung jawab untuk menjaga kerahasiaan kata sandi Anda dan untuk setiap aktivitas atau tindakan di bawah kata sandi Anda.
                        </p>
                    </Section>

                    <Section title="3. Kewajiban Penyewa dan Pemilik Barang">
                        <p>
                            <b>Penyewa</b> setuju untuk menggunakan barang yang disewa dengan hati-hati dan mengembalikannya dalam kondisi yang sama seperti saat diterima, dengan mempertimbangkan keausan normal.
                        </p>
                        <p>
                            <b>Pemilik Barang</b> bertanggung jawab untuk memastikan barang yang disewakan dalam kondisi baik, aman, dan sesuai dengan deskripsi yang diberikan di platform.
                        </p>
                    </Section>

                    <Section title="4. Pembatasan Tanggung Jawab">
                        <p>
                            Dalam keadaan apa pun, Rentify tidak akan bertanggung jawab atas kerusakan tidak langsung, insidental, khusus, konsekuensial, atau hukuman, termasuk namun tidak terbatas pada, kehilangan keuntungan, data, atau kerugian tidak berwujud lainnya, yang diakibatkan oleh penggunaan atau ketidakmampuan Anda untuk menggunakan Layanan.
                        </p>
                    </Section>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditionsPage;
