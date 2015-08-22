import * as qs from 'querystring'
import Account from './account'

class decodeURI {

    decode(uri) {
        if (typeof uri !== 'string') this.throw("uri is not a string")
        
        var params
        //var protocol = uri.replace(/\s/g, '').match(/^([a-z\.]+):\/\//) // host after slashes
        var protocol = uri.replace(/\s/g, '').match(/^([a-z\.]+):\/{0,2}/) // host after slashes

        if (!(protocol instanceof Array && protocol.length === 2)) this.throw("protocol not supported")
        protocol = protocol[1]

        switch (protocol) {
            case "ripple.com":
                params = this.parseURI('ripple.com', uri)
                break
            case "ripple":
                params = this.parseURI('ripple', uri)
                break
            default:
                this.throw("protocol not supported")
        }

        switch (params.action) {
            case 'query':
                return this.makeQuery(params)
            case 'send':
                return this.makeSend(params)
                break
            default:
                this.throw("this action not supported")
        }
    }

    makeSend(params) {
        // Try and import the account
        if (params.to) var accountTo = new Account({publicKey: params.to})
        else this.throw()

        if (!accountTo) this.throw()
        if (params.amount) {
            var amount = parseFloat(params.amount)
            if (Number.isNaN(amount)) this.throw()
            else params.amount = amount
        }
        return params
    }

    makeQuery(params) {
        new Account({publicKey: params.address})
        return params
    }

    parseURI(scheme, uri) {
        // remove whitespace and protocol scheme
        var parsedURI = uri.replace(/\s/g, '')
        var withoutScheme = parsedURI.replace(scheme, '')
                                     .replace(/^:*/, '')
                                     .replace(/^\/*/, '')
        
        if (!withoutScheme.length) this.throw()

        var parts = withoutScheme.split('?')
        
        // When there is no query string
        if (parts.length === 1) {
            return {
                action: 'query',
                address: parts[0],
                parsedURI: parsedURI,
                rawURI: uri
            }
        }

        // There is one query string
        else if (parts.length === 2) {
            var out = qs.parse(parts[1])
            out.action = parts[0]
            out.parsedURI = parsedURI
            out.rawURI = uri
            return out
        }
        
        else throw new URIError()
    }

    throw(message) {
        throw new URIError(message)
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

