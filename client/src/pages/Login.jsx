import React, { useState, useContext } from 'react';
import { Mail, Lock } from 'lucide-react';
import RightSideBar from '../components/RightSideBar';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import toast, { Toaster } from 'react-hot-toast';
import { UserDataContext } from '../contexts/UserContext';
import { AdminDataContext } from '../contexts/AdminContext';

export default function NetworkLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState('user');

    const { setUser } = useContext(UserDataContext);
    const { setAdmin } = useContext(AdminDataContext);

    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            const endpoint = activeTab === 'user' ? '/user/login' : '/admin/login';
            const response = await fetch(`http://localhost:5000${endpoint}` , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Login failed');

            // Save token and role in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', activeTab);

            toast.success('Login successful!');
            setTimeout(() => {
                if (activeTab === 'user') {
                    setUser(data.user); // Save user in context
                    navigate('/');
                } else {
                    setAdmin(data.admin); // Save admin in context
                    navigate('/');
                }
            }, 1200);
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
            <Toaster position="top-center" />
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full flex">
                {/* Left Side - Login Form */}
                <div className="w-full lg:w-1/2 p-8 lg:p-12">
                    <div className="max-w-md mx-auto">
                        {/* Logo */}
                        <div className="mb-8">
                            <Logo/>
                        </div>

                        {/* Sliding Tab Section */}
                        <div className="mb-8">
                            <div className="relative bg-gray-100 rounded-2xl p-2 flex">
                                {/* Sliding Background */}
                                <div
                                    className={`absolute top-2 bottom-2 w-1/2 bg-white rounded-xl shadow-lg transition-transform duration-300 ease-in-out ${activeTab === 'admin' ? 'transform translate-x-full' : ''
                                        }`}
                                ></div>

                                {/* Tab Buttons */}
                                <button
                                    onClick={() => setActiveTab('user')}
                                    className={`relative z-10 flex-1 py-3 px-4 text-center font-semibold rounded-xl transition-colors duration-300 ${activeTab === 'user'
                                            ? 'text-orange-500'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    User Sign In
                                </button>
                                <button
                                    onClick={() => setActiveTab('admin')}
                                    className={`relative z-10 flex-1 py-3 px-4 text-center font-semibold rounded-xl transition-colors duration-300 ${activeTab === 'admin'
                                            ? 'text-orange-500'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Admin Sign In
                                </button>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                            Login into your account
                        </h1>
                        <p className="text-gray-500 text-sm mb-8">
                            {activeTab === 'user' ? 'Access your personal dashboard' : 'Access admin control panel'}
                        </p>

                        {/* Form */}
                        <div className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-12"
                                        placeholder="alex@gmail.com"
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-500 p-2 rounded-lg">
                                        <Mail className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-12"
                                        placeholder="Enter your password"
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-500 p-2 rounded-lg">
                                        <Lock className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                
                            </div>

                            <div className="text-center">
                                <span className="text-gray-600">Already have an account? </span>
                                <span onClick={() => navigate('/register')} className="text-orange-500 hover:text-orange-600 font-semibold cursor-pointer">
                                    Register here
                                </span>
                            </div>

                            {/* Login Button */}
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
                            >
                                {activeTab === 'user' ? 'Login as User' : 'Login as Admin'}
                            </button>

                            
                        </div>
                    </div>
                </div>

                <RightSideBar />
            </div>
        </div>
    );
}