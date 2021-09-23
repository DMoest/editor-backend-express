/**
 * Import Module Dependencies & Declare Constants.
 */
const express = require("express");
const router = express.Router();
const db = require('./../db/database.js');
const dbModel = require('./../db/models/user.model');
const dbErrorHandler = require('./../db/dbErrorHandler.js');
const dbName = "textEditor";


/**
 * Route Handlers.
 */
router.route('/')
    .get(async (req, res) => {
        db.connectDb(dbName)
            .then(async () => {
                let result = await dbModel.User.find({}).exec();

                return res.status(200).json(result);
            })
            .catch(error => dbErrorHandler(res, error));
    })
    .post(async (req, res) => {
        db.connectDb(dbName)
            .then(async () => {
                let result = await dbModel.User.create({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    contact: {
                        phone: req.body.phone,
                        email: req.body.email,
                    },
                    adress: {
                        street: req.body.street,
                        streetnr: req.body.streetnr,
                        postnr: req.body.postnr,
                        city: req.body.city,
                        country: req.body.country
                    },
                    status: "created"
                });

                return res.status(201).json(result);
            })
            .catch(error => dbErrorHandler(res, error));
    })
    .put(async (req, res) => {
        db.connectDb(dbName)
            .then(async () => {
                let updatedObject = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    contact: {
                        email: req.body.email,
                        phone: req.body.phone
                    },
                    adress: {
                        street: req.body.street,
                        streetnr: req.body.streetnr,
                        postnr: req.body.postnr,
                        city: req.body.city,
                        country: req.body.country
                    },
                    status: "updated"
                }

                let result = await dbModel.User.findByIdAndUpdate(req.body._id, updatedObject, { new: true });

                return res.status(204).send(result);
            })
            .catch(error => dbErrorHandler(res, error));
    })
    .delete( async (req, res) => {
        db.connectDb(dbName)
            .then(async () => {
                let result = await dbModel.User.findByIdAndRemove(req.body._id);

                return res.status(204).send(result);
            })
            .catch(error => dbErrorHandler(res, error));
    });


/**
 * Route Handlers to search for user with id.
 */
router.route('/:id')
    .get(async (req, res) => {
        db.connectDb(dbName)
            .then(async () => {
                let result = await dbModel.User.findById(req.params.id).exec();

                return res.status(200).json(result);
            })
            .catch(error => dbErrorHandler(res, error));
    })


/**
 * Module Exports.
 */
module.exports = router;
