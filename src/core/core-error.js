"use strict"
const config = require("../config/config-error");

class CoreError extends Error {
    constructor(message, status) {
        super(message)
        this.httpStatusCode = status;
    }
}

class BadRequest extends CoreError {
    constructor(message = config.badrequest.message, status = config.badrequest.status) {
        super(message, status)
    }
}

class ConflictError extends CoreError {
    constructor(message = config.conflict.message, status = config.conflict.status) {
        super(message, status)
    }
}

class ForbiddenError extends CoreError {
    constructor(message = config.forbidden.message, status = config.forbidden.status) {
        super(message, status)
    }
}

class FailedDependency extends CoreError {
    constructor(message = config.failedDependency.message, status = config.failedDependency.status) {
        super(message, status)
    }
}

class LengthRequired extends CoreError {
    constructor(message = config.lengthRequired.message, status = config.lengthRequired.status) {
        super(message, status)
    }
}

module.exports = {
    BadRequest,
    ConflictError,
    ForbiddenError,
    FailedDependency,
    LengthRequired
}