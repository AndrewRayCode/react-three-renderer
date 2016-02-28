'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp, _initialiseProps;

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _warning = require('fbjs/lib/warning');

var _warning2 = _interopRequireDefault(_warning);

var _Viewport = require('./Viewport');

var _Viewport2 = _interopRequireDefault(_Viewport);

var _Module = require('./Module');

var _Module2 = _interopRequireDefault(_Module);

var _ResourceContainer = require('./Resources/ResourceContainer');

var _ResourceContainer2 = _interopRequireDefault(_ResourceContainer);

var _ReactUpdates = require('react/lib/ReactUpdates');

var _ReactUpdates2 = _interopRequireDefault(_ReactUpdates);

var _CameraUtils = require('./utils/CameraUtils');

var _CameraUtils2 = _interopRequireDefault(_CameraUtils);

var _React3Renderer = require('./React3Renderer');

var _React3Renderer2 = _interopRequireDefault(_React3Renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rendererProperties = ['gammaInput', 'gammaOutput'];

var React3DInstance = (_temp = _class = (function () {
  function React3DInstance(props, rendererInstance) {
    var _this = this;

    _classCallCheck(this, React3DInstance);

    _initialiseProps.call(this);

    var mainCamera = props.mainCamera;
    var onAnimate = props.onAnimate;
    var onRecreateCanvas = props.onRecreateCanvas;
    var onRendererUpdated = props.onRendererUpdated;
    var onManualRenderTriggerCreated = props.onManualRenderTriggerCreated;
    var forceManualRender = props.forceManualRender;

    this._parameters = _extends({}, props);

    this._rendererInstance = rendererInstance;

    this._mounted = false;
    this._willUnmount = false;
    this._scene = null;

    this._mainCameraName = mainCamera;
    this._viewports = [];
    /**
     * @type {Array.<React3Module>}
     */
    this._modules = [];

    this._resourceContainers = [];
    this._recreateCanvasCallback = onRecreateCanvas;
    this._rendererUpdatedCallback = onRendererUpdated;
    this._manualRenderTriggerCallback = onManualRenderTriggerCreated;
    this._forceManualRender = forceManualRender;

    this._warnedAboutManualRendering = false;

    this._canvas = null;

    this._onAnimate = onAnimate;
    this._objectsByUUID = {};
    this._materials = [];
    this._geometries = [];
    this._textures = [];
    this._objectsByName = {};

    this._lastRenderMode = null;

    this._renderTrigger = function (renderThisFrame) {
      if (renderThisFrame) {
        _this._render();
      } else {
        if (_this._renderRequest === null) {
          _this._renderRequest = requestAnimationFrame(_this._render);
        }
      }
    };

    this.uuid = _three2.default.Math.generateUUID();
    this.userData = {};

    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
      this._highlightScene = new _three2.default.Scene();

      this._highlightGeometry = new _three2.default.BoxGeometry(1, 1, 1);
      this._highlightMaterial = new _three2.default.MeshBasicMaterial({
        color: 0x0000ff,
        transparent: true,
        opacity: 0.4
      });

      this._highlightObjectId = null;
      this._getHighlightBoundingBox = null;

      this._hideHighlight = function () {
        _this._highlightObjectId = null;
        _this._getHighlightBoundingBox = null;
      };

      this._objectHighlighted = function (info) {
        var uuid = info.uuid;
        var boundingBoxFunc = info.boundingBoxFunc;

        var obj = undefined;

        if (_this._highlightObjectId) {
          obj = _this._objectsByUUID[_this._highlightObjectId];

          obj.userData.events.removeListener('hideHighlight', _this._hideHighlight);
        }

        _this._highlightObjectId = uuid;
        _this._getHighlightBoundingBox = boundingBoxFunc;

        obj = _this._objectsByUUID[uuid];

        obj.userData.events.once('hideHighlight', _this._hideHighlight);
      };
    }
  }

  _createClass(React3DInstance, [{
    key: '_createRenderer',
    value: function _createRenderer() {
      if (!this._canvas) {
        return;
      }

      var parameters = this._parameters;

      this._renderer = new _three2.default.WebGLRenderer({
        canvas: this._canvas,
        precision: parameters.precision,
        alpha: parameters.alpha,
        premultipliedAlpha: parameters.premultipliedAlpha,
        antialias: parameters.antialias,
        stencil: parameters.stencil,
        preserveDrawingBuffer: parameters.preserveDrawingBuffer,
        depth: parameters.depth,
        logarithmicDepthBuffer: parameters.logarithmicDepthBuffer
      });

      if (this._rendererUpdatedCallback) {
        this._rendererUpdatedCallback(this._renderer);
      }

      var renderer = this._renderer;

      if (parameters.hasOwnProperty('pixelRatio')) {
        renderer.setPixelRatio(parameters.pixelRatio);
      }

      if (parameters.hasOwnProperty('sortObjects')) {
        renderer.sortObjects = parameters.sortObjects;
      }

      var hasClearColor = parameters.hasOwnProperty('clearColor');
      var hasClearAlpha = parameters.hasOwnProperty('clearAlpha');

      if (hasClearColor || hasClearAlpha) {
        var clearColor = undefined;

        if (hasClearColor) {
          clearColor = parameters.clearColor;
        } else {
          clearColor = new _three2.default.Color(0x000000); // default clear color
        }

        if (hasClearAlpha) {
          if (process.env.NODE_ENV !== 'production') {
            (0, _warning2.default)(parameters.alpha === true, 'The `clearAlpha` property' + ' requires the `alpha` property to be `true`.');
          }

          renderer.setClearColor(clearColor, parameters.clearAlpha);
        } else {
          renderer.setClearColor(clearColor);
        }
      }

      if (parameters.hasOwnProperty('shadowMapEnabled')) {
        renderer.shadowMap.enabled = parameters.shadowMapEnabled;
      }

      if (parameters.hasOwnProperty('shadowMapType')) {
        renderer.shadowMap.type = parameters.shadowMapType;
      }

      if (parameters.hasOwnProperty('shadowMapCullFace')) {
        renderer.shadowMap.cullFace = parameters.shadowMapCullFace;
      }

      if (parameters.hasOwnProperty('shadowMapDebug')) {
        renderer.shadowMap.debug = parameters.shadowMapDebug;
      }

      rendererProperties.forEach(function (propertyName) {
        if (parameters.hasOwnProperty(propertyName)) {
          renderer[propertyName] = parameters[propertyName];
        }
      });

      renderer.setSize(parameters.width, parameters.height);
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.userData.events.on('animate', this._callOnAnimate);

      if (this._forceManualRender) {
        if (process.env.NODE_ENV !== 'production') {
          if (!this._manualRenderTriggerCallback && !this._warnedAboutManualRendering) {
            this._warnedAboutManualRendering = true;

            (0, _warning2.default)(false, 'The `forceManualRender` property requires the ' + '`onManualRenderTriggerCreated` property to be set.');
          }
        }

        this._renderRequest = null;
      } else {
        this._renderRequest = requestAnimationFrame(this._render);
      }

      if (this._manualRenderTriggerCallback) {
        this._manualRenderTriggerCallback(this._renderTrigger);
      }
    }
  }, {
    key: 'getObjectsByName',
    value: function getObjectsByName(objectName) {
      var objectsByName = this._objectsByName[objectName];

      var result = undefined;

      if (objectsByName) {
        (function () {
          var idToObjectMap = objectsByName.values;
          result = Object.keys(idToObjectMap).map(function (name) {
            return idToObjectMap[name];
          });
        })();
      } else {
        result = [];
      }

      return result;
    }
  }, {
    key: 'addAnimateListener',
    value: function addAnimateListener(callback) {
      this.userData.events.on('animate', callback);
    }
  }, {
    key: 'removeAnimateListener',
    value: function removeAnimateListener(callback) {
      this.userData.events.removeListener('animate', callback);
    }
  }, {
    key: 'addBeforeRenderListener',
    value: function addBeforeRenderListener(callback) {
      this.userData.events.on('preRender', callback);
    }
  }, {
    key: 'removeBeforeRenderListener',
    value: function removeBeforeRenderListener(callback) {
      this.userData.events.removeListener('preRender', callback);
    }
  }, {
    key: 'addChildren',
    value: function addChildren(children) {
      for (var i = 0; i < children.length; ++i) {
        var child = children[i];

        if (child instanceof _three2.default.Scene) {
          this.setScene(child);
        } else if (child instanceof _Viewport2.default) {
          this.addViewport(child);
        } else if (child instanceof _Module2.default) {
          this.addModule(child);
        } else if (child instanceof _ResourceContainer2.default) {
          this.addResourceContainer(child);
        } else {
          (0, _invariant2.default)(false, 'The react3 component should only contain ' + '<viewport/>s or <scene/>s or <resources/>.');
        }
      }
    }
  }, {
    key: 'removeChild',
    value: function removeChild(child) {
      if (child instanceof _three2.default.Scene) {
        if (this._scene === child) {
          this.setScene(null);
        }
      } else if (child instanceof _Viewport2.default) {
        this.removeViewport(child);
      } else if (child instanceof _Module2.default) {
        this.removeModule(child);
      } else if (child instanceof _ResourceContainer2.default) {
        this.removeResourceContainer(child);
      } else {
        (0, _invariant2.default)(false, 'The react3 component should only contain ' + '<viewport/>s or <scene/>s, <module/>s or <resources/>.');
      }
    }
  }, {
    key: '_renderScene',
    value: function _renderScene(camera) {
      this._renderer.render(this._scene, camera);

      if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
        if (this._highlightObjectId !== null) {
          var boundingBoxes = this._getHighlightBoundingBox();

          var highlightScene = this._highlightScene;

          var diff = highlightScene.children.length - boundingBoxes.length;

          if (diff > 0) {
            for (var i = 0; i < diff; i++) {
              highlightScene.remove(highlightScene.children[0]);
            }
          } else if (diff < 0) {
            for (var i = 0; i < -diff; i++) {
              highlightScene.add(new _three2.default.Mesh(this._highlightGeometry, this._highlightMaterial));
            }
          }

          for (var i = 0; i < boundingBoxes.length; ++i) {
            var boundingBox = boundingBoxes[i];

            var center = boundingBox.min.clone().add(boundingBox.max).multiplyScalar(0.5);

            var size = boundingBox.max.clone().sub(boundingBox.min);

            var highlightCube = highlightScene.children[i];

            highlightCube.position.copy(center);
            highlightCube.scale.copy(size);
          }

          var autoClear = this._renderer.autoClear;
          this._renderer.autoClear = false;
          this._renderer.render(highlightScene, camera);
          this._renderer.autoClear = autoClear;
        }
      }
    }
  }, {
    key: 'setScene',
    value: function setScene(scene) {
      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(!(this._scene && scene), 'There can only be one scene in <react3/>');
      }

      this._scene = scene;
    }
  }, {
    key: 'addViewport',
    value: function addViewport(viewport) {
      this._viewports.push(viewport);
    }
  }, {
    key: 'removeViewport',
    value: function removeViewport(viewport) {
      var index = this._viewports.indexOf(viewport);
      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(index !== -1, 'A viewport has been removed from ' + '<react3/> but it was not present in it...');
      }

      this._viewports.splice(index, 1);
    }
  }, {
    key: 'addResourceContainer',
    value: function addResourceContainer(resourceContainer) {
      this._resourceContainers.push(resourceContainer);
    }
  }, {
    key: 'removeResourceContainer',
    value: function removeResourceContainer(resourceContainer) {
      var index = this._resourceContainers.indexOf(resourceContainer);
      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(index !== -1, 'A resource container has been removed ' + 'from <react3/> but it was not present in it...');
      }

      this._resourceContainers.splice(index, 1);
    }
  }, {
    key: 'addModule',
    value: function addModule(module) {
      this._modules.push(module);
    }
  }, {
    key: 'removeModule',
    value: function removeModule(module) {
      var index = this._modules.indexOf(module);

      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(index !== -1, 'A module has been removed from ' + '<react3/> but it was not present in it...');
      }

      this._modules.splice(index, 1);
    }
  }, {
    key: 'updateWidth',
    value: function updateWidth(newWidth) {
      this._parameters.width = newWidth;
      if (!this._renderer) {
        return;
      }

      this._renderer.setSize(this._parameters.width, this._parameters.height);
    }
  }, {
    key: 'updateOnRecreateCanvas',
    value: function updateOnRecreateCanvas(threeObject, callback) {
      this._recreateCanvasCallback = callback;
    }
  }, {
    key: 'updateOnRendererUpdated',
    value: function updateOnRendererUpdated(callback) {
      this._rendererUpdatedCallback = callback;
    }
  }, {
    key: 'updateOnManualRenderTriggerCreated',
    value: function updateOnManualRenderTriggerCreated(callback) {
      this._manualRenderTriggerCallback = callback;

      if (callback) {
        this._manualRenderTriggerCallback(this._renderTrigger);
      }
    }
  }, {
    key: 'updateForceManualRender',
    value: function updateForceManualRender(forceManualRender) {
      if (this._forceManualRender === forceManualRender) {
        return;
      }

      this._forceManualRender = forceManualRender;

      if (forceManualRender) {
        // was just set to be forced
        cancelAnimationFrame(this._renderRequest);
        this._renderRequest = null;
      } else {
        // was just restored

        this._renderRequest = requestAnimationFrame(this._render);
      }
    }
  }, {
    key: 'updateHeight',
    value: function updateHeight(newHeight) {
      this._parameters.height = newHeight;
      if (!this._renderer) {
        return;
      }

      this._renderer.setSize(this._parameters.width, this._parameters.height);
    }
  }, {
    key: 'updatePixelRatio',
    value: function updatePixelRatio(newPixelRatio) {
      this._parameters.pixelRatio = newPixelRatio;
      if (!this._renderer) {
        return;
      }

      this._renderer.setPixelRatio(newPixelRatio);
      this._renderer.setSize(this._parameters.width, this._parameters.height);
    }
  }, {
    key: 'updateSortObjects',
    value: function updateSortObjects(sortObjects) {
      this._parameters.sortObjects = sortObjects;

      if (!this._renderer) {
        return;
      }

      this._renderer.sortObjects = sortObjects;
    }
  }, {
    key: 'updateAntialias',
    value: function updateAntialias(antialias) {
      this._parameters.antialias = antialias;
      // no renderer, this only happens initially or we're about to recreate it anyway.
      // unless something broke, then we have bigger problems...
      if (!this._renderer) {
        return;
      }

      this.refreshRenderer();
    }
  }, {
    key: 'updatePrecision',
    value: function updatePrecision(precision) {
      this._parameters.precision = precision;
      if (!this._renderer) {
        return;
      }

      this.refreshRenderer();
    }
  }, {
    key: 'updateAlpha',
    value: function updateAlpha(alpha) {
      this._parameters.alpha = alpha;
      if (!this._renderer) {
        return;
      }

      this.refreshRenderer();
    }
  }, {
    key: 'updatePremultipliedAlpha',
    value: function updatePremultipliedAlpha(premultipliedAlpha) {
      this._parameters.premultipliedAlpha = premultipliedAlpha;
      if (!this._renderer) {
        return;
      }

      this.refreshRenderer();
    }
  }, {
    key: 'updateStencil',
    value: function updateStencil(stencil) {
      this._parameters.stencil = stencil;
      if (!this._renderer) {
        return;
      }

      this.refreshRenderer();
    }
  }, {
    key: 'updatePreserveDrawingBuffer',
    value: function updatePreserveDrawingBuffer(preserveDrawingBuffer) {
      this._parameters.preserveDrawingBuffer = preserveDrawingBuffer;
      if (!this._renderer) {
        return;
      }

      this.refreshRenderer();
    }
  }, {
    key: 'updateDepth',
    value: function updateDepth(depth) {
      this._parameters.depth = depth;
      if (!this._renderer) {
        return;
      }

      this.refreshRenderer();
    }
  }, {
    key: 'updateLogarithmicDepthBuffer',
    value: function updateLogarithmicDepthBuffer(logarithmicDepthBuffer) {
      this._parameters.logarithmicDepthBuffer = logarithmicDepthBuffer;
      if (!this._renderer) {
        return;
      }

      this.refreshRenderer();
    }
  }, {
    key: 'updateShadowMapEnabled',
    value: function updateShadowMapEnabled(shadowMapEnabled) {
      this._parameters.shadowMapEnabled = shadowMapEnabled;

      if (!this._renderer) {
        return;
      }

      this._renderer.shadowMap.enabled = shadowMapEnabled;
      this.allMaterialsNeedUpdate(true);
    }
  }, {
    key: 'updateShadowMapType',
    value: function updateShadowMapType(shadowMapType) {
      this._parameters.shadowMapType = shadowMapType;

      if (!this._renderer) {
        return;
      }

      this._renderer.shadowMap.type = shadowMapType;
      this.allMaterialsNeedUpdate(true);
    }
  }, {
    key: 'updateShadowMapCullFace',
    value: function updateShadowMapCullFace(shadowMapCullFace) {
      this._parameters.shadowMapCullFace = shadowMapCullFace;

      if (!this._renderer) {
        return;
      }

      this._renderer.shadowMap.cullFace = shadowMapCullFace;
      this.allMaterialsNeedUpdate(true);
    }
  }, {
    key: 'updateShadowMapDebug',
    value: function updateShadowMapDebug(shadowMapDebug) {
      this._parameters.shadowMapDebug = shadowMapDebug;

      if (!this._renderer) {
        return;
      }

      this._renderer.shadowMap.debug = shadowMapDebug;
      this.allMaterialsNeedUpdate(true);
    }
  }, {
    key: 'updateCanvas',
    value: function updateCanvas(canvas) {
      this._canvas = canvas;

      if (this._renderer) {
        this.disposeResourcesAndRenderer();

        var contextLossExtension = this._renderer.extensions.get('WEBGL_lose_context');
        if (contextLossExtension) {
          // noinspection JSUnresolvedFunction
          contextLossExtension.loseContext();
        }
      }

      this._createRenderer();
    }
  }, {
    key: 'updateGammaInput',
    value: function updateGammaInput(gammaInput) {
      this._parameters.gammaInput = gammaInput;

      if (!this._renderer) {
        return;
      }

      this._renderer.gammaInput = gammaInput;
      this.allMaterialsNeedUpdate(true);
    }
  }, {
    key: 'updateGammaOutput',
    value: function updateGammaOutput(gammaOutput) {
      this._parameters.gammaOutput = gammaOutput;

      if (!this._renderer) {
        return;
      }

      this._renderer.gammaOutput = gammaOutput;
      this.allMaterialsNeedUpdate(true);
    }
  }, {
    key: 'updateContext',
    value: function updateContext(context) {
      this._parameters.context = context;
    }
  }, {
    key: 'updateMainCamera',
    value: function updateMainCamera(mainCamera) {
      this._parameters.mainCamera = mainCamera;

      this._mainCameraName = mainCamera;
    }
  }, {
    key: 'updateOnAnimate',
    value: function updateOnAnimate(onAnimate) {
      this._parameters.onAnimate = onAnimate;

      this._onAnimate = onAnimate;
    }
  }, {
    key: 'updateClearColor',
    value: function updateClearColor(clearColor) {
      this._parameters.clearColor = clearColor;

      if (!this._renderer) {
        return;
      }

      if (this._parameters.hasOwnProperty('clearAlpha')) {
        this._renderer.setClearColor(clearColor, this._parameters.clearAlpha);
      } else {
        this._renderer.setClearColor(clearColor);
      }
    }
  }, {
    key: 'updateClearAlpha',
    value: function updateClearAlpha(clearAlpha) {
      var parameters = this._parameters;

      if (clearAlpha === undefined) {
        delete parameters.clearAlpha;
      } else {
        parameters.clearAlpha = clearAlpha;
      }

      if (!this._renderer) {
        return;
      }

      var clearColor = undefined;

      if (parameters.hasOwnProperty('clearColor')) {
        clearColor = parameters.clearColor;
      } else {
        clearColor = new _three2.default.Color(0x000000); // default clear color
      }

      if (clearAlpha !== undefined) {
        this._renderer.setClearColor(clearColor, clearAlpha);
      } else {
        this._renderer.setClearColor(clearColor);
      }
    }
  }, {
    key: 'refreshRenderer',
    value: function refreshRenderer() {
      var _this2 = this;

      this.disposeResourcesAndRenderer();

      var contextLossExtension = this._renderer.extensions.get('WEBGL_lose_context');

      delete this._renderer;
      if (this._rendererUpdatedCallback) {
        this._rendererUpdatedCallback(null);
      }

      this.userData.events.removeListener('animate', this._callOnAnimate);
      this.userData.events.removeAllListeners();

      if (this._renderRequest !== null) {
        cancelAnimationFrame(this._renderRequest);
        this._renderRequest = null;
      }

      if (contextLossExtension && this._canvas) {
        this._canvas.addEventListener('webglcontextlost', function () {
          // this should recreate the canvas
          _this2._recreateCanvasCallback();
        }, false);

        // noinspection JSUnresolvedFunction
        contextLossExtension.loseContext();
      } else {
        this._recreateCanvasCallback();
      }
    }
  }, {
    key: 'disposeResourcesAndRenderer',
    value: function disposeResourcesAndRenderer() {
      for (var i = 0; i < this._materials.length; ++i) {
        var material = this._materials[i];
        material.dispose();
      }

      for (var i = 0; i < this._geometries.length; ++i) {
        var geometry = this._geometries[i];
        geometry.dispose();
      }

      for (var i = 0; i < this._textures.length; ++i) {
        var texture = this._textures[i];
        texture.dispose();
      }

      this._renderer.dispose();
    }
  }, {
    key: 'willUnmount',
    value: function willUnmount() {
      this._willUnmount = true;
    }
  }, {
    key: 'unmount',
    value: function unmount() {
      this._mounted = false;

      if (this._renderRequest !== null) {
        cancelAnimationFrame(this._renderRequest);
        this._renderRequest = null;
      }

      this.userData.events.removeListener('animate', this._callOnAnimate);
      this.userData.events.removeAllListeners();
      delete this._rendererInstance;

      if (this._renderer) {
        var contextLossExtension = this._renderer.extensions.get('WEBGL_lose_context');

        if (contextLossExtension) {
          // noinspection JSUnresolvedFunction
          contextLossExtension.loseContext();
        }

        this.disposeResourcesAndRenderer();

        delete this._renderer;

        if (this._rendererUpdatedCallback) {
          this._rendererUpdatedCallback(null);
        }
      }

      delete this._parameters;

      (0, _invariant2.default)(Object.keys(this._objectsByUUID).length === 0, 'Failed to cleanup some child objects for React3DInstance');

      delete this._objectsByUUID;
      delete this._viewports;
      delete this._scene;

      if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
        delete this._highlightScene;
        delete this._highlightObjectId;
        delete this._getHighlightBoundingBox;
      }
    }
  }, {
    key: 'objectMounted',
    value: function objectMounted(object) {
      (0, _invariant2.default)(!this._objectsByUUID[object.uuid], 'There already is an object with this uuid in the react 3d instance.');

      this._objectsByUUID[object.uuid] = object;

      object.userData.markup._rootInstance = this;

      this._addObjectWithName(object.name, object);

      if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
        object.userData.events.on('highlight', this._objectHighlighted);
      }

      object.userData.events.emit('addedIntoRoot', object);

      var current = object;

      var childrenMarkup = current.userData.markup.childrenMarkup;

      if (object instanceof _three2.default.Material) {
        this._materials.push(object);
      }

      if (object instanceof _three2.default.Geometry || object instanceof _three2.default.BufferGeometry) {
        this._geometries.push(object);
      }

      if (object instanceof _three2.default.Texture) {
        this._textures.push(object);
      }

      for (var i = 0; i < childrenMarkup.length; ++i) {
        var childMarkup = childrenMarkup[i];

        this.objectMounted(childMarkup.threeObject);
      }
    }
  }, {
    key: 'allMaterialsNeedUpdate',
    value: function allMaterialsNeedUpdate(dispose) {
      this._materials.forEach(function (material) {
        if (dispose) {
          material.dispose();
        } else {
          material.needsUpdate = true;
        }
      });
    }
  }, {
    key: 'objectRenamed',
    value: function objectRenamed(object, oldName, nextName) {
      this._removeObjectWithName(oldName, object);
      this._addObjectWithName(nextName, object);
    }
  }, {
    key: '_addObjectWithName',
    value: function _addObjectWithName(objectName, object) {
      if (!this._objectsByName[objectName]) {
        this._objectsByName[objectName] = {
          count: 0,
          values: {}
        };
      }

      this._objectsByName[objectName].values[object.uuid] = object;
      this._objectsByName[objectName].count++;
    }
  }, {
    key: '_removeObjectWithName',
    value: function _removeObjectWithName(objectName, object) {
      (0, _invariant2.default)(this._objectsByName[objectName] && this._objectsByName[objectName].values[object.uuid] === object, 'The object\'s name changed somehow?\'');

      delete this._objectsByName[objectName].values[object.uuid];
      this._objectsByName[objectName].count--;

      if (this._objectsByName[objectName].count === 0) {
        delete this._objectsByName[objectName];
      }
    }
  }, {
    key: 'objectRemoved',
    value: function objectRemoved(object) {
      (0, _invariant2.default)(this._objectsByUUID[object.uuid] === object, 'The removed object does not belong here!?');

      if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
        if (this._highlightObjectId === object.uuid) {
          this._highlightObjectId = null;
        }

        object.userData.events.removeListener('highlight', this._objectHighlighted);
        object.userData.events.removeListener('hideHighlight', this._hideHighlight);
      }

      delete this._objectsByUUID[object.uuid];

      if (object instanceof _three2.default.Material) {
        this._materials.splice(this._materials.indexOf(object), 1);
      }
      if (object instanceof _three2.default.Geometry || object instanceof _three2.default.BufferGeometry) {
        this._geometries.splice(this._geometries.indexOf(object), 1);
      }
      if (object instanceof _three2.default.Texture) {
        this._textures.splice(this._textures.indexOf(object), 1);
      }

      this._removeObjectWithName(object.name, object);

      delete object.userData.markup._rootInstance;
    }
  }, {
    key: 'mountedIntoRoot',
    value: function mountedIntoRoot() {
      this._mounted = true;
      this.objectMounted(this);
    }
  }]);

  return React3DInstance;
})(), _initialiseProps = function () {
  var _this3 = this;

  this._callOnAnimate = function () {
    if (_this3._onAnimate) {
      _ReactUpdates2.default.batchedUpdates(_this3._onAnimate);
    }
  };

  this._render = function () {
    for (var i = 0; i < _this3._modules.length; ++i) {
      _this3._modules[i].update();
    }

    if (_this3._forceManualRender) {
      _this3._renderRequest = null;
    } else {
      _this3._renderRequest = requestAnimationFrame(_this3._render);
    }

    _this3.userData.events.emit('animate');

    // the scene can be destroyed within the 'animate' event
    if (!_this3._scene || !_this3._mounted || !_this3._renderer) {
      return;
    }

    var mainCamera = null;

    if (_this3._mainCameraName) {
      var objectsWithMainCameraName = _this3._objectsByName[_this3._mainCameraName];

      if (objectsWithMainCameraName) {
        if (process.env.NODE_ENV !== 'production') {
          (0, _warning2.default)(objectsWithMainCameraName.count < 2, 'There are multiple objects with name ' + _this3._mainCameraName);
        }

        if (objectsWithMainCameraName.count > 0) {
          var values = objectsWithMainCameraName.values;
          mainCamera = values[Object.keys(values)[0]];
        }
      }
    }

    if (mainCamera) {
      if (_this3._lastRenderMode !== 'camera') {
        _this3._renderer.autoClear = true;
        _this3._renderer.setViewport(0, 0, _this3._parameters.width, _this3._parameters.height);
        _this3._lastRenderMode = 'camera';
      }
      _CameraUtils2.default.current = mainCamera;
      _this3.userData.events.emit('preRender');
      _this3._renderScene(mainCamera);
      _CameraUtils2.default.current = null;
    } else if (_this3._viewports.length > 0) {
      if (_this3._lastRenderMode !== 'viewport') {
        _this3._renderer.autoClear = false;
        _this3._lastRenderMode = 'viewport';
      }

      _this3._renderer.clear();
      _this3._viewports.forEach(function (viewport) {
        var viewportCamera = null;

        if (viewport.cameraName) {
          var objectsWithViewportCameraName = _this3._objectsByName[viewport.cameraName];

          if (objectsWithViewportCameraName) {
            if (process.env.NODE_ENV !== 'production') {
              (0, _warning2.default)(objectsWithViewportCameraName.count < 2, 'There are multiple objects with name ' + viewport.cameraName);
            }

            if (objectsWithViewportCameraName.count > 0) {
              var values = objectsWithViewportCameraName.values;
              viewportCamera = values[Object.keys(values)[0]];
            }
          }
        }

        if (!viewportCamera) {
          return;
        }

        if (viewport.onBeforeRender) {
          _ReactUpdates2.default.batchedUpdates(viewport.onBeforeRender);
        }

        _this3._renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
        _CameraUtils2.default.current = viewportCamera;
        _this3.userData.events.emit('preRender');
        _this3._renderScene(viewportCamera);
        _CameraUtils2.default.current = null;
      });
    }
  };
}, _temp);

module.exports = React3DInstance;