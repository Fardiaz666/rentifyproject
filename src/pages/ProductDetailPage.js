// src/pages/ProductDetailPage.js
import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { mockReviews, mockProducts } from '../data/mockData';
import formatCurrency from '../utils/formatCurrency';
import { Star, MapPin, ChevronLeft, Plus, Minus, ShoppingCart, Award, User } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductDetailPage = ({ product, onPageChange, setSelectedProduct, setViewedSeller }) => {
    const { addToCart } = useContext(CartContext);
    const [rentDays, setRentDays] = useState(1);
    
    // Simulasi galeri foto dengan menambahkan beberapa gambar placeholder
    const imageGallery = [
        product?.imageUrl,
        'https://placehold.co/600x600/e2e8f0/e2e8f0',
        'https://placehold.co/600x600/e2e8f0/e2e8f0',
        'https://placehold.co/600x600/e2e8f0/e2e8f0',
    ];
    const [activeImage, setActiveImage] = useState(imageGallery[0]);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-semibold">Produk tidak ditemukan.</h2>
                <button onClick={() => onPageChange('products')} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
                    Kembali ke Produk
                </button>
            </div>
        );
    }

    const productReviews = mockReviews[product.id] || [];
    const relatedProducts = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    const handleViewStore = () => {
        setViewedSeller({ name: product.owner }); // Mengatur penjual yang akan dilihat
        onPageChange('seller-storefront'); // Pindah ke halaman toko
    };

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumbs & Tombol Kembali */}
                <div className="mb-6">
                    <button onClick={() => onPageChange('products')} className="flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                        <ChevronLeft size={18} className="mr-1" />
                        Kembali ke Semua Produk
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Kolom Kiri: Galeri Foto */}
                    <div>
                        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
                            <img src={activeImage} alt={product.name} className="w-full h-96 object-cover rounded-lg" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x600/eeeeee/cccccc?text=Gambar+Error'; }}/>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {imageGallery.map((img, index) => (
                                <div key={index} className={`bg-white rounded-lg shadow-md p-1 cursor-pointer transition-all ${activeImage === img ? 'ring-2 ring-indigo-500' : ''}`} onClick={() => setActiveImage(img)}>
                                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-20 object-cover rounded-md" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x200/eeeeee/cccccc?text=Error'; }}/>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Kolom Kanan: Detail & Aksi */}
                    <div>
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">{product.category}</span>
                            <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-3">{product.name}</h1>
                            <div className="flex items-center text-sm mb-6">
                                <div className="flex items-center text-yellow-500"><Star size={18} className="mr-1 fill-current" /> {product.rating}</div>
                                <span className="mx-2 text-gray-300">|</span>
                                <div className="text-gray-500">{product.reviews} ulasan</div>
                                <span className="mx-2 text-gray-300">|</span>
                                <div className="flex items-center text-gray-500"><MapPin size={16} className="mr-1" /> {product.location}</div>
                            </div>
                            
                            <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

                            {/* Spesifikasi */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-3">Spesifikasi:</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    {Object.entries(product.specs || {}).map(([key, value]) => (
                                        <div key={key} className="flex items-center text-gray-600">
                                            <Award size={16} className="mr-2 text-indigo-400"/>
                                            <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                            <span className="ml-2 font-semibold text-gray-800">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Info Penjual */}
                            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between mb-8">
                                <div className="flex items-center">
                                    <User className="w-10 h-10 p-2 bg-gray-200 text-gray-600 rounded-full mr-3"/>
                                    <div>
                                        <p className="text-xs text-gray-500">Disewakan oleh</p>
                                        <p className="font-bold text-gray-800">{product.owner}</p>
                                    </div>
                                </div>
                                <button onClick={handleViewStore} className="text-xs font-semibold text-indigo-600 hover:underline">
                                    Lihat Toko
                                </button>
                            </div>

                            {/* Blok Aksi Pemesanan */}
                            <div className="bg-white border-2 border-indigo-100 p-6 rounded-xl">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-3xl font-bold text-indigo-700">{formatCurrency(product.pricePerDay)}<span className="text-lg font-normal text-gray-500">/hari</span></p>
                                    <div className="flex items-center border border-gray-300 rounded-full">
                                        <button onClick={() => setRentDays(Math.max(1, rentDays - 1))} className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-full"><Minus size={16}/></button>
                                        <span className="px-4 font-bold text-gray-800">{rentDays}</span>
                                        <button onClick={() => setRentDays(rentDays + 1)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-full"><Plus size={16}/></button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-lg font-bold mb-6">
                                    <span>Total Biaya:</span>
                                    <span>{formatCurrency(product.pricePerDay * rentDays)}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={() => addToCart(product, rentDays)} disabled={!product.availability} className="w-full flex items-center justify-center bg-indigo-100 text-indigo-700 px-4 py-3 rounded-lg hover:bg-indigo-200 transition duration-150 font-semibold"><ShoppingCart size={18} className="mr-2"/> Keranjang</button>
                                    <button onClick={() => {addToCart(product, rentDays); onPageChange('cart');}} disabled={!product.availability} className={`w-full px-4 py-3 rounded-lg transition duration-150 font-semibold text-white ${product.availability ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}>{product.availability ? 'Sewa Sekarang' : 'Tidak Tersedia'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bagian Ulasan */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Ulasan Pelanggan</h2>
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        {productReviews.length > 0 ? (
                            productReviews.map(review => (
                                <div key={review.id} className="flex space-x-4 border-b last:border-b-0 py-6">
                                    <img src={`https://i.pravatar.cc/48?u=${review.author}`} alt={review.author} className="w-12 h-12 rounded-full"/>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold text-gray-800">{review.author}</p>
                                                <div className="flex items-center mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={16} className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mt-3">{review.comment}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500">Belum ada ulasan untuk produk ini.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Produk Terkait */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Anda Mungkin Juga Suka</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} onPageChange={onPageChange} setSelectedProduct={setSelectedProduct} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
