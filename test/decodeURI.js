import {uris_to_pass, uris_to_fail} from './uri.json'
import url from 'url'
import assert from 'assert'
import {decodeURI} from '../'
import {describe, it} from 'mocha'

function compareKeys(object1, object2, keys) {
    if (!(keys instanceof Array)) {
        keys = [keys]
    }
    for (let key of keys) {
        assert.strictEqual(object1[key], object2[key])
    }
}

function evensFilter(_, index) {
    return !(index%2)
}

function oddsFilter(_, index) {
    return !!(index%2)
}

describe('URIs', () => {
    it('should verify correctly formatted uris', () => {
        assert.doesNotThrow(() => {
            for (let uri of uris_to_pass) {
                decodeURI(uri)
            }
        })
    })

    it('should throw for incorrectly formatted uris', () => {
        for (let uri of uris_to_fail) {
            assert.throws(() => {
                decodeURI(uri)
            })
        }
    })

    it('should decode parameters correctly', () => {
        const justAccount = uris_to_pass.filter(evensFilter)

        justAccount.forEach((uri) => {
            const data = decodeURI(uri)
            const expected = {
                address: 'rfemvFrpCAPc4hUa1v8mPRYdmaCqR1iFpe'
            }
            compareKeys(data, expected, ['address'])
        })

        const withData = uris_to_pass.filter(oddsFilter)

        withData.forEach((uri) => {
            const data = decodeURI(uri)
            const expected = {
                address: 'rfemvFrpCAPc4hUa1v8mPRYdmaCqR1iFpe',
                amount: '10',
                currency: 'xrp'
            }
            compareKeys(data, expected, ['address'])
        })
    })
})
