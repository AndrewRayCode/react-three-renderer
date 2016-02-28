'use strict';

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResourceReference = function ResourceReference(resourceId) {
  _classCallCheck(this, ResourceReference);

  this.uuid = _three2.default.Math.generateUUID();

  this.resourceId = resourceId;
  this.userData = {};
};

module.exports = ResourceReference;