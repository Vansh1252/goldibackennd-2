const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        products: [productSchema],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'adminmanager',
            required: true
        },
    },
    { timestamps: true }
);

const categorymodel = mongoose.model('Category', categorySchema);

module.exports = categorymodel;
