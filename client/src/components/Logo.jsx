import React from 'react'

const Logo = () => {
    return (
        <>
            <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                    <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
                    <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
                    <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
                    <div className="w-1 h-8 bg-orange-300 rounded-full"></div>
                </div>
                <span className="text-2xl font-bold text-gray-800">EasyComplain</span>
            </div>
        </>
    )
}

export default Logo