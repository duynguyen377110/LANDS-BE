"use strict"
const ServiceUser = require("../service/service-user");

class ControllerUser {

    constructor() { }

    /**
     * CREATE USER
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async createUser(req, res, next) {
        let { fullName, email, password, phone, address, role } = req.body;
        let { status, message } = await ServiceUser.createUser({ fullName, email, password, phone, address, role });
        
        if(!status) {
            return res.status(400).json({status, message});
        }
        return res.status(200).json({status, message});
    }
}

module.exports = new ControllerUser();