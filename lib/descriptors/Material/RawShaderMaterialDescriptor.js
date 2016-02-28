'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _ShaderMaterialDescriptor = require('./ShaderMaterialDescriptor');

var _ShaderMaterialDescriptor2 = _interopRequireDefault(_ShaderMaterialDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RawShaderMaterialDescriptor = (function (_ShaderMaterialDescri) {
  _inherits(RawShaderMaterialDescriptor, _ShaderMaterialDescri);

  function RawShaderMaterialDescriptor() {
    _classCallCheck(this, RawShaderMaterialDescriptor);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RawShaderMaterialDescriptor).apply(this, arguments));
  }

  _createClass(RawShaderMaterialDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      var materialDescription = this.getMaterialDescription(props);

      if (props.hasOwnProperty('uniforms')) {
        materialDescription.uniforms = props.uniforms;
      }

      if (props.hasOwnProperty('vertexShader')) {
        materialDescription.vertexShader = props.vertexShader;
      }

      if (props.hasOwnProperty('fragmentShader')) {
        materialDescription.fragmentShader = props.fragmentShader;
      }

      return new _three2.default.RawShaderMaterial(materialDescription);
    }
  }]);

  return RawShaderMaterialDescriptor;
})(_ShaderMaterialDescriptor2.default);

module.exports = RawShaderMaterialDescriptor;