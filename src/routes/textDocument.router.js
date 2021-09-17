/**
 * Import Module Dependencies & Declare Constants.
 */
const express = require("express");
const router = express.Router();
const database = require('./../db/database');
const docs = require('./../db/setup_documents.json');
const db = require("./../db/database.js");
const documentModel = require("./../db/models/document");



/**
 * Route Handlers.
 */
router.route('/')
    .get(async (req, res) => {
        db.connectDb("documents")
            .then(async connection => {
                let queryResult = await documentModel.Document.find({}).exec();

                return res.status(200).json(queryResult);
            })
            .catch(error => {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/data",
                        title: "Database error",
                        detail: error.message
                    }
                });
            });
    })
    .post(async (req, res) => {
        db.connectDb("documents")
            .then(async connection => {
                let result = await documentModel.Document.create({
                    author: req.body.author,
                    title: req.body.title,
                    category: req.body.category,
                    text: req.body.text,
                    status: req.body.status
                });

                return res.status(201).json(result);
            })
            .catch(error => {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/data",
                        title: "Database error",
                        detail: error.message
                    }
                });
            });
    })
    .put(async (req, res) => {
        db.connectDb("documents")
            .then(async connection => {
                let updatedObject = {
                    author: req.body.author,
                    title: req.body.title,
                    category: req.body.category,
                    text: req.body.text,
                    status: req.body.status
                }

                let result = await documentModel.Document.findByIdAndUpdate(req.body._id, updatedObject, { new: true });

                return res.status(204).send(result);
            })
            .catch(error => {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/data",
                        title: "Database error",
                        detail: error.message
                    }
                });
            });
    })
    .delete( async (req, res) => {
        db.connectDb("documents")
            .then(async connection => {
                let result = await documentModel.Document.findByIdAndRemove(req.body._id);

                return res.status(204).send(result);
            })
            .catch(error => {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/data",
                        title: "Database error",
                        detail: error.message
                    }
                });
            });
    });


/**
 * Route for resetting the database.
 * This is only for testing purposes, comment out before application goes into production.
 */
router.route('/reset')
    .get(async (req, res) => {
        try {
            let theReset = await database.resetDbCollection("documents", docs);

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
            let theSearch = await readFromDb("documents", { namn: req.params.searchFor }, {}, 0);

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
