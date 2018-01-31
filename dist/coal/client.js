'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _rawClient = require('./raw-client');

var _connection = require('./connection');

var _errors = require('./errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = exports.Client = function () {
  function Client(_ref) {
    var baseUrl = _ref.baseUrl,
        _ref$basicAuth = _ref.basicAuth,
        basicAuth = _ref$basicAuth === undefined ? null : _ref$basicAuth,
        email = _ref.email,
        apiKey = _ref.apiKey,
        _ref$httpClient = _ref.httpClient,
        httpClient = _ref$httpClient === undefined ? null : _ref$httpClient;

    _classCallCheck(this, Client);

    this._baseUrl = baseUrl;
    this._email = email;
    this._apiKey = apiKey;
    this._httpClient = httpClient ? httpClient : this._buildHttpClient({ baseUrl: baseUrl, basicAuth: basicAuth });
    this._rawClient = new _rawClient.RawClient({
      baseUrl: baseUrl,
      httpClient: this._httpClient
    });
    this._connection = null;
    this._siteHandle = null;
  }

  _createClass(Client, [{
    key: 'scopedBySite',
    value: function scopedBySite(siteHandle) {
      this._siteHandle = siteHandle;
      if (this._connection) {
        this._connection.handle = siteHandle;
      }
      return this;
    }
  }, {
    key: 'createToken',
    value: function createToken() {
      var _email = this._email,
          _apiKey = this._apiKey;

      var data = { email: _email, api_key: _apiKey };
      return this._create("tokens", data);
    }
  }, {
    key: 'getEngineVersion',
    value: function getEngineVersion() {
      var _this = this;

      return this._getConnection().then(function (connection) {
        return _this._get("version", connection);
      });
    }
  }, {
    key: 'getMyAccount',
    value: function getMyAccount() {
      var _this2 = this;

      return this._getConnection().then(function (connection) {
        return _this2._get("my_account", connection);
      });
    }
  }, {
    key: 'getSites',
    value: function getSites() {
      var _this3 = this;

      return this._getConnection().then(function (connection) {
        return _this3._get("sites", connection);
      });
    }
  }, {
    key: 'getCurrentSite',
    value: function getCurrentSite() {
      var _this4 = this;

      return this._getConnection().then(function (connection) {
        return _this4._get("current_site", connection);
      });
    }
  }, {
    key: 'getContentTypes',
    value: function getContentTypes() {
      var _this5 = this;

      return this._getConnection().then(function (connection) {
        return _this5._get("content_types", connection);
      });
    }
  }, {
    key: 'getContentTypeEntries',
    value: function getContentTypeEntries(contentType) {
      var _this6 = this;

      if (!contentType) {
        throw new _errors.ArgumentError("content type must be a string");
      }
      var resourceType = 'content_types/' + contentType + '/entries';
      return this._getConnection().then(function (connection) {
        return _this6._get(resourceType, connection);
      });
    }
  }, {
    key: '_buildHttpClient',
    value: function _buildHttpClient(_ref2) {
      var baseUrl = _ref2.baseUrl,
          _ref2$basicAuth = _ref2.basicAuth,
          basicAuth = _ref2$basicAuth === undefined ? null : _ref2$basicAuth;

      var config = {
        baseURL: baseUrl,
        timeout: 2000,
        auth: basicAuth,
        headers: { 'Content-Type': 'application/json' }
      };
      return _axios2.default.create(config);
    }
  }, {
    key: '_get',
    value: function _get(resourceType) {
      var connection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var path = this._buildPath(resourceType);
      return this._rawClient.get(path, connection);
    }
  }, {
    key: '_create',
    value: function _create(resourceType, data) {
      var connection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var path = this._buildPath(resourceType);
      return this._rawClient.create(path, data, connection);
    }
  }, {
    key: '_buildPath',
    value: function _buildPath(resourceType) {
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var path = resourceType + '.json';
      if (id) {
        path += '/' + id;
      }
      return path;
    }
  }, {
    key: '_getConnection',
    value: function _getConnection() {
      var _this7 = this;

      if (this._connection) {
        return new Promise(function (resolve) {
          return resolve(_this7._connection);
        });
      }
      return this._createConnection();
    }
  }, {
    key: '_createConnection',
    value: function _createConnection() {
      var _this8 = this;

      return this.createToken().then(function (_ref3) {
        var data = _ref3.data;
        return _this8._connection = new _connection.Connection({
          email: _this8._email,
          token: data.token,
          handle: _this8._siteHandle
        });
      });
    }
  }]);

  return Client;
}();