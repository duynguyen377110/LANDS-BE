"use strict"
const ServiceUser = require("../service/service-user");

class ControllerUser {

    constructor() { }

    /**
     * GET ALL USER
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getAll(req, res, next) {
        let users = await ServiceUser.getAll();
        return res.status(200).json({status: true, message: 'Get all user', users});
    }

    /**
     * GET USER BY ID
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getUserById(req, res, next) {
        let { id } = req.params;
        let user = await ServiceUser.getUserById(id);
        return res.status(200).json({status: true, message: 'Get user success', user});
    }

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

    async updateUser(req, res, next) {
        let { id, fullName, email, phone, address, role } = req.body;
        let { status, message } = await ServiceUser.updateUser({id, fullName, email, phone, address, role});
        
        if(!status) {
            return res.status(400).json({status, message});
        }
        return res.status(200).json({status, message});
    }

    /**
     * DELETE USER
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async deleteUser(req, res, next) {
        let { id } = req.body;
        let { status, message } = await ServiceUser.deleteUser({id});

        if(!status) {
            return res.status(400).json({status, message});
        }
        return res.status(200).json({status, message});
    }
}

module.exports = new ControllerUser();