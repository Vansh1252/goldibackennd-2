const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensuring the email is unique
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    mobileNumber: {
        type: String,
        required: true,
        // unique: true, // Ensuring the mobile number is unique
        match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number'],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    status: {
        type: Boolean,
        default: true,
    },
    product_status: {
        type: Boolean,
        default: true,
    },
    deleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'adminmanger',
        required: true
    }}, {
    timestamps: true,
});

schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        console.log('salt:', salt);
        console.log('password:', this.password);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
});

schema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const usermodel = mongoose.model('userdatas', schema);
module.exports = usermodel;