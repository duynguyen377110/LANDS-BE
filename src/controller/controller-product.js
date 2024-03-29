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
     * UPDATE PRODUCT
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async updateProduct(req, res, next) {
        console.log(req.body);
        let {id, productOwner, address, contact, landArea, price, category} = req.body;
        let { files } = req;

        let thumbs = [];
        if(files.length) {
            files.forEach((thumb) => {
                thumbs.push(thumb.path);
            })
        }

        let { status } = await ServiceProduct.updateProduct({
            id, productOwner, address,
            contact, landArea, price, category,
            thumbs
        });

        if(!status) {
            return res.status(400).json({status: true, message: 'Update product unsuccess'});
        }
        return res.status(200).json({status: true, message: 'Update product success'});
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