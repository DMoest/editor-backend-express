"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
exports.app = app;
const port = 1337;
app.disable('x-powered-by');
app.use((0, _cors.default)());
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
app.use((0, _morgan.default)('dev'));
/**
 * Routes.
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
/**
 * Start function.
 */

const start = () => {
  app.listen(1337, () => {
    console.log('Server is listening on port: ', port);
  });
};

exports.start = start;