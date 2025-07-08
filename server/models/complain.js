const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
    id: {
        type: String,
        default: function () {
            // Generate a random 4-digit number, padded with zeros if needed
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            return `CPL-${randomNum}`;
        },
        unique: true // Ensures no duplicate IDs
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    discription: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ["Support", "Service", "Product", "Technical","Other"],
        required: true
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: 'Medium',
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Resolved"],
        default: "Pending"
    },
    dateSubmitted: {
        type: Date,
        default: Date.now
    }
})

const Complain = mongoose.model('Complain', complainSchema);
module.exports = Complain;