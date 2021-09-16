/**
 * Import & Declare Module Dependencies.
 */
const express = require("express");
const router = express.Router();


/**
 * Route Handlers.
 */
router.route('/')
    .get(async (req, res) => {
        const data = {
            data: {
                msg: 'Hello World'
            }
        };

        res.json(data);
    })
    .post((req, res) => {
        const data = {
            data: {
                msg: 'OK'
            }
        };

        res.json(data);
    })


/**
 * Dynamic Route
 */
router.route('/hello/:msg')
    .get((req, res) => {
        const data = {
            data: {
                msg: req.params.msg
            }
        };

        res.json(data);
    })


/**
 * Module Exports.
 */
module.exports = router;
