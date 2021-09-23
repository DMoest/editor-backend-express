/**
 * Import Module Dependencies.
 */
// const app = require('./../../app');


/**
 * Request Logger.
 */
const logger = (req, res, next) => {
    console.log('Request.method: ', req.method);
    console.log('Request.path: ', req.path);
    next();
};


/**
 * Module Exports.
 * @type {{logger: logger}}
 */
module.exports = logger;
