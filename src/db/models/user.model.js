/**
 * Import Module Dependencies.
 */
const mongoose = require("mongoose");


/**
 * Schema for text documents.
 */
const user = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    contact: {
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: Number,
            required: false,
            unique: true
        }
    },
    adress: {
        adress: {
            type: String,
            required: false
        },
        adressnr: {
            type: String, // Can have for example 16B
            required: false
        },
        postnr: {
            type: Number,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        }
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'users'
});


/**
 * Create Model from defined Schema.
 */
const User = mongoose.model('users', user);


/**
 * Module Exports.
 * @type {module:mongoose.Schema<User, Model<User, any, any>, undefined, {}>}
 */
module.exports = { User, user };
