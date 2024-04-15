"use strict"

const ModelRole = require("../model/model-role");

class ServiceQueryRole {

    constructor() { }

    /**
     * GET ROLE AMOUNT
     * @returns 
     */
    async getAmount() {
        try {
            return await ModelRole.find().count().lean();

        } catch (error) {
            throw new InternalServerError(error.message);
        }
    }

    /**
     * GET ALL ROLE
     * @returns 
     */
    async getAll() {
        try {
            return await ModelRole.find({}).lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * GET ALL ROLE BY ID
     * @param {*} infor 
     * @returns 
     */
    async getRoleById(infor={}) {
        try {
            return await ModelRole.findById(infor.id).lean();
        } catch (error) {
            throw error
        }
    }

}

module.exports = new ServiceQueryRole();