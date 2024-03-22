"use strict"
const ModelCategory = require("../model/model-category");

class ServiceCategory {

    constructor() { }


    async createCategory(infor = {}) {
        try {
            return await ModelCategory.create({
                title: infor.title,
                description: infor.description
            })

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ServiceCategory();