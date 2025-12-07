// src/pages/ProfilePage.js
import React, { useState, useContext, useEffect, useRef } from 'react'; // Impor useRef
import { AuthContext } from '../contexts/AuthContext';
import { ToastContext } from '../contexts/ToastContext';
import { User, Mail, Phone, MapPin, CreditCard, Edit, Shield, Bell, KeyRound, Smartphone, LogOut, Check } from 'lucide-react';

// Komponen untuk setiap tab agar kode utama lebih rapi
const ProfileDetails = ({ user, showToast }) => {
    const { updateUser } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || 'Jl. Jenderal Sudirman No.Kav. 52-53, Jakarta Selatan',
        idNumber: user.idNumber || '3171234567890001'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        updateUser(profileData);
        setEditMode(false);
        showToast('Profil berhasil diperbarui!', 'success');
    };
    
    const handleCancel = () => {
        setProfileData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.address || 'Jl. Jenderal Sudirman No.Kav. 52-53, Jakarta Selatan',
            idNumber: user.idNumber || '3171234567890001'
        });
        setEditMode(false);
    };

    const ProfileRow = ({ icon, label, name, value, isEditing }) => (
        <div className="grid grid-cols-3 gap-4 items-center border-b py-4">
            <div className="col-span-1 flex items-center text-sm font-medium text-gray-500">
                {icon}
                <span className="ml-2">{label}</span>
            </div>
            <div className="col-span-2 text-sm text-gray-800">
                {isEditing ? (
                    <input type="text" name={name} value={value} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                ) : (
                    <span>{value || '-'}</span>
                )}
            </div>
        </div>
    );

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Biodata Diri</h3>
                {!editMode && (
                    <button onClick={() => setEditMode(true)} className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
                        <Edit className="w-4 h-4 mr-1" /> Ubah Data
                    </button>
                )}
            </div>
            <div>
                <ProfileRow icon={<User size={18} />} label="Nama Lengkap" name="name" value={profileData.name} isEditing={editMode} />
                <ProfileRow icon={<Mail size={18} />} label="Email" name="email" value={profileData.email} isEditing={false} />
                <ProfileRow icon={<Phone size={18} />} label="Nomor Telepon" name="phone" value={profileData.phone} isEditing={editMode} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-10 mb-6">Data Pribadi</h3>
            <div>
                <ProfileRow icon={<MapPin size={18} />} label="Alamat" name="address" value={profileData.address} isEditing={editMode} />
                <ProfileRow icon={<CreditCard size={18} />} label="Nomor KTP" name="idNumber" value={profileData.idNumber} isEditing={false} />
            </div>
            {editMode && (
                <div className="mt-8 flex justify-end space-x-3">
                    <button onClick={handleCancel} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition font-semibold">Batal</button>
                    <button onClick={handleSave} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold">Simpan Perubahan</button>
                </div>
            )}
        </div>
    );
};

