"use strict"
const ServiceUser = require("../service/service-user");
const ServiceCategory = require("../service/service-category");
const { ConflictError, NotFound, ForbiddenError } = require("../core/core-error");

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

    /**
     * CHECK HEADER ADMIN VALID
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async adminHeader(req, res, next) {
        let id = req.get("xxx-admin");
        if(!id) throw new ForbiddenError("Not permission")

        let user = await ServiceUser.getUserById({id});
        if(!user) throw new NotFound("Not found user")

        req.user = user;
        next();
    }

    /**
     * CHECK BODY ADMIN VALID
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async adminBody(req, res, next) {
        let { admin } = req.body;
        let { files } = req;

        let thumbs = [];

        if(files.length) {
            files.forEach((thumb) => {
                thumbs.push(thumb.path)
            })
        }

        if(!admin) {
            if(thumbs.length) {
                await ServiceCategory.deleteThumbsCategory({thumbs});
            }

            throw new ForbiddenError("Not permission");
        }

        let user = await ServiceUser.getUserById({id: admin});
        if(!user) {
            if(thumbs.length) {
                await ServiceCategory.deleteThumbsCategory({thumbs});
            }

            throw new NotFound("Not found user");
        }

        req.user = user;
        if(thumbs.length) {
            req.thumbs = thumbs;
        }
        next();
    }
}

module.exports = new MiddlewareVerify();