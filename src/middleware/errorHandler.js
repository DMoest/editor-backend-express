/**
 * Import Module Dependencies.
 */
const app = require('../../app.js');


/**
 * Error Handler for Route Requests.
 */
const errorHandler = () => {
    app.use((err, req, res, next) => {
        if (res.headersSent) {
            return next(err);
        }

        res.status(err.status || 500).json({
            "errors": [
                {
                    "status": err.status,
                    "title":  err.message,
                    "detail": err.message
                }
            ]
        });
    });
}


/**
 * Module Exports.
 */
module.exports = errorHandler;
