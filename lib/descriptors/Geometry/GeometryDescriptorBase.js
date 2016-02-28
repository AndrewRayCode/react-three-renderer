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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeometryDescriptorBase = (0, _resource2.default)(_class = (function (_THREEElementDescript) {
  _inherits(GeometryDescriptorBase, _THREEElementDescript);

  function GeometryDescriptorBase(react3RendererInstance) {
    _classCallCheck(this, GeometryDescriptorBase);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GeometryDescriptorBase).call(this, react3RendererInstance));

    _this.hasProp('dynamic', {
      type: _ReactPropTypes2.default.bool,
      update: function update(threeObject, dynamic) {
        threeObject.dynamic = !!dynamic;
      },

      default: false
    });

    _this.hasName();
    return _this;
  }

  _createClass(GeometryDescriptorBase, [{
    key: 'setParent',
    value: function setParent(geometry, parentObject3D) {
      (0, _invariant2.default)(parentObject3D instanceof _three2.default.Mesh || parentObject3D instanceof _three2.default.Points || parentObject3D instanceof _three2.default.Line, 'Parent is not a mesh');
      (0, _invariant2.default)(parentObject3D.geometry === undefined, 'Parent already has a geometry');

      _get(Object.getPrototypeOf(GeometryDescriptorBase.prototype), 'setParent', this).call(this, geometry, parentObject3D);

      parentObject3D.geometry = geometry;
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      // ensure the userData is created
      threeObject.userData = _extends({}, threeObject.userData);

      if (props.hasOwnProperty('dynamic')) {
        threeObject.dynamic = !!props.dynamic;
      }

      threeObject.userData._remountAfterPropsUpdate = false;

      _get(Object.getPrototypeOf(GeometryDescriptorBase.prototype), 'applyInitialProps', this).call(this, threeObject, props);
    }
  }, {
    key: 'unmount',
    value: function unmount(geometry) {
      var parent = geometry.userData.markup.parentMarkup.threeObject;

      // could either be a resource description or an actual geometry
      if (parent instanceof _three2.default.Mesh || parent instanceof _three2.default.Points) {
        if (parent.geometry === geometry) {
          parent.geometry = undefined;
        }
      }

      geometry.dispose();

      _get(Object.getPrototypeOf(GeometryDescriptorBase.prototype), 'unmount', this).call(this, geometry);
    }
  }, {
    key: 'highlight',
    value: function highlight(threeObject) {
      var ownerMesh = threeObject.userData.markup.parentMarkup.threeObject;
      threeObject.userData.events.emit('highlight', {
        uuid: threeObject.uuid,
        boundingBoxFunc: function boundingBoxFunc() {
          var boundingBox = new _three2.default.Box3();

          boundingBox.setFromObject(ownerMesh);

          return [boundingBox];
        }
      });
    }
  }, {
    key: 'getBoundingBoxes',
    value: function getBoundingBoxes(threeObject) {
      var ownerMesh = threeObject.userData.markup.parentMarkup.threeObject;

      var boundingBox = new _three2.default.Box3();

      boundingBox.setFromObject(ownerMesh);

      return [boundingBox];
    }
  }, {
    key: 'hideHighlight',
    value: function hideHighlight(threeObject) {
      threeObject.userData.events.emit('hideHighlight');
    }
  }]);

  return GeometryDescriptorBase;
})(_THREEElementDescriptor2.default)) || _class;

module.exports = GeometryDescriptorBase;