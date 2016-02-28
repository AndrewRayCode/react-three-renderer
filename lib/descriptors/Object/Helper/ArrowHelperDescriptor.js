'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _Object3DDescriptor2 = require('../Object3DDescriptor');

var _Object3DDescriptor3 = _interopRequireDefault(_Object3DDescriptor2);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _propTypeInstanceOf = require('../../../utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArrowHelperDescriptor = (function (_Object3DDescriptor) {
  _inherits(ArrowHelperDescriptor, _Object3DDescriptor);

  function ArrowHelperDescriptor(react3Instance) {
    _classCallCheck(this, ArrowHelperDescriptor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ArrowHelperDescriptor).call(this, react3Instance));

    _this.propTypes = _extends({}, _this.propTypes, {

      dir: (0, _propTypeInstanceOf2.default)(_three2.default.Vector3),
      origin: (0, _propTypeInstanceOf2.default)(_three2.default.Vector3),
      length: _ReactPropTypes2.default.number,
      color: _ReactPropTypes2.default.number,
      headLength: _ReactPropTypes2.default.number,
      headWidth: _ReactPropTypes2.default.number
    });
    return _this;
  }

  _createClass(ArrowHelperDescriptor, [{
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(Object.getPrototypeOf(ArrowHelperDescriptor.prototype), 'applyInitialProps', this).call(this, threeObject, props);
    }
  }, {
    key: 'construct',
    value: function construct(props) {
      var dir = props.dir;
      var origin = props.origin;
      var length = props.length;
      var color = props.color;
      var headLength = props.headLength;
      var headWidth = props.headWidth;

      return new _three2.default.ArrowHelper(dir, origin, length, color, headLength, headWidth);
    }
  }, {
    key: 'unmount',
    value: function unmount(threeObject) {
      if (threeObject.line) {
        threeObject.line.geometry.dispose();
        threeObject.line.material.dispose();
      }

      if (threeObject.cone) {
        threeObject.cone.geometry.dispose();
        threeObject.cone.material.dispose();
      }

      _get(Object.getPrototypeOf(ArrowHelperDescriptor.prototype), 'unmount', this).call(this, threeObject);
    }
  }]);

  return ArrowHelperDescriptor;
})(_Object3DDescriptor3.default);

module.exports = ArrowHelperDescriptor;