'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrivateResource = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _resource = require('./resource');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrivateResource = exports.PrivateResource = function (_Resource) {
  _inherits(PrivateResource, _Resource);

  function PrivateResource(_ref) {
    var resourceType = _ref.resourceType,
        rawClient = _ref.rawClient,
        connect = _ref.connect;

    _classCallCheck(this, PrivateResource);

    var _this = _possibleConstructorReturn(this, (PrivateResource.__proto__ || Object.getPrototypeOf(PrivateResource)).call(this, {
      resourceType: resourceType,
      rawClient: rawClient
    }));

    _this._connect = connect;
    return _this;
  }

  _createClass(PrivateResource, [{
    key: 'get',
    value: function get(id) {
      var _this2 = this;

      return this._connect().then(function (connection) {
        _this2._connection = connection;
        return _get(PrivateResource.prototype.__proto__ || Object.getPrototypeOf(PrivateResource.prototype), 'get', _this2).call(_this2, id);
      });
    }
  }, {
    key: 'getAll',
    value: function getAll() {
      var _this3 = this;

      return this._connect().then(function (connection) {
        _this3._connection = connection;
        return _get(PrivateResource.prototype.__proto__ || Object.getPrototypeOf(PrivateResource.prototype), 'getAll', _this3).call(_this3);
      });
    }
  }, {
    key: 'create',
    value: function create(data) {
      var _this4 = this;

      return this._connect().then(function (connection) {
        _this4._connection = connection;
        return _get(PrivateResource.prototype.__proto__ || Object.getPrototypeOf(PrivateResource.prototype), 'create', _this4).call(_this4, data);
      });
    }
  }, {
    key: 'update',
    value: function update(id, data) {
      var _this5 = this;

      return this._connect().then(function (connection) {
        _this5._connection = connection;
        return _get(PrivateResource.prototype.__proto__ || Object.getPrototypeOf(PrivateResource.prototype), 'update', _this5).call(_this5, id, data);
      });
    }
  }, {
    key: 'delete',
    value: function _delete(id) {
      var _this6 = this;

      return this._connect().then(function (connection) {
        _this6._connection = connection;
        return _get(PrivateResource.prototype.__proto__ || Object.getPrototypeOf(PrivateResource.prototype), 'delete', _this6).call(_this6, id);
      });
    }
  }, {
    key: 'deleteAll',
    value: function deleteAll() {
      var _this7 = this;

      return this._connect().then(function (connection) {
        _this7._connection = connection;
        return _get(PrivateResource.prototype.__proto__ || Object.getPrototypeOf(PrivateResource.prototype), 'deleteAll', _this7).call(_this7);
      });
    }
  }]);

  return PrivateResource;
}(_resource.Resource);