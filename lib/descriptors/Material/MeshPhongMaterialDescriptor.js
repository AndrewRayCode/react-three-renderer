'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _MaterialDescriptorBase = require('./MaterialDescriptorBase');

var _MaterialDescriptorBase2 = _interopRequireDefault(_MaterialDescriptorBase);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MeshPhongMaterialDescriptor = (function (_MaterialDescriptorBa) {
  _inherits(MeshPhongMaterialDescriptor, _MaterialDescriptorBa);

  function MeshPhongMaterialDescriptor(react3RendererInstance) {
    _classCallCheck(this, MeshPhongMaterialDescriptor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MeshPhongMaterialDescriptor).call(this, react3RendererInstance));

    _this.propTypes = _extends({}, _this.propTypes, {

      side: _ReactPropTypes2.default.number
    });

    _this.hasColor();
    _this.hasColor('specular', 0x111111);
    _this.hasColor('emissive', 0x000000);
    _this.hasWireframe();

    _this.hasProp('shininess', {
      type: _ReactPropTypes2.default.number,
      simple: true,
      default: 30
    });

    _this.hasProp('metal', {
      type: _ReactPropTypes2.default.bool,
      update: function update(threeObject, metal) {
        threeObject.metal = metal;
        threeObject.needsUpdate = true;
      },
      default: false
    });
    return _this;
  }

  _createClass(MeshPhongMaterialDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      var materialDescription = this.getMaterialDescription(props);

      if (props.hasOwnProperty('shininess')) {
        materialDescription.shininess = props.shininess;
      }

      return new _three2.default.MeshPhongMaterial(materialDescription);
    }
  }]);

  return MeshPhongMaterialDescriptor;
})(_MaterialDescriptorBase2.default);

module.exports = MeshPhongMaterialDescriptor;