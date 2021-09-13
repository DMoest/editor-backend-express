"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

/**
 * Import & Declare Module Dependencies.
 */
const router = (0, _express.Router)();
/**
 * Route Handlers.
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
 * Export default enables you to rename the module where it is imported.
 * If using export in front of constant declaration you have to import it by correct name.
 */

var _default = router;
exports.default = _default;