/**
 * Import Module Dependencies.
 */
const mongoose = require("mongoose");


/**
 * Schema for text documents.
 */
const document = new mongoose.Schema({
    namn: {
        type: String,
        required: true,
        unique: true
    },
    bor: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: false
    },
    info: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    collection: 'mumindalen'
});


/**
 * Create Model from defined Schema.
 */
const Document = mongoose.model('mumindalen', document);


/**
 * Module Exports.
 * @type {module:mongoose.Schema<Document, Model<Document, any, any>, undefined, {}>}
 */
module.exports = { Document, document };
