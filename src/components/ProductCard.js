import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { MapPin, Star } from 'lucide-react';

// Utility function to format currency
const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

const ProductCard = ({ product, onPageChange, setSelectedProduct }) => {
    const { addToCart } = useContext(CartContext);

    const handleViewDetails = () => {
        setSelectedProduct(product);
        onPageChange('productDetail');
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col group">
            <div className="overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/eeeeee/cccccc?text=Gambar+Error'; }} />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">{product.category}</span>
                <h3 className="text-lg font-semibold text-gray-800 mt-1 mb-2 truncate" title={product.name}>{product.name}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-1"><MapPin size={14} className="mr-1 text-gray-400" /> {product.location}</div>
                <div className="flex items-center text-sm text-yellow-500 mb-3"><Star size={16} className="mr-1 fill-current" /> {product.rating || 'N/A'} ({product.reviews || 0} ulasan)</div>
                <p className="text-gray-700 font-bold text-xl mb-4 mt-auto">{formatCurrency(product.pricePerDay)}<span className="text-sm font-normal text-gray-500">/hari</span></p>
                <div className="mt-auto grid grid-cols-2 gap-3">
                    <button onClick={handleViewDetails} className="w-full bg-transparent border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition duration-150 text-sm font-medium">Detail</button>
                    <button onClick={() => addToCart(product)} disabled={!product.availability} className={`w-full px-4 py-2 rounded-lg transition duration-150 text-sm font-medium text-white ${product.availability ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}>{product.availability ? 'Sewa Sekarang' : 'Tidak Tersedia'}</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
