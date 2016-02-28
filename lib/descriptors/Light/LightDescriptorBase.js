'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _Object3DDescriptor2 = require('../Object/Object3DDescriptor');

var _Object3DDescriptor3 = _interopRequireDefault(_Object3DDescriptor2);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _warning = require('fbjs/lib/warning');

var _warning2 = _interopRequireDefault(_warning);

var _propTypeInstanceOf = require('../../utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LightDescriptorBase = (_temp = _class = (function (_Object3DDescriptor) {
  _inherits(LightDescriptorBase, _Object3DDescriptor);

  function LightDescriptorBase(react3Instance) {
    _classCallCheck(this, LightDescriptorBase);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LightDescriptorBase).call(this, react3Instance));

    _this._hasColor = false;

    if (process.env.NODE_ENV !== 'production') {
      _this._warnedAboutLightMaterialUpdate = false;
    }

    _this.hasProp('updatesRefreshAllMaterials', {
      type: _ReactPropTypes2.default.bool,
      updateInitial: true,
      update: function update(threeObject, updatesRefreshAllMaterials) {
        threeObject.userData._updatesRefreshAllMaterials = updatesRefreshAllMaterials;
      },

      default: false
    });

    _this.hasProp('shadowBias', {
      type: _ReactPropTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.bias = value;
        }
      },

      default: LightDescriptorBase.defaultShadowBias
    });

    _this.hasProp('shadowDarkness', {
      type: _ReactPropTypes2.default.number,
      simple: true,
      default: 0.5
    });

    _this.hasProp('shadowMapWidth', {
      type: _ReactPropTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.mapSize.x = value;
        }
      },

      default: 512
    });

    _this.hasProp('shadowMapHeight', {
      type: _ReactPropTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.mapSize.y = value;
        }
      },

      default: 512
    });

    _this.hasProp('shadowCameraNear', {
      type: _ReactPropTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.near = value;
        }
      },

      default: LightDescriptorBase.defaultShadowCameraNear
    });

    _this.hasProp('shadowCameraFar', {
      type: _ReactPropTypes2.default.number,
      updateInitial: true,
      update: function update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.far = value;
        }
      },

      default: LightDescriptorBase.defaultShadowCameraFar
    });

    _this.hasProp('castShadow', {
      override: true,
      type: _ReactPropTypes2.default.bool,
      update: _this.triggerRemount,
      default: false
    });
    return _this;
  }

  _createClass(LightDescriptorBase, [{
    key: 'hasColor',
    value: function hasColor() {
      this._hasColor = true;

      this.hasProp('color', {
        type: _ReactPropTypes2.default.oneOfType([(0, _propTypeInstanceOf2.default)(_three2.default.Color), _ReactPropTypes2.default.number, _ReactPropTypes2.default.string]),
        update: function update(threeObject, newColor) {
          threeObject.color.set(newColor);
        },

        default: 0xffffff
      });
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(Object.getPrototypeOf(LightDescriptorBase.prototype), 'applyInitialProps', this).call(this, threeObject, props);

      if (props.hasOwnProperty('castShadow')) {
        threeObject.castShadow = props.castShadow;
      }
    }
  }, {
    key: 'unmount',
    value: function unmount(threeObject) {
      this.updateAllMaterials(threeObject);

      _get(Object.getPrototypeOf(LightDescriptorBase.prototype), 'unmount', this).call(this, threeObject);
    }
  }, {
    key: 'setParent',
    value: function setParent(threeObject, parentObject3d) {
      _get(Object.getPrototypeOf(LightDescriptorBase.prototype), 'setParent', this).call(this, threeObject, parentObject3d);

      this.updateAllMaterials(threeObject);
    }
  }, {
    key: 'updateAllMaterials',
    value: function updateAllMaterials(threeObject) {
      var rootInstance = threeObject.userData.markup._rootInstance;
      if (rootInstance && !rootInstance._willUnmount) {
        if (process.env.NODE_ENV !== 'production') {
          if (!this._warnedAboutLightMaterialUpdate && !threeObject.userData._updatesRefreshAllMaterials) {
            var owner = threeObject.userData.react3internalComponent._currentElement._owner;

            var elementType = threeObject.userData.react3internalComponent._elementType;

            (0, _warning2.default)(this._warnedAboutLightMaterialUpdate, LightDescriptorBase.getDynamicWarningMessage(elementType, owner));
            this._warnedAboutLightMaterialUpdate = true;
          }
        }

        rootInstance.allMaterialsNeedUpdate();
      }
    }
  }], [{
    key: 'getDynamicWarningMessage',
    value: function getDynamicWarningMessage(elementType, owner) {
      return '<' + elementType + '/> has been updated which triggered a refresh of all materials.\n  This is a potentially expensive operation.\n  This can happen when you add or remove a light, or add or remove any component\n  before any lights without keys e.g.\n  <object3d>\n    {/* new or removed component here */}\n    <ambientLight/>\n  </object3d>, or update some properties of lights.\n\n  If you would like to add components, you should either add the components\n  after the lights (recommended), e.g.\n  <object3d>\n    <ambientLight/>\n    {/* new or removed component here */}\n  </object3d>, or add a \'key\' property to the lights e.g.\n  <object3d>\n    {/* new or removed component here */}\n    <ambientLight key="light"/>\n  </object3d>.\n\n  If you have modified a light\'s properties e.g. toggled castShadow,\n  the materials need to be rebuilt as well.\n\n  To acknowledge and remove this message, please add the property \'updatesRefreshAllMaterials\'\n    to <' + elementType + '/> inside the render() of ' + (owner && owner.getName() || 'a component') + '.\n\n  For more information, visit https://github.com/mrdoob/threejs/wiki/Updates .';
    }
  }]);

  return LightDescriptorBase;
})(_Object3DDescriptor3.default), _class.defaultShadowCameraNear = 0.5, _class.defaultShadowCameraFar = 500, _class.defaultShadowBias = 0, _temp);

module.exports = LightDescriptorBase;