"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _logger = require("./middleware/logger");

var _errorHandler = require("./middleware/errorHandler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Import Module Dependencies.
 */

/**
 * Export Application Object.
 * @type {Express}
 */
const app = (0, _express.default)();
/**
 * Port.
 * @type {number}
 */

exports.app = app;
const port = 1337;
/**
 * Settings.
 */

app.disable('x-powered-by');
/**
 * Import Route Modules
 */

const indexRoutes = require('./routes/index');

const userRoutes = require('./routes/user');
/**
 * Middlewares used by all routes.
 */


app.use((0, _cors.default)());
/**
 * Don't show the log when it is test.
 * Use morgan to log at command line.
 * 'combined' outputs the Apache style LOGs.
 */

if (process.env.NODE_ENV !== 'test') {
  app.use((0, _morgan.default)('combined'));
}

app.use((0, _bodyParser.json)());
app.use(_express.default.json());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
(0, _logger.logger)();
/**
 * Routes Registration.
 */

app.use('/', indexRoutes);
app.use('/user', userRoutes);
/**
 * Error Handler
 */

(0, _errorHandler.catchAll)();
(0, _errorHandler.errorHandler)();
/**
 * Start function.
 */

app.listen(port, () => {
  console.log('Server is listening on port: ', port);
});