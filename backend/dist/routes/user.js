"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var router = _express["default"].Router();

exports.UserRouter = router;
router.get("/", function (req, res) {
  res.send("Responded With Resource .. User");
});
router.get("/me", function (req, res) {
  res.json({
    id: 1,
    name: "yash kumar"
  });
});