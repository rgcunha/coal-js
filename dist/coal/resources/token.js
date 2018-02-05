"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Token = undefined;

var _resource = require("../resource");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Token = exports.Token = function (_Resource) {
  _inherits(Token, _Resource);

  function Token(_ref) {
    var rawClient = _ref.rawClient;

    _classCallCheck(this, Token);

    return _possibleConstructorReturn(this, (Token.__proto__ || Object.getPrototypeOf(Token)).call(this, {
      resourceType: "tokens",
      rawClient: rawClient
    }));
  }

  return Token;
}(_resource.Resource);