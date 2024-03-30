"use strict"
const ServiceRole = require("../service/service-role");

class ControllerRole {

    constructor() { }

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
}

module.exports = new ControllerRole();