/**
 * Import Module Dependencies.
 */
import { MongoClient as mongo } from "mongodb";


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
    const res = await col.insertOne(requestBody);

    await client.close();

    return res;
}


/**
 * Module Exports.
 */
export default insertDocument;
