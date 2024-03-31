"use strict"
const ServiceRole = require("../service/service-role");

class ControllerRole {

    constructor() { }

    /**
     * GET ALL ROLE
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getAllRole(req, res, next) {
        let roles = await ServiceRole.getAllRole();
        return res.status(200).json({status: true, message: 'Get all role', roles});
    }

    async getRoleById(req, res, next) {
        let { id } = req.params;
        let role = await ServiceRole.getRoleById(id);
        return res.status(200).json({status: true, message: 'Get role success', role});
    }

    /**
     * CREATE ROLE
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async createRole(req, res, next) {
        let { title } = req.body;
        let role = await ServiceRole.createRole({title});

        if(!role) {
            return res.status(400).json({status: 400, message: 'Create role unsuccess'});
        }

        return res.status(200).json({status: 200, message: 'Create role success'});
    }

    /**
     * UPDATE ROLE
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async updateRole(req, res, next) {
        let { id, title } = req.body;
        let { status, message } = await ServiceRole.updateRole({id, title});

        if(!status) {
            return res.status(400).json({status, message});
        }

        return res.status(200).json({status, message});
    }

    /**
     * DELETE ROLE
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async deleteRole(req, res, next) {
        let { id } = req.body;
        let { status } = await ServiceRole.deleteRole({id});
        if(!status) {
            return res.status(400).json({status: false, message: 'Delete role unsuccess'});
        }
        return res.status(200).json({status: true, message: 'Delete role success'});
    }
}

module.exports = new ControllerRole();