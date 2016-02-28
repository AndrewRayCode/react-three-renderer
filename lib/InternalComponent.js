'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp;

var _ReactReconciler = require('react/lib/ReactReconciler');

var _ReactReconciler2 = _interopRequireDefault(_ReactReconciler);

var _ReactMultiChild = require('react/lib/ReactMultiChild');

var _ReactMultiChild2 = _interopRequireDefault(_ReactMultiChild);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _flattenChildren = require('react/lib/flattenChildren');

var _flattenChildren2 = _interopRequireDefault(_flattenChildren);

var _ReactCurrentOwner = require('react/lib/ReactCurrentOwner');

var _ReactCurrentOwner2 = _interopRequireDefault(_ReactCurrentOwner);

var _idPropertyName = require('./utils/idPropertyName');

var _idPropertyName2 = _interopRequireDefault(_idPropertyName);

var _React3CompositeComponentWrapper = require('./React3CompositeComponentWrapper');

var _React3CompositeComponentWrapper2 = _interopRequireDefault(_React3CompositeComponentWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function processChildContext(context) {
  // if (process.env.NODE_ENV !== 'production') {
  //   // // Pass down our tag name to child components for validation purposes
  //   // context = assign({}, context);
  //   // const info = context[validateDOMNesting.ancestorInfoContextKey];
  //   // context[validateDOMNesting.ancestorInfoContextKey] =
  //        validateDOMNesting.updatedAncestorInfo(info, inst._tag, inst);
  // }
  return context;
}

var RemountTrigger = function RemountTrigger() {
  var _this = this;

  _classCallCheck(this, RemountTrigger);

  this.wantRemount = false;
  this.onTrigger = function onTrigger() {};

  this.trigger = function () {
    _this.wantRemount = true;

    _this.onTrigger();
  };
};

var registrationNameModules = {};

function deleteListener(rootNodeID, propKey) {
  console.log('deleteListener', rootNodeID, propKey); // eslint-disable-line
  debugger; // eslint-disable-line
}

function enqueuePutListener(rootNodeID, propKey, nextProp, transaction) {
  console.log('enqueuePutListener', rootNodeID, propKey, nextProp, transaction); // eslint-disable-line
  debugger; // eslint-disable-line
}

function _arrayMove(array, oldIndex, newIndex) {
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
}

var getThreeObjectFromMountImage = function getThreeObjectFromMountImage(img) {
  return img.threeObject;
};

var ReactMultiChildMixin = _ReactMultiChild2.default.Mixin;

var InternalComponent = (_temp = _class = (function () {
  function InternalComponent(element, react3RendererInstance) {
    var _this2 = this;

    _classCallCheck(this, InternalComponent);

    this.updateChildren = ReactMultiChildMixin.updateChildren.bind(this);
    this._mountChildByNameAtIndex = ReactMultiChildMixin._mountChildByNameAtIndex.bind(this);
    this._unmountChild = ReactMultiChildMixin._unmountChild.bind(this);
    this.unmountChildren = ReactMultiChildMixin.unmountChildren.bind(this);

    this._currentElement = element;
    /**
     * @type React3Renderer
     */
    this._react3RendererInstance = react3RendererInstance;

    // console.log("internal: ", element);

    this._elementType = element.type;
    this._renderedChildren = [];
    this._rootNodeID = null;
    this._threeObject = null;
    this._topLevelWrapper = null;
    this._markup = null;
    this._nodeWithLegacyProperties = null;
    this._forceRemountOfComponent = false;

    this.threeElementDescriptor = react3RendererInstance.threeElementDescriptors[element.type];
    if (!this.threeElementDescriptor) {
      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(false, 'No constructor for ' + element.type);
      } else {
        (0, _invariant2.default)(false);
      }
    }

    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
      this.highlightComponent = function () {
        _this2.threeElementDescriptor.highlight(_this2._threeObject);
      };

      this.hideHighlight = function () {
        _this2.threeElementDescriptor.hideHighlight(_this2._threeObject);
      };
    }

    this.remountTrigger = new RemountTrigger();

    this.remountTrigger.onTrigger = function () {
      _this2._forceRemountOfComponent = true;
    };
  }

  _createClass(InternalComponent, [{
    key: 'construct',
    value: function construct(element) {
      // console.log('constructing', element);
      this._currentElement = element;
    }
  }, {
    key: 'mountComponent',
    value: function mountComponent(rootID, transaction, context) {
      var _markup;

      // console.log("mount component", rootID);

      var element = this._currentElement;
      this._rootNodeID = rootID;

      if (process.env.NODE_ENV !== 'production') {
        this.threeElementDescriptor.checkPropTypes(element.type, this._currentElement._owner, element.props);
      }

      this._threeObject = this.threeElementDescriptor.construct(element.props);
      this.threeElementDescriptor.applyInitialProps(this._threeObject, element.props);

      this.threeElementDescriptor.placeRemountTrigger(this._threeObject, this.remountTrigger.trigger);

      var childrenToUse = element.props.children;

      var mountImages = this.mountChildren(childrenToUse, transaction, processChildContext(context, this));

      var markup = (_markup = {}, _defineProperty(_markup, _idPropertyName2.default, rootID), _defineProperty(_markup, '_rootInstance', null), _defineProperty(_markup, 'elementType', element.type), _defineProperty(_markup, 'threeObject', this._threeObject), _defineProperty(_markup, 'parentMarkup', null), _defineProperty(_markup, 'childrenMarkup', mountImages), _defineProperty(_markup, 'toJSON', function toJSON() {
        return '---MARKUP---';
      }), _markup);

      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(!!this._threeObject.userData, 'No userdata present in threeobject for %s', element.type);
      } else {
        (0, _invariant2.default)(!!this._threeObject.userData);
      }

      Object.assign(this._threeObject.userData, {
        object3D: this._threeObject,
        react3internalComponent: this, // used for highlighting etc
        toJSON: function toJSON() {
          return '---USERDATA---';
        },
        markup: markup
      });

      var threeElementDescriptors = this._react3RendererInstance.threeElementDescriptors;

      if (mountImages && mountImages.length > 0) {
        this.threeElementDescriptor.addChildren(this._threeObject, mountImages.map(getThreeObjectFromMountImage));

        for (var i = 0; i < mountImages.length; ++i) {
          var mountImage = mountImages[i];

          var descriptorForChild = threeElementDescriptors[mountImage.elementType];

          mountImage.parentMarkup = markup;

          descriptorForChild.setParent(mountImage.threeObject, this._threeObject);
        }
      }

      this._markup = markup;

      return markup;
    }
  }, {
    key: '_reconcilerInstantiateChildren',
    value: function _reconcilerInstantiateChildren(nestedChildren, transaction, context) {
      if (process.env.NODE_ENV !== 'production') {
        if (this._currentElement) {
          var previousCurrent = _ReactCurrentOwner2.default.current;

          try {
            _ReactCurrentOwner2.default.current = this._currentElement._owner;
            return this._react3RendererInstance.instantiateChildren(nestedChildren, transaction, context);
          } finally {
            _ReactCurrentOwner2.default.current = previousCurrent;
          }
        }
      }
      return this._react3RendererInstance.instantiateChildren(nestedChildren, transaction, context);
    }
  }, {
    key: '_reconcilerUpdateChildren',
    value: function _reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, transaction, context) {
      var nextChildren = undefined;
      if (process.env.NODE_ENV !== 'production') {
        if (this._currentElement) {
          var previousCurrent = _ReactCurrentOwner2.default.current;

          try {
            _ReactCurrentOwner2.default.current = this._currentElement._owner;
            nextChildren = (0, _flattenChildren2.default)(nextNestedChildrenElements);
          } finally {
            _ReactCurrentOwner2.default.current = previousCurrent;
          }

          return this._react3RendererInstance.updateChildren(prevChildren, nextChildren, transaction, context);
        }
      }

      nextChildren = (0, _flattenChildren2.default)(nextNestedChildrenElements);
      return this._react3RendererInstance.updateChildren(prevChildren, nextChildren, transaction, context);
    }
  }, {
    key: 'mountChildren',
    value: function mountChildren(nestedChildren, transaction, context) {
      var children = this._reconcilerInstantiateChildren(nestedChildren, transaction, context);
      this._renderedChildren = children;
      var mountImages = [];
      var index = 0;

      if (!!children) {
        var childrenNames = Object.keys(children);
        for (var i = 0; i < childrenNames.length; ++i) {
          var name = childrenNames[i];

          var child = children[name];
          // Inlined for performance, see `ReactInstanceHandles.createReactID`.
          var rootID = this._rootNodeID + name;
          var mountImage = _ReactReconciler2.default.mountComponent(child, rootID, transaction, context);
          child._mountIndex = index;
          mountImages.push(mountImage);
          index++;
        }
      }

      return mountImages;
    }
  }, {
    key: 'moveChild',
    value: function moveChild(child, toIndex, lastIndex) {
      if (child._mountIndex === toIndex) {
        return;
      }

      this.threeElementDescriptor.moveChild(this._threeObject, child._threeObject, toIndex, child._mountIndex);

      var markup = this._markup;

      _arrayMove(markup.childrenMarkup, lastIndex, toIndex);
    }
  }, {
    key: 'receiveComponent',
    value: function receiveComponent(nextElement, transaction, context) {
      // console.log('receive component');

      var prevElement = this._currentElement;
      this._currentElement = nextElement;

      this.updateComponent(transaction, prevElement, nextElement, context);
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(transaction, prevElement, nextElement, context) {
      var lastProps = prevElement.props;
      var nextProps = this._currentElement.props;

      if (prevElement.type !== nextElement.type) {
        if (process.env.NODE_ENV !== 'production') {
          (0, _invariant2.default)(false, 'The component type changed unexpectedly');
        } else {
          (0, _invariant2.default)(false);
        }
      }

      this._updateObjectProperties(lastProps, nextProps, transaction, context);
      this._updateChildrenObjects(nextProps, transaction, processChildContext(context, this));
    }
  }, {
    key: '_updateChildrenObjects',
    value: function _updateChildrenObjects(nextProps, transaction, context) {
      var nextChildren = nextProps.children || null;

      this.updateChildren(nextChildren, transaction, context);
    }
  }, {
    key: '_updateObjectProperties',
    value: function _updateObjectProperties(lastProps, nextProps, transaction) {
      var remountTrigger = this.remountTrigger;

      remountTrigger.wantRemount = false;

      this.threeElementDescriptor.beginPropertyUpdates(this._threeObject);

      if (process.env.NODE_ENV !== 'production') {
        this.threeElementDescriptor.checkPropTypes(this._currentElement.type, this._currentElement._owner, nextProps);
      }

      var lastPropKeys = Object.keys(lastProps);

      // https://jsperf.com/object-keys-vs-for-in-with-closure/3
      for (var i = 0; i < lastPropKeys.length; ++i) {
        var propKey = lastPropKeys[i];

        if (nextProps.hasOwnProperty(propKey)) {
          continue;
        }

        if (propKey === 'children') {
          continue;
        }

        if (remountTrigger.wantRemount) {
          break;
        }

        if (registrationNameModules.hasOwnProperty(propKey)) {
          if (lastProps[propKey]) {
            // Only call deleteListener if there was a listener previously or
            // else willDeleteListener gets called when there wasn't actually a
            // listener (e.g., onClick={null})
            deleteListener(this._rootNodeID, propKey);
          }
        } else {
          this.threeElementDescriptor.deleteProperty(this._threeObject, propKey);
        }
      }

      var nextPropKeys = Object.keys(nextProps);

      for (var i = 0; i < nextPropKeys.length; ++i) {
        var propKey = nextPropKeys[i];

        if (propKey === 'children') {
          continue;
        }

        if (remountTrigger.wantRemount) {
          break;
        }

        var nextProp = nextProps[propKey];
        var lastProp = lastProps[propKey];

        if (nextProp === lastProp) {
          continue;
        }

        if (registrationNameModules.hasOwnProperty(propKey)) {
          if (nextProp) {
            enqueuePutListener(this._rootNodeID, propKey, nextProp, transaction);
          } else if (lastProp) {
            deleteListener(this._rootNodeID, propKey);
          }
        } else {
          this.threeElementDescriptor.updateProperty(this._threeObject, propKey, nextProp);
        }
      }

      this.threeElementDescriptor.completePropertyUpdates(this._threeObject);
    }

    /**
     * @see ReactDOMComponent.Mixin.unmountComponent
     * node_modules/react/lib/ReactDOMComponent.js:732
     */

  }, {
    key: 'unmountComponent',
    value: function unmountComponent() {
      if (this._threeObject !== null) {
        this.threeElementDescriptor.componentWillUnmount(this._threeObject);
      }
      this.unmountChildren();
      if (this._threeObject !== null) {
        this.threeElementDescriptor.unmount(this._threeObject);
        // delete this._threeObject.userData.markup;
      }

      this._markup = null;
      this._rootNodeID = null;
      if (this._nodeWithLegacyProperties) {
        var node = this._nodeWithLegacyProperties;
        node._reactInternalComponent = null;
        this._nodeWithLegacyProperties = null;
      }
    }
  }, {
    key: 'emptyJson',
    value: function emptyJson() {
      debugger; // eslint-disable-line
      return '...';
    }
  }, {
    key: 'getPublicInstance',
    value: function getPublicInstance() {
      var markup = this._react3RendererInstance.getMarkup(this._rootNodeID);

      if (markup.threeObject) {
        markup.threeObject.toJSON = this.emptyJson;
        return markup.threeObject;
      }

      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(false, 'Node has no threeObject?');
      } else {
        (0, _invariant2.default)(false);
      }
    }

    /**
     * @see ReactMultiChildMixin._updateChildren
     *
     * Improve performance by isolating this hot code path from the try/catch
     * block in `updateChildren`.
     *
     * @param {?object} nextNestedChildren Nested child maps.
     * @param {ReactReconcileTransaction} transaction
     * @param {any} context
     * @final
     * @protected
     */

  }, {
    key: '_updateChildren',
    value: function _updateChildren(nextNestedChildren, transaction, context) {
      var prevChildren = this._renderedChildren;
      var nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildren, transaction, context);

      this._renderedChildren = nextChildren;
      if (!nextChildren && !prevChildren) {
        return;
      }

      var remountTrigger = this.remountTrigger;

      remountTrigger.wantRemount = false;

      this.threeElementDescriptor.beginChildUpdates(this._threeObject);

      // `nextIndex` will increment for each child in `nextChildren`, but
      // `lastIndex` will be the last index visited in `prevChildren`.
      var lastIndex = 0;
      var nextIndex = 0;

      if (!!nextChildren) {
        var nextChildrenNames = Object.keys(nextChildren);

        for (var i = 0; i < nextChildrenNames.length; ++i) {
          var childName = nextChildrenNames[i];

          if (remountTrigger.wantRemount) {
            // This component will be remounted, (see extrude geometry)
            // No need to update children any more as they will also be remounted!
            continue;
          }

          var prevChild = prevChildren && prevChildren[childName];
          var nextChild = nextChildren[childName];

          if (prevChild === nextChild) {
            this.moveChild(prevChild, nextIndex, lastIndex);
            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
            prevChild._mountIndex = nextIndex;
          } else {
            if (prevChild) {
              // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
              lastIndex = Math.max(prevChild._mountIndex, lastIndex);
              this._unmountChild(prevChild);
            }

            if (remountTrigger.wantRemount) {
              // The remount can be triggered by unmountChild as well (see extrude geometry)
              continue;
            }

            // The child must be instantiated before it's mounted.
            this._mountChildByNameAtIndex(nextChild, childName, nextIndex, transaction, context);
          }

          nextIndex++;
        }
      }

      if (!!prevChildren) {
        // Remove children that are no longer present.
        var prevChildrenNames = Object.keys(prevChildren);

        for (var i = 0; i < prevChildrenNames.length; ++i) {
          var childName = prevChildrenNames[i];

          if (remountTrigger.wantRemount) {
            continue;
          }

          if (!(nextChildren && nextChildren.hasOwnProperty(childName))) {
            this._unmountChild(prevChildren[childName]);
          }
        }
      }

      this.threeElementDescriptor.completeChildUpdates(this._threeObject);
    }
  }, {
    key: 'createChild',
    value: function createChild(child, mountImage) {
      var mountIndex = child._mountIndex;

      this._markup.childrenMarkup.splice(mountIndex, 0, mountImage);
      mountImage.parentMarkup = this._markup;

      this.threeElementDescriptor.addChild(this._threeObject, mountImage.threeObject, mountIndex);

      var descriptorForChild = this._react3RendererInstance.threeElementDescriptors[mountImage.elementType];

      descriptorForChild.setParent(mountImage.threeObject, this._threeObject);
    }

    /**
     * Removes a child component.
     *
     * @param {ReactComponent} child Child to remove.
     * @protected
     */

  }, {
    key: 'removeChild',
    value: function removeChild(child) {
      this.threeElementDescriptor.removeChild(this._threeObject, child._threeObject);

      if (child instanceof InternalComponent) {
        child.threeElementDescriptor.removedFromParent(child._threeObject);
      } else if (child instanceof _React3CompositeComponentWrapper2.default) {
        child._threeObject.userData.react3internalComponent.threeElementDescriptor.removedFromParent(child._threeObject);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          (0, _invariant2.default)(false, 'Cannot remove child because it is not a known component type');
        } else {
          (0, _invariant2.default)(false);
        }
      }

      var childrenMarkup = this._markup.childrenMarkup;

      for (var i = 0; i < childrenMarkup.length; i++) {
        var childMarkup = childrenMarkup[i];

        if (childMarkup.threeObject === child._threeObject) {
          childrenMarkup.splice(i, 1);

          delete childMarkup.parentMarkup;
          return;
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(false, 'Trying to remove a child that is not mounted');
      } else {
        (0, _invariant2.default)(false);
      }
    }
  }]);

  return InternalComponent;
})(), _class.displayName = 'React3Component', _temp);

module.exports = InternalComponent;