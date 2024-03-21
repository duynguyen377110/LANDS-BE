"use strict"
const crypto = require('crypto');

class UtilCrypto {

    constructor() { }

    generateKeyPairSync() {
        return crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        })
    }
}

module.exports = new UtilCrypto();