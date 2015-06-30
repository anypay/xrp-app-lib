'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _bluebird = require('bluebird');

var bb = _interopRequireWildcard(_bluebird);

var _errors = require('./errors');

var _errors2 = _interopRequireDefault(_errors);

var _superagent = require('superagent');

var superagent = _interopRequireWildcard(_superagent);

var _rippleLib = require('ripple-lib');

var rippleLib = _interopRequireWildcard(_rippleLib);

var http = bb.promisifyAll(superagent);

var Account = (function () {
  function Account(options) {
    _classCallCheck(this, Account);

    if (options && rippleLib.UInt160.is_valid(options.publicKey)) {
      this._publicKey = options.publicKey;
    } else {
      throw new _errors2['default'].InvalidPublicKey();
    }
  }

  _createClass(Account, [{
    key: 'updateBalance',
    value: function updateBalance() {
      var response, balance;
      return _regeneratorRuntime.async(function updateBalance$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(http.get('https://api.ripple.com/v1/accounts/' + this.publicKey + '/balances').endAsync());

          case 2:
            response = context$2$0.sent;

            if (!response.body.success) {
              context$2$0.next = 9;
              break;
            }

            balance = response.body.balances.reduce(function (prev, current) {
              if (prev) {
                return prev;
              } else if (current.currency === 'XRP') {
                return current;
              } else {
                return false;
              }
            }, false);

            this._balance = parseFloat(balance.value);
            return context$2$0.abrupt('return', parseFloat(balance.value));

          case 9:
            return context$2$0.abrupt('return', this._balance = 0);

          case 10:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'publicKey',
    get: function get() {
      return this._publicKey;
    }
  }, {
    key: 'balance',
    get: function get() {
      return this._balance;
    }
  }]);

  return Account;
})();

exports['default'] = Account;
module.exports = exports['default'];