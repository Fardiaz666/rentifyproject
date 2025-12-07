// src/utils/formatCurrency.js

/**
 * Memformat angka menjadi format mata uang Rupiah (IDR).
 * @param {number} amount - Jumlah angka yang akan diformat.
 * @returns {string} String yang telah diformat sebagai mata uang.
 * Contoh: 150000 -> "Rp 150.000"
 */
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
};

export default formatCurrency;
