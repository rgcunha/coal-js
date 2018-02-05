'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentEntries = undefined;

var _privateResource = require('../private-resource');

var _errors = require('../errors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentEntries = exports.ContentEntries = function (_PrivateResource) {
  _inherits(ContentEntries, _PrivateResource);

  function ContentEntries(_ref) {
    var rawClient = _ref.rawClient,
        connect = _ref.connect,
        contentType = _ref.contentType;

    _classCallCheck(this, ContentEntries);

    if (!contentType) {
      throw new _errors.ArgumentError("contentType must be a string");
    }
    return _possibleConstructorReturn(this, (ContentEntries.__proto__ || Object.getPrototypeOf(ContentEntries)).call(this, {
      resourceType: 'content_types/' + contentType + '/entries',
      rawClient: rawClient,
      connect: connect
    }));
  }

  return ContentEntries;
}(_privateResource.PrivateResource);