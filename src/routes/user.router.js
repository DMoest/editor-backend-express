/**
 * Import Module Dependencies & Declare Constants.
 */
const express = require("express");
const router = express.Router();
const db = require('./../db/database.js');
const dbModel = require('./../db/models/user.model');
const docs = require('../db/setup_collections/setup_users.json');
const dbName = "textEditor";


/**
 * Route Handlers.
 */
router.route('/')
    .get(async (req, res) => {
        db.connectDb(dbName)
            .then(async connection => {
                let result = await dbModel.User.find({}).exec();

                return res.status(200).json(result);
            })
            .catch(error => {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/user",
                        title: "Database error",
                        detail: error.message
                    }
                });
            });
    })
    .post(async (req, res) => {
        db.connectDb(dbName)
            .then(async connection => {
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
            .catch(error => {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/user",
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
            .catch(error => {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/user",
                        title: "Database error",
                        detail: error.message
                    }
                });
            });
    })
    .delete( async (req, res) => {
        db.connectDb(dbName)
            .then(async connection => {
                let result = await dbModel.User.findByIdAndRemove(req.body._id);

                return res.status(204).send(result);
            })
            .catch(error => {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/user",
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
