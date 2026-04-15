import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Camera, Plus, Loader2 } from 'lucide-react';

const ExpenseForm = ({ onExpenseAdded }) => {
    const [formData, setFormData] = useState({ title: '', amount: '' });
    const [isScanning, setIsScanning] = useState(false);
    const fileInputRef = useRef();

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsScanning(true);
        const data = new FormData();
        data.append('image', file);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/expenses/scan', data, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' 
                }
            });
            setFormData({ title: res.data.title, amount: res.data.amount });
        } catch (err) {
            alert("OCR failed: Image too blurry or text unreadable.");
        } finally {
            setIsScanning(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post('http://localhost:5000/api/expenses', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onExpenseAdded(res.data.data);
            setFormData({ title: '', amount: '' });
        } catch (err) { alert('Error adding expense'); }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50">
                <span className="text-xs font-bold text-slate-400 uppercase">Automation Tool</span>
                <button 
                    onClick={() => fileInputRef.current.click()}
                    disabled={isScanning}
                    className="flex items-center space-x-2 bg-slate-700 hover:bg-blue-600 px-4 py-2 rounded-xl transition-all text-xs font-bold"
                >
                    {isScanning ? <Loader2 className="animate-spin" size={16} /> : <Camera size={16} />}
                    <span>{isScanning ? 'Extracting...' : 'Scan Receipt'}</span>
                </button>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept="image/*" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Merchant / Item Name"
                    className="flex-1 bg-white border border-slate-300 rounded-xl p-3.5 text-slate-900 font-bold outline-none"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    className="w-full md:w-32 bg-white border border-slate-300 rounded-xl p-3.5 text-slate-900 font-bold outline-none"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-10 rounded-xl transition-all shadow-lg flex items-center justify-center">
                    <Plus size={20} className="mr-1" /> ADD
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;