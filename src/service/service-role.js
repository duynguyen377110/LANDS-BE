"use strict"
const ModelRole = require("../model/model-role");

class ServiceRole {

    constructor() { }

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
}

module.exports = new ServiceRole();