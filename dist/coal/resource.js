"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Resource = exports.Resource = function () {
  function Resource(_ref) {
    var resourceType = _ref.resourceType,
        rawClient = _ref.rawClient,
        _ref$connection = _ref.connection,
        connection = _ref$connection === undefined ? null : _ref$connection;

    _classCallCheck(this, Resource);

    this._resourceType = resourceType;
    this._rawClient = rawClient;
    this._connection = connection;
    this._uri = this._buildUri();
  }

  _createClass(Resource, [{
    key: "get",
    value: function get(id) {
      var uri = this._buildUri(id);
      return this._rawClient.get(uri, this._connection);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      var _uri = this._uri,
          _connection = this._connection;

      return this._rawClient.get(_uri, _connection);
    }
  }, {
    key: "create",
    value: function create(data) {
      var _uri = this._uri,
          _connection = this._connection;

      return this._rawClient.create(_uri, data, _connection);
    }
  }, {
    key: "update",
    value: function update(id, data) {
      var uri = this._buildUri(id);
      return this._rawClient.update(uri, data, this._connection);
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var uri = this._buildUri(id);
      return this._rawClient.delete(uri, this._connection);
    }
  }, {
    key: "deleteAll",
    value: function deleteAll() {
      var _uri = this._uri,
          _connection = this._connection;

      return this._rawClient.delete(uri, _connection);
    }
  }, {
    key: "_buildUri",
    value: function _buildUri() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var path = this._resourceType + ".json";
      if (id) {
        path += "/" + id;
      }
      return path;
    }
  }]);

  return Resource;
}();