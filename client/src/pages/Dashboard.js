import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseChart from '../components/ExpenseChart';
import FinancialInsights from '../components/FinancialInsights';
import { LogOut, Activity, Wallet, PlusCircle, Trash2, UserCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const currencyMap = {
    "India": "₹",
    "USA": "$",
    "UK": "£",
    "Europe": "€"
};

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const BASE_URL = 'https://automated-expense-tracker-10.onrender.com/api/expenses';

    const fetchExpenses = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get(BASE_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExpenses(res.data.data);
        } catch (err) {
            console.error("Fetch Error:", err);
        }
    };

    useEffect(() => { 
        fetchExpenses(); 
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Permanent Delete?")) return;
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${BASE_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExpenses(expenses.filter(exp => exp._id !== id));
        } catch (err) {
            alert("Delete failed on server.");
        }
    };

    const symbol = currencyMap[user?.nationality] || "₹";

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-100 font-sans">
            <header className="flex flex-col md:flex-row justify-between items-center mb-12 bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                    <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
                        <Activity className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight uppercase">Dashboard</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Expense Intelligence</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button 
                        onClick={() => navigate('/profile')}
                        className="flex items-center space-x-2 bg-slate-700/50 hover:bg-slate-700 px-4 py-2 rounded-xl border border-slate-600/50 transition-all text-white"
                    >
                        <UserCircle size={18} className="text-blue-400" />
                        <span className="text-sm font-bold">{user?.name || 'Agent'}</span>
                    </button>
                    
                    <button onClick={logout} className="p-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl border border-red-500/20 transition-all">
                        <LogOut size={18} />
                    </button>
                </div>
            </header>

            <div className="mb-10">
                <FinancialInsights expenses={expenses} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    <section className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-3xl shadow-2xl">
                        <div className="flex items-center space-x-2 mb-6">
                            <PlusCircle size={18} className="text-blue-500" />
                            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Add Entry</h2>
                        </div>
                        <ExpenseForm onExpenseAdded={(newExp) => setExpenses([newExp, ...expenses])} />
                    </section>

                    <section className="bg-slate-800/40 border border-slate-700/60 rounded-3xl shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-slate-700/60 flex justify-between items-center bg-slate-800/20 text-white">
                            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center">
                                <Wallet size={16} className="mr-2 text-blue-500" /> Transactions
                            </h2>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-900/40 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                                    <tr>
                                        <th className="p-5">Merchant</th>
                                        <th className="p-5">Category</th>
                                        <th className="p-5 text-right">Amount</th>
                                        <th className="p-5 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/30 text-white">
                                    {expenses.map(exp => (
                                        <tr key={exp._id} className="hover:bg-blue-600/5 transition-all group">
                                            <td className="p-5">
                                                <div className="font-bold text-slate-200">{exp.title}</div>
                                                <div className="text-[10px] text-slate-500 flex items-center mt-1">
                                                    <Calendar size={10} className="mr-1" />
                                                    {new Date(exp.createdAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <span className="bg-slate-700/50 text-slate-300 border border-slate-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter">
                                                    {exp.category}
                                                </span>
                                            </td>
                                            <td className="p-5 text-right font-mono font-black text-emerald-400">
                                                {symbol}{parseFloat(exp.amount).toFixed(2)}
                                            </td>
                                            <td className="p-5 text-right">
                                                <button onClick={() => handleDelete(exp._id)} className="text-slate-600 hover:text-red-500 transition-all p-2">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-4">
                    <aside className="sticky top-8 bg-slate-800/40 border border-slate-700/60 p-8 rounded-3xl shadow-2xl">
                        <ExpenseChart expenses={expenses} />
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;