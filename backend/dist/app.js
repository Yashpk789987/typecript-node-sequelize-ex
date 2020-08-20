"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _createTypeOrmConnection = require("./utils/createTypeOrmConnection");

var _user = require("./routes/user");

var _User = require("./entity/User");

connectDB();
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use("/users", _user.UserRouter);
app.get("/", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user, s;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = new _User.User();
            user.email = "yashpk2128@gmail.com";
            user.password = "yash";
            _context.next = 5;
            return user.save();

          case 5:
            s = _context.sent;
            console.log(s);
            res.json({
              msg: "babel - run - failed"
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.listen(process.env.PORT || 4000, function () {
  console.log("app is listening to port 4000");
});

function connectDB() {
  return _connectDB.apply(this, arguments);
}

function _connectDB() {
  _connectDB = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            _context2.next = 4;
            return (0, _createTypeOrmConnection.createTypeormConnection)();

          case 4:
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            console.log("connectDBError :: ", _context2.t0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));
  return _connectDB.apply(this, arguments);
}