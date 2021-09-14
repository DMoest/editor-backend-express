/**
 * Import Module Dependencies.
 */
import {MongoClient as mongo, ObjectId} from "mongodb";


/**
 * Connect to database client with DSN.
 * Get database from client.
 * Get collection in database.
 * Declare filter from requestBody.
 * Delete document from database collection.
 * Close database connection.
 * Return results/response.
 * @param dsn
 * @param colName
 * @param requestBody
 * @return {Promise<*>}
 */
async function deleteDocument(dsn, colName, requestBody) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);
    const filter = { _id: ObjectId(requestBody['_id']) };
    const res = await col.deleteOne(filter);

    await client.close();

    console.log(`${ res.deletedCount } document(s) was/where deleted.`);

    return res;
}


/**
 * Module Exports.
 */
module.exports = {
    'deleteDocument': deleteDocument
};
