"use strict"
const ServiceProduct = require("../../service/service-product");
const { Ok } = require("../../core/core-sucess");

class ControllerCommonProduct {

    constructor() { }

    /**
     * GET ALL PRODUCT
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getAll(req, res, next) {
        let products = await ServiceProduct.getAll();
        return new Ok().response(res, {products});
    }

    /**
     * GET PRODUCT BY ID
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getProductById(req, res, next) {
        let { id } = req.params;
        let product = await ServiceProduct.getProductById(id);
        return new Ok().response(res, {product});
    }
}

module.exports = new ControllerCommonProduct();