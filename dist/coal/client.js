'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _resources = require('./resources');

var _rawClient = require('./raw-client');

var _connection = require('./connection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = exports.Client = function () {
  function Client(_ref) {
    var _this = this;

    var baseUrl = _ref.baseUrl,
        _ref$basicAuth = _ref.basicAuth,
        basicAuth = _ref$basicAuth === undefined ? null : _ref$basicAuth,
        email = _ref.email,
        apiKey = _ref.apiKey,
        _ref$httpClient = _ref.httpClient,
        httpClient = _ref$httpClient === undefined ? null : _ref$httpClient;

    _classCallCheck(this, Client);

    this._getConnection = function () {
      if (_this._connection) {
        return new Promise(function (resolve) {
          return resolve(_this._connection);
        });
      }
      return _this._createConnection();
    };

    this._createConnection = function () {
      return _this._createToken().then(function (_ref2) {
        var data = _ref2.data;
        return _this._connection = new _connection.Connection({
          email: _this._email,
          token: data.token,
          handle: _this._siteHandle
        });
      });
    };

    this._createToken = function () {
      var _email = _this._email,
          _apiKey = _this._apiKey;

      var data = { email: _email, api_key: _apiKey };
      return _this.token().create(data);
    };

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
    key: 'token',
    value: function token() {
      return this._token = new _resources.Token({ rawClient: this._rawClient });
    }
  }, {
    key: 'version',
    value: function version() {
      return this._version = new _resources.Version({ rawClient: this._rawClient, connect: this._getConnection });
    }
  }, {
    key: 'myAccount',
    value: function myAccount() {
      return this._myAccount = new _resources.MyAccount({ rawClient: this._rawClient, connect: this._getConnection });
    }
  }, {
    key: 'sites',
    value: function sites() {
      return this._sites = new _resources.Sites({ rawClient: this._rawClient, connect: this._getConnection });
    }
  }, {
    key: 'currentSite',
    value: function currentSite() {
      return this._currentSite = new _resources.CurrentSite({ rawClient: this._rawClient, connect: this._getConnection });
    }
  }, {
    key: 'contentTypes',
    value: function contentTypes() {
      return this._contentTypes = new _resources.ContentTypes({ rawClient: this._rawClient, connect: this._getConnection });
    }
  }, {
    key: 'contentEntries',
    value: function contentEntries(contentType) {
      return this._contentEntries = new _resources.ContentEntries({
        rawClient: this._rawClient,
        connect: this._getConnection,
        contentType: contentType
      });
    }
  }, {
    key: '_buildHttpClient',
    value: function _buildHttpClient(_ref3) {
      var baseUrl = _ref3.baseUrl,
          _ref3$basicAuth = _ref3.basicAuth,
          basicAuth = _ref3$basicAuth === undefined ? null : _ref3$basicAuth;

      var config = {
        baseURL: baseUrl,
        timeout: 2000,
        auth: basicAuth,
        headers: { 'Content-Type': 'application/json' }
      };
      return _axios2.default.create(config);
    }
  }]);

  return Client;
}();