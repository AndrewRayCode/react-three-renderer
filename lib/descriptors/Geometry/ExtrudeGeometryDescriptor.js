'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _GeometryDescriptorBase = require('./GeometryDescriptorBase');

var _GeometryDescriptorBase2 = _interopRequireDefault(_GeometryDescriptorBase);

var _ShapeResourceReference = require('../../Resources/ShapeResourceReference');

var _ShapeResourceReference2 = _interopRequireDefault(_ShapeResourceReference);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _propTypeInstanceOf = require('../../utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExtrudeGeometryDescriptor = (function (_GeometryDescriptorBa) {
  _inherits(ExtrudeGeometryDescriptor, _GeometryDescriptorBa);

  function ExtrudeGeometryDescriptor(react3RendererInstance) {
    _classCallCheck(this, ExtrudeGeometryDescriptor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ExtrudeGeometryDescriptor).call(this, react3RendererInstance));

    _this._invalidChild = function (child) {
      var invalid = !(child instanceof _three2.default.Shape || child instanceof _ShapeResourceReference2.default);

      return invalid;
    };

    _this.hasProp('shapes', {
      type: _ReactPropTypes2.default.arrayOf((0, _propTypeInstanceOf2.default)(_three2.default.Shape)),
      updateInitial: true,
      update: function update(threeObject, shapes) {
        threeObject.userData._shapesFromProps = shapes || [];

        // if the root instance exists, then it can be refreshed
        if (threeObject.userData._rootInstance) {
          _this._refreshGeometry(threeObject);
        }
      },
      default: []
    });

    _this.hasProp('settings', {
      type: _ReactPropTypes2.default.any,
      update: function update(threeObject, settings) {
        threeObject.userData._settings = settings;
      },

      updateInitial: true,
      default: undefined
    });

    ['amount', 'bevelThickness', 'bevelSize', 'bevelSegments', 'bevelEnabled', 'curveSegments', 'steps', 'extrudePath', 'UVGenerator', 'frames'].forEach(function (propName) {
      _this.hasProp(propName, {
        type: _ReactPropTypes2.default.any,
        update: function update(threeObject, value) {
          if (value === undefined) {
            delete threeObject.userData._options[propName];
          } else {
            threeObject.userData._options[propName] = value;
          }

          _this._refreshGeometry(threeObject);
        },
        default: undefined
      });
    });
    return _this;
  }

  _createClass(ExtrudeGeometryDescriptor, [{
    key: 'construct',
    value: function construct() {
      return new _three2.default.BufferGeometry();
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(Object.getPrototypeOf(ExtrudeGeometryDescriptor.prototype), 'applyInitialProps', this).call(this, threeObject, props);

      var options = {};

      ['amount', 'bevelThickness', 'bevelSize', 'bevelSegments', 'bevelEnabled', 'curveSegments', 'steps', 'extrudePath', 'UVGenerator', 'frames'].forEach(function (propName) {
        if (props.hasOwnProperty(propName)) {
          options[propName] = props[propName];
        }
      });

      threeObject.userData._shapeCache = [];
      threeObject.userData._options = options;
      threeObject.userData._resourceListenerCleanupFunctions = [];

      this._refreshGeometry(threeObject);
    }
  }, {
    key: '_onShapeResourceUpdate',
    value: function _onShapeResourceUpdate(threeObject, shapeIndex, shape) {
      threeObject.userData._shapeCache[shapeIndex] = shape;

      this._refreshGeometry(threeObject);
    }
  }, {
    key: '_refreshGeometry',
    value: function _refreshGeometry(threeObject) {
      var shapes = threeObject.userData._shapeCache.filter(function (shape) {
        return !!shape;
      }).concat(threeObject.userData._shapesFromProps);

      threeObject.fromGeometry(new _three2.default.ExtrudeGeometry(shapes, _extends({}, threeObject.userData._options, threeObject.userData._settings)));
    }
  }, {
    key: 'addChildren',
    value: function addChildren(threeObject, children) {
      var _this2 = this;

      // TODO: add shapes here!

      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(children.filter(this._invalidChild).length === 0, 'Extrude geometry children' + ' can only be shapes!');
      } else {
        (0, _invariant2.default)(children.filter(this._invalidChild).length === 0, false);
      }

      var shapeCache = [];

      children.forEach(function (child) {
        if (child instanceof _ShapeResourceReference2.default) {
          (function () {
            var shapeIndex = shapeCache.length;

            var resourceListener = _this2._onShapeResourceUpdate.bind(_this2, threeObject, shapeIndex);

            resourceListener.target = child;

            var cleanupFunction = function cleanupFunction() {
              child.userData.events.removeListener('resource.set', resourceListener);

              threeObject.userData._resourceListenerCleanupFunctions.splice(threeObject.userData._resourceListenerCleanupFunctions.indexOf(cleanupFunction), 1);
            };

            threeObject.userData._resourceListenerCleanupFunctions.push(cleanupFunction);

            child.userData.events.on('resource.set', resourceListener);
            child.userData.events.once('dispose', function () {
              cleanupFunction();
            });

            shapeCache.push(null);
          })();
        } else {
          shapeCache.push(child);
        }
      });

      threeObject.userData._shapeCache = shapeCache;

      this._refreshGeometry(threeObject);
    }
  }, {
    key: 'addChild',
    value: function addChild(threeObject) {
      // new shape was added
      // TODO optimize

      this.triggerRemount(threeObject);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(threeObject) {
      // shape was removed
      // TODO optimize

      this.triggerRemount(threeObject);
    }
  }, {
    key: 'unmount',
    value: function unmount(geometry) {
      geometry.userData._resourceListenerCleanupFunctions.forEach(function (listener) {
        listener();
      });

      delete geometry.userData._resourceListenerCleanupFunctions;
      delete geometry.userData._options;
      delete geometry.userData._shapesFromProps;

      return _get(Object.getPrototypeOf(ExtrudeGeometryDescriptor.prototype), 'unmount', this).call(this, geometry);
    }
  }]);

  return ExtrudeGeometryDescriptor;
})(_GeometryDescriptorBase2.default);

module.exports = ExtrudeGeometryDescriptor;