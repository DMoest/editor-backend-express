"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = exports.catchAll = void 0;

var _app = require("../app");

/**
 * Import Module Dependencies.
 */

/**
 * Catch All
 */
const catchAll = () => {
  _app.app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
};
/**
 * Error Handler
 */


exports.catchAll = catchAll;

const errorHandler = () => {
  _app.app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }

    res.status(err.status || 500).json({
      "errors": [{
        "status": err.status,
        "title": err.message,
        "detail": err.message
      }]
    });
  });
};

exports.errorHandler = errorHandler;