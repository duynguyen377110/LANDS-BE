"use strict"
const { ForbiddenError } = require("../core/core-error");
const config = require("../config/config");

class MiddlewareAuth {

    constructor() { }

    /**
     * CHECK USER PERMISSION
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async permission(req, res, next) {
        let { user } = req;
        if(!config.permission.admin.includes(user.role.slug)) {
            throw new ForbiddenError("Account not permission");
        }
        next();
    }
}

module.exports = new MiddlewareAuth();