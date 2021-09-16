/**
 * Import Module Dependencies & Declare Constants.
 */
const express = require("express");
const router = express.Router();
const database = require('./../db/database');
const docs = require('./../db/setup_mumin.json');


/**
 * Route Handlers.
 */
router.route('/')
    .get(async (req, res) => {
        try {
            let theSearch = await database.readFromDb("crowd", {}, {}, 0);

            console.log('Response: \n', theSearch);
            res.status(200).json(theSearch);
        } catch (err) {
            // console.log(err);
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/data",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
    })
    .post(async (req, res) => {
        try {
            let result = await database.createInDb("crowd", req.body);

            console.log('Response: \n', result);
            res.status(201).json(result);
        } catch(err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/data",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
    })
    .put(async (req, res) => {
        try {
            let theDoc = await database.updateInDb("crowd", req.body);

            console.log(`A document was updated with ID: ${theDoc.insertedId}`);
            console.log('Response: \n', theDoc);

            res.status(204).send(theDoc);
        } catch(err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/data",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
    })
    .delete( async (req, res) => {
        try {
            const result = await database.deleteFromDb("crowd", req.body);

            console.log(`${ result.deletedCount } document(s) was/where deleted.`);

            return result;

        } catch (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/data",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
    });


/**
 * Route for resetting the database.
 * This is only for testing purposes, comment out before application goes into production.
 */
router.route('/reset')
    .get(async (req, res) => {
        try {
            let theReset = await database.resetCollection("crowd", docs);

            console.log('Response: \n', theReset);
            res.status(200).json(theReset);
        } catch (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/data",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
    });


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
    });


/**
 * Module Exports.
 */
module.exports = router;
