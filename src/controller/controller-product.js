"use strict"
const ServiceProduct = require("../service/service-product");

class ControllerProduct {

    constructor() { }

    async getAll(req, res, next) {
        let products = await ServiceProduct.getAll();
        return res.status(200).json({status: true, message: 'Get all product', products});
    }

    /**
     * CREATE PRODUCT
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async createProduct(req, res, next) {
        let { productOwner, address, contact, landArea, price, category } = req.body;
        let { files } = req;

        let thumbs = [];

        if(files.length) {
            files.forEach((thumb) => {
                thumbs.push(thumb.path);
            })
        }

        let { status } = await ServiceProduct.createProduct({
            productOwner, address, contact,
            landArea, price, category, thumbs
        })

        if(!status) {
            return res.status(400).json({status: false, message: 'Create product unsuccess'});
        }
        return res.status(200).json({status: true, message: 'Create product success'});

    }


    /**
     * DELETE PRODUCT
     * @param {*} req 
     * @param {*} res 
     * @param {*} next
     * @returns 
     */
    async deleteProduct(req, res, next) {
        let { id } = req.body;
        let { status } = await ServiceProduct.deleteProduct({id});
        if(!status) {
            return res.status(400).json({status: false, message: 'Destroy product unsuccess'});
        }
        return res.status(200).json({status: true, message: 'Destroy product success'});
    }
}

module.exports = new ControllerProduct();