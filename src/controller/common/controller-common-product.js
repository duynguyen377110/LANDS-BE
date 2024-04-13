"use strict"
const ServiceProduct = require("../../service/service-product");
const { Ok } = require("../../core/core-sucess");

class ControllerCommonProduct {

    constructor() { }

    /**
     * GET AMOUNT PRODUCT
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getAmountProduct(req, res, next) {
        let amount = await ServiceProduct.getAmountProduct();
        return new Ok().response(res, {amount});
    }

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
     * GET PRODUCT WITH QUANTITY
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getProductLimit(req, res, next) {
        let { start, limit } = req.params;
        let products = await ServiceProduct.getProductLimit(start, limit);
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