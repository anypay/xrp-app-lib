class XError extends Error {
    constructor(message) {
        super(message)
        this.message = message
        Error.captureStackTrace(this, this.constructor)
    }
}

export class InvalidPrivateKey extends Error {
    constructor(message) {
        super(message)
        this.type = 'InvalidPrivateKey'
    }
}

export class InvalidPublicKey extends Error {
    constructor(message) {
        super(message)
        this.type = 'InvalidPublicKey'
    }
}

