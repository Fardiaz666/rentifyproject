// src/pages/ProductListPage.js
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { mockProducts, categories } from '../data/mockData';
import formatCurrency from '../utils/formatCurrency';
import { Search, X, SlidersHorizontal, List } from 'lucide-react';

// Komponen Sidebar untuk Filter yang sudah didesain ulang
const FilterSidebar = ({ showSidebar, setShowSidebar, selectedCategory, setSelectedCategory, priceRange, setPriceRange, resetFilters }) => (
    <aside className={`fixed top-0 right-0 h-full bg-white shadow-xl z-50 w-80 p-6 transform transition-transform duration-300 ease-in-out ${showSidebar ? 'translate-x-0' : 'translate-x-full'} lg:relative lg:translate-x-0 lg:w-1/4 lg:h-auto lg:shadow-none lg:bg-transparent lg:p-0 lg:block`}>
        <div className="flex justify-between items-center mb-8 lg:hidden">
            <h3 className="text-xl font-bold">Filter Produk</h3>
            <button onClick={() => setShowSidebar(false)}><X size={24} /></button>
        </div>
        <div className="space-y-8">
            <div>
                <h4 className="font-semibold mb-3 text-gray-800">Kategori</h4>
                <div className="space-y-2">
                    {['Semua', ...categories].map(category => (
                        <button key={category} onClick={() => setSelectedCategory(category)} className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${selectedCategory === category ? 'bg-indigo-600 text-white font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>{category}</button>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-semibold mb-3 text-gray-800">Rentang Harga (/hari)</h4>
                <div className="flex flex-col space-y-2 text-sm">
                    <input type="range" min="0" max="2000000" step="50000" value={priceRange[1]} onChange={(e) => setPriceRange([0, Number(e.target.value)])} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"/>
                    <div className="flex justify-between text-gray-500">
                        <span>{formatCurrency(0)}</span>
                        <span>{formatCurrency(priceRange[1])}</span>
                    </div>
                </div>
            </div>
        </div>
        <button onClick={resetFilters} className="w-full mt-8 bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-900 transition text-sm font-semibold">
            Reset Filter
        </button>
    </aside>
);

const ProductListPage = ({ onPageChange, setSelectedProduct, showSidebar, setShowSidebar, searchTerm }) => {
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [priceRange, setPriceRange] = useState([0, 2000000]);
    const [sortBy, setSortBy] = useState('rating_desc');
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const sellerProducts = JSON.parse(localStorage.getItem('seller_products') || '[]');
        setAllProducts([...mockProducts, ...sellerProducts]);
    }, []);
    
    const resetFilters = () => {
        setSelectedCategory('Semua');
        setPriceRange([0, 2000000]);
        setSortBy('rating_desc');
    };

    const filteredProducts = allProducts
        .filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(product => selectedCategory === 'Semua' || product.category === selectedCategory)
        .filter(product => product.pricePerDay >= priceRange[0] && product.pricePerDay <= priceRange[1])
        .sort((a, b) => {
            switch (sortBy) {
                case 'price_asc': return a.pricePerDay - b.pricePerDay;
                case 'price_desc': return b.pricePerDay - a.pricePerDay;
                case 'rating_desc': return (b.rating || 0) - (a.rating || 0);
                default: return 0;
            }
        });

    return (
        <div className="bg-gray-50">
            {/* Header Halaman */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-8 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900">Jelajahi Semua Produk</h1>
                    <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Temukan semua yang Anda butuhkan dalam satu tempat. Gunakan filter untuk menemukan barang yang paling sesuai.</p>
                </div>
            </header>

            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filter */}
                    <FilterSidebar 
                        showSidebar={showSidebar} 
                        setShowSidebar={setShowSidebar}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        resetFilters={resetFilters}
                    />
                    
                    {/* Konten Utama */}
                    <main className="w-full">
                        {/* Bar Kontrol (Jumlah hasil, urutkan, tombol filter mobile) */}
                        <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex justify-between items-center">
                            <p className="text-sm text-gray-600 font-medium">
                                Menampilkan <span className="font-bold text-indigo-600">{filteredProducts.length}</span> produk
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="sort" className="text-sm text-gray-600 hidden sm:block">Urutkan:</label>
                                    <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 py-1.5">
                                        <option value="rating_desc">Paling Populer</option>
                                        <option value="price_asc">Harga Terendah</option>
                                        <option value="price_desc">Harga Tertinggi</option>
                                    </select>
                                </div>
                                <button onClick={() => setShowSidebar(true)} className="lg:hidden p-2 bg-gray-100 rounded-md">
                                    <SlidersHorizontal size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Daftar Produk */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} onPageChange={onPageChange} setSelectedProduct={setSelectedProduct} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl shadow-md">
                                <List size={56} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-2xl font-bold text-gray-800">Oops! Produk Tidak Ditemukan</h3>
                                <p className="text-gray-500 mt-2">Coba ubah kata kunci pencarian atau reset filter Anda.</p>
                                <button onClick={resetFilters} className="mt-6 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition text-sm font-semibold">
                                    Reset Filter
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;
