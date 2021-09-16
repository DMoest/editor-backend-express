/**
 * Import Module Dependencies & Declare Constants.
 */
const express = require("express");
const router = express.Router();
const config = require("./../db/config.json");
const docs = require('./../db/setupDB.json');
const dsn = `mongodb+srv://texteditor:${config.password}@${config.username}.c1ix7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/mumin";

const findInCollection = require('./../db/search.js');
const insertDocument = require('./../db/insert.js');
const updateDocument = require('./../db/update.js');
const deleteDocument = require('./../db/delete.js');
const resetCollection = require('./../db/setup.js');


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

router.route('/resetMumin')
    .get(async (req, res) => {
        try {
            let theReset = await resetCollection(dsn, "crowd", docs);

            console.log('Response: \n', theReset);
            res.status(200).json(theReset);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    })


/**
 * Module Exports.
 */
module.exports = router;
