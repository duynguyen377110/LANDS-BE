"use strict"

class MiddlewareException {

    constructor() { }

    except = (fn) => {
        return (req, res, next) => {
            fn(req, res, next).catch((error) =>next(error))
        }
    }
}

module.exports = new MiddlewareException();