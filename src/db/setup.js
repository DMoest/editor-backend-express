/**
 * Connect to the database and setup it with some default data.
 */
"use strict";


/**
 * Import Module Dependencies and declare constants.
 */
const mongoose = require("mongoose");
const DocObject = require('./models/document');
// const DocObject = require('./models/mumin');
// const DocObject = require('./models/user');
const docs = require('./setup_documents.json');

// const config = require("./config.json");
// const databaseName = "myFirstDatabase";
const databaseName = "mumin";

const databaseCollection = "documents";
// const databaseCollection = "mumin";


/**
 * @function resetDatabase()
 * @description IFFE to reset database collection.
 *      Connect to database.
 *      Drop collection.
 *      Recreate collection.
 *      Create database objects/documents.
 *      Close database connection.
 */
(async function resetDbCollection() {
    let dsn = `mongodb://localhost:27017/${databaseName}`;
    // let dsn = `mongodb+srv://texteditor:${config.password}@${config.username}.c1ix7.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

    await mongoose.connect(`${dsn}`);
    await mongoose.connection.collection(`${databaseCollection}`).drop();
    await mongoose.model(`${databaseCollection}`, DocObject.document);
    await DocObject.Document.create(docs);
    await mongoose.connection.close();
})();
