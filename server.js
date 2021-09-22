/**
 * Server File intends to separate Application code from
 * execution file that listens to ports for test purposes.
 */


/**
 * Import application.
 */
const app = require('./app.js');


/**
 * Port.
 */
const port = process.env.PORT || 1337;


/**
 * Start application on port.
 */
console.log('Node Environment: ', process.env.NODE_ENV);

app.listen(port, () => {
    console.log('Server is listening on port: ', port)
});
