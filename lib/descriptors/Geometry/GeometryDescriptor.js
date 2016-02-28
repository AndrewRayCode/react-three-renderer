'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _GeometryDescriptorBase = require('./GeometryDescriptorBase');

var _GeometryDescriptorBase2 = _interopRequireDefault(_GeometryDescriptorBase);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _propTypeInstanceOf = require('../../utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeometryDescriptor = (function (_GeometryDescriptorBa) {
  _inherits(GeometryDescriptor, _GeometryDescriptorBa);

  function GeometryDescriptor(react3RendererInstance) {
    _classCallCheck(this, GeometryDescriptor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GeometryDescriptor).call(this, react3RendererInstance));

    _this.hasProp('vertices', {
      type: _ReactPropTypes2.default.arrayOf((0, _propTypeInstanceOf2.default)(_three2.default.Vector3)).isRequired,
      update: function update(threeObject, vertices) {
        if (threeObject.vertices !== vertices) {
          threeObject.vertices = vertices;

          threeObject.verticesNeedUpdate = true;
        }
      },

      updateInitial: true,
      default: []
    });

    _this.hasProp('colors', {
      type: _ReactPropTypes2.default.arrayOf((0, _propTypeInstanceOf2.default)(_three2.default.Color)),
      update: function update(threeObject, colors, hasProp) {
        if (hasProp) {
          if (threeObject.colors !== colors) {
            threeObject.colors = colors;

            threeObject.colorsNeedUpdate = true;
          }
        }
      },

      updateInitial: true,
      default: []
    });

    _this.hasProp('faceVertexUvs', {
      type: _ReactPropTypes2.default.arrayOf(_ReactPropTypes2.default.arrayOf(_three2.default.Vector2)),
      update: function update(threeObject, faceVertexUvs, hasProp) {
        if (hasProp) {
          if (threeObject.faceVertexUvs !== faceVertexUvs) {
            threeObject.faceVertexUvs = faceVertexUvs;

            threeObject.uvsNeedUpdate = true;
          }
        }
      },

      updateInitial: true,
      default: []
    });

    _this.hasProp('faces', {
      type: _ReactPropTypes2.default.arrayOf((0, _propTypeInstanceOf2.default)(_three2.default.Face3)),
      update: function update(threeObject, faces) {
        if (threeObject.faces !== faces) {
          threeObject.faces = faces;

          threeObject.verticesNeedUpdate = true;
          threeObject.elementsNeedUpdate = true;
        }
      },

      updateInitial: true,
      default: []
    });
    return _this;
  }

  _createClass(GeometryDescriptor, [{
    key: 'construct',
    value: function construct() {
      return new _three2.default.Geometry();
    }
  }]);

  return GeometryDescriptor;
})(_GeometryDescriptorBase2.default);

module.exports = GeometryDescriptor;