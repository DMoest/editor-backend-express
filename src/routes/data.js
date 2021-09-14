/**
 * Import Module Dependencies & Declare Constants.
 */
import { Router } from 'express'
import { MongoClient as mongo } from "mongodb";
import { ObjectId } from "mongodb";
import { findInCollection } from '../db/search'
import { insertToCollection } from '../db/insert'

const router = Router();
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/mumin";



// /**
//  * Find documents in an collection by matching search criteria.
//  *
//  * @async
//  *
//  * @param {string} dsn        DSN to connect to database.
//  * @param {string} colName    Name of collection.
//  * @param {object} criteria   Search criteria.
//  * @param {object} projection What to project in results.
//  * @param {number} limit      Limit the number of documents to retrieve.
//  *
//  * @throws Error when database operation fails.
//  *
//  * @return {Promise<array>} The resultset as an array.
//  */
// async function findInCollection(dsn, colName, criteria, projection, limit) {
//     const client  = await mongo.connect(dsn);
//     const db = await client.db();
//     const col = await db.collection(colName);
//     const res = await col.find(criteria, projection).limit(limit).toArray();
//
//     await client.close();
//
//     return res;
// }





/**
 * Update a document in database collection.
 * @param dsn
 * @param colName
 * @param docId
 * @param updatedDoc
 * @return {Promise<*>}
 */
async function updateDoc(dsn, colName, requestBody) {
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
 * Function for deleting a document from database.
 * @param dsn
 * @param colName
 * @param requestBody
 * @return {Promise<*>}
 */
async function deleteDoc(dsn, colName, requestBody) {
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
 * Route Handlers.
 */
router.route('/')
    .get(async (req, res) => {
        try {
            let theSearch = await findInCollection(dsn, "crowd", {}, {}, 0);

            console.log('Response: \n', theSearch);
            res.status(200).json(theSearch);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    })
    .post(async (req, res) => {
        try {
            let theDoc = await insertDoc(dsn, "crowd", req.body);

            console.log(`A new document was inserted with ID: ${theDoc.insertedId}`);
            console.log('Response: \n', theDoc);
            res.status(201).json(theDoc);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    })
    .put(async (req, res) => {
        try {
            let theDoc = await updateDoc(dsn, "crowd", req.body);

            console.log(`A document was updated with ID: ${theDoc.insertedId}`);
            console.log('Response: \n', theDoc);
            res.status(204).send(theDoc);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    })
    .delete( async (req, res) => {
        try {
            let theDoc = await deleteDoc(dsn, "crowd", req.body);

            console.log(`${theDoc.deletedCount} document(s) was/were deleted.`);
            console.log('Response: \n', theDoc);
            res.status(204).send(theDoc);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    })

/**
 * Dynamic Search Route
 */
router.route('/:searchFor')
    .get(async (req, res) => {
        try {
            let theSearch = await findInCollection(dsn, "crowd", { namn: req.params.searchFor }, {}, 0);

            console.log('Response: \n', theSearch);
            res.status(200).json(theSearch);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    })


/**
 * Module Exports.
 */
module.exports = router;
