// src/components/RatingModal.js
import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

const RatingModal = ({ isOpen, onClose, product, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        // Validasi: pastikan rating sudah diisi
        if (rating === 0) {
            alert("Harap pilih rating bintang terlebih dahulu.");
            return;
        }
        onSubmit(product.id, rating, comment);
        // Reset state setelah submit
        setRating(0);
        setComment('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-toast-in">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-2">Beri Ulasan untuk</h2>
                <p className="text-indigo-600 font-semibold mb-4">{product.name}</p>

                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Rating Anda:</p>
                    <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={32}
                                className={`cursor-pointer transition-colors ${star <= (hoverRating || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Bagaimana pengalamanmu? (Opsional)
                    </label>
                    <textarea
                        id="comment"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Ceritakan lebih detail tentang barang dan pelayanannya..."
                    ></textarea>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-150 font-semibold text-lg"
                >
                    Kirim Ulasan
                </button>
            </div>
        </div>
    );
};

export default RatingModal;
