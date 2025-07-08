import React from 'react';

const ComplaintsTable = ({
    filteredComplaints,
    handleComplaintClick,
    getPriorityColor,
    getStatusColor,
    getStatusIcon,
    Calendar
}) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">User Complaints</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Complaint ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title & Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Priority
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {[...filteredComplaints].reverse().map((complaint) => (
                        <tr key={complaint.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleComplaintClick(complaint)}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">{complaint.code}</span>
                            </td>
                            <td className="px-6 py-4">
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{complaint.title}</div>
                                    <div className="text-sm text-gray-500">{complaint.category}</div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(complaint.priority)}`}>
                                    {complaint.priority}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(complaint.status)}`}>
                                    {getStatusIcon(complaint.status)}
                                    <span className="ml-1">{complaint.status}</span>
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center text-sm text-gray-900">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {complaint.date}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default ComplaintsTable; 