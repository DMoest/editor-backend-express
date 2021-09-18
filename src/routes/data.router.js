/**
 * Import Module Dependencies & Declare Constants.
 */
const express = require("express");
const router = express.Router();
const db = require('./../db/database.js');
const documentModel = require('./../db/models/mumindalen.js');
const docs = require('../db/setup_collections/setup_mumin.json');
const dbName = "textEditor";


/**
 * Route Handlers.
 */
router.route('/')
    .get(async (req, res) => {
        db.connectDb(dbName)
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
        db.connectDb(dbName)
            .then(async connection => {
                let result = await documentModel.Document.create({
                    namn: req.body.namn,
                    bor: req.body.bor,
                    adress: req.body.adress,
                    info: req.body.info
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
        db.connectDb(dbName)
            .then(async connection => {
                let updatedObject = {
                    namn: req.body.namn,
                    bor: req.body.bor,
                    adress: req.body.adress,
                    info: req.body.info
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
        db.connectDb(dbName)
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
        db.connectDb("mumin")
            .then(async connection => {
                let queryResult = await documentModel.Document.find(`${req.params.searchFor}`).exec();

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
    });


/**
 * Module Exports.
 */
module.exports = router;
