/**
 * Import & Declare Module Dependencies.
 */
import { Router } from 'express'
import { MongoClient as mongo } from "mongodb";
const router = Router();
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/mumin";



/**
 * Find documents in an collection by matching search criteria.
 *
 * @async
 *
 * @param {string} dsn        DSN to connect to database.
 * @param {string} colName    Name of collection.
 * @param {object} criteria   Search criteria.
 * @param {object} projection What to project in results.
 * @param {number} limit      Limit the number of documents to retrieve.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<array>} The resultset as an array.
 */
async function findInCollection(dsn, colName, criteria, projection, limit) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);
    const res = await col.find(criteria, projection).limit(limit).toArray();

    await client.close();

    return res;
}


async function insertDoc(dsn, cloName, doc) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);

    await col.insertOne(doc);

    await client.close();
}



/**
 * Route Handlers.
 */
router.route('/search')
    .get(async (req, res) => {
        try {
            let theSearch = await findInCollection(dsn, "crowd", {}, {}, 0);

            console.log('Response: \n', theSearch);
            res.json(theSearch);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    })

router.route('insert/:doc')
    .post(async (req, res) => {
        try {
            let res = await insertDoc(dsn, "crowd", req.params.doc);

            console.log(res);
            res.json(res);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    })


/**
 * Module Exports.
 */
module.exports = router;
