import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        nationality: user?.nationality || 'India'
    });

    const PROFILE_URL = 'https://automated-expense-tracker-10.onrender.com/api/auth/profile';

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.put(PROFILE_URL, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data);
            alert("Settings Updated Successfully!");
        } catch (err) {
            alert("Error updating profile on live server.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F3F4F9] flex items-center justify-center p-4">
            <button onClick={() => navigate('/dashboard')} className="absolute top-6 left-6 flex items-center text-slate-500 hover:text-blue-600 font-bold text-xs uppercase">
                <ArrowLeft size={16} className="mr-2" /> Back
            </button>

            <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
                <div className="pt-10 pb-6 text-center">
                    <h1 className="text-3xl font-extrabold text-[#334155]">Edit Profile</h1>
                    <p className="text-gray-400 text-sm mt-1">Update your account details below.</p>
                </div>

                <div className="p-8 space-y-8 text-slate-900">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-[#E2E8F0] border-4 border-white shadow-md overflow-hidden mb-3">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt="avatar" />
                        </div>
                        <button className="text-[11px] font-bold uppercase text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">Change Avatar</button>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase ml-1">Username</label>
                            <input className="w-full bg-white border border-gray-200 p-3 rounded-xl font-medium outline-none text-slate-900" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase ml-1">Email</label>
                            <input className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-gray-400 font-medium outline-none" value={formData.email} disabled />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase ml-1">New Password</label>
                            <input type="password" placeholder="••••••••" className="w-full bg-white border border-gray-200 p-3 rounded-xl text-slate-900 font-medium outline-none" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase ml-1">Nationality</label>
                            <div className="relative">
                                <select className="w-full bg-white border border-gray-200 p-3 rounded-xl text-slate-900 font-medium outline-none appearance-none cursor-pointer" value={formData.nationality} onChange={(e) => setFormData({...formData, nationality: e.target.value})}>
                                    <option value="India">🇮🇳 India</option>
                                    <option value="USA">🇺🇸 USA</option>
                                    <option value="UK">🇬🇧 UK</option>
                                    <option value="Europe">🇪🇺 Europe</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-3.5 text-gray-400" size={18} />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button onClick={handleSave} className="flex-1 bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all">Save Changes</button>
                        <button onClick={() => navigate('/dashboard')} className="flex-1 bg-white border border-gray-200 text-gray-500 font-bold py-3.5 rounded-xl hover:bg-gray-50">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;