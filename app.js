/**
 * Import Module Dependencies.
 */
const express = require("express");
// const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');


/**
 * Export Application Object.
 * @type {Express}
 */
const app = express()


/**
 * Port.
 */
// const port = 1337
const port = process.env.PORT || 1337


/**
 * Import Route Modules
 */
const indexRoutes = require('./src/routes/index.router.js');
const userRoutes = require('./src/routes/user.router.js');
const dataRoutes = require('./src/routes/data.router.js');
const textDocumentRoutes = require('./src/routes/textDocument.router.js');


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
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
};

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
app.use('/document', textDocumentRoutes);


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
 * Start function.
 */
console.log('Node Environment: ', process.env.NODE_ENV);

app.listen(port, () => {
    console.log('Server is listening on port: ', port)
});