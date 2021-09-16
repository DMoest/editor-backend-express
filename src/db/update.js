/**
 * Import Module Dependencies.
 */
const mongo = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectId;


/**
 * Connect to database client with DSN.
 * Get database from client.
 * Get collection in database.
 * Declare filter from requestBody.
 * Declare document updates from requestBody.
 * Update Document in collection.
 * Close database connection.
 * Update a document in database collection.
 * Return results/response.
 * @param dsn
 * @param colName
 * @param docId
 * @param updatedDoc
 * @return {Promise<*>}
 */
async function updateDocument(dsn, colName, requestBody) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);

    const filter = { _id: ObjectId(requestBody['_id']) };

    let updateDoc = {
        $set: {
            namn: requestBody.namn,
            bor: requestBody.bor
        }
    }

    const result = await col.updateOne(
        filter,
        updateDoc,
    );

    await client.close();

    return result;
}


/**
 * Module Exports.
 */
module.exports = updateDocument;
