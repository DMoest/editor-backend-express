/**
 * Connect to the database and setup it with some default data.
 */
"use strict";


/**
 * Import Module Dependencies and declare constants.
 */
const mongo = require("mongodb").MongoClient;
const config = require('./config.json');
const docs = require('./setup_documents.json');


/**
 * DSN Adresses local and MongoDB server.
 * @type {string}
 */
// const dsn = "mongodb://localhost:27017/documents";
const dsn = `mongodb+srv://texteditor:${config.password}@${config.username}.c1ix7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


// Do it.
resetCollection(dsn, "documents", docs)
    .catch(err => console.log(err));


/**
 * Reset a collection by removing existing content and insert a default
 * set of documents.
 *
 * @async
 *
 * @param {string} dsn     DSN to connect to database.
 * @param {string} colName Name of collection.
 * @param {string} doc     Documents to be inserted into collection.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<void>} Void
 */
async function resetCollection(dsn, colName, doc) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);

    await col.deleteMany();
    await col.insertMany(doc);

    await client.close();
}


/**
 * Module Exports.
 */
module.exports = resetCollection;
