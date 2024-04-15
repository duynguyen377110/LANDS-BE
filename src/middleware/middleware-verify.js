"use strict"
const ServiceUser = require("../service/service-user");
const { ConflictError, NotFound } = require("../core/core-error");

class MiddlewareVerify {

    constructor() { }

    /**
     * CHECK USER EXIST BY EMAIL
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async emailExist(req, res, next) {
        let { email } = req.body;
        let user = await ServiceUser.getUserByEmail(email);
        if(user) {
            throw new ConflictError("E-mail already exist");
        }
        next();
    }

    /**
     * CHECK USER ACCOUNT EXIST
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async userExist(req, res, next) {
        let { email } = req.body;
        let user = await ServiceUser.getUserByEmail(email);
        if(!user) {
            throw new NotFound("Not found user");
        }
        req.user = user;
        next();
    }
}

module.exports = new MiddlewareVerify();