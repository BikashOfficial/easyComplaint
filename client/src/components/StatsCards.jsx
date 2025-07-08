import React from 'react';

const StatsCards = ({ stats }) => {
    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.color}`}>
                            <stat.icon className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards; 