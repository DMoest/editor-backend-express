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
 * Export default enables you to rename the module where it is imported.
 * If using export in front of constant declaration you have to import it by correct name.
 */
export default router;
