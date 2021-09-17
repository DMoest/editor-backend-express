/**
 * Import Module Dependencies.
 */
const mongoose = require("mongoose");
const config = require('./config.json');


/**
 * @method connect()
 * @description
 *      Store DSN-url to property, value will depend on the running Node.js server environment.
 *      Store database name in property.
 *      Connect to database using Mongoose providing the DSN-url.
 * @param dsn
 */
async function connectDb(databaseName) {
    if (process.env.NODE_ENV === 'test') {
        this.dsn = "mongodb://localhost:27017/test";
    } else if (process.env.NODE_ENV === 'development') {
        this.dsn = `mongodb://localhost:27017/${databaseName}`;
    } else if (process.env.NODE_ENV === 'production') {
        this.dsn = `mongodb+srv://texteditor:${config.password}@${config.username}.c1ix7.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
    }

    console.log(`DSN set for: ${process.env.NODE_ENV}`);

    try {
        return await mongoose.connect(`${this.dsn}`, {useNewUrlParser: true, useUnifiedTopology: true});
    } catch(error) {
        return console.log(error);
    }
}


/**
 * Module Exports.
 * @type {{getDb: (function(): {client: MongoClient, collection: *})}}
 */
module.exports = {
    connectDb
};
