"use strict"
const config = require("../config/config-success");

class CoreSuccess {

    constructor(message, statusCode) {
        this.message = message,
        this.statusCode = statusCode
    }

    response(request, metadata = {}, options = {}) {
        return request.status(this.statusCode).json({
            message: this.message,
            metadata: metadata,
            options: options,
            statusCode: this.statusCode,
            status: true
        })
    }
}

class Ok extends CoreSuccess {
    constructor (message = config.ok.message, statusCode = config.ok.statusCode) {
        super(message, statusCode)
    }
}

class Created extends CoreSuccess {
    constructor (message = config.created.message, statusCode = config.created.statusCode) {
        super(message, statusCode)
    }
}

class Accepted extends CoreSuccess {
    constructor (message = config.accepted.message, statusCode = config.accepted.statusCode) {
        super(message, statusCode)
    }
}

module.exports = {
    Accepted,
    Created,
    Ok
}