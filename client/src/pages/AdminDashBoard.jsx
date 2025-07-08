import React, { useState, useEffect, useContext } from 'react';
import {
    Filter,
    AlertCircle,
    CheckCircle,
    Clock,
    FileText,
    X,
    User,
    Mail,
    Calendar,
    Tag,
    Flag
} from 'lucide-react';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import ComplaintsTable from '../components/ComplaintsTable';
import DetailsModal from '../components/DetailsModal';
import { AdminDataContext } from '../contexts/AdminContext';

const AdminDashBoard = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [complaints, setComplaints] = useState([]);
    const [stats, setStats] = useState([
        { label: 'Total Complaints', value: 0, color: 'bg-blue-500', icon: FileText },
        { label: 'Pending', value: 0, color: 'bg-yellow-500', icon: Clock },
        { label: 'In Progress', value: 0, color: 'bg-orange-500', icon: AlertCircle },
        { label: 'Resolved', value: 0, color: 'bg-green-500', icon: CheckCircle }
    ]);
    const [loading, setLoading] = useState(true);
    const { admin } = useContext(AdminDataContext);
    const isAdmin = true;

    // Fetch complaints and stats from backend
    const fetchDashboard = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const params = [];
            if (activeFilter !== 'all') params.push(`status=${encodeURIComponent(activeFilter.replace(/(^| )\w/g, s => s.toUpperCase()))}`);
            if (priorityFilter !== 'all') params.push(`priority=${encodeURIComponent(priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1))}`);
            const query = params.length ? `?${params.join('&')}` : '';
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/dashboard${query}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setComplaints(data.complaints.map(c => ({
                    id: c._id, // use MongoDB ObjectId for all backend actions
                    code: c.id, // show CPL-xxxx code in UI
                    title: c.title,
                    category: c.category,
                    priority: c.priority,
                    status: c.status,
                    date: new Date(c.dateSubmitted).toLocaleDateString(),
                    user: c.userId?.fullName || '',
                    email: c.userId?.email || '',
                    description: c.discription
                })));
                setStats([
                    { label: 'Total Complaints', value: data.totalCount, color: 'bg-blue-500', icon: FileText },
                    { label: 'Pending', value: data.statusCounts.Pending, color: 'bg-yellow-500', icon: Clock },
                    { label: 'In Progress', value: data.statusCounts['In Progress'], color: 'bg-orange-500', icon: AlertCircle },
                    { label: 'Resolved', value: data.statusCounts.Resolved, color: 'bg-green-500', icon: CheckCircle }
                ]);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, [activeFilter, priorityFilter]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Resolved': return 'bg-green-100 text-green-800 border-green-300';
            case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800 border-red-300';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Low': return 'bg-green-100 text-green-800 border-green-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Resolved': return <CheckCircle className="w-4 h-4" />;
            case 'In Progress': return <Clock className="w-4 h-4" />;
            case 'Pending': return <AlertCircle className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    const handleComplaintClick = (complaint) => {
        setSelectedComplaint(complaint);
        setShowDetailsModal(true);
    };

    const handleStatusUpdate = (complaintId, newStatus) => {
        setComplaints(complaints.map(complaint =>
            complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint
        ));
        setSelectedComplaint(prev => prev ? { ...prev, status: newStatus } : null);
    };

    const filteredComplaints = complaints.filter(complaint => {
        const matchesSearch = complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            complaint.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 relative">
            {/* Header */}
            <Header isAdmin={isAdmin} />

            {/* Details Modal */}
            <DetailsModal
                show={showDetailsModal}
                complaint={selectedComplaint}
                onClose={() => setShowDetailsModal(false)}
                onStatusUpdate={handleStatusUpdate}
                getPriorityColor={getPriorityColor}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
                Calendar={Calendar}
                User={User}
                Mail={Mail}
                Tag={Tag}
                X={X}
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back{admin?.fullName ? `, ${admin.fullName}` : ''}!</h1>
                    <p className="text-gray-600">Here's an overview of your complaint management dashboard</p>
                </div>

                {/* Stats Cards */}
                <StatsCards stats={stats} />

                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Filter className="w-5 h-5 text-gray-400" />
                            <select
                                value={activeFilter}
                                onChange={(e) => setActiveFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                            </select>
                        </div>
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="all">All Priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>

                {/* Complaints Table */}
                <ComplaintsTable
                    filteredComplaints={filteredComplaints}
                    handleComplaintClick={handleComplaintClick}
                    getPriorityColor={getPriorityColor}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    Calendar={Calendar}
                />
            </div>
        </div>
    );
};

export default AdminDashBoard;