'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Uniform = (function () {
  function Uniform() {
    _classCallCheck(this, Uniform);

    this.userData = {};
    this.name = null;
    this.value = null;
    this.type = null;
    this.uuid = _three2.default.Math.generateUUID();
  }

  _createClass(Uniform, [{
    key: 'setValue',
    value: function setValue(value) {
      this.value = value;

      this.userData.events.emit('valueChanged', value);
    }
  }]);

  return Uniform;
})();

module.exports = Uniform;