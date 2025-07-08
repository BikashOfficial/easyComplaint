import React from 'react'
import { Lock, Smartphone } from 'lucide-react';

const RightSideBar = () => {
    return (
        // {/* Right Side - Illustration */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-orange-100 to-orange-200 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">

                <div className="absolute top-12 z-30">
                    <p className="text-4xl font-bold text-gray-600">Register Your Compaints</p>
                </div>
                <div className="relative">
                    {/* Background circles */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-300 rounded-full opacity-20"></div>
                    <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-orange-400 rounded-full opacity-20"></div>

                    {/* Phone mockup */}
                    <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-4 w-64 h-96 mx-auto">
                        <div className="bg-gray-800 rounded-2xl h-6 w-32 mx-auto mb-4"></div>
                        <div className="space-y-4 p-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                    <div className="w-4 h-4 bg-white rounded-full"></div>
                                </div>
                                <div className="flex-1 h-2 bg-orange-200 rounded"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-3 bg-orange-300 rounded w-3/4"></div>
                                <div className="h-3 bg-orange-200 rounded w-1/2"></div>
                                <div className="h-3 bg-orange-300 rounded w-2/3"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-8 bg-gray-100 rounded"></div>
                                <div className="h-8 bg-gray-100 rounded"></div>
                            </div>
                            <div className="h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xs font-semibold">SIGN UP</span>
                            </div>
                        </div>
                    </div>

                    {/* Person illustration */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8">
                        <div className="relative">
                            {/* Body */}
                            <div className="w-16 h-24 bg-orange-500 rounded-t-2xl rounded-b-lg"></div>
                            {/* Head */}
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-orange-400 rounded-full"></div>
                            {/* Hair */}
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-14 h-8 bg-gray-800 rounded-full"></div>
                            {/* Arms */}
                            <div className="absolute top-2 -left-4 w-6 h-16 bg-orange-500 rounded-full transform rotate-12"></div>
                            <div className="absolute top-2 -right-4 w-6 h-16 bg-orange-500 rounded-full transform -rotate-12"></div>
                            {/* Legs */}
                            <div className="absolute -bottom-8 left-2 w-5 h-12 bg-gray-800 rounded-full"></div>
                            <div className="absolute -bottom-8 right-2 w-5 h-12 bg-gray-800 rounded-full"></div>
                        </div>
                    </div>

                    {/* Floating icons */}
                    <div className="absolute -top-10 -left-10 w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center transform rotate-12">
                        <Lock className="w-8 h-8 text-white" />
                    </div>

                    <div className="absolute top-10 -right-6 w-12 h-12 bg-orange-400 rounded-xl flex items-center justify-center transform -rotate-12">
                        <Smartphone className="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightSideBar