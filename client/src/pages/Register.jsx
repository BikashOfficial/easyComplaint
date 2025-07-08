import React, { useState } from 'react';
import { Eye, EyeOff, Mail, User, Building } from 'lucide-react';
import RightSideBar from '../components/RightSideBar';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyCode, setCompanyCode] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState('user');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!fullName || !email || !password || (activeTab === 'admin' && !companyCode)) {
            toast.error('Please fill all required fields.');
            return;
        }
        try {
            let url = '';
            let payload = { fullName, email, password };
            if (activeTab === 'admin') {
                url = `${import.meta.env.VITE_BASE_URL}/admin/register`;
                payload.companyCode = companyCode;
            } else {
                url = `${import.meta.env.VITE_BASE_URL}/user/register`;
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (response.ok) {
                // Save token and role in localStorage if provided
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('role', activeTab);
                }
                toast.success('Registration successful!');
                setTimeout(() => navigate('/'), 1200);
            } else {
                toast.error(data.message || 'Registration failed.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
            <Toaster position="top-center" />
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full flex">
                {/* Left Side - Registration Form */}
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
                                    className={`absolute top-2 bottom-2 w-1/2 bg-white rounded-xl shadow-lg transition-transform duration-300 ease-in-out ${activeTab === 'admin' ? 'transform translate-x-full' : ''}`}
                                ></div>

                                {/* Tab Buttons */}
                                <button
                                    onClick={() => setActiveTab('user')}
                                    className={`relative z-10 flex-1 py-3 px-4 text-center font-semibold rounded-xl transition-colors duration-300 ${activeTab === 'user'
                                        ? 'text-orange-500'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    User Sign Up
                                </button>
                                <button
                                    onClick={() => setActiveTab('admin')}
                                    className={`relative z-10 flex-1 py-3 px-4 text-center font-semibold rounded-xl transition-colors duration-300 ${activeTab === 'admin'
                                        ? 'text-orange-500'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Admin Sign Up
                                </button>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                            Create your account
                        </h1>
                        <p className="text-gray-500 text-sm mb-8">
                            {activeTab === 'user' ? 'Join our community today' : 'Create admin access account'}
                        </p>

                        {/* Form */}
                        <div className="space-y-6">
                            {/* Name Field */}
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="fullName"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-12"
                                            placeholder="Enter your fullName"
                                        />
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-500 p-2 rounded-lg">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>


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
                                        placeholder="john@example.com"
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-500 p-2 rounded-lg">
                                        <Mail className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>

                            <div className={activeTab === 'admin' && (`flex flex-col md:flex-row md:space-x-4`)}>
                                {/* Password Fields */}
                                <div className="flex space-x-4">
                                    <div className="flex-1">
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
                                                placeholder="Password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-500 p-2 rounded-lg hover:bg-orange-600 transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4 text-white" /> : <Eye className="w-4 h-4 text-white" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Admin-specific fields */}
                                {activeTab === 'admin' && (
                                    <div>
                                        <label htmlFor="companyCode" className="block text-sm font-medium text-gray-700 mb-2">
                                            Organization Code
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="companyCode"
                                                value={companyCode}
                                                onChange={(e) => setCompanyCode(e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-12"
                                                placeholder="Enter secret code"
                                            />
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-500 p-2 rounded-lg">
                                                <Building className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="text-center">
                                <span className="text-gray-600">Already have an account? </span>
                                <span onClick={() => navigate('/login')} className="text-orange-500 hover:text-orange-600 font-semibold cursor-pointer">
                                    Login here
                                </span>
                            </div>

                            {/* Register Button */}
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className={`w-full font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 
                                    bg-orange-500 hover:bg-orange-600 text-white`}
                            >
                                {activeTab === 'user' ? 'Create User Account' : 'Create Admin Account'}
                            </button>
                        </div>
                    </div>
                </div>
                <RightSideBar />
            </div>
        </div>
    );
}

export default Register;