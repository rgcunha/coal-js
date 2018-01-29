"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawClient = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RawClient = exports.RawClient = function () {
  function RawClient(_ref) {
    var baseUrl = _ref.baseUrl,
        httpClient = _ref.httpClient;

    _classCallCheck(this, RawClient);

    this._baseUrl = baseUrl;
    this._httpClient = httpClient;
  }

  _createClass(RawClient, [{
    key: "get",
    value: function get(path, connection) {
      return this._sendRequest({ method: "get", path: path, connection: connection });
    }
  }, {
    key: "create",
    value: function create(path, body, connection) {
      return this._sendRequest({ method: "post", path: path, body: body, connection: connection });
    }
  }, {
    key: "_buildUrl",
    value: function _buildUrl(path) {
      return this._baseUrl + "/" + path;
    }
  }, {
    key: "_sendRequest",
    value: function _sendRequest(_ref2) {
      var method = _ref2.method,
          path = _ref2.path,
          _ref2$queryParams = _ref2.queryParams,
          queryParams = _ref2$queryParams === undefined ? null : _ref2$queryParams,
          _ref2$body = _ref2.body,
          body = _ref2$body === undefined ? null : _ref2$body,
          _ref2$connection = _ref2.connection,
          connection = _ref2$connection === undefined ? null : _ref2$connection;

      var url = this._buildUrl(path);
      var headers = this._httpClient.defaults.headers;
      if (connection) {
        var email = connection.email,
            token = connection.token,
            handle = connection.handle;

        headers.common['X-Locomotive-Account-Email'] = email;
        headers.common['X-Locomotive-Account-Token'] = token;
        headers.common['X-Locomotive-Site-Handle'] = handle;
      }
      return this._httpClient[method](url, body);
    }
  }]);

  return RawClient;
}();