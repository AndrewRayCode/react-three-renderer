'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class;

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _THREEElementDescriptor = require('../THREEElementDescriptor');

var _THREEElementDescriptor2 = _interopRequireDefault(_THREEElementDescriptor);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _resource = require('../decorators/resource');

var _resource2 = _interopRequireDefault(_resource);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _Uniform = require('../../Uniform');

var _Uniform2 = _interopRequireDefault(_Uniform);

var _React3Renderer = require('../../React3Renderer');

var _React3Renderer2 = _interopRequireDefault(_React3Renderer);

var _propTypeInstanceOf = require('../../utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextureDescriptor = (0, _resource2.default)(_class = (function (_THREEElementDescript) {
  _inherits(TextureDescriptor, _THREEElementDescript);

  function TextureDescriptor(react3RendererInstance) {
    _classCallCheck(this, TextureDescriptor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextureDescriptor).call(this, react3RendererInstance));

    _this.hasProp('repeat', {
      type: (0, _propTypeInstanceOf2.default)(_three2.default.Vector2),
      updateInitial: true,
      update: function update(threeObject, repeat) {
        if (repeat) {
          threeObject.repeat.copy(repeat);
        } else {
          threeObject.repeat.set(1, 1);
        }
      },

      default: new _three2.default.Vector2(1, 1)
    });

    _this.hasProp('offset', {
      type: (0, _propTypeInstanceOf2.default)(_three2.default.Vector2),
      updateInitial: true,
      update: function update(threeObject, offset) {
        if (offset) {
          threeObject.offset.copy(offset);
        } else {
          threeObject.offset.set(0, 0);
        }
      },

      default: new _three2.default.Vector2(0, 0)
    });

    ['wrapS', 'wrapT'].forEach(function (propName) {
      _this.hasProp(propName, {
        type: _ReactPropTypes2.default.oneOf([_three2.default.RepeatWrapping, _three2.default.ClampToEdgeWrapping, _three2.default.MirroredRepeatWrapping]),
        updateInitial: true,
        update: function update(threeObject, value) {
          threeObject[propName] = value;
          if (threeObject.image) {
            threeObject.needsUpdate = true;
          }
        },

        default: _three2.default.ClampToEdgeWrapping
      });
    });

    _this.hasProp('anisotropy', {
      type: _ReactPropTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value) {
        threeObject.anisotropy = value;
        if (threeObject.image) {
          threeObject.needsUpdate = true;
        }
      },

      default: 1
    });

    _this.hasProp('url', {
      type: _ReactPropTypes2.default.string.isRequired,
      update: _this.triggerRemount,
      default: ''
    });

    _this.hasProp('crossOrigin', {
      type: _ReactPropTypes2.default.string,
      update: _this.triggerRemount,
      default: undefined
    });

    ['onLoad', 'onProgress', 'onError'].forEach(function (eventName) {
      _this.hasProp(eventName, {
        type: _ReactPropTypes2.default.func
      });
    });
    return _this;
  }

  _createClass(TextureDescriptor, [{
    key: 'construct',
    value: function construct(props) {
      if (props.hasOwnProperty('url')) {
        var textureLoader = new _three2.default.TextureLoader();

        if (props.hasOwnProperty('crossOrigin')) {
          textureLoader.crossOrigin = props.crossOrigin;
        }

        var onLoad = undefined;
        var onProgress = undefined;
        var onError = undefined;

        if (props.hasOwnProperty('onLoad')) {
          onLoad = props.onLoad;
        }

        if (props.hasOwnProperty('onProgress')) {
          onProgress = props.onProgress;
        }

        if (props.hasOwnProperty('onError')) {
          onError = props.onError;
        }

        return textureLoader.load(props.url, onLoad, onProgress, onError);
      }

      (0, _invariant2.default)(false, 'The texture needs a url property.');
    }
  }, {
    key: 'setParent',
    value: function setParent(texture, parentObject3D) {
      (0, _invariant2.default)(parentObject3D instanceof _three2.default.Material || parentObject3D instanceof _Uniform2.default, 'Parent is not a material or a uniform');

      if (parentObject3D instanceof _three2.default.Material) {
        (0, _invariant2.default)(parentObject3D.map === null || parentObject3D.map === undefined, 'Parent already has a texture');
        parentObject3D.map = texture;
        // dispose to force a recreate
        parentObject3D.needsUpdate = true;
      } else {
        // Uniform as per the assert above
        parentObject3D.setValue(texture);
      }

      _get(Object.getPrototypeOf(TextureDescriptor.prototype), 'setParent', this).call(this, texture, parentObject3D);
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      threeObject.userData = _extends({}, threeObject.userData);

      _get(Object.getPrototypeOf(TextureDescriptor.prototype), 'applyInitialProps', this).call(this, threeObject, props);
    }
  }, {
    key: 'unmount',
    value: function unmount(texture) {
      var parent = texture.userData.markup.parentMarkup.threeObject;

      // could either be a resource description or an actual texture
      if (parent instanceof _three2.default.Material) {
        if (parent.map === texture) {
          parent.map = null;
          // dispose to force a recreate
          parent.needsUpdate = true;
        }
      } else if (parent instanceof _Uniform2.default) {
        if (parent.value === texture) {
          parent.setValue(null);
        }
      }

      texture.dispose();

      _get(Object.getPrototypeOf(TextureDescriptor.prototype), 'unmount', this).call(this, texture);
    }
  }, {
    key: 'highlight',
    value: function highlight(threeObject) {
      var parent = threeObject.userData.markup.parentMarkup.threeObject;
      parent.userData._descriptor.highlight(parent);
    }
  }, {
    key: 'hideHighlight',
    value: function hideHighlight(threeObject) {
      var parent = threeObject.userData.markup.parentMarkup.threeObject;
      parent.userData._descriptor.hideHighlight(parent);
    }
  }]);

  return TextureDescriptor;
})(_THREEElementDescriptor2.default)) || _class;

module.exports = TextureDescriptor;