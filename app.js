/**
 * Import Module Dependencies.
 */
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');


/**
 * Export Application Object.
 * @type {Express}
 */
const app = express()


/**
 * Import Route Modules
 */
const indexRoutes = require('./src/routes/index.router.js');
const userRoutes = require('./src/routes/user.router.js');
const dataRoutes = require('./src/routes/data.router.js');
const documentRoutes = require('./src/routes/document.router.js');


/**
 * Middlewares used by all routes.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/**
 * Don't show the log when it is test.
 * Use morgan to log at command line.
 * 'combined' outputs the Apache style LOGs.
 */
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});


/**
 * Routes Registration.
 */
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/data', dataRoutes);
app.use('/document', documentRoutes);


/**
 * Error Handler
 */
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

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


/**
 * Module Exports.
 * @type {Express}
 */
module.exports = app;
