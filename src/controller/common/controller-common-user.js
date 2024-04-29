"use strict"
const ServiceQueryUser = require("../../service/service-user");
const { Ok } = require("../../core/core-sucess");

class ControllerCommonUser {

    constructor() { }

    /**
     * GET AMOUNT USER
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getAmount(req, res, next) {
        let amount = await ServiceQueryUser.getAmount();
        return new Ok().response(res, {amount});
    }

    /**
     * GET USER WITH QUANTITY
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getUserLimit(req, res, next) {
        let { start, limit } = req.params;
        let users = await ServiceQueryUser.getUserLimit(start, limit);
        return new Ok().response(res, {users});
    }

    /**
     * GET ALL ROLE
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getAll(req, res, next) {
        let users = await ServiceQueryUser.getAll();
        return new Ok().response(res, {users});
    }

    /**
     * GET ROLE BY ID
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async getUserById(req, res, next) {
        let { id } = req.params;
        let user = await ServiceQueryUser.getUserById({id});
        return new Ok().response(res, {user});
    }
}

module.exports = new ControllerCommonUser();