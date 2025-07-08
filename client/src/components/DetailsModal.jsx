import React, { useState } from 'react';

const DetailsModal = ({
    show,
    complaint,
    onClose,
    onStatusUpdate,
    getPriorityColor,
    getStatusColor,
    getStatusIcon,
    Calendar,
    User,
    Mail,
    Tag,
    X,
    onUpdate,
    onDelete
}) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [status, setStatus] = useState(complaint?.status || 'Pending');

    if (!show || !complaint) return null;

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/complaint/${complaint.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            let data;
            try {
                data = await res.json();
            } catch (e) {
                data = {};
            }
            if (res.ok) {
                onStatusUpdate(complaint.id, status);
                if (onUpdate) onUpdate(data.complaint);
            } else {
                alert(data.message || 'Failed to update status');
            }
        } catch (err) {
            alert('Error updating status');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this complaint?')) return;
        setIsDeleting(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/complaint/${complaint.id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            let data;
            try {
                data = await res.json();
            } catch (e) {
                data = {};
            }
            if (res.ok) {
                if (onDelete) onDelete(complaint);
                onClose();
            } else {
                alert(data.message || 'Failed to delete complaint');
            }
        } catch (err) {
            alert('Error deleting complaint');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative z-10 w-full max-w-4xl mx-auto">
                <button
                    className="absolute top-4 right-4 w-10 h-10 bg-red-500 flex items-center justify-center rounded-full shadow hover:bg-red-600 z-20"
                    onClick={onClose}
                >
                    <X className="w-5 h-5 text-white" />
                </button>
                <div className="bg-white rounded-xl p-8 mx-4 max-h-[90vh] overflow-y-auto">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Complaint Details</h2>
                        <div className="flex items-center space-x-4 mb-4">
                            <span className="text-sm font-medium text-gray-500">ID: {complaint.id}</span>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(complaint.priority)}`}>
                                {complaint.priority} Priority
                            </span>
                        </div>
                    </div>

                    {/* Status Update */}
                    <div className="border-t pt-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
                        <div className="flex items-center space-x-4 mb-4">
                            <span className="text-sm font-medium text-gray-700">Current Status:</span>
                            <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(status)}`}>
                                {getStatusIcon(status)}
                                <span className="ml-2">{status}</span>
                            </span>
                        </div>
                        <div className="mb-6">
                            <select
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                                className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                            </select>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-2">
                            <button
                                className="w-full md:w-40 px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-md hover:from-orange-500 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-all duration-150 disabled:opacity-50"
                                onClick={handleUpdate}
                                disabled={isUpdating}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {isUpdating ? 'Updating...' : 'Update'}
                                </span>
                            </button>
                            <button
                                className="w-full md:w-40 px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-red-500 to-red-700 text-white shadow-md hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-150 disabled:opacity-50"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Combined Customer and Complaint Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer & Complaint Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Row 1 */}
                            <div className="bg-white rounded-md p-3 border border-gray-200 flex flex-col">
                                <span className="font-semibold text-gray-700">Customer Name</span>
                                <span className="text-sm text-gray-900 break-words flex items-center"><User className="w-4 h-4 mr-1 text-gray-400" />{complaint.user}</span>
                            </div>
                            <div className="bg-white rounded-md p-3 border border-gray-200 flex flex-col">
                                <span className="font-semibold text-gray-700">Email Address</span>
                                <span className="text-sm text-gray-900 break-words flex items-center"><Mail className="w-4 h-4 mr-1 text-gray-400" />{complaint.email}</span>
                            </div>
                            {/* Row 2 */}
                            <div className="bg-white rounded-md p-3 border border-gray-200 flex flex-col">
                                <span className="font-semibold text-gray-700">Date Submitted</span>
                                <span className="text-sm text-gray-900 break-words flex items-center"><Calendar className="w-4 h-4 mr-1 text-gray-400" />{complaint.date}</span>
                            </div>
                            <div className="bg-white rounded-md p-3 border border-gray-200 flex flex-col">
                                <span className="font-semibold text-gray-700">Category</span>
                                <span className="text-sm text-gray-900 break-words flex items-center"><Tag className="w-4 h-4 mr-1 text-gray-400" />{complaint.category}</span>
                            </div>
                            {/* Row 3 */}
                            <div className="bg-white rounded-md p-3 border border-gray-200 flex flex-col md:col-span-2">
                                <span className="font-semibold text-gray-700">Title</span>
                                <span className="text-sm text-gray-900 break-words">{complaint.title}</span>
                            </div>
                            <div className="bg-white rounded-md p-3 border border-gray-200 flex flex-col md:col-span-2">
                                <span className="font-semibold text-gray-700">Description</span>
                                <span className="text-sm text-gray-700 break-words leading-relaxed">{complaint.description}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsModal;