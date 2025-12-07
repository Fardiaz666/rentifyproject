// src/seller/RevenueChart.js
import React, { useState, useMemo } from 'react';

const RevenueChart = ({ data }) => {
    const [tooltip, setTooltip] = useState(null);

    // Memoize perhitungan nilai maksimum dan skala untuk efisiensi
    const { maxValue, scaleLabels } = useMemo(() => {
        const revenues = data.map(item => item.revenue);
        const max = Math.max(...revenues);
        // Membuat skala yang bagus, dibulatkan ke juta terdekat di atasnya
        const topValue = Math.ceil(max / 1000000) * 1000000;
        const labels = Array.from({ length: 5 }, (_, i) => {
            const value = topValue - (topValue / 4) * i;
            const label = value >= 1000000 ? `${value / 1000000} Jt` : `${value / 1000} Rb`;
            return { value, label };
        });
        return { maxValue: topValue, scaleLabels: labels };
    }, [data]);

    const handleMouseEnter = (item, event) => {
        const rect = event.target.getBoundingClientRect();
        setTooltip({
            month: item.month,
            revenue: item.revenue,
            x: rect.left + window.scrollX + rect.width / 2,
            y: rect.top + window.scrollY - 10,
        });
    };

    const handleMouseLeave = () => {
        setTooltip(null);
    };

    // Fungsi untuk memformat mata uang dengan lebih ringkas
    const formatCurrencySimple = (amount) => {
        if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)} Jt`;
        if (amount >= 1000) return `${(amount / 1000)} Rb`;
        return amount;
    }

    return (
        <div className="w-full h-full flex flex-col relative">
            {/* Tooltip */}
            {tooltip && (
                <div
                    className="absolute z-10 p-2 text-xs text-white bg-gray-900 rounded-md shadow-lg transition-opacity pointer-events-none"
                    style={{
                        transform: 'translate(-50%, -100%)',
                        left: `${tooltip.x}px`,
                        top: `${tooltip.y}px`,
                    }}
                >
                    <div className="relative">
                        <p className="font-bold">{formatCurrencySimple(tooltip.revenue)}</p>
                        <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
                    </div>
                </div>
            )}

            <div className="flex-grow flex items-stretch">
                {/* Sumbu Y (Skala Pendapatan) */}
                <div className="w-12 flex flex-col justify-between text-right pr-2 text-xs text-gray-400">
                    {scaleLabels.map(item => (
                        <div key={item.value}>{item.label}</div>
                    ))}
                </div>

                {/* Area Grafik */}
                <div className="flex-1 flex items-end justify-around space-x-4 relative">
                    {/* Garis Grid Horizontal */}
                    {scaleLabels.map((item, index) => (
                        <div key={index} className="absolute w-full border-t border-gray-200 border-dashed" style={{ bottom: `${(index / (scaleLabels.length - 1)) * 100}%` }}></div>
                    ))}

                    {/* Batang Grafik */}
                    {data.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center h-full justify-end z-10">
                            <div
                                className="w-3/4 rounded-t-md cursor-pointer group relative transition-all duration-300"
                                style={{ height: `${(item.revenue / maxValue) * 100}%`, background: 'linear-gradient(to top, #4f46e5, #818cf8)' }}
                                onMouseEnter={(e) => handleMouseEnter(item, e)}
                                onMouseLeave={handleMouseLeave}
                            >
                               <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-indigo-700">
                                   {formatCurrencySimple(item.revenue)}
                               </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sumbu X (Label Bulan) */}
            <div className="w-full flex justify-around pl-12 mt-2 pt-2">
                {data.map((item, index) => (
                    <div key={index} className="flex-1 text-center">
                        <p className="text-xs text-gray-500 font-medium">{item.month}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RevenueChart;
