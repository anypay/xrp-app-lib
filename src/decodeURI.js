import * as qs from 'querystring'
import Account from './account'

const rippleRX = /^(ripple|ripple.com):\/{0,2}([a-zA-Z0-9]{27,34})(?:\?(.*))?$/

class decodeURI {

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
    decode(uri) {
        const match = rippleRX.exec(uri)
        if (!match) {
          throw new URIError()
        }

        const parsed = { uri: uri }
        match.shift() //account for the pseudo-match of the protocol name

        if (match[2]) {
            const queries = match[2].split('&')
            for (let _query of queries) {
                let query = _query.split('=')
                if (query.length == 2) {
                    parsed[query[0]] = decodeURIComponent(query[1])
                }
            }
        }

        parsed.address = match[1]
        return parsed
    }
}

class URIError extends Error {
    constructor(message) {
        super(message)
        this.message = message || "Badly formatted URI"
        this.type = "URIError"
        Error.captureStackTrace(this, URIError)
    }
}

export default new decodeURI()

