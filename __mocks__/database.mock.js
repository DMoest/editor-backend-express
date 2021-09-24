/**
 * Import Module Dependencies.
 */
const mongoose = require("mongoose");
const dsn = "mongodb://localhost:27017/test";



/**
 * @description Connects to test database.
 * @return {Promise<*|void>}
 */
async function connectToTestDb() {

    try {
        return await mongoose.connect(`${dsn}`, {useNewUrlParser: true, useUnifiedTopology: true});
    } catch(error) {
        return console.log(error);
    }
}


/**
 * @description Drops the test database.
 * @return {Promise<*|void>}
 */
async function dropTestDb() {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close()
}


/**
 * Module Exports.
 * @type {{connectToTestDb: ((function(*): Promise<*|void|undefined>)|*)}}
 */
module.exports = {
    connectToTestDb,
    dropTestDb
}
