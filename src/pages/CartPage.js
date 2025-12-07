// src/pages/CartPage.js
import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import formatCurrency from '../utils/formatCurrency';
import { ShoppingCart, Trash2 } from 'lucide-react';

const CartPage = ({ onPageChange }) => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useContext(CartContext);

    // Tampilan jika keranjang kosong
    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <ShoppingCart size={64} className="mx-auto text-gray-300 mb-6" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">Keranjang Sewa Anda Kosong</h2>
                <p className="text-gray-500 mb-6">Sepertinya Anda belum menambahkan item apapun ke keranjang.</p>
                <button onClick={() => onPageChange('products')} className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition duration-150 font-semibold">
                    Mulai Cari Barang
                </button>
            </div>
        );
    }

    // Tampilan jika ada item di keranjang
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Keranjang Sewa Anda</h2>
            <div className="lg:flex lg:gap-8">
                <div className="lg:w-2/3">
                    {cartItems.map(item => (
                        <div key={item.product.id} className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <img src={item.product.imageUrl} alt={item.product.name} className="w-full sm:w-32 h-32 sm:h-auto object-cover rounded-md" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/128x128/eeeeee/cccccc?text=Error'; }}/>
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                                <p className="text-sm text-gray-500">{item.product.category}</p>
                                <p className="text-indigo-600 font-semibold mt-1">{formatCurrency(item.product.pricePerDay)}/hari</p>
                            </div>
                            <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                                <label htmlFor={`quantity-${item.product.id}`} className="text-sm text-gray-600">Hari:</label>
                                <input type="number" id={`quantity-${item.product.id}`} value={item.quantity} min="1" onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))} className="w-16 border border-gray-300 rounded-md px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-indigo-500"/>
                            </div>
                            <div className="text-right mt-3 sm:mt-0">
                                <p className="font-semibold text-gray-800">{formatCurrency(item.product.pricePerDay * item.quantity)}</p>
                            </div>
                            <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:text-red-700 transition duration-150 mt-3 sm:mt-0 sm:ml-4">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                    {cartItems.length > 0 && (
                        <button onClick={clearCart} className="text-sm text-gray-500 hover:text-red-600 transition duration-150 mt-4">
                            Kosongkan Keranjang
                        </button>
                    )}
                </div>
                <div className="lg:w-1/3 mt-8 lg:mt-0">
                    <div className="bg-white shadow-md rounded-lg p-6 sticky top-24">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Ringkasan Sewa</h3>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal ({cartItems.length} item)</span>
                                <span>{formatCurrency(cartTotal)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t border-gray-200">
                                <span>Total</span>
                                <span>{formatCurrency(cartTotal)}</span>
                            </div>
                        </div>
                        <button onClick={() => onPageChange('checkout')} className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-150 font-semibold text-lg">
                            Lanjut ke Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
