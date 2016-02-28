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

var CylinderGeometryDescriptor = (function (_GeometryDescriptorBa) {
  _inherits(CylinderGeometryDescriptor, _GeometryDescriptorBa);

  function CylinderGeometryDescriptor(react3RendererInstance) {
    _classCallCheck(this, CylinderGeometryDescriptor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CylinderGeometryDescriptor).call(this, react3RendererInstance));

    ['radiusTop', 'radiusBottom', 'height', 'radialSegments', 'heightSegments', 'openEnded', 'thetaStart', 'thetaLength'].forEach(function (propName) {
      _this.hasProp(propName, {
        type: _ReactPropTypes2.default.number,
        update: _this.triggerRemount,
        default: undefined
      });
    });
    return _this;
  }

  _createClass(CylinderGeometryDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      var radiusTop = props.radiusTop;
      var radiusBottom = props.radiusBottom;
      var height = props.height;
      var radialSegments = props.radialSegments;
      var heightSegments = props.heightSegments;
      var openEnded = props.openEnded;
      var thetaStart = props.thetaStart;
      var thetaLength = props.thetaLength;

      return new _three2.default.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
    }
  }]);

  return CylinderGeometryDescriptor;
})(_GeometryDescriptorBase2.default);

module.exports = CylinderGeometryDescriptor;