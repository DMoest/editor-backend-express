/**
 * Function for making a query to the database.
 * @param collectionName
 * @param searchFor
 * @return {Promise<*>}
 */
const query_db = async (collectionName, searchFor) => {
    const db = await database.getDb(collectionName);
    const resultSet = await db.collection.find({searchFor}).toArray();

    await db.client.close();

    return resultSet
}

module.exports = query_db
