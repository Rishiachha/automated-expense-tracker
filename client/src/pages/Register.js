import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ShieldCheck, Activity } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData.name, formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            alert('Registration failed. Please check if the email is already in use.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 text-slate-100">
            {/* Logo Section */}
            <div className="flex items-center mb-8 space-x-2">
                <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/50">
                    <Activity className="text-white" size={32} />
                </div>
                <h1 className="text-3xl font-black tracking-tight uppercase">
                    Expense<span className="text-blue-500">Intel</span>
                </h1>
            </div>

            {/* Registration Card */}
            <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Create Agent Account</h2>
                    <p className="text-slate-400 text-sm">Join the network to start tracking intelligence</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Input */}
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full bg-white border border-slate-700 rounded-xl p-3.5 pl-10 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-slate-500" size={18} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-white border border-slate-700 rounded-xl p-3.5 pl-10 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-slate-500" size={18} />
                        <input
                            type="password"
                            placeholder="Create Password"
                            className="w-full bg-white border border-slate-700 rounded-xl p-3.5 pl-10 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 uppercase tracking-wider"
                    >
                        <ShieldCheck size={20} />
                        <span>Initialize Account</span>
                    </button>
                </form>

                {/* Footer Link */}
                <p className="mt-8 text-sm text-center text-slate-400 font-medium">
                    Already an agent?{' '}
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
                        Authorized Login
                    </Link>
                </p>
            </div>

            {/* Bottom Security Note */}
            <p className="mt-6 text-[10px] text-slate-600 uppercase tracking-widest text-center">
                Secure 256-bit encrypted environment
            </p>
        </div>
    );
};

export default Register;