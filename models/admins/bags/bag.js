const mongoose = require('mongoose')


const bagSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            productPhoto: {
                type: String,
                required: true
            },
            productDescription: {
                type: String

            }
        }
    ],
    bagDescription: {
        type: String
    }, // Final description for this specific bag
    createdBy: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: Date,
        default: Date.now
    }
});

const Bag = mongoose.model('Bag', bagSchema);
module.exports = Bag;