'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = exports.Client = function () {
  function Client(_ref) {
    var baseUrl = _ref.baseUrl,
        email = _ref.email,
        apiKey = _ref.apiKey,
        _ref$httpClient = _ref.httpClient,
        httpClient = _ref$httpClient === undefined ? null : _ref$httpClient;

    _classCallCheck(this, Client);

    this.baseUrl = baseUrl;
    this.email = email;
    this.apiKey = apiKey;
    this.httpClient = httpClient ? httpClient : this.buildHttpClient(baseUrl);
  }

  _createClass(Client, [{
    key: 'buildHttpClient',
    value: function buildHttpClient(baseUrl) {
      return _axios2.default.create({
        baseURL: baseUrl,
        timeout: 2000,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }, {
    key: 'buildUrl',
    value: function buildUrl(resourceType) {
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var url = this.baseUrl + '/' + resourceType + '.json';
      if (id) {
        url += '/' + id;
      }
      return url;
    }
  }, {
    key: 'get',
    value: function get(resourceType) {
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var url = this.buildUrl(resourceType, id);
      return this.httpClient.get(url);
    }
  }, {
    key: 'create',
    value: function create(resourceType, data) {
      var url = this.buildUrl(resourceType);
      return this.httpClient.post(url, data);
    }
  }, {
    key: 'getContentEntries',
    value: function getContentEntries() {
      return this.get("content_entries");
    }

    // curl -v -H 'Content-Type: Application/json' -d '{"email":"ruben.cunha@gmail.com", "api_key":"bcc74aeff61f5c6735884a51024db81c882b6ed4"}' 'https://station.locomotive.works/locomotive/api/v3/tokens.json'

  }, {
    key: 'createToken',
    value: function createToken() {
      var email = this.email,
          apiKey = this.apiKey;

      var data = { email: email, api_key: apiKey };
      return this.create("tokens", data);
    }
  }]);

  return Client;
}();