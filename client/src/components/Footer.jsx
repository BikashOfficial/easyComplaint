import React from 'react'

import {
    Plus,
    Star,
    Award,
    Shield,
    Clock,
    CheckCircle,
    Users,
    TrendingUp,
    Sparkles,
    MessageCircle,
    Heart,
    ArrowRight,
    Target,
    Zap,
    Globe
} from 'lucide-react';

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-900 text-white relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="flex space-x-1">
                                    <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
                                    <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
                                    <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
                                    <div className="w-1 h-8 bg-orange-300 rounded-full"></div>
                                </div>
                                <span className="text-2xl font-bold">EasyComplain</span>
                            </div>
                            <p className="text-gray-400 mb-6 max-w-md">
                                Transforming complaint management with innovative solutions that put customer satisfaction first.
                                Your voice matters, and we're here to make sure it's heard.
                            </p>
                            <div className="flex space-x-4">
                                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-300 cursor-pointer">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-300 cursor-pointer">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-300 cursor-pointer">
                                    <Heart className="w-5 h-5" />
                                </div>
                            </div>
                        </div>



                        {/* Support */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Support</h3>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Contact Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">FAQ</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>


                </div>
            </footer>
        </div>
    )
}

export default Footer