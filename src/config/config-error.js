"use strict"

const config = {
    badrequest: {
        status: 400,
        message: "Bad request"
    },
    notFound: {
        status: 404,
        message: "Not found"
    },
    conflict: {
        status: 409,
        message: "Conflic error"
    },
    forbidden: {
        status: 403,
        message: 'Forbidden error'
    },
    failedDependency: {
        status: 424,
        message: "Failed dependency"
    },
    lengthRequired: {
        status: 411,
        message: "Length required"
    },
    internalServer: {
        status: 500,
        message: "Internal server error"
    }
}

module.exports = config