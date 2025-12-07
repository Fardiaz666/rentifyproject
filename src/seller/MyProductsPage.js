// src/seller/MyProductsPage.js
import React, { useState, useEffect, useContext } from 'react';
import { ToastContext } from '../contexts/ToastContext';
import { categories } from '../data/mockData';
import formatCurrency from '../utils/formatCurrency';
import { PlusCircle, Trash2, X, Package } from 'lucide-react';

const MyProductsPage = ({ setProductCount }) => {
    const showToast = useContext(ToastContext);
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const initialFormState = { name: '', category: 'Properti', pricePerDay: '', location: '', imageUrl: '', description: '', specs: {} };
    const [newProduct, setNewProduct] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        try {
            const storedProducts = localStorage.getItem('seller_products');
            if (storedProducts) {
                const parsedProducts = JSON.parse(storedProducts);
                setProducts(parsedProducts);
                if(setProductCount) setProductCount(parsedProducts.length);
            }
        } catch (error) {
            console.error("Gagal mem-parse produk penjual dari localStorage", error);
        }
    }, [setProductCount]);

    useEffect(() => {
        try {
            localStorage.setItem('seller_products', JSON.stringify(products));
            if(setProductCount) setProductCount(products.length);
        } catch (error) {
            console.error("Gagal menyimpan produk penjual ke localStorage", error);
        }
    }, [products, setProductCount]);

    const handleOpenModal = () => {
        setNewProduct(initialFormState);
        setErrors({});
        setIsModalOpen(true);
    };
    const handleCloseModal = () => setIsModalOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!newProduct.name.trim()) newErrors.name = "Nama produk wajib diisi.";
        if (!newProduct.category) newErrors.category = "Kategori wajib dipilih.";
        if (!newProduct.location.trim()) newErrors.location = "Lokasi wajib diisi.";
        if (!newProduct.imageUrl.trim()) newErrors.imageUrl = "URL gambar wajib diisi.";
        if (!newProduct.pricePerDay || Number(newProduct.pricePerDay) <= 0) {
            newErrors.pricePerDay = "Harga harus angka positif.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const productToAdd = {
                id: crypto.randomUUID(),
                ...newProduct,
                pricePerDay: Number(newProduct.pricePerDay),
                availability: true,
                rating: 0,
                reviews: 0,
                owner: 'Penjual'
            };
            setProducts(prev => [...prev, productToAdd]);
            showToast('Produk berhasil ditambahkan!', 'success');
            handleCloseModal();
        } else {
            showToast('Mohon perbaiki isian form.', 'error');
        }
    };

    const handleDeleteProduct = (productId) => {
        setProducts(prev => prev.filter(p => p.id !== productId));
        showToast('Produk berhasil dihapus.', 'info');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Produk Saya</h1>
                <button onClick={handleOpenModal} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center shadow-md transition-transform hover:scale-105">
                    <PlusCircle className="mr-2 h-5 w-5"/> Tambah Produk
                </button>
            </div>
            
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/eeeeee/cccccc?text=Error'; }} />
                            <div className="p-4">
                                <h3 className="font-bold text-lg truncate">{product.name}</h3>
                                <p className="text-sm text-gray-500">{product.category}</p>
                                <p className="text-indigo-600 font-semibold mt-2">{formatCurrency(product.pricePerDay)} / hari</p>
                            </div>
                            <button onClick={() => handleDeleteProduct(product.id)} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
                    <Package size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700">Anda belum memiliki produk</h3>
                    <p className="text-gray-500 mt-2">Klik "Tambah Produk" untuk mulai menyewakan barang Anda.</p>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Tambah Produk Baru</h2>
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800"><X size={24}/></button>
                        </div>
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            {/* Form Inputs */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Produk</label>
                                <input type="text" name="name" id="name" value={newProduct.name} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
                                <select name="category" id="category" value={newProduct.category} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700">Harga per Hari (IDR)</label>
                                <input type="number" name="pricePerDay" id="pricePerDay" value={newProduct.pricePerDay} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                                {errors.pricePerDay && <p className="text-red-500 text-xs mt-1">{errors.pricePerDay}</p>}
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Lokasi</label>
                                <input type="text" name="location" id="location" value={newProduct.location} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                            </div>
                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL Gambar</label>
                                <input type="text" name="imageUrl" id="imageUrl" value={newProduct.imageUrl} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                                {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>}
                            </div>
                            <div className="flex justify-end space-x-3 pt-4">
                                <button type="button" onClick={handleCloseModal} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">Batal</button>
                                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Tambahkan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProductsPage;
