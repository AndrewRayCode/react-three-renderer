'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var React3Module = (function () {
  function React3Module() {
    _classCallCheck(this, React3Module);

    this.userData = {};
    this.uuid = _three2.default.Math.generateUUID();
  }

  _createClass(React3Module, [{
    key: 'setup',
    value: function setup(react3RendererInstance) {// eslint-disable-line no-unused-vars

    }
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'dispose',
    value: function dispose() {}
  }]);

  return React3Module;
})();

module.exports = React3Module;