const SecuritySettings = ({ showToast }) => {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Keamanan & Login</h3>
            {/* Ganti Password */}
            <div className="border-b pb-6 mb-6">
                <div className="flex items-center">
                    <KeyRound className="w-5 h-5 mr-3 text-gray-500" />
                    <p className="font-semibold text-gray-700">Ganti Password</p>
                </div>
                <p className="text-sm text-gray-500 mt-1 ml-8 mb-4">Untuk keamanan akun, ganti password Anda secara berkala.</p>
                <button className="ml-8 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-semibold">Ganti Password</button>
            </div>
            {/* Verifikasi Dua Langkah */}
            <div className="border-b pb-6 mb-6">
                <div className="flex items-center">
                   <Smartphone className="w-5 h-5 mr-3 text-gray-500" />
                   <p className="font-semibold text-gray-700">Verifikasi Dua Langkah</p>
                </div>
                <p className="text-sm text-gray-500 mt-1 ml-8 mb-4">Tambahkan lapisan keamanan ekstra pada akun Anda.</p>
                <div className="ml-8 flex items-center justify-between">
                    <span className={`font-medium text-sm ${twoFactorEnabled ? 'text-green-600' : 'text-gray-600'}`}>
                        {twoFactorEnabled ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                    <button onClick={() => setTwoFactorEnabled(!twoFactorEnabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twoFactorEnabled ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}`}/>
                    </button>
                </div>
            </div>
             {/* Sesi Aktif */}
            <div>
                <div className="flex items-center">
                   <LogOut className="w-5 h-5 mr-3 text-gray-500" />
                   <p className="font-semibold text-gray-700">Sesi Aktif</p>
                </div>
                <p className="text-sm text-gray-500 mt-1 ml-8 mb-4">Ini adalah daftar perangkat yang telah login ke akun Anda.</p>
                <div className="ml-8 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <p>Chrome di Windows 11 <span className="text-green-600 font-semibold">(Sesi saat ini)</span></p>
                        <span className="text-gray-500">Bekasi, Indonesia</span>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <p>Aplikasi di iPhone 14 Pro</p>
                        <button className="text-indigo-600 hover:underline">Keluar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NotificationSettings = ({ showToast }) => {
    const [prefs, setPrefs] = useState({
        orderEmail: true,
        orderPush: true,
        promoEmail: true,
        promoPush: false,
        reviewEmail: false,
        reviewPush: true,
    });

    const handleToggle = (key) => {
        setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const Toggle = ({ checked, onChange }) => (
         <button onClick={onChange} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-indigo-600' : 'bg-gray-300'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}/>
        </button>
    );
    
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Pengaturan Notifikasi</h3>
            <p className="text-sm text-gray-500 mb-6">Pilih notifikasi mana yang ingin Anda terima.</p>
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b">
                        <th className="text-left font-semibold text-gray-700 pb-3">Jenis Notifikasi</th>
                        <th className="text-center font-semibold text-gray-700 pb-3 w-24">Email</th>
                        <th className="text-center font-semibold text-gray-700 pb-3 w-24">Push App</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="py-4">
                            <p className="font-medium text-gray-800">Update Pesanan</p>
                            <p className="text-xs text-gray-500">Status sewa, pengiriman, dan pengembalian.</p>
                        </td>
                        <td className="text-center"><Toggle checked={prefs.orderEmail} onChange={() => handleToggle('orderEmail')} /></td>
                        <td className="text-center"><Toggle checked={prefs.orderPush} onChange={() => handleToggle('orderPush')} /></td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-4">
                            <p className="font-medium text-gray-800">Promo & Penawaran</p>
                            <p className="text-xs text-gray-500">Info diskon, voucher, dan penawaran spesial.</p>
                        </td>
                        <td className="text-center"><Toggle checked={prefs.promoEmail} onChange={() => handleToggle('promoEmail')} /></td>
                        <td className="text-center"><Toggle checked={prefs.promoPush} onChange={() => handleToggle('promoPush')} /></td>
                    </tr>
                    <tr>
                        <td className="py-4">
                            <p className="font-medium text-gray-800">Ulasan & Rating</p>
                            <p className="text-xs text-gray-500">Pengingat untuk memberi ulasan setelah sewa selesai.</p>
                        </td>
                        <td className="text-center"><Toggle checked={prefs.reviewEmail} onChange={() => handleToggle('reviewEmail')} /></td>
                        <td className="text-center"><Toggle checked={prefs.reviewPush} onChange={() => handleToggle('reviewPush')} /></td>
                    </tr>
                </tbody>
            </table>
             <div className="mt-8 flex justify-end">
                <button onClick={() => showToast("Pengaturan notifikasi disimpan!", "success")} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold">Simpan Pengaturan</button>
            </div>
        </div>
    );
};


const ProfilePage = ({ onPageChange }) => {
    // --- PERUBAHAN DI SINI: Menambahkan updateUser dan useRef ---
    const { user, updateUser } = useContext(AuthContext);
    const showToast = useContext(ToastContext);
    const [activeTab, setActiveTab] = useState('profil');
    const fileInputRef = useRef(null); // Ref untuk input file tersembunyi

    useEffect(() => {
        if (!user) {
            onPageChange('login');
        }
    }, [user, onPageChange]);

    // --- FUNGSI BARU: Untuk memicu klik pada input file ---
    const handlePhotoChangeClick = () => {
        fileInputRef.current.click();
    };

    // --- FUNGSI BARU: Untuk menangani file yang dipilih ---
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Menggunakan FileReader untuk membaca file sebagai Data URL (Base64)
            const reader = new FileReader();
            reader.onloadend = () => {
                // Memperbarui state user dengan URL gambar baru
                updateUser({ photoURL: reader.result });
                showToast('Foto profil berhasil diubah!', 'success');
            };
            reader.readAsDataURL(file);
        }
    };

    if (!user) return null;

    const renderContent = () => {
        switch (activeTab) {
            case 'profil':
                return <ProfileDetails user={user} showToast={showToast} />;
            case 'keamanan':
                return <SecuritySettings showToast={showToast} />;
            case 'notifikasi':
                return <NotificationSettings showToast={showToast} />;
            default:
                return <ProfileDetails user={user} showToast={showToast} />;
        }
    };

    const NavLink = ({ tabName, icon, children }) => {
        const isActive = activeTab === tabName;
        return (
            <button onClick={() => setActiveTab(tabName)} className={`flex items-center w-full px-4 py-3 rounded-lg text-left transition-colors ${isActive ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>
                {icon} {children}
            </button>
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Akun Saya</h1>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Kolom Kiri - Navigasi & Foto Profil */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                            {/* --- PERUBAHAN DI SINI: Logika untuk menampilkan foto profil --- */}
                            <img
                                src={user.photoURL || `https://i.pravatar.cc/150?u=${user.email}`}
                                alt="Foto Profil"
                                className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-indigo-200 object-cover"
                            />
                            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                            <p className="text-sm text-gray-500 mb-4">{user.email}</p>
                            {/* --- PERUBAHAN DI SINI: Tombol memicu fungsi handlePhotoChangeClick --- */}
                            <button 
                                onClick={handlePhotoChangeClick}
                                className="w-full bg-gray-200 text-gray-700 text-sm py-2 rounded-lg hover:bg-gray-300 transition"
                            >
                                Ubah Foto
                            </button>
                            {/* --- INPUT FILE TERSEMBUNYI DITAMBAHKAN DI SINI --- */}
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/png, image/jpeg, image/jpg" // Hanya menerima file gambar
                            />
                        </div>
                        <div className="bg-white p-4 mt-6 rounded-xl shadow-lg">
                            <nav className="space-y-1">
                                <NavLink tabName="profil" icon={<User className="w-5 h-5 mr-3" />}>Profil Saya</NavLink>
                                <NavLink tabName="keamanan" icon={<Shield className="w-5 h-5 mr-3" />}>Keamanan</NavLink>
                                <NavLink tabName="notifikasi" icon={<Bell className="w-5 h-5 mr-3" />}>Notifikasi</NavLink>
                            </nav>
                        </div>
                    </div>

                    {/* Kolom Kanan - Konten Dinamis */}
                    <div className="lg:col-span-3">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
