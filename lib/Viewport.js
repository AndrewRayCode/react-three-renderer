'use strict';

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Viewport = function Viewport(props) {
  _classCallCheck(this, Viewport);

  this.userData = {};

  this.uuid = _three2.default.Math.generateUUID();

  this.x = props.x;
  this.y = props.y;
  this.width = props.width;
  this.height = props.height;
  this.cameraName = props.cameraName;
  this.onBeforeRender = props.onBeforeRender;
};

module.exports = Viewport;