/**
 * Import Module Dependencies.
 */
import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { logger } from './middleware/logger'



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
 * Middlewares used by all routes.
 */
app.use(cors())

app.disable('x-powered-by')

if (process.env.NODE_ENV !== 'test') {
    /**
     * Don't show the log when it is test.
     * Use morgan to log at command line.
     * 'combined' outputs the Apache style LOGs.
     */
    app.use(morgan('combined'));
}

app.use(json())
app.use(express.json());
app.use(urlencoded({ extended: true }))
logger()


/**
 * Route Controllers.
 */
app.get('/', (req, res) => {
    res.send({ message: 'Hello!' })
})

app.post('/', (req, res) => {
    console.log('req.body: ', req.body)
    res.send({ message: 'OK' })
})

app.get("/user", (req, res) => {
    res.json({
        data: {
            msg: "Got a GET request, sending back default 200"
        }
    });
});

app.post("/user", (req, res) => {
    res.status(201).json({
        data: {
            msg: "Got a POST request, sending back 201 Created"
        }
    });
});

app.put("/user", (req, res) => {
    // PUT requests should return 204 No Content
    res.status(204).send();
});

app.delete("/user", (req, res) => {
    // DELETE requests should return 204 No Content
    res.status(204).send();
});



/**
 * Start function.
 */
app.listen(port, () => {
    console.log('Server is listening on port: ', port)
})
