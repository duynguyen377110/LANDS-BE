"use strict"
const ModelRole = require("../model/model-role");

class ServiceRole {

    constructor() { }

    /**
     * GET ALL ROLE
     * @returns 
     */
    async getAllRole() {
        try {
            return await ModelRole.find({}).lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * GET ROLE BY ID
     * @param {*} id 
     * @returns 
     */
    async getRoleById(id = '') {
        try {
            return await ModelRole.findById(id).lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * FIND ROLE BY ID
     * @param {*} id 
     * @returns 
     */
    async findRoleById(id = '') {
        try {
            return await ModelRole.findById(id);
        } catch (error) {
            throw error;
        }
    }

    /**
     * FIND ROLE BY NAME
     * @param {*} name 
     * @returns 
     */
    async findRoleByName(name = '') {
        try {
            return await ModelRole.findOne({title: {$eq: name}}).exec();

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ServiceRole();