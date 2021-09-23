/**
 * Connect to the database and setup it with some default data.
 */
"use strict";


/**
 * Import Module Dependencies.
 */
const mongoose = require("mongoose");
const config = require("./config.json");


/**
 * Import setup information, set Model and set collection name
 * @type {{document: module:mongoose.Schema<Document, Model<DocType, any, any>, undefined, {}>, Document: Model<unknown>}|{Document?: Model<unknown>, document?: module:mongoose.Schema<Document, Model<DocType, any, any>, undefined, {}>}}
 */

const dbObjects = require('./setup_collections/setup_documents.json');
const dbModel = require('./models/document.model');
const dbCollection = "documents";

// const dbObjects = require('./setup_collections/setup_mumin.json');
// const dbModel = require('./models/mumindalen.model');
// const dbCollection = "mumindalen";

// const dbObjects = require('./setup_collections/setup_users.json');
// const dbModel = require('./models/user.model');
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
async function resetDbCollection(theCollection) {
    let dbName = "textEditor";
    let dsn = `mongodb+srv://texteditor:${config.password}@${config.username}.c1ix7.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    // let dsn = `mongodb://localhost:27017/${dbName}`;

    try {
        await mongoose.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        await mongoose.connection.collection(theCollection).drop();

        if (dbCollection === "documents" || dbCollection === "mumindalen") {
            await mongoose.model(`${theCollection}`, dbModel.document);
            await dbModel.Document.create(dbObjects);
        } else if (dbCollection === "users") {
            await mongoose.model(`${theCollection}`, dbModel.user);
            await dbModel.User.create(dbObjects);
        }

        await mongoose.connection.close();
    } catch (error) {
        console.log(error.message);
    } finally {
        await mongoose.connection.close();
    }
}



try {
    return resetDbCollection(dbCollection);
} catch (e) {
    console.log(`Error: ${e.message}`)
}

module.exports = resetDbCollection
