"use strict"
const ModelUser = require("../model/model-user");

class ServiceQueryUser {

    constructor() { }

    /**
     * GET ALL USER
     * @returns 
     */
    async getAll() {
        try {
            return await ModelUser
                        .find({})
                        .populate([
                            {
                                path: 'role'
                            }
                        ])
                        .lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * GET USER BY E-MAIL
     * @param {*} email 
     * @returns 
     */
    async getUserByEmail(email = '') {
        try {
            return await ModelUser.findOne({email: {$eq: email}}).lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * GET USER BY INFOR.ID
     * @param {*} infor  = {id}
     * @returns 
     */
    async getUserById(infor={}) {
        try {
            return await ModelUser
                        .findById(infor.id)
                        .populate([
                            {
                                path: 'role'
                            }
                        ])
                        .lean();
        } catch (error) {
            throw error
        }
    }

}

module.exports = new ServiceQueryUser();