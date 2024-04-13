"use strict"
const ModelUser = require("../model/model-user");

class ServiceQueryUser {

    constructor() { }

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