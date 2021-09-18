/**
 * Connect to the database and setup it with some default data.
 */
"use strict";


/**
 * Import Module Dependencies.
 */
const mongoose = require("mongoose");
// const config = require("./config.json");


/**
 * Import setup information, set Model and set collection name
 * @type {{document: module:mongoose.Schema<Document, Model<DocType, any, any>, undefined, {}>, Document: Model<unknown>}|{Document?: Model<unknown>, document?: module:mongoose.Schema<Document, Model<DocType, any, any>, undefined, {}>}}
 */
// const dbName = "myFirstDatabase";
const dbName = "textEditor";

const dbObjects = require('./setup_collections/setup_documents.json');
const ModelObject = require('./models/document');
const dbCollection = "documents";

// const dbObjects = require('./setup_collections/setup_mumin.json');
// const ModelObject = require('./models/mumindalen');
// const dbCollection = "mumindalen";

// const dbObjects = require('./setup_collections/setup_users.json');
// const ModelObject = require('./models/user');
// const dbCollection = "users";


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
    let dsn = `mongodb://localhost:27017/${dbName}`;
    // let dsn = `mongodb+srv://texteditor:${config.password}@${config.username}.c1ix7.mongodb.net/${dbName}?retryWrites=true&w=majority`;

    await mongoose.connect(`${dsn}`);
    await mongoose.connection.collection(`${dbCollection}`).drop();
    await mongoose.model(`${dbCollection}`, ModelObject.document);
    await ModelObject.Document.create(dbObjects);
    await mongoose.connection.close();
})();
