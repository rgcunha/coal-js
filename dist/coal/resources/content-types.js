"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentTypes = undefined;

var _privateResource = require("../private-resource");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentTypes = exports.ContentTypes = function (_PrivateResource) {
  _inherits(ContentTypes, _PrivateResource);

  function ContentTypes(_ref) {
    var rawClient = _ref.rawClient,
        connect = _ref.connect;

    _classCallCheck(this, ContentTypes);

    return _possibleConstructorReturn(this, (ContentTypes.__proto__ || Object.getPrototypeOf(ContentTypes)).call(this, {
      resourceType: "content_types",
      rawClient: rawClient,
      connect: connect
    }));
  }

  return ContentTypes;
}(_privateResource.PrivateResource);