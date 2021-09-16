/**
 * Import Module Dependencies and declare constants.
 */
const mongo = require("mongodb").MongoClient;
// const config = require('./config.json')
const collectionName = "crowd";


/**
 * Database Object.
 * Connects to database client with DSN adress.
 * Returns database client and collection.
 * @type {{getDb: (function(): {client: MongoClient, collection: *})}}
 */
const database = {
    getDb: async function getDb () {
        let dsn = `mongodb://localhost:27017/mumin`;
        // let dsn = `mongodb+srv://texteditor:${config.username}@${config.password}.c1ix7.mongodb.net/mumin?retryWrites=true&w=majority`;

        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test";
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            collection: collection,
            client: client,
        };
    }
};


/**
 * Module Exports.
 * @type {{getDb: (function(): {client: MongoClient, collection: *})}}
 */
module.exports = database;
