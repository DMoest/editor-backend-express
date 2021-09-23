/**
 * Import Module Dependencies.
 */
const mongoose = require("mongoose");
let config;

try {
    config = require('./config.json');
} catch (error) {
    console.log('Config Require Error: ', error)
}


/**
 * @method connect()
 * @description
 *      Store DSN-url to property, value will depend on the running Node.js server environment.
 *      Store database name in property.
 *      Connect to database using Mongoose providing the DSN-url.
 * @param dsn
 */
async function connectDb(databaseName) {
    let dsn;

    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === 'test') {
        dsn = "mongodb://localhost:27017/test";
        // eslint-disable-next-line no-undef
    } else if (process.env.NODE_ENV === 'development') {
        dsn = `mongodb://localhost:27017/${databaseName}`;
        // eslint-disable-next-line no-undef
    } else if (process.env.NODE_ENV === 'production') {
        dsn = `mongodb+srv://texteditor:${config.password}@${config.username}.c1ix7.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
    }

    // console.log(`DSN set for: ${process.env.NODE_ENV}`);

    try {
        return await mongoose.connect(`${dsn}`, {useNewUrlParser: true, useUnifiedTopology: true});
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
