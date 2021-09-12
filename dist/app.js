"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

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
 * Middlewares used by all routes.
 */

app.use((0, _cors.default)());
app.disable('x-powered-by');

if (process.env.NODE_ENV !== 'test') {
  /**
   * Don't show the log when it is test.
   * Use morgan to log at command line.
   * 'combined' outputs the Apache style LOGs.
   */
  app.use((0, _morgan.default)('combined'));
}

app.use((0, _bodyParser.json)());
app.use(_express.default.json());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
/**
 * Route Controllers.
 */

app.get('/', (req, res) => {
  res.send({
    message: 'Hello!'
  });
});
app.post('/', (req, res) => {
  console.log('req.body: ', req.body);
  res.send({
    message: 'OK'
  });
});
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
  console.log('Server is listening on port: ', port);
});