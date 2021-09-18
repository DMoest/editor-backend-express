/**
 * Import Module Dependencies & Declare Constants.
 */
const express = require("express");
const router = express.Router();
const db = require("./../db/database.js");
const documentModel = require("./../db/models/document");
const dbName = "textEditor";



/**
 * Route Handlers.
 */
router.route('/')
    .get(async (req, res) => {
        db.connectDb(dbName)
            .then(async () => {
                let queryResult = await documentModel.Document.find({}).exec();

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
        db.connectDb(dbName)
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
 * Module Exports.
 */
module.exports = router;
