'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp, _class2, _temp2;

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _ReactEmptyComponent = require('react/lib/ReactEmptyComponent');

var _ReactEmptyComponent2 = _interopRequireDefault(_ReactEmptyComponent);

var _ReactElement = require('react/lib/ReactElement');

var _ReactElement2 = _interopRequireDefault(_ReactElement);

var _ReactInstanceMap = require('react/lib/ReactInstanceMap');

var _ReactInstanceMap2 = _interopRequireDefault(_ReactInstanceMap);

var _ReactEmptyComponentRegistry = require('react/lib/ReactEmptyComponentRegistry');

var _ReactEmptyComponentRegistry2 = _interopRequireDefault(_ReactEmptyComponentRegistry);

var _ReactInstanceHandles = require('react/lib/ReactInstanceHandles');

var _ReactInstanceHandles2 = _interopRequireDefault(_ReactInstanceHandles);

var _ReactReconciler = require('react/lib/ReactReconciler');

var _ReactReconciler2 = _interopRequireDefault(_ReactReconciler);

var _ReactUpdates = require('react/lib/ReactUpdates');

var _ReactUpdates2 = _interopRequireDefault(_ReactUpdates);

var _ReactCurrentOwner = require('react/lib/ReactCurrentOwner');

var _ReactCurrentOwner2 = _interopRequireDefault(_ReactCurrentOwner);

var _ReactUpdateQueue = require('react/lib/ReactUpdateQueue');

var _ReactUpdateQueue2 = _interopRequireDefault(_ReactUpdateQueue);

var _ReactComponent2 = require('react/lib/ReactComponent');

var _ReactComponent3 = _interopRequireDefault(_ReactComponent2);

var _ReactInjection = require('react/lib/ReactInjection');

var _ReactInjection2 = _interopRequireDefault(_ReactInjection);

var _ReactReconcileTransaction = require('react/lib/ReactReconcileTransaction');

var _ReactReconcileTransaction2 = _interopRequireDefault(_ReactReconcileTransaction);

var _ReactDefaultBatchingStrategy = require('react/lib/ReactDefaultBatchingStrategy');

var _ReactDefaultBatchingStrategy2 = _interopRequireDefault(_ReactDefaultBatchingStrategy);

var _traverseAllChildren = require('react/lib/traverseAllChildren');

var _traverseAllChildren2 = _interopRequireDefault(_traverseAllChildren);

var _shouldUpdateReactComponent = require('react/lib/shouldUpdateReactComponent');

var _shouldUpdateReactComponent2 = _interopRequireDefault(_shouldUpdateReactComponent);

var _emptyObject = require('fbjs/lib/emptyObject');

var _emptyObject2 = _interopRequireDefault(_emptyObject);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _warning = require('fbjs/lib/warning');

var _warning2 = _interopRequireDefault(_warning);

var _React3Instance = require('./React3Instance');

var _React3Instance2 = _interopRequireDefault(_React3Instance);

var _EventDispatcher = require('./utils/EventDispatcher');

var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);

var _InternalComponent = require('./InternalComponent');

var _InternalComponent2 = _interopRequireDefault(_InternalComponent);

var _ElementDescriptorContainer = require('./ElementDescriptorContainer');

var _ElementDescriptorContainer2 = _interopRequireDefault(_ElementDescriptorContainer);

var _React3CompositeComponentWrapper = require('./React3CompositeComponentWrapper');

var _React3CompositeComponentWrapper2 = _interopRequireDefault(_React3CompositeComponentWrapper);

var _idPropertyName = require('./utils/idPropertyName');

var _idPropertyName2 = _interopRequireDefault(_idPropertyName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SEPARATOR = _ReactInstanceHandles2.default.SEPARATOR;

var getDeclarationErrorAddendum = undefined;

if (process.env.NODE_ENV !== 'production') {
  // prop type helpers
  // the warnings for propTypes will not say <anonymous>.
  // Some performance is sacrificed for this.

  // TODO: could have an env variable to disable this?
  if (!_three2.default._renamed) {
    _three2.default._renamed = true;

    _three2.default.Vector2.displayName = 'THREE.Vector2';
    _three2.default.Vector3.displayName = 'THREE.Vector3';
    _three2.default.Quaternion.displayName = 'THREE.Quaternion';
    _three2.default.Color.displayName = 'THREE.Color';
    _three2.default.Shape.displayName = 'THREE.Shape';
    _three2.default.Euler.displayName = 'THREE.Euler';
    _three2.default.Fog.displayName = 'THREE.Fog';
  }

  getDeclarationErrorAddendum = function (owner) {
    if (owner) {
      var name = owner.getName();
      if (name) {
        return ' Check the render method of `' + name + '`.';
      }
    }
    return '';
  };
}

/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */

var TopLevelWrapper = (_temp = _class = (function (_ReactComponent) {
  _inherits(TopLevelWrapper, _ReactComponent);

  function TopLevelWrapper() {
    _classCallCheck(this, TopLevelWrapper);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TopLevelWrapper).apply(this, arguments));
  }

  _createClass(TopLevelWrapper, [{
    key: 'render',
    value: function render() {
      return this.props;
    }
  }]);

  return TopLevelWrapper;
})(_ReactComponent3.default), _class.isReactClass = {}, _class.displayName = 'TopLevelWrapper', _temp);

function unmountComponentInternal(instance) {
  _ReactReconciler2.default.unmountComponent(instance);
}

function internalGetID(markup) {
  return markup && markup[_idPropertyName2.default] || '';
}

/**
 * @param {THREE.Object3D|HTMLCanvasElement} container That may contain
 * a React component
 * @return {?*} The markup that may have the reactRoot ID, or null.
 */
