"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;

var _app = require("../app");

/**
 * Import Module Dependencies.
 */

/**
 * Error Handler
 */
const logger = () => {
  _app.app.use((req, res, next) => {
    console.log('req.method: ', req.method);
    console.log('req.path: ', req.path);
    next();
  });
};

exports.logger = logger;