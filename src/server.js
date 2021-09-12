/**
 * Import Module Dependencies.
 */
import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
const port = 1337

export const app = express()

app.disable('x-powered-by')

/**
 * Register Use of Dependencies.
 */
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

/**
 * Routes Register.
 */
app.get('/', (req, res) => {
    res.send({ message: 'Hello!' })
})

app.post('/', (req, res) => {
    console.log('req.body: ', req.body)
    res.send({ message: 'OK' })
})

/**
 * Start function.
 */
export const start = () => {
    app.listen(1337, () => {
        console.log('Server is listening on port: ', port)
    })
}
