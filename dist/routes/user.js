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
  res.json({
    data: {
      msg: "Got a GET request, sending back default 200"
    }
  });
}).post((req, res) => {
  res.status(201).json({
    data: {
      msg: "Got a POST request, sending back 201 Created"
    }
  });
}).put((req, res) => {
  // PUT requests should return 204 No Content
  res.status(204).send();
}).delete((req, res) => {
  // DELETE requests should return 204 No Content
  res.status(204).send();
});
/**
 * Module Exports.
 * Export default enables you to rename the module where it is imported.
 * If using export in front of constant declaration you have to import it by correct name.
 */

var _default = router;
exports.default = _default;