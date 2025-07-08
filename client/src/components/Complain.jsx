import React, { useState } from 'react';
import { FileText, AlertCircle, Send, CheckCircle } from 'lucide-react';

const Complain = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        priority: 'Medium'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const categories = [
        { value: '', label: 'Select a category' },
        { value: 'Product', label: 'Product' },
        { value: 'Service', label: 'Service' },
        { value: 'Support', label: 'Support' },
        { value: 'Technical', label: 'Technical' },
        { value: 'Other', label: 'Other' }
    ];

    const priorities = [
        { value: 'Low', label: 'Low', color: 'bg-green-100 text-green-800 border-green-300' },
        { value: 'Medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
        { value: 'High', label: 'High', color: 'bg-red-100 text-red-800 border-red-300' }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Complaint title is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters long';
        }

        if (!formData.category) {
            newErrors.category = 'Please select a category';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/complaint`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: formData.title,
                    discription: formData.description,
                    category: formData.category,
                    priority: formData.priority
                })
            });
            const data = await response.json();
            if (response.ok) {
                setIsSubmitting(false);
                setIsSubmitted(true);
                // Optionally show a toast here
                
                setTimeout(() => {
                    setIsSubmitted(false);
                    setFormData({
                        title: '',
                        description: '',
                        category: '',
                        priority: 'Medium'
                    });
                }, 3000);
            } else {
                setIsSubmitting(false);
                setErrors({ submit: data.message || 'Failed to submit complaint.' });
            }
        } catch (error) {
            setIsSubmitting(false);
            setErrors({ submit: 'An error occurred. Please try again.' });
            console.error(error);
        }
    };

    const handleReset = () => {
        setFormData({
            title: '',
            description: '',
            category: '',
            priority: 'Medium'
        });
        setErrors({});
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full p-8">
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Complaint Submitted Successfully!</h2>
                        <p className="text-gray-600 mb-6">
                            Thank you for your feedback. We've received your complaint and will review it shortly.
                        </p>
                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                            <p className="text-sm text-gray-700">
                                <strong>Complaint ID:</strong> CPL-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                            </p>
                            <p className="text-sm text-gray-700 mt-2">
                                You will receive an email confirmation shortly with tracking details.
                            </p>
                        </div>
                        <div className="animate-pulse">
                            <div className="h-1 bg-orange-200 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500 rounded-full animate-pulse"></div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Redirecting to form...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4 md:p-8">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex">
                {/* Left Side - Form */}
                <div className="w-full p-8 lg:p-12">
                    <div className="max-w-2xl mx-auto">
                        

                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                Submit a Complaint
                            </h1>

                        </div>

                        {/* Form */}
                        <div className="space-y-6">
                            {/* Complaint Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Complaint Title *
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-12 ${errors.title ? 'border-red-300' : 'border-gray-200'
                                            }`}
                                        placeholder="Brief title describing your complaint"
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-500 p-2 rounded-lg">
                                        <FileText className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Category and Priority Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Category */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                        Category *
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="category"
                                            value={formData.category}
                                            onChange={(e) => handleInputChange('category', e.target.value)}
                                            className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-12 ${errors.category ? 'border-red-300' : 'border-gray-200'
                                                }`}
                                        >
                                            {categories.map((cat) => (
                                                <option key={cat.value} value={cat.value}>
                                                    {cat.label}
                                                </option>
                                            ))}
                                        </select>
                                        
                                    </div>
                                    {errors.category && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {errors.category}
                                        </p>
                                    )}
                                </div>

                                {/* Priority */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Priority *
                                    </label>
                                    <div className="flex space-x-4">
                                        {priorities.map((priority) => (
                                            <label key={priority.value} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="priority"
                                                    value={priority.value}
                                                    checked={formData.priority === priority.value}
                                                    onChange={(e) => handleInputChange('priority', e.target.value)}
                                                    className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500"
                                                />
                                                <span className={`ml-3 px-3 py-1 rounded-full text-sm font-medium border ${priority.color}`}>
                                                    {priority.label}
                                                </span>
                                            </label>
                                        ))}

                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Description *
                                </label>
                                <div className="relative">
                                    <textarea
                                        id="description"
                                        rows="6"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none ${errors.description ? 'border-red-300' : 'border-gray-200'
                                            }`}
                                        placeholder="Please provide here detailed information about your complaint.."
                                    />
                                    
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    {errors.description ? (
                                        <p className="text-sm text-red-600 flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {errors.description}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            Minimum 10 characters required
                                        </p>
                                    )}
                                    <span className="text-sm text-gray-500">
                                        {formData.description.length}/1000
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className={`flex-1 flex items-center justify-center space-x-2 font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 ${isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>Submit Complaint</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="flex-1 sm:flex-none bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-200"
                                >
                                    Reset Form
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Complain

