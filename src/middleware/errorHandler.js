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
 * Error Handler for Route Requests.
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


/**
 * Error Handler for Database.
 */
export const dbErrorHandler = async () => {
    let db;

    try {
        db = await database.getDb();

        const filter = { email: email };
        const keyObject = await db.collection.findOne(filter);

        if (keyObject) {
            return res.json({ data: keyObject });
        }
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/",
                title: "Database error",
                detail: e.message
            }
        });
    } finally {
        await db.client.close();
    }
}
