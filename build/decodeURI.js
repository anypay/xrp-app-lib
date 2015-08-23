'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _querystring = require('querystring');

var qs = _interopRequireWildcard(_querystring);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var rippleRX = /^(ripple|ripple.com):\/{0,2}([a-zA-Z0-9]{27,34})(?:\?(.*))?$/;

var decodeURI = (function () {
    function decodeURI() {
        _classCallCheck(this, decodeURI);
    }

    _createClass(decodeURI, [{
        key: 'decode',

        /**
         * decodes a ripple URI, spec'd at
         * https://wiki.ripple.com into a POJO
         * representing the encoded transaction
         *
         * adopted from https://gist.github.com/matthewhudson/7999278
         *
         * @method decode
         * @param {String} uri
         * @returns {Object} decodedURI
         */
        value: function decode(uri) {
            var match = rippleRX.exec(uri);
            if (!match) {
                throw new URIError();
            }

            var parsed = { uri: uri };
            match.shift(); //account for the pseudo-match of the protocol name

            if (match[2]) {
                var queries = match[2].split('&');
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _getIterator(queries), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _query = _step.value;

                        var query = _query.split('=');
                        if (query.length == 2) {
                            parsed[query[0]] = decodeURIComponent(query[1]);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator['return']) {
                            _iterator['return']();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }

            parsed.address = match[1];
            return parsed;
        }
    }]);

    return decodeURI;
})();

var URIError = (function (_Error) {
    _inherits(URIError, _Error);

    function URIError(message) {
        _classCallCheck(this, URIError);

        _get(Object.getPrototypeOf(URIError.prototype), 'constructor', this).call(this, message);
        this.message = message || "Badly formatted URI";
        this.type = "URIError";
        Error.captureStackTrace(this, URIError);
    }

    return URIError;
})(Error);

exports['default'] = new decodeURI();
module.exports = exports['default'];