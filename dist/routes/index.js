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


router.get('/', (req, res) => {
  const data = {
    data: {
      msg: 'Hello World'
    }
  };
  res.json(data);
});
router.post('/', (req, res) => {
  const data = {
    data: {
      msg: 'OK'
    }
  };
  res.json(data);
});
/**
 * Module Exports.
 */

module.exports = router;