/**
 * Import Module Dependencies.
 */
const mongo = require("mongodb").MongoClient;


/**
 * Connect to database client with DSN.
 * Get database from client.
 * Get collection in database.
 * Insert a new document into the database collection.
 * Close database connection.
 * Return results/response.
 * @param dsn
 * @param cloName
 * @param newDoc
 * @return {Promise<*>}
 */
async function insertDocument(dsn, colName, requestBody) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);
    const result = await col.insertOne(requestBody);

    if (result.ok) {
        return result.status(201).json({ data: result.ops });
    }

    await client.close();

    return result;
}


/**
 * Module Exports.
 */
module.exports = insertDocument;
