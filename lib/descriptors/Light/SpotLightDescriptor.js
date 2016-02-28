'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _LightDescriptorBase2 = require('./LightDescriptorBase');

var _LightDescriptorBase3 = _interopRequireDefault(_LightDescriptorBase2);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpotLightDescriptor = (function (_LightDescriptorBase) {
  _inherits(SpotLightDescriptor, _LightDescriptorBase);

  function SpotLightDescriptor(react3Instance) {
    _classCallCheck(this, SpotLightDescriptor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SpotLightDescriptor).call(this, react3Instance));

    var defaults = [1, 0, Math.PI / 3, 10, 1];

    ['intensity', 'distance', 'angle', 'exponent', 'decay'].forEach(function (propName, i) {
      _this.hasProp(propName, {
        type: _ReactPropTypes2.default.number,
        simple: true,
        default: defaults[i]
      });
    });

    _this.hasProp('shadowCameraFov', {
      type: _ReactPropTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.fov = value;
        }
      },

      default: 50
    });

    _this.hasColor();
    return _this;
  }

  _createClass(SpotLightDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      var color = props.color;
      var intensity = props.intensity;
      var distance = props.distance;
      var angle = props.angle;
      var exponent = props.exponent;
      var decay = props.decay;

      return new _three2.default.SpotLight(color, intensity, distance, angle, exponent, decay);
    }
  }]);

  return SpotLightDescriptor;
})(_LightDescriptorBase3.default);

module.exports = SpotLightDescriptor;