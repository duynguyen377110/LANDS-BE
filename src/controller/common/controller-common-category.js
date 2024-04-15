"use strict"
const Servicecategory = require("../../service/service-category");
const { Ok } = require("../../core/core-sucess");

class ControllerCategory {

    constructor() { }

    /**
     * GET AMOUNT CATEGORY
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getAmount(req, res, next) {
        let amount = await Servicecategory.getAmount();
        return new Ok().response(res, {amount});
    }

    /**
     * GET ALL CATEGORY
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getAllCategory(req, res, next) {
        let categories = await Servicecategory.getAllCategory();
        return new Ok().response(res, {categories});
    }

    /**
     * GET CATEGORY BY ID
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getCategoryById(req, res, next) {
        let { id } = req.params;
        let category = await Servicecategory.getCategoryById({id})
        return new Ok().response(res, {category});
    }

}

module.exports = new ControllerCategory();