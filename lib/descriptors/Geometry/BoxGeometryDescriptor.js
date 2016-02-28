'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _GeometryDescriptorBase = require('./GeometryDescriptorBase');

var _GeometryDescriptorBase2 = _interopRequireDefault(_GeometryDescriptorBase);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BoxGeometryDescriptor = (function (_GeometryDescriptorBa) {
  _inherits(BoxGeometryDescriptor, _GeometryDescriptorBa);

  function BoxGeometryDescriptor(react3RendererInstance) {
    _classCallCheck(this, BoxGeometryDescriptor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BoxGeometryDescriptor).call(this, react3RendererInstance));

    ['width', 'height', 'depth'].forEach(function (propName) {
      _this.hasProp(propName, {
        type: _ReactPropTypes2.default.number.isRequired,
        update: _this.triggerRemount,
        default: undefined
      });
    });

    ['widthSegments', 'heightSegments', 'depthSegments'].forEach(function (propName) {
      _this.hasProp(propName, {
        type: _ReactPropTypes2.default.number,
        update: _this.triggerRemount,
        default: undefined
      });
    });
    return _this;
  }

  _createClass(BoxGeometryDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      var width = props.width;
      var height = props.height;
      var depth = props.depth;
      var widthSegments = props.widthSegments;
      var heightSegments = props.heightSegments;
      var depthSegments = props.depthSegments;

      return new _three2.default.BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments);
    }
  }]);

  return BoxGeometryDescriptor;
})(_GeometryDescriptorBase2.default);

module.exports = BoxGeometryDescriptor;