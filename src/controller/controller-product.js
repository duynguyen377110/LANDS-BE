"use strict"
const ServiceProduct = require("../service/service-product");

class ControllerProduct {

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
        return res.status(200).json({status: true, message: 'Get all product', products});
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
        return res.status(200).json({status: true, message: 'Get product success', product});
    }

    /**
     * UPLOAD PRODUCT THUMB
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async uploadProductThumb(req, res, next) {
        let { files } = req;
        let thumbs = [];
        if(files.length) {
            files.forEach((thumb) => {
                thumbs.push(thumb.path)
            })
        }
        return res.status(200).json({status: true, message: 'Upload thumbs', thumbs});
    }

    /**
     * DELETE PRODUCT THUMB
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async deleteProductThumb(req, res, next) {
        let { thumbs } = req.body;
        let { status, message } = await ServiceProduct.deleteThumbsProduct({thumbs});
        return res.status(200).json({status, message});
    }
}

module.exports = new ControllerProduct();