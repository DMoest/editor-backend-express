/**
 * Import Module Dependencies.
 */
const app = require('./../../app');


/**
 * Request Logger.
 */
// const logger = () => {
//     app.use((req, res, next) => {
//         console.log('req.method: ', req.method);
//         console.log('req.path: ', req.path);
//         next();
//     });
// }


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
