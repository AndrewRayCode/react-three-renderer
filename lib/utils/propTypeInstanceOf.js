'use strict';

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _ReactPropTypeLocationNames = require('react/lib/ReactPropTypeLocationNames');

var _ReactPropTypeLocationNames2 = _interopRequireDefault(_ReactPropTypeLocationNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns class name of the object, if any.
function getClassName(propValue) {
  if (!(propValue.constructor && (propValue.constructor.name || propValue.constructor.displayName))) {
    return '<<anonymous>>';
  }
  return propValue.constructor.name || propValue.constructor.displayName;
}

var ANONYMOUS = '<<anonymous>>';

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, _componentName, location, _propFullName) {
    var componentName = _componentName || ANONYMOUS;
    var propFullName = _propFullName || propName;
    if (props[propName] === null) {
      var locationName = _ReactPropTypeLocationNames2.default[location];
      if (isRequired) {
        return new Error('Required ' + locationName + ' `' + propFullName + '`' + (' was not specified in `' + componentName + '`.'));
      }
      return null;
    }

    return validate(props, propName, componentName, location, propFullName);
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createInstanceTypeChecker(expectedClass) {
  var originalInstanceOf = _ReactPropTypes2.default.instanceOf(expectedClass);

  function validate(props, propName, componentName, location, propFullName) {
    var originalResult = originalInstanceOf(props, propName, componentName, location, propFullName);

    if (originalResult !== null) {
      var locationName = _ReactPropTypeLocationNames2.default[location];
      var expectedClassName = expectedClass.name || expectedClass.displayName || ANONYMOUS;
      var actualClassName = getClassName(props[propName]);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
    }

    return originalResult;
  }

  var typeChecker = createChainableTypeChecker(validate);

  var _type = '' + (expectedClass.displayName || expectedClass.name || expectedClass._type || expectedClass);

  typeChecker.toString = function () {
    return '```' + ' ' + _type + ' ' + '```';
  };

  typeChecker.isRequired.toString = function () {
    return typeChecker.toString() + ' *' + '```' + ' required ' + '```' + '*';
  };

  typeChecker.displayName = _type;
  typeChecker.isRequired.displayName = _type;

  return typeChecker;
}

module.exports = createInstanceTypeChecker;