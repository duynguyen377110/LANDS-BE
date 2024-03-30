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
     * CREATE ROLE
     * @param {*} infor 
     * @returns 
     */
    async createRole(infor = {}) {
        try {
            return await ModelRole.create({title: infor.title});
        } catch (error) {
            throw error;
        }
    }

    /**
     * DELETE ROLE
     * @param {*} infor 
     * @returns 
     */
    async deleteRole(infor = {}) {
        try {
            await ModelRole.findOneAndDelete({_id: {$eq: infor.id}});
            return { status: true, message: 'Delete role success'};
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ServiceRole();