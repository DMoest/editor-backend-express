/**
 * Import & Declare Module Dependencies.
 */
import express from 'express'
const router = express.Router();


/**
 * Route Controllers.
 */
router.get('/', (req, res) => {
    const data = {
        data: {
            msg: 'Hello World'
        }
    };

    res.json(data);
})

router.post('/', (req, res) => {
    const data = {
        data: {
            msg: 'OK'
        }
    };

    res.json(data);
})


/**
 * Module Exports.
 */
module.exports = router;
