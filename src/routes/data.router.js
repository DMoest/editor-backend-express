/**
 * Import Module Dependencies & Declare Constants.
 */
const express = require("express");
const router = express.Router();
const db = require('./../db/database.js');
const dbErrorHandler = require('./../db/dbErrorHandler.js');
const documentModel = require('./../db/models/mumindalen.model.js');
// const docs = require('../db/setup_collections/setup_mumin.json');
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
            .catch(error => dbErrorHandler(res, error));
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
            .catch(error => dbErrorHandler(res, error));
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
            .catch(error => dbErrorHandler(res, error));
    })
    .delete( async (req, res) => {
        db.connectDb(dbName)
            .then(async connection => {
                let result = await documentModel.Document.findByIdAndRemove(req.body._id);

                return res.status(204).send(result);
            })
            .catch(error => dbErrorHandler(res, error));
    });


/**
 * Module Exports.
 */
module.exports = router;
