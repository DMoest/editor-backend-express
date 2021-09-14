/**
 * Import Module Dependencies.
 */
import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { logger } from './middleware/logger'
import { catchAll, errorHandler } from './middleware/errorHandler'


/**
 * Export Application Object.
 * @type {Express}
 */
export const app = express()


/**
 * Port.
 * @type {number}
 */
const port = 1337


/**
 * Settings.
 */
app.disable('x-powered-by')


/**
 * Import Route Modules
 */
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const dataRoutes = require('./routes/data');


/**
 * Middlewares used by all routes.
 */
app.use(cors())

/**
 * Don't show the log when it is test.
 * Use morgan to log at command line.
 * 'combined' outputs the Apache style LOGs.
 */
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}

app.use(json())
app.use(express.json());
app.use(urlencoded({ extended: true }))
logger()


/**
 * Routes Registration.
 */
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/data', dataRoutes);


/**
 * Error Handler
 */
catchAll()
errorHandler()


/**
 * Start function.
 */
app.listen(port, () => {
    console.log('Server is listening on port: ', port)
})
