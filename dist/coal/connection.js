"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Connection = exports.Connection = function () {
  function Connection(_ref) {
    var email = _ref.email,
        token = _ref.token,
        _ref$handle = _ref.handle,
        handle = _ref$handle === undefined ? null : _ref$handle;

    _classCallCheck(this, Connection);

    this._email = email;
    this._token = token, this._handle = handle;
  }

  _createClass(Connection, [{
    key: "email",
    get: function get() {
      return this._email;
    },
    set: function set(email) {
      this._email = email;
    }
  }, {
    key: "token",
    get: function get() {
      return this._token;
    },
    set: function set(token) {
      this._token = token;
    }
  }, {
    key: "handle",
    get: function get() {
      return this._handle;
    },
    set: function set(handle) {
      this._handle = handle;
    }
  }]);

  return Connection;
}();