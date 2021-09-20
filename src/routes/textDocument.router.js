/**
 * Import Module Dependencies & Declare Constants.
 */
const express = require("express");
const router = express.Router();
const db = require("./../db/database.js");
const dbModel = require("./../db/models/document.model");
const dbName = "textEditor";



/**
 * Route Handlers.
 */
router.route('/')
    .get(async (req, res) => {
        db.connectDb(dbName)
            .then(async () => {
                let queryResult = await dbModel.Document.find({}).exec();

                return res.status(200).json(queryResult);
            })
            .catch(error => {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/data",
                        title: "Database errors",
                        detail: error.message
                    }
                });
            });
    })
    .post(async (req, res) => {
        db.connectDb(dbName)
            .then(async connection => {
                let result = await dbModel.Document.create({
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
        db.connectDb(dbName)
            .then(async connection => {
                let updatedObject = {
                    author: req.body.author,
                    title: req.body.title,
                    category: req.body.category,
                    text: req.body.text,
                    status: req.body.status
                }

                let result = await dbModel.Document.findByIdAndUpdate(req.body._id, updatedObject, { new: true });

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
                let result = await dbModel.Document.findByIdAndRemove(req.body._id);

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
 *
 */
router.route('/:id')
    .get(async (req, res) => {
        db.connectDb(dbName)
            .then(async () => {
                let queryResult = await dbModel.Document.findById(req.params.id).exec();

                console.log(queryResult);

                return res.status(200).json(queryResult);
            })
            .catch(error => {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/data/find",
                        title: "Database errors",
                        detail: error.message
                    }
                });
            });
    })

/**
 * Module Exports.
 */
module.exports = router;
