/**
 * Import Module Dependencies & Declare Constants.
 */
const express = require("express");
const router = express.Router();
const db = require("./../db/database.js");
const dbModel = require("./../db/models/document.model");
const dbErrorHandler = require('./../db/dbErrorHandler.js');
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
            .catch(error => dbErrorHandler(res, error));
    })
    .post(async (req, res) => {
        db.connectDb(dbName)
            .then(async () => {
                let result = await dbModel.Document.create({
                    author: req.body.author,
                    title: req.body.title,
                    category: req.body.category,
                    text: req.body.text,
                    status: req.body.status
                });

                return res.status(201).json(result);
            })
            .catch(error => dbErrorHandler(res, error));
    })
    .put(async (req, res) => {
        db.connectDb(dbName)
            .then(async () => {
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
            .catch(error => dbErrorHandler(res, error));
    })
    .delete( async (req, res) => {
        db.connectDb(dbName)
            .then(async () => {
                let result = await dbModel.Document.findByIdAndRemove(req.body._id);

                return res.status(204).send(result);
            })
            .catch(error => dbErrorHandler(res, error));
    });


/**
 * Search route for documents in database. Searching for document._id in database collection.
 */
router.route('/:id')
    .get(async (req, res) => {
        db.connectDb(dbName)
            .then(async () => {
                let result = await dbModel.Document.findById(req.params.id).exec();

                console.log(result);

                return res.status(200).json(result);
            })
            .catch(error => dbErrorHandler(res, error));
    })



/**
 * Module Exports.
 */
module.exports = router;
