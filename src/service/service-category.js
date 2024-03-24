"use strict"
const ModelCategory = require("../model/model-category");

class ServiceCategory {

    constructor() { }

    async getAmount() {
        try {
            return await ModelCategory.find().count().lean();
        } catch (error) {
            throw error;
        }
    }

    async getAllCategory() {
        try {
            return await ModelCategory.find().lean();

        } catch (error) {
            throw error;
        }
    }

    async createCategory(infor = {}) {
        try {
            return await ModelCategory.create({
                title: infor.title,
                description: infor.description,
                thumbs: infor.thumbs
            })

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ServiceCategory();