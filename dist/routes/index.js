"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Import & Declare Module Dependencies.
 */
const router = _express.default.Router();
/**
 * Route Controllers.
 */


router.route('/').get((req, res) => {
  const data = {
    data: {
      msg: 'Hello World'
    }
  };
  res.json(data);
}).post((req, res) => {
  const data = {
    data: {
      msg: 'OK'
    }
  };
  res.json(data);
});
/**
 * Dynamic Route
 */

router.route('/hello/:msg').get((req, res) => {
  const data = {
    data: {
      msg: req.params.msg
    }
  };
  res.json(data);
});
/**
 * Module Exports.
 */

module.exports = router;