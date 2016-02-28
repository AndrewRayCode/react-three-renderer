'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @abstract
 */

var ShapeAction = (function () {
  function ShapeAction() {
    _classCallCheck(this, ShapeAction);

    this.uuid = _three2.default.Math.generateUUID();

    this.userData = {};
  }

  _createClass(ShapeAction, [{
    key: 'performAction',
    value: function performAction(shape) {// eslint-disable-line no-unused-vars
      // to be done by subclasses
    }
  }]);

  return ShapeAction;
})();

module.exports = ShapeAction;