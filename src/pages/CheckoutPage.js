// src/pages/CheckoutPage.js
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import formatCurrency from '../utils/formatCurrency';
import { ChevronLeft, User, Mail, Phone, MapPin, Truck, HomeIcon, CreditCard, ShieldCheck } from 'lucide-react';

const CheckoutPage = ({ onPageChange, setOrderData }) => {
    const { user } = useContext(AuthContext);
    const { cartItems, cartTotal, cartItemCount } = useContext(CartContext);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        shippingMethod: 'cod',
        paymentMethod: 'bank_transfer',
        selectedBank: 'bca',
        selectedEWallet: 'dana',
    });

    useEffect(() => {
        if (!user || cartItems.length === 0) {
            onPageChange('login');
        }
    }, [user, cartItems, onPageChange]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlingFee = cartTotal >= 200000 ? 10000 : 5000;
    const platformFee = cartTotal * 0.03;
    const shippingFee = formData.shippingMethod === 'courier' ? 13000 : 0;
    const grandTotal = cartTotal + handlingFee + platformFee + shippingFee;

    const handleConfirmPayment = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.address || !formData.phone) {
            alert('Harap isi semua detail pengiriman.');
            return;
        }
        const orderDetails = {
            ...formData,
            items: cartItems,
            total: grandTotal,
            subtotal: cartTotal,
            handlingFee,
            platformFee,
            shippingFee,
            orderId: `RNTFY-${Date.now()}`
        };
        setOrderData(orderDetails);
        onPageChange('payment');
    };

    if (!user) return null;

    const InputField = ({ icon, name, placeholder, value, onChange, type = "text" }) => (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
            <input type={type} name={name} id={name} value={value} onChange={onChange} placeholder={placeholder} required className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <button onClick={() => onPageChange('cart')} className="flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors mb-8">
                    <ChevronLeft size={18} className="mr-1" />
                    Kembali ke Keranjang
                </button>
                <form onSubmit={handleConfirmPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Informasi Kontak</h2>
                            <div className="space-y-4">
                                <InputField icon={<User size={16} className="text-gray-400"/>} name="name" placeholder="Nama Lengkap" value={formData.name} onChange={handleInputChange} />
                                <InputField icon={<Mail size={16} className="text-gray-400"/>} name="email" placeholder="Alamat Email" value={formData.email} onChange={handleInputChange} type="email"/>
                                <InputField icon={<Phone size={16} className="text-gray-400"/>} name="phone" placeholder="Nomor Telepon" value={formData.phone} onChange={handleInputChange} type="tel"/>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Alamat & Pengiriman</h2>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                                    <textarea name="address" id="address" rows="3" value={formData.address} onChange={handleInputChange} required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Masukkan alamat lengkap untuk pengiriman..."></textarea>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Pilih Metode Pengiriman</h3>
                                    <div className="space-y-3">
                                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.shippingMethod === 'cod' ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'}`}><input type="radio" name="shippingMethod" value="cod" checked={formData.shippingMethod === 'cod'} onChange={handleInputChange} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" /><HomeIcon className="w-6 h-6 ml-4 text-gray-600"/><span className="ml-3 text-sm font-medium text-gray-800">Ambil di Tempat / COD</span><span className="ml-auto text-sm font-bold text-gray-800">GRATIS</span></label>
                                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.shippingMethod === 'courier' ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'}`}><input type="radio" name="shippingMethod" value="courier" checked={formData.shippingMethod === 'courier'} onChange={handleInputChange} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" /><Truck className="w-6 h-6 ml-4 text-gray-600"/><span className="ml-3 text-sm font-medium text-gray-800">Dikirim dengan Kurir</span><span className="ml-auto text-sm font-bold text-gray-800">{formatCurrency(13000)}</span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Metode Pembayaran</h2>
                            <div className="space-y-3">
                                <div>
                                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'bank_transfer' ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'}`}><input type="radio" name="paymentMethod" value="bank_transfer" checked={formData.paymentMethod === 'bank_transfer'} onChange={handleInputChange} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" /><span className="ml-3 text-sm font-medium text-gray-800">Transfer Bank</span></label>
                                    {formData.paymentMethod === 'bank_transfer' && (<div className="pl-4 pt-4 grid grid-cols-3 gap-3"><label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${formData.selectedBank === 'bca' ? 'border-indigo-500 ring-1 ring-indigo-500' : ''}`}><input type="radio" name="selectedBank" value="bca" checked={formData.selectedBank === 'bca'} onChange={handleInputChange} className="sr-only"/><img src="https://logos-download.com/wp-content/uploads/2017/03/BCA_logo_Bank_Central_Asia.png" alt="Logo BCA" className="h-4"/></label><label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${formData.selectedBank === 'bri' ? 'border-indigo-500 ring-1 ring-indigo-500' : ''}`}><input type="radio" name="selectedBank" value="bri" checked={formData.selectedBank === 'bri'} onChange={handleInputChange} className="sr-only"/><img src="https://www.freelogovectors.net/wp-content/uploads/2023/02/bri-logo-freelogovectors.net_.png" alt="Logo BRI" className="h-5"/></label><label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${formData.selectedBank === 'mandiri' ? 'border-indigo-500 ring-1 ring-indigo-500' : ''}`}><input type="radio" name="selectedBank" value="mandiri" checked={formData.selectedBank === 'mandiri'} onChange={handleInputChange} className="sr-only"/><img src="https://freepngdesign.com/content/uploads/images/p-2813-2-bank-mandiri-logo-png-transparent-logo-699390155888.png" alt="Logo Mandiri" className="h-4"/></label></div>)}
                                </div>
                                <div>
                                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'e_wallet' ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'}`}><input type="radio" name="paymentMethod" value="e_wallet" checked={formData.paymentMethod === 'e_wallet'} onChange={handleInputChange} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" /><span className="ml-3 text-sm font-medium text-gray-800">E-Wallet</span></label>
                                    {formData.paymentMethod === 'e_wallet' && (<div className="pl-4 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3"><label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${formData.selectedEWallet === 'dana' ? 'border-indigo-500 ring-1 ring-indigo-500' : ''}`}><input type="radio" name="selectedEWallet" value="dana" checked={formData.selectedEWallet === 'dana'} onChange={handleInputChange} className="sr-only"/><img src="https://logos-download.com/wp-content/uploads/2022/01/Dana_Logo.png" alt="Logo Dana" className="h-5"/></label><label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${formData.selectedEWallet === 'gopay' ? 'border-indigo-500 ring-1 ring-indigo-500' : ''}`}><input type="radio" name="selectedEWallet" value="gopay" checked={formData.selectedEWallet === 'gopay'} onChange={handleInputChange} className="sr-only"/><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png" alt="Logo Gopay" className="h-5"/></label><label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${formData.selectedEWallet === 'ovo' ? 'border-indigo-500 ring-1 ring-indigo-500' : ''}`}><input type="radio" name="selectedEWallet" value="ovo" checked={formData.selectedEWallet === 'ovo'} onChange={handleInputChange} className="sr-only"/><img src="https://1.bp.blogspot.com/-Iq0Ztu117_8/XzNYaM4ABdI/AAAAAAAAHA0/MabT7B02ErIzty8g26JvnC6cPeBZtATNgCLcBGAsYHQ/s1000/logo-ovo.png" alt="Logo OVO" className="h-5"/></label><label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${formData.selectedEWallet === 'shopeepay' ? 'border-indigo-500 ring-1 ring-indigo-500' : ''}`}><input type="radio" name="selectedEWallet" value="shopeepay" checked={formData.selectedEWallet === 'shopeepay'} onChange={handleInputChange} className="sr-only"/><img src="https://logowik.com/content/uploads/images/shopeepay4268.jpg" alt="Logo ShopeePay" className="h-5"/></label></div>)}
                                </div>
                                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'credit_card' ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'}`}><input type="radio" name="paymentMethod" value="credit_card" checked={formData.paymentMethod === 'credit_card'} onChange={handleInputChange} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" /><CreditCard className="w-6 h-6 ml-4 text-gray-600"/><span className="ml-3 text-sm font-medium text-gray-800">Kartu Kredit</span></label>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        <div className="bg-white p-8 rounded-xl shadow-lg sticky top-28">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>
                            <div className="space-y-4 border-b pb-4 mb-4">
                                {cartItems.map(item => (<div key={item.product.id} className="flex items-center gap-4"><img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded-md"/><div className="flex-1"><p className="text-sm font-semibold text-gray-800">{item.product.name}</p><p className="text-xs text-gray-500">{item.quantity} hari</p></div><p className="text-sm font-medium text-gray-800">{formatCurrency(item.product.pricePerDay * item.quantity)}</p></div>))}
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-gray-600"><span>Subtotal ({cartItemCount} item)</span><span>{formatCurrency(cartTotal)}</span></div>
                                <div className="flex justify-between text-gray-600"><span>Biaya Penanganan</span><span>{formatCurrency(handlingFee)}</span></div>
                                <div className="flex justify-between text-gray-600"><span>Biaya Layanan Rentify</span><span>{formatCurrency(platformFee)}</span></div>
                                {shippingFee > 0 && (<div className="flex justify-between text-gray-600"><span>Biaya Pengiriman</span><span>{formatCurrency(shippingFee)}</span></div>)}
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 mt-4 border-t">
                                <span>Total</span>
                                <span>{formatCurrency(grandTotal)}</span>
                            </div>
                            <button type="submit" className="w-full mt-8 bg-indigo-600 text-white py-3.5 rounded-lg hover:bg-indigo-700 transition duration-150 font-semibold text-lg shadow-lg hover:shadow-indigo-500/50">
                                Konfirmasi & Bayar - {formatCurrency(grandTotal)}
                            </button>
                            <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
                                <ShieldCheck size={14} className="mr-1.5 text-green-500"/>
                                Transaksi Aman & Terenkripsi
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