function getReactRootMarkupInContainer(container) {
  if (!container) {
    return null;
  }

  // in ReactMount this is container.firstChild.

  return container.userData && container.userData.markup && container.userData.markup.childrenMarkup[0] || null;
}

/**
 * Check if the type reference is a known internal type. I.e. not a user
 * provided composite type.
 *
 * @param {function} type
 * @return {boolean} Returns true if this is a valid internal type.
 */
function isInternalComponentType(type) {
  return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
}

// function getNextMarkupSibling(markup) {
//   const parentMarkup = markup.parentMarkup;
//   if (parentMarkup) {
//     const parentChildren = parentMarkup.childrenMarkups;
//     const indexInParent = parentChildren.indexOf(markup);
//
//     invariant(indexInParent !== -1, 'Could not find child markup`s index in parent');
//
//     return parentChildren.length > indexInParent
//       && parentChildren[indexInParent + 1] || null;
//   }
//
//   return null;
// }

var React3Renderer = (_temp2 = _class2 = (function () {
  _createClass(React3Renderer, [{
    key: 'updateChildren',

    /**
     * @see ReactChildReconciler.updateChildren
     *
     * Updates the rendered children and returns a new set of children.
     *
     * @param {?object} prevChildren Previously initialized set of children.
     * @param {?object} nextChildren Nested child maps.
     * @param {ReactReconcileTransaction} transaction
     * @param {object} context
     * @return {?object} A new set of child instances.
     * @internal
     */
    value: function updateChildren(prevChildren, nextChildren, transaction, context) {
      // We currently don't have a way to track moves here but if we use iterators
      // instead of for..in we can zip the iterators and check if an item has
      // moved.
      // TODO: If nothing has changed, return the prevChildren object so that we
      // can quickly bailout.
      if (!nextChildren && !prevChildren) {
        return null;
      }

      if (!!nextChildren) {
        var nextChildrenKeys = Object.keys(nextChildren);

        for (var i = 0; i < nextChildrenKeys.length; ++i) {
          var childName = nextChildrenKeys[i];

          var prevChild = prevChildren && prevChildren[childName];
          var prevElement = prevChild && prevChild._currentElement;
          var nextElement = nextChildren[childName];
          if (prevChild !== null && prevChild !== undefined && (0, _shouldUpdateReactComponent2.default)(prevElement, nextElement)) {
            _ReactReconciler2.default.receiveComponent(prevChild, nextElement, transaction, context);

            if (prevChild._forceRemountOfComponent) {
              _ReactReconciler2.default.unmountComponent(prevChild, childName);
              nextChildren[childName] = this.instantiateReactComponent(nextElement, null);
            } else {
              nextChildren[childName] = prevChild;
            }
          } else {
            if (prevChild) {
              _ReactReconciler2.default.unmountComponent(prevChild, childName);
            }
            // The child must be instantiated before it's mounted.
            nextChildren[childName] = this.instantiateReactComponent(nextElement, null);
          }
        }
      }

      if (!!prevChildren) {
        // Unmount children that are no longer present.
        var prevChildrenKeys = Object.keys(prevChildren);
        for (var i = 0; i < prevChildrenKeys.length; ++i) {
          var childName = prevChildrenKeys[i];

          if (!(nextChildren && nextChildren.hasOwnProperty(childName))) {
            _ReactReconciler2.default.unmountComponent(prevChildren[childName]);
          }
        }
      }

      return nextChildren;
    }

    /**
     * @param instance
     * @returns {*} Markup
     */

  }, {
    key: 'getMarkupFromInstance',
    value: function getMarkupFromInstance(instance) {
      var id = _ReactInstanceMap2.default.get(instance)._rootNodeID;

      if (_ReactEmptyComponentRegistry2.default.isNullComponentID(id)) {
        return null;
      }

      if (!this.markupCache.hasOwnProperty(id) || !this.isValid(this.markupCache[id], id)) {
        this.markupCache[id] = this.findMarkupByID(id);
      }

      return this.markupCache[id];
    }
  }, {
    key: 'getElementDescriptor',
    value: function getElementDescriptor(name) {
      return this.threeElementDescriptors[name];
    }
  }], [{
    key: 'findTHREEObject',

    /**
     * Returns the THREE.js object rendered by this element.
     *
     * @param {React.Component|THREE.Object3D|HTMLCanvasElement} componentOrElement
     * @return {?THREE.Object3D} The root node of this element.
     */
    value: function findTHREEObject(componentOrElement) {
      if (process.env.NODE_ENV !== 'production') {
        var owner = _ReactCurrentOwner2.default.current;
        if (owner !== null) {
          if (process.env.NODE_ENV !== 'production') {
            (0, _warning2.default)(owner._warnedAboutRefsInRender, '%s is accessing findTHREEObject inside its render(). ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', owner.getName() || 'A component');
          }
          owner._warnedAboutRefsInRender = true;
        }
      }

      if (componentOrElement === null) {
        return null;
      }

      if (componentOrElement instanceof _three2.default.Object3D || componentOrElement instanceof HTMLCanvasElement) {
        return componentOrElement;
      }

      if (_ReactInstanceMap2.default.has(componentOrElement)) {
        var instance = _ReactInstanceMap2.default.get(componentOrElement);

        return instance._react3RendererInstance.getMarkupFromInstance(componentOrElement).threeObject;
      }

      if (!(componentOrElement.render === null || typeof componentOrElement.render !== 'function')) {
        if (process.env.NODE_ENV !== 'production') {
          (0, _invariant2.default)(false, 'Component (with keys: %s) contains `render` method ' + 'but is not mounted', Object.keys(componentOrElement));
        } else {
          (0, _invariant2.default)(false);
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(false, 'Element appears to be neither ReactComponent, ' + 'a THREE.js object, nor a HTMLCanvasElement (keys: %s)', Object.keys(componentOrElement));
      } else {
        (0, _invariant2.default)(false);
      }
    }
    // to be used by modules e.g. mouse input ( see examples )

  }]);

  function React3Renderer() {
    var _this2 = this;

    _classCallCheck(this, React3Renderer);

    this.findDeepestCachedAncestorImpl = function (ancestorID) {
      var ancestorMarkup = _this2.markupCache[ancestorID];
      if (ancestorMarkup && _this2.isValid(ancestorMarkup, ancestorID)) {
        _this2.deepestContainerSoFar = ancestorMarkup.threeObject;
      } else {
        // This node isn't populated in the cache, so presumably none of its
        // descendants are. Break out of the loop.
        return false;
      }
    };

    this.instantiateChild = function (childInstances, child, name) {
      // We found a component instance.
      var keyUnique = childInstances[name] === undefined;
      if (process.env.NODE_ENV !== 'production') {
        (0, _warning2.default)(keyUnique, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.', name);
      }
      if (child !== null && keyUnique) {
        childInstances[name] = _this2.instantiateReactComponent(child, null);
      }
    };

    this.findNodeHandle = function (instance) {
      var markup = _this2.getMarkup(instance._rootNodeID);

      _this2._highlightCache = markup;
      return _this2._highlightElement;
    };

    this.nativeTagToRootNodeID = function () {
      return null;
    };

    this.mountRootComponent = function (componentInstance, rootID, container, transaction, shouldReuseMarkup, context) {
      // if (process.env.NODE_ENV !== 'production') {
      // if (context === emptyObject) {
      //   context = {};
      // }
      // const tag = container.nodeName.toLowerCase();
      // context[validateDOMNesting.ancestorInfoContextKey] =
      //   validateDOMNesting.updatedAncestorInfo(null, tag, null);
      // }

      var markup = _ReactReconciler2.default.mountComponent(componentInstance, rootID, transaction, context);
      componentInstance._renderedComponent._topLevelWrapper = componentInstance;
      _this2._mountRootImage(markup, container, shouldReuseMarkup, transaction);
    };

    this.batchedMountRootComponent = function (componentInstance, rootID, container, shouldReuseMarkup, context) {
      var transaction = _ReactUpdates2.default.ReactReconcileTransaction.getPooled();
      transaction.perform(_this2.mountRootComponent, null, componentInstance, rootID, container, transaction, shouldReuseMarkup, context);
      _ReactUpdates2.default.ReactReconcileTransaction.release(transaction);
    };

    this._instancesByReactRootID = {};
    this.containersByReactRootID = {};
    if (process.env.NODE_ENV !== 'production') {
      this.rootMarkupsByReactRootID = {};
    }
    this.findComponentRootReusableArray = [];
    this.markupCache = {};
    this.deepestContainerSoFar = null;
    this.nextMountID = 1;
    this.nextReactRootIndex = 0;

    this.threeElementDescriptors = new _ElementDescriptorContainer2.default(this).descriptors;

    this._highlightElement = document.createElement('div');
    this._highlightCache = null;

    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
      this._agent = null;

      this._onHideHighlightFromInspector = function () {
        if (_this2._highlightCache && _this2._highlightCache.threeObject.userData.react3internalComponent) {
          var internalComponent = _this2._highlightCache.threeObject.userData.react3internalComponent;

          internalComponent.hideHighlight();

          _this2._highlightCache = null;
        }
      };

      this._onHighlightFromInspector = function (highlightInfo) {
        if (highlightInfo.node === _this2._highlightElement) {
          if (_this2._highlightCache && _this2._highlightCache.threeObject.userData.react3internalComponent) {
            var internalComponent = _this2._highlightCache.threeObject.userData.react3internalComponent;

            internalComponent.highlightComponent();
          }
        }
      };

      this._hookAgent = function (agent) {
        _this2._agent = agent;

        // agent.on('startInspecting', (...args) => {
        //   console.log('start inspecting?', args);
        // });
        // agent.on('setSelection', (...args) => {
        //   console.log('set selection?', args);
        // });
        // agent.on('selected', (...args) => {
        //   console.log('selected?', args);
        // });
        agent.on('highlight', _this2._onHighlightFromInspector);
        agent.on('hideHighlight', _this2._onHideHighlightFromInspector);
        // agent.on('highlightMany', (...args) => {
        //   console.log('highlightMany?', args);
        // });
      };

      // this._scene = new THREE.Scene();

      // Inject the runtime into a devtools global hook regardless of browser.
      // Allows for debugging when the hook is injected on the page.
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
        this._devToolsRendererDefinition = {
          CurrentOwner: _ReactCurrentOwner2.default,
          InstanceHandles: _ReactInstanceHandles2.default,
          Mount: this,
          Reconciler: _ReactReconciler2.default,
          TextComponent: _InternalComponent2.default
        };

        var rendererListener = function rendererListener(info) {
          _this2._reactDevtoolsRendererId = info.id;
          _this2._rendererListenerCleanup();

          delete _this2._rendererListenerCleanup;
        };

        this._rendererListenerCleanup = __REACT_DEVTOOLS_GLOBAL_HOOK__.sub('renderer', rendererListener);
        __REACT_DEVTOOLS_GLOBAL_HOOK__.inject(this._devToolsRendererDefinition);

        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent !== 'undefined' && __REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent) {
          var agent = __REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent;
          this._hookAgent(agent);
        } else {
          this._devtoolsCallbackCleanup = __REACT_DEVTOOLS_GLOBAL_HOOK__.sub('react-devtools', function (agent) {
            _this2._devtoolsCallbackCleanup();

            _this2._hookAgent(agent);
          });
        }
      }
    }
  }

  _createClass(React3Renderer, [{
    key: 'findDeepestCachedAncestor',

    /**
     * Return the deepest cached node whose ID is a prefix of `targetID`.
     */
    value: function findDeepestCachedAncestor(targetID) {
      this.deepestContainerSoFar = null;

      _ReactInstanceHandles2.default.traverseAncestors(targetID, this.findDeepestCachedAncestorImpl);

      var foundAncestor = this.deepestContainerSoFar;
      this.deepestContainerSoFar = null;
      return foundAncestor;
    }
  }, {
    key: 'instantiateChildren',
    value: function instantiateChildren(nestedChildNodes) {
      if (nestedChildNodes === null) {
        return null;
      }

      var childInstances = {};

      (0, _traverseAllChildren2.default)(nestedChildNodes, this.instantiateChild, childInstances);

      return childInstances;
    }
  }, {
    key: 'containsChild',
    value: function containsChild(container, markup) {
      var childrenMarkup = container.userData.markup.childrenMarkup;
      for (var i = 0; i < childrenMarkup.length; i++) {
        if (childrenMarkup[i] === markup) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: 'isValid',
    value: function isValid(markup, id) {
      if (markup) {
        if (internalGetID(markup) !== id) {
          if (process.env.NODE_ENV !== 'production') {
            (0, _invariant2.default)(false, 'React3Renderer: Unexpected modification of `%s`', _idPropertyName2.default);
          } else {
            (0, _invariant2.default)(false);
          }
        }

        var container = this.findContainerForID(id);

        // if (container && container.markup === markup) {
        //  return true;
        // }

        if (container && this.containsChild(container, markup)) {
          return true;
        }
      }

      return false;
    }

    /**
     * Finds the container that contains React component to which the
     * supplied `id` belongs.
     *
     * @param {string} id The ID of an element rendered by a React component.
     * @return {?THREE.Object3D|HTMLCanvasElement} The container that contains the `id`.
     */

  }, {
    key: 'findContainerForID',
    value: function findContainerForID(id) {
      var reactRootID = _ReactInstanceHandles2.default.getReactRootIDFromNodeID(id);
      var container = this.containersByReactRootID[reactRootID];

      if (process.env.NODE_ENV !== 'production') {
        var rootMarkup = this.rootMarkupsByReactRootID[reactRootID];
        if (rootMarkup) {
          if (!rootMarkup.parentMarkup || rootMarkup.parentMarkup.threeObject !== container) {
            if (process.env.NODE_ENV !== 'production') {
              (0, _warning2.default)(
              // Call internalGetID here because getID calls isValid which calls
              // findThreeObjectForID (this function).
              internalGetID(rootMarkup) === reactRootID, 'React3Renderer: Root element ID differed from reactRootID.');
            }

            var containerChildMarkup = container.userData && container.userData.markup && container.userData.markup.childrenMarkup[0];
            if (containerChildMarkup && reactRootID === internalGetID(containerChildMarkup)) {
              // If the container has a new child with the same ID as the old
              // root element, then rootUserDatasByReactRootID[reactRootID] is
              // just stale and needs to be updated. The case that deserves a
              // warning is when the container is empty.
              this.rootMarkupsByReactRootID[reactRootID] = containerChildMarkup;
            } else {
              if (process.env.NODE_ENV !== 'production') {
                (0, _warning2.default)(false, 'React3Renderer: Root element has been removed from its original ' + 'container. New container: %s', rootMarkup.parentNode);
              }
            }
          }
        }
      }

      return container;
    }
  }, {
    key: 'getMarkup',
    value: function getMarkup(id) {
      if (!this.markupCache.hasOwnProperty(id) || !this.isValid(this.markupCache[id], id)) {
        this.markupCache[id] = this.findMarkupByID(id);
      }
      return this.markupCache[id];
    }

    // DO NOT RENAME
    // used by react devtools!

    // used by react devtools

  }, {
    key: 'findMarkupByID',

    /**
     * Finds an element rendered by React with the supplied ID.
     *
     * @param {string} id ID of a markup in the React component.
     * @return {THREE.Object3D} Root THREE.Object3D of the React component.
     */
    value: function findMarkupByID(id) {
      var container = this.findContainerForID(id);
      return this.findComponentRoot(container, id);
    }
  }, {
    key: 'findComponentRoot',
    value: function findComponentRoot(ancestorContainer, targetID) {
      var firstMarkupList = this.findComponentRootReusableArray;
      var childIndex = 0;

      var deepestAncestorContainer = this.findDeepestCachedAncestor(targetID) || ancestorContainer;

      firstMarkupList[0] = deepestAncestorContainer.userData.markup.childrenMarkup[0];
      firstMarkupList.length = 1;

      while (childIndex < firstMarkupList.length) {
        var childMarkup = firstMarkupList[childIndex++];
        var targetChildMarkup = undefined;

        while (childMarkup) {
          var childID = this.getID(childMarkup);
          if (childID) {
            // Even if we find the node we're looking for, we finish looping
            // through its siblings to ensure they're cached so that we don't have
            // to revisit this node again. Otherwise, we make n^2 calls to getID
            // when visiting the many children of a single node in order.

            if (targetID === childID) {
              targetChildMarkup = childMarkup;
            } else if (_ReactInstanceHandles2.default.isAncestorIDOf(childID, targetID)) {
              // If we find a child whose ID is an ancestor of the given ID,
              // then we can be sure that we only want to search the subtree
              // rooted at this child, so we can throw out the rest of the
              // search state.
              firstMarkupList.length = childIndex = 0;
              firstMarkupList.push(childMarkup.childrenMarkup[0]);
            }
          } else {
            (0, _invariant2.default)(false);
            // debugger;
            // If this child had no ID, then there's a chance that it was
            // injected automatically by the browser, as when a `<table>`
            // element sprouts an extra `<tbody>` child as a side effect of
            // `.innerHTML` parsing. Optimistically continue down this
            // branch, but not before examining the other siblings.
            firstMarkupList.push(childMarkup.childrenMarkup[0]);
          }

          // if childMarkup doesn't exist it may have been unmounted
          var childParentMarkup = childMarkup && childMarkup.parentMarkup;
          // if parentMarkup doesn't exist it could be a root (or unmounted)
          var ownerChildrenMarkups = childParentMarkup && childParentMarkup.childrenMarkup;

          if (ownerChildrenMarkups) {
            var indexInParent = ownerChildrenMarkups.indexOf(childMarkup);

            (0, _invariant2.default)(indexInParent !== -1, 'Could not find child markup`s index in parent');

            childMarkup = ownerChildrenMarkups.length > indexInParent && ownerChildrenMarkups[indexInParent + 1] || null;
          } else {
            childMarkup = null;
          }
        }

        if (targetChildMarkup) {
          // Emptying firstMarkupList/findComponentRootReusableArray is
          // not necessary for correctness, but it helps the GC reclaim
          // any nodes that were left at the end of the search.
          firstMarkupList.length = 0;

          return targetChildMarkup;
        }
      }

      firstMarkupList.length = 0;

      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(false, 'findComponentRoot(..., %s): Unable to find element. This probably ' + 'means the THREE.js environment was unexpectedly mutated (e.g., by a plugin). ' + 'Try inspecting the child nodes of the element with React ID `%s`.', targetID, this.getID(ancestorContainer.userData.markup));
      } else {
        (0, _invariant2.default)(false);
      }
    }

    /**
     * Mounts this component and inserts it into the THREE.js environment.
     *
     * @param {ReactComponent} componentInstance The instance to mount.
     * @param {string} rootID markup ID of the root node.
     * @param {THREE.Object3D|HTMLCanvasElement} container to mount into.
     * @param {ReactReconcileTransaction} transaction
     * @param {boolean} shouldReuseMarkup If true, do not insert markup
     * @param {any} context
     */

  }, {
    key: '_mountRootImage',
    value: function _mountRootImage(rootImage, container) {
      // if (!(container && (container.nodeType === ELEMENT_NODE_TYPE
      //   || container.nodeType === DOC_NODE_TYPE
      //   || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE))) {
      //   if (process.env.NODE_ENV !== 'production') {
      //     invariant(false, 'mountRootComponent(...): Target container is not valid.');
      //   } else {
      //     invariant(false);
      //   }
      // }

      // TODO try to do server-side rendering for THREE
      // ( can write a scene into json or something :D )
      // if (shouldReuseMarkup) {
      //   const rootElement = getReactRootMarkupInContainer(container);
      //   if (ReactMarkupChecksum.canReuseMarkup(rootImage, rootElement)) {
      //     return;
      //   }
      //
      //   const checksum = rootElement.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
      //   rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
      //
      //   const rootMarkup = rootElement.outerHTML;
      //   rootElement.setAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME, checksum);
      //
      //   const diffIndex = firstDifferenceIndex(rootImage, rootMarkup);
      //   const difference = ' (client) ' +
      //     rootImage.substring(diffIndex - 20, diffIndex + 20)
      //     + '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);
      //
      //   !(container.nodeType !== DOC_NODE_TYPE) ?
      //     process.env.NODE_ENV !== 'production' ?
      //       invariant(false,
      //         'You\'re trying to render a component to the document using '
      //         + 'server rendering but the checksum was invalid. This usually '
      //         + 'means you rendered a different component type or props on '
      //         + 'the client from the one on the server, or your render() '
      //         + 'methods are impure. React cannot handle this case due to '
      //         + 'cross-browser quirks by rendering at the document root. You '
      //         + 'should look for environment dependent code in your components '
      //         + 'and ensure the props are the same client and server side:\n%s',
      //        difference) : invariant(false) : undefined;
      //
      //   if (process.env.NODE_ENV !== 'production') {
      //     process.env.NODE_ENV !== 'production' ?
      //       warning(false, 'React attempted to reuse rootImage in a container but the '
      //       + 'checksum was invalid. This generally means that you are '
      //       + 'using server rendering and the rootImage generated on the '
      //       + 'server was not what the client was expecting. React injected '
      //       + 'new rootImage to compensate which works but you have lost many '
      //       + 'of the benefits of server rendering. Instead, figure out '
      //       + 'why the rootImage being generated is different on the client '
      //       + 'or server:\n%s', difference) : undefined;
      //   }
      // }

      // if (!(container.nodeType !== DOC_NODE_TYPE)) {
      //   if (process.env.NODE_ENV !== 'production') {
      //     invariant(false,
      //       'You\'re trying to render a component to the document but '
      //       + 'you didn\'t use server rendering. We can\'t do this '
      //       + 'without using server rendering due to cross-browser quirks. '
      //       + 'See React.renderToString() for server rendering.');
      //   } else {
      //     invariant(false);
      //   }
      // }

      // console.log('setting inner html!?', rootImage);

      if (!container.userData) {
        // it has to be a HTMLCanvasElement I guess?
        (0, _invariant2.default)(container instanceof HTMLCanvasElement, 'The root container can only be a THREE.js object ' + '(with an userData property) or HTMLCanvasElement.');
        container.userData = {
          _createdByReact3: true
        };
      }

      var rootMarkup = {
        threeObject: container,
        parentMarkup: null,
        childrenMarkup: [rootImage],
        toJSON: function toJSON() {
          return '---MARKUP---';
        }
      };

      Object.assign(container.userData, {
        object3D: container,
        toJSON: function toJSON() {
          return '---USERDATA---';
        },
        markup: rootMarkup
      });

      rootImage.parentMarkup = rootMarkup;

      var descriptorForChild = this.threeElementDescriptors[rootImage.elementType];
      descriptorForChild.setParent(rootImage.threeObject, rootMarkup.threeObject);

      // all objects now added can be marked as added to scene now!

      var instance = rootImage.threeObject;

      (0, _invariant2.default)(instance instanceof _React3Instance2.default, 'Invalid root component type found');

      instance.mountedIntoRoot();
    }

    /**
     * Batched mount.
     *
     * @param {ReactComponent} componentInstance The instance to mount.
     * @param {string} rootID markup ID of the root node.
     * @param {THREE.Object3D|HTMLCanvasElement} container THREE Object
     *   or HTMLCanvasElement to mount into.
     * @param {boolean} shouldReuseMarkup If true, do not insert markup
     * @param {any} context
     */

  }, {
    key: 'render',

    /**
     *
     * @param nextElement A react element
     * @param container A canvas or a THREE.js object
     * @param callback The callback function
     * @returns {*}
     */
    value: function render(nextElement, container, callback) {
      return this._renderSubtreeIntoContainer(null, nextElement, container, callback);
    }
  }, {
    key: '_renderSubtreeIntoContainer',
    value: function _renderSubtreeIntoContainer(parentComponent, nextElement, container, callback) {
      var _this3 = this;

      if (!_ReactElement2.default.isValidElement(nextElement)) {
        if (process.env.NODE_ENV !== 'production') {
          if (typeof nextElement === 'string') {
            (0, _invariant2.default)(false, 'React3Renderer.render(): Invalid component element.%s', ' Instead of passing an element string, make sure to instantiate ' + 'it by passing it to React.createElement.');
          } else {
            if (typeof nextElement === 'function') {
              (0, _invariant2.default)(false, 'React3Renderer.render(): Invalid component element.%s', ' Instead of passing a component class, make sure to instantiate ' + 'it by passing it to React.createElement.');
            } else {
              if (nextElement !== null && nextElement.props !== undefined) {
                (0, _invariant2.default)(false, 'React3Renderer.render(): Invalid component element.%s', ' This may be caused by unintentionally loading two independent ' + 'copies of React.');
              } else {
                (0, _invariant2.default)(false, 'React3Renderer.render(): Invalid component element.');
              }
            }
          }
        } else {
          (0, _invariant2.default)(false);
        }
      }

      // No need for this part, should never render into body
      // if (process.env.NODE_ENV !== 'production') {
      //   warning(!container || !container.tagName ||
      //     container.tagName.toUpperCase() !== 'BODY',
      //     'render(): Rendering components directly into document.body is ' +
      //     'discouraged, since its children are often manipulated by third-party ' +
      //     'scripts and browser extensions. This may lead to subtle ' +
      //     'reconciliation issues. Try rendering into a container element created ' +
      //     'for your app.');
      // }

      var nextWrappedElement = new _ReactElement2.default(TopLevelWrapper, null, null, null, null, null, nextElement);

      var prevComponent = this._instancesByReactRootID[this.getReactRootID(container)];

      if (prevComponent) {
        var prevWrappedElement = prevComponent._currentElement;
        var prevElement = prevWrappedElement.props;
        if ((0, _shouldUpdateReactComponent2.default)(prevElement, nextElement)) {
          var _ret = (function () {
            var publicInst = prevComponent._renderedComponent.getPublicInstance();
            var updatedCallback = callback && function () {
              callback.call(publicInst);
            };

            _this3._updateRootComponent(prevComponent, nextWrappedElement, container, updatedCallback);

            return {
              v: publicInst
            };
          })();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }

        this.unmountComponentAtNode(container);
      }

      // aka first child
      var reactRootMarkup = getReactRootMarkupInContainer(container);
      var containerHasReactMarkup = reactRootMarkup && internalGetID(reactRootMarkup);

      // no need for this part for now
      // if (process.env.NODE_ENV !== 'production') {
      //   if (!containerHasReactMarkup || reactRootMarkup.nextSibling) {
      //     let rootElementSibling = reactRootMarkup;
      //     while (rootElementSibling) {
      //       if (this.isRenderedByReact(rootElementSibling)) {
      //         if (process.env.NODE_ENV !== 'production') {
      //           warning(false,
      //             'render(): Target node has markup rendered by React, but there '
      //             + 'are unrelated nodes as well. This is most commonly caused by '
      //             + 'white-space inserted around server-rendered markup.');
      //         }
      //         break;
      //       }
      //
      //       rootElementSibling = rootElementSibling.nextSibling;
      //     }
      //   }
      // }

      var shouldReuseMarkup = containerHasReactMarkup && !prevComponent;

      var component = undefined;
      if (parentComponent === null) {
        // no context
        component = this._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, _emptyObject2.default)._renderedComponent.getPublicInstance();
      } else {
        // yes context
        component = this._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, parentComponent._reactInternalInstance._processChildContext(parentComponent._reactInternalInstance._context))._renderedComponent.getPublicInstance();
      }

      if (callback) {
        callback.call(component);
      }

      return component;
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      var rootIds = Object.keys(this.containersByReactRootID);

      for (var i = 0; i < rootIds.length; ++i) {
        this.unmountComponentAtNode(this.containersByReactRootID[rootIds[i]]);
      }

      delete this._instancesByReactRootID;
      delete this.containersByReactRootID;
      if (process.env.NODE_ENV !== 'production') {
        delete this.rootMarkupsByReactRootID;
      }
      delete this.findComponentRootReusableArray;
      delete this.markupCache;
      delete this.deepestContainerSoFar;
      delete this._highlightElement;
      this.nextMountID = 1;
      this.nextReactRootIndex = 0;

      if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_REACT_ADDON_HOOKS === 'true') {
        if (this._devtoolsCallbackCleanup) {
          this._devtoolsCallbackCleanup();

          delete this._devtoolsCallbackCleanup;
        }

        if (this._rendererListenerCleanup) {
          this._rendererListenerCleanup();

          delete this._rendererListenerCleanup;
        }

        if (this._devToolsRendererDefinition) {
          if (this._agent) {
            this._agent.onUnmounted(this._devToolsRendererDefinition);
            this._agent.removeListener('highlight', this._onHighlightFromInspector);
            this._agent.removeListener('hideHighlight', this._onHideHighlightFromInspector);
          }

          if (this._reactDevtoolsRendererId) {
            delete __REACT_DEVTOOLS_GLOBAL_HOOK__._renderers[this._reactDevtoolsRendererId];
            delete this._reactDevtoolsRendererId;
          }

          delete this._devToolsRendererDefinition;
          delete this._agent;
        }

        delete this._onHighlightFromInspector;
        delete this._onHideHighlightFromInspector;
        delete this._hookAgent;
      }
    }
  }, {
    key: '_updateRootComponent',
    value: function _updateRootComponent(prevComponent, nextElement, container, callback) {
      // this.scrollMonitor(container, function () {
      _ReactUpdateQueue2.default.enqueueElementInternal(prevComponent, nextElement);
      if (callback) {
        _ReactUpdateQueue2.default.enqueueCallbackInternal(prevComponent, callback);
      }
      // });

      if (process.env.NODE_ENV !== 'production') {
        // Record the root element in case it later gets transplanted.
        this.rootMarkupsByReactRootID[this.getReactRootID(container)] = getReactRootMarkupInContainer(container);
      }

      return prevComponent;
    }
  }, {
    key: 'unmountComponentAtNode',
    value: function unmountComponentAtNode(container) {
      // Various parts of our code (such as ReactCompositeComponent's
      // _renderValidatedComponent) assume that calls to render aren't nested;
      // verify that that's the case. (Strictly speaking, unmounting won't cause a
      // render but we still don't expect to be in a render call here.)

      if (process.env.NODE_ENV !== 'production') {
        (0, _warning2.default)(_ReactCurrentOwner2.default.current === null, 'unmountComponentAtNode(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from render ' + 'is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', _ReactCurrentOwner2.default.current && _ReactCurrentOwner2.default.current.getName() || 'ReactCompositeComponent');
      }

      var reactRootID = this.getReactRootID(container);
      var component = this._instancesByReactRootID[reactRootID];
      if (!component) {
        return false;
      }

      _ReactUpdates2.default.batchedUpdates(unmountComponentInternal, component, container);
      delete this._instancesByReactRootID[reactRootID];
      delete this.containersByReactRootID[reactRootID];

      if (process.env.NODE_ENV !== 'production') {
        delete this.rootMarkupsByReactRootID[reactRootID];
      }

      if (container && container.userData && container.userData._createdByReact3) {
        delete container.userData;
      }

      return true;
    }

    /**
     * @param {THREE.Object3D|HTMLCanvasElement} container THREE Object
     *   or HTML Canvas Element that may contain a React component.
     * @return {?string} A "reactRoot" ID, if a React component is rendered.
     */

  }, {
    key: 'getReactRootID',
    value: function getReactRootID(container) {
      var rootMarkup = getReactRootMarkupInContainer(container);
      return rootMarkup && this.getID(rootMarkup);
    }
  }, {
    key: 'instantiateReactComponent',
    value: function instantiateReactComponent(elementToInstantiate) {
      // console.log('instantiating react component', elementToInstantiate);
      var instance = undefined;

      var node = elementToInstantiate;

      if (node === null || node === false) {
        node = new _ReactEmptyComponent2.default(this.instantiateReactComponent);
      } else if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object') {
        var element = node;
        if (!(element && (typeof element.type === 'function' || typeof element.type === 'string'))) {
          if (process.env.NODE_ENV !== 'production') {
            if (element.type === null) {
              (0, _invariant2.default)(false, 'Element type is invalid: expected a string (for built-in components) ' + 'or a class/function (for composite components) but got: %s.%s', element.type, getDeclarationErrorAddendum(element._owner));
            } else {
              (0, _invariant2.default)(false, 'Element type is invalid: expected a string (for built-in components) ' + 'or a class/function (for composite components) but got: %s.%s', _typeof(element.type), getDeclarationErrorAddendum(element._owner));
            }
          } else {
            (0, _invariant2.default)(false);
          }
        }

        // Special case string values
        if (typeof element.type === 'string') {
          // console.log('string value string value', element);

          instance = new _InternalComponent2.default(element, this);

          // instance = ReactNativeComponent.createInternalComponent(element);
        } else if (isInternalComponentType(element.type)) {
            // This is temporarily available for custom components that are not string
            // representations. I.e. ART. Once those are updated to use the string
            // representation, we can drop this code path.
            var Constructor = element.type;

            instance = new Constructor(element);

            console.log('internal component type'); // eslint-disable-line
          } else {
              instance = new _React3CompositeComponentWrapper2.default(this);
            }
      } else if (typeof node === 'string' || typeof node === 'number') {
        if (process.env.NODE_ENV !== 'production') {
          (0, _invariant2.default)(false, 'Encountered invalid React node of type %s : %s', typeof node === 'undefined' ? 'undefined' : _typeof(node), node);
        } else {
          (0, _invariant2.default)(false);
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          (0, _invariant2.default)(false, 'Encountered invalid React node of type %s', typeof node === 'undefined' ? 'undefined' : _typeof(node));
        } else {
          (0, _invariant2.default)(false);
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        (0, _warning2.default)(typeof instance.construct === 'function' && typeof instance.mountComponent === 'function' && typeof instance.receiveComponent === 'function' && typeof instance.unmountComponent === 'function', 'Only React Components can be mounted.');
      }

      // Sets up the instance. This can probably just move into the constructor now.
      instance.construct(node);

      // These two fields are used by the DOM and ART diffing algorithms
      // respectively. Instead of using expandos on components, we should be
      // storing the state needed by the diffing algorithms elsewhere.
      instance._mountIndex = 0;
      instance._mountImage = null;

      if (process.env.NODE_ENV !== 'production') {
        instance._isOwnerNecessary = false;
        instance._warnedAboutRefsInRender = false;
      }

      // Internal instances should fully constructed at this point, so they should
      // not get any new fields added to them at this point.
      if (process.env.NODE_ENV !== 'production') {
        if (Object.preventExtensions) {
          Object.preventExtensions(instance);
        }
      }

      return instance;
    }

    /**
     *
     * @param nextElement
     * @param {THREE.Object3D | HTMLCanvasElement} container
     * @param shouldReuseMarkup
     * @param context
     * @returns {*}
     * @private
     */

  }, {
    key: '_renderNewRootComponent',
    value: function _renderNewRootComponent(nextElement, container, shouldReuseMarkup, context) {
      // Various parts of our code (such as ReactCompositeComponent's
      // _renderValidatedComponent) assume that calls to render aren't nested;
      // verify that that's the case.
      if (process.env.NODE_ENV !== 'production') {
        (0, _warning2.default)(_ReactCurrentOwner2.default.current === null, '_renderNewRootComponent(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from ' + 'render is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', _ReactCurrentOwner2.default.current && _ReactCurrentOwner2.default.current.getName() || 'ReactCompositeComponent');
      }

      var componentInstance = this.instantiateReactComponent(nextElement);
      var reactRootID = this._registerComponent(componentInstance, container);

      // The initial render is synchronous but any updates that happen during
      // rendering, in componentWillMount or componentDidMount, will be batched
      // according to the current batching strategy.

      if (!_ReactUpdates2.default.ReactReconcileTransaction) {
        // If the ReactReconcileTransaction has not been injected
        // let's just use the defaults from ReactMount.
        _ReactInjection2.default.Updates.injectReconcileTransaction(_ReactReconcileTransaction2.default);
        _ReactInjection2.default.Updates.injectBatchingStrategy(_ReactDefaultBatchingStrategy2.default);
      }

      _ReactUpdates2.default.batchedUpdates(this.batchedMountRootComponent, componentInstance, reactRootID, container, shouldReuseMarkup, context);

      if (process.env.NODE_ENV !== 'production') {
        // Record the root element in case it later gets transplanted.
        this.rootMarkupsByReactRootID[reactRootID] = getReactRootMarkupInContainer(container);
      }

      return componentInstance;
    }
  }, {
    key: '_registerComponent',
    value: function _registerComponent(nextComponent, container) {
      // if (!(container &&
      //   (container.nodeType === ELEMENT_NODE_TYPE
      //    || container.nodeType === DOC_NODE_TYPE
      //    || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE))) {
      //   if (process.env.NODE_ENV !== 'production') {
      //     invariant(false, '_registerComponent(...): Target container is not a DOM element.');
      //   } else {
      //     invariant(false);
      //   }
      // }

      // ReactBrowserEventEmitter.ensureScrollValueMonitoring();

      var reactRootID = this.registerContainer(container);
      this._instancesByReactRootID[reactRootID] = nextComponent;
      return reactRootID;
    }

    /**
     * Registers a container node into which React components will be rendered.
     * This also creates the "reactRoot" ID that will be assigned to the element
     * rendered within.
     *
     * @param {THREE.Object3D|HTMLCanvasElement} container to register as a container.
     * @return {string} The "reactRoot" ID of elements rendered within.
     */

  }, {
    key: 'registerContainer',
    value: function registerContainer(container) {
      var reactRootID = this.getReactRootID(container);
      if (reactRootID) {
        // If one exists, make sure it is a valid "reactRoot" ID.
        reactRootID = _ReactInstanceHandles2.default.getReactRootIDFromNodeID(reactRootID);
      }
      if (!reactRootID) {
        // No valid "reactRoot" ID found, create one.
        reactRootID = '' + SEPARATOR + this.createReactRootID();
      }
      this.containersByReactRootID[reactRootID] = container;
      return reactRootID;
    }
  }, {
    key: 'createReactRootID',
    value: function createReactRootID() {
      return this.nextReactRootIndex++;
    }
  }, {
    key: 'getID',
    value: function getID(markup) {
      var id = internalGetID(markup);
      if (id) {
        var cached = this.markupCache[id];
        if (!!cached) {
          if (cached !== markup) {
            if (!!this.isValid(cached, id)) {
              if (process.env.NODE_ENV !== 'production') {
                (0, _invariant2.default)(false, 'React3Renderer: Two valid but unequal nodes with the same `%s`: %s', _idPropertyName2.default, id);
              } else {
                (0, _invariant2.default)(false);
              }
            }

            this.markupCache[id] = markup;
          }
        } else {
          this.markupCache[id] = markup;
        }
      }

      return id;
    }
  }]);

  return React3Renderer;
})(), _class2.eventDispatcher = new _EventDispatcher2.default(), _temp2);

module.exports = React3Renderer;