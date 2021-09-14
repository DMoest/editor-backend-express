/**
 * Import Module Dependencies & Declare Constants.
 */
import { Router } from 'express'
import { findInCollection } from '../db/search'
import { insertDocument } from '../db/insert'
import { updateDocument } from '../db/update'
import { deleteDocument } from '../db/delete'

const router = Router();
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/mumin";


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
            let theDoc = await insertDocument(dsn, "crowd", req.body);

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
            let theDoc = await updateDocument(dsn, "crowd", req.body);

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
            let theDoc = await deleteDocument(dsn, "crowd", req.body);

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
