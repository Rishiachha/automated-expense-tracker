import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Activity } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            alert('Access Denied: Please check your credentials');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="flex items-center mb-8 space-x-2">
                <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/50">
                    <Activity className="text-white" size={32} />
                </div>
                <h1 className="text-3xl font-black tracking-tight">EXPENSE<span className="text-blue-500">INTEL</span></h1>
            </div>

            <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-2xl">
                <h2 className="text-xl font-semibold mb-2 text-center">Welcome Back</h2>
                <p className="text-slate-400 text-sm text-center mb-8">Enter your intelligence credentials</p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 pl-10 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 pl-10 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5">
                        Authorize Access
                    </button>
                </form>
                
                <p className="mt-8 text-sm text-center text-slate-400">
                    New to the system? <Link to="/register" className="text-blue-400 hover:underline">Create Agent Account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;