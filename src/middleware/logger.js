/**
 * Import Module Dependencies.
 */
import { app } from "../app";


/**
 * Error Handler
 */
export const logger = () => {
    app.use((req, res, next) => {
        console.log('req.method: ', req.method);
        console.log('req.path: ', req.path);
        next();
    });
}
