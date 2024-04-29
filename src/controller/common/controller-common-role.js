"use strict"
const ServiceQueryRole = require("../../service/service-role");
const { Ok } = require("../../core/core-sucess");

class ControllerCommonRole {

    constructor() { }

    /**
     * GET AMOUNT ROLE
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getAmount(req, res, next) {
        let amount = await ServiceQueryRole.getAmount();
        return new Ok().response(res, {amount});
    }

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
     * GET ROLE WITH QUANTITY
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getRoleLimit(req, res, next) {
        let { start, limit } = req.params;
        let roles = await ServiceQueryRole.getRoleLimit(start, limit);
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