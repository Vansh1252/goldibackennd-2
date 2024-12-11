const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    bagIds:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bag',
            required: true
        }],
    status: {
        type: String,
        enum: ['created', 'processing', 'completed', 'canceled'],
        default: 'created'
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    },
    updatedBy:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        default: null
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Order', OrderSchema);