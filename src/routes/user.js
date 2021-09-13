/**
 * Import & Declare Module Dependencies.
 */
import { Router } from 'express'
const router = Router();


/**
 * Route Handlers.
 */
router.route('/')
    .get((req, res) => {
        res.json({
            data: {
                msg: "Got a GET request, sending back default 200"
            }
        });
    })
    .post((req, res) => {
        res.status(201).json({
            data: {
                msg: "Got a POST request, sending back 201 Created"
            }
        });
    })
    .put((req, res) => {
        // PUT requests should return 204 No Content
        res.status(204).send();
    })
    .delete((req, res) => {
        // DELETE requests should return 204 No Content
        res.status(204).send();
    })


/**
 * Module Exports.
 */
module.exports = router;
