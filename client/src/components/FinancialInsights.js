import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Lightbulb, TrendingUp, Target } from 'lucide-react';
import { AuthContext } from '../context/AuthContext'; // ✅ NEW

// ✅ Currency Map
const currencyMap = {
    India: "₹",
    USA: "$",
    UK: "£",
    Europe: "€"
};

const FinancialInsights = ({ expenses }) => {
    const [data, setData] = useState(null);
    const { user } = useContext(AuthContext); // ✅ GET USER

    const currency = currencyMap[user?.nationality] || "$"; // ✅ SELECT SYMBOL

    useEffect(() => {
        const fetchInsights = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5000/api/expenses/insights/analysis', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(res.data);
            } catch (e) { 
                console.error(e); 
            }
        };
        fetchInsights();
    }, [expenses]);

    if (!data) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* CURRENT MONTH */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl shadow-lg shadow-blue-900/20">
                <div className="flex items-center space-x-2 text-blue-100/80 mb-4">
                    <Target size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">Current Month</span>
                </div>

                {/* ✅ UPDATED */}
                <p className="text-4xl font-black text-white">
                    {currency}{data.totalThisMonth.toFixed(2)}
                </p>

                <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-2/3"></div>
                </div>
            </div>


            {/* FORECAST */}
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-2 text-slate-500 mb-4">
                    <TrendingUp size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">AI Forecast</span>
                </div>

                {/* ✅ UPDATED */}
                <p className="text-3xl font-black text-emerald-400">
                    {currency}{data.predictedNextMonth.toFixed(2)}
                </p>

                <p className="text-xs text-slate-500 mt-2 italic">
                    Projected spending for next cycle
                </p>
            </div>


            {/* INSIGHTS */}
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="flex items-center space-x-2 text-slate-500 mb-4">
                    <Lightbulb size={18} className="text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider">Strategic Advice</span>
                </div>

                <div className="space-y-2">
                    {data.insights.map((insight, i) => (
                        <p key={i} className="text-sm text-slate-300 leading-tight">
                            • {insight}
                        </p>
                    ))}
                </div>

                <div className="absolute -right-4 -bottom-4 opacity-5">
                    <Lightbulb size={100} />
                </div>
            </div>

        </div>
    );
};

export default FinancialInsights;