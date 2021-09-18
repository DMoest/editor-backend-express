/**
 * Import Module Dependencies.
 */
const mongoose = require("mongoose");


/**
 * Schema for text documents.
 */
const document = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'documents'
});


/**
 * Create Model from defined Schema.
 */
const Document = mongoose.model('document', document);


/**
 * Module Exports.
 * @type {module:mongoose.Schema<Document, Model<Document, any, any>, undefined, {}>}
 */
module.exports = { Document, document };
