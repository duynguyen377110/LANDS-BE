"use strict"
const ServiceQueryRole = require("../../service/service-query-role");
const { Ok } = require("../../core/core-sucess");

class ControllerCommonRole {

    constructor() { }

    /**
     * GET ALL ROLE
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getAll(req, res, next) {
        let roles = await ServiceQueryRole.getAll();
        return new Ok().response(res, {roles});
    }

    /**
     * GET ROLE BY ID
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async getRoleById(req, res, next) {
        let { id } = req.params;
        let role = await ServiceQueryRole.getRoleById({id});
        return new Ok().response(res, {role});
    }
}

module.exports = new ControllerCommonRole();