"use strict"

const ModelRole = require("../model/model-role");

class ServiceQueryRole {

    constructor() { }

    async getAll() {
        try {
            return await ModelRole.find({}).lean();
        } catch (error) {
            throw error;
        }
    }

    async getRoleById(infor={}) {
        try {
            return await ModelRole.findById(infor.id).lean();
        } catch (error) {
            throw error
        }
    }

}

module.exports = new ServiceQueryRole();