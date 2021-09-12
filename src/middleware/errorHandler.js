/**
 * Import Module Dependencies.
 */
import { app } from "../app";


/**
 * Catch All
 */
export const catchAll = () => {
    app.use((req, res, next) => {
        var err = new Error("Not Found");
        err.status = 404;
        next(err);
    });
}


/**
 * Error Handler
 */
export const errorHandler = () => {
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
}
