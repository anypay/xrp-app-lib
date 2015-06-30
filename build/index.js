'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _wallet = require('./wallet');

var _wallet2 = _interopRequireDefault(_wallet);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _errors = require('./errors');

var _errors2 = _interopRequireDefault(_errors);

var _decodeURI2 = require('./decodeURI');

var _decodeURI3 = _interopRequireDefault(_decodeURI2);

var _xrpAccountListenerBrowserify = require('xrp-account-listener-browserify');

var _xrpAccountListenerBrowserify2 = _interopRequireDefault(_xrpAccountListenerBrowserify);

var XRPLib = (function () {
  function XRPLib() {
    _classCallCheck(this, XRPLib);
  }

  _createClass(XRPLib, [{
    key: 'createWallet',
    value: function createWallet() {
      return _wallet2['default'].generate();
    }
  }, {
    key: 'importWalletFromSecret',
    value: function importWalletFromSecret(privateKey) {
      return new _wallet2['default']({ privateKey: privateKey });
    }
  }, {
    key: 'importAccountFromAddress',
    value: function importAccountFromAddress(publicKey) {
      return new _account2['default']({ publicKey: publicKey });
    }
  }, {
    key: 'updateBalance',
    value: function updateBalance(account) {
      return account.updateBalance();
    }
  }, {
    key: 'sendPayment',
    value: function sendPayment(options) {
      return options.from.sendPayment(options).then(function () {
        return _Promise.all([options.from.updateBalance(), options.to.updateBalance()]);
      });
    }
  }, {
    key: 'decodeURI',
    value: function decodeURI(uri) {
      return _decodeURI3['default'].decode(uri);
    }
  }, {
    key: '_Wallet',
    get: function get() {
      return _wallet2['default'];
    }
  }, {
    key: '_Account',
    get: function get() {
      return _account2['default'];
    }
  }, {
    key: 'Errors',
    get: function get() {
      return _errors2['default'];
    }
  }, {
    key: 'Listener',
    get: function get() {
      return _xrpAccountListenerBrowserify2['default'];
    }
  }]);

  return XRPLib;
})();

module.exports = new XRPLib();