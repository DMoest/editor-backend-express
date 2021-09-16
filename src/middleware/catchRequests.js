/**
 * Import Module Dependencies.
 */
const app = require('../../app.js');


/**
 * Catch All
 */
const catchAllRequests = () => {
    app.use((req, res, next) => {
        var err = new Error("Not Found");
        err.status = 404;
        next(err);
    });
}


/**
 * Module Exports.
 */
module.exports = catchAllRequests;
