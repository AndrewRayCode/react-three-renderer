'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _React3Renderer = require('./React3Renderer');

var _React3Renderer2 = _interopRequireDefault(_React3Renderer);

var _ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');

var _ReactComponentWithPureRenderMixin2 = _interopRequireDefault(_ReactComponentWithPureRenderMixin);

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _propTypeInstanceOf = require('./utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = _react2.default.PropTypes;
var React3 = (_temp = _class = (function (_React$Component) {
  _inherits(React3, _React$Component);

  function React3(props, context) {
    _classCallCheck(this, React3);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(React3).call(this, props, context));

    _this.shouldComponentUpdate = _ReactComponentWithPureRenderMixin2.default.shouldComponentUpdate;

    _this._onRecreateCanvas = function () {
      _this.setState({
        // changing the key will recreate the element
        canvasKey: _this.state.canvasKey + 1
      });
    };

    _this.state = {
      canvasKey: 0
    };
    return _this;
  }

  _createClass(React3, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.react3Renderer = new _React3Renderer2.default();

      this._render();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._render();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.react3Renderer.dispose();
      delete this.react3Renderer;
    }
  }, {
    key: '_render',
    value: function _render() {
      var canvas = this.refs.canvas;

      var propsToClone = _extends({}, this.props);

      delete propsToClone.canvasStyle;

      this.react3Renderer.render(_react2.default.createElement(
        'react3',
        _extends({}, propsToClone, {
          onRecreateCanvas: this._onRecreateCanvas
        }),
        this.props.children
      ), canvas);
    }
  }, {
    key: 'render',
    value: function render() {
      var canvasKey = this.state.canvasKey;

      return _react2.default.createElement('canvas', {
        ref: 'canvas',
        key: canvasKey,
        width: this.props.width,
        height: this.props.height,
        style: _extends({}, this.props.canvasStyle, {
          width: this.props.width,
          height: this.props.height
        })
      });
    }
  }]);

  return React3;
})(_react2.default.Component), _class.propTypes = {
  context: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.any,
  canvasStyle: PropTypes.any,
  gammaInput: PropTypes.bool,
  gammaOutput: PropTypes.bool,
  sortObjects: PropTypes.bool,
  mainCamera: PropTypes.string,
  onAnimate: PropTypes.func,
  clearColor: PropTypes.oneOfType([(0, _propTypeInstanceOf2.default)(_three2.default.Color), PropTypes.number, PropTypes.string]),
  shadowMapEnabled: PropTypes.bool,
  shadowMapType: PropTypes.oneOf([_three2.default.BasicShadowMap, _three2.default.PCFShadowMap, _three2.default.PCFSoftShadowMap]),
  shadowMapCullFace: PropTypes.oneOf([_three2.default.CullFaceNone, _three2.default.CullFaceBack, _three2.default.CullFaceFront, _three2.default.CullFaceFrontBack]),
  shadowMapDebug: PropTypes.bool,
  pixelRatio: PropTypes.number,
  antialias: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
}, _class.defaultProps = {
  context: '3d'
}, _class.findTHREEObject = _React3Renderer2.default.findTHREEObject, _class.eventDispatcher = _React3Renderer2.default.eventDispatcher, _temp);

module.exports = React3;