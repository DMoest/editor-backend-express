/**
 * Error Handler for Database.
 */
function dbRequestErrorHandler(response, error) {
    return response.status(500).json({
        errors: {
            status: 500,
            source: "/",
            title: "Database Error",
            detail: error.message
        }
    });
}


/**
 * Module Exports.
 */
module.exports = dbRequestErrorHandler;
