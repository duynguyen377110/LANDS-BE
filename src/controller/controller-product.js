"use strict"
const ServiceProduct = require("../service/service-product");
const getCloud = require("../amqp/amqp-core").getCloud;
const AmqpProducer = require("../amqp/amqp-reducer");
const AmqpConsumer = require("../amqp/amqp-consumer");
const configQueue = require("../config/config-queue");
const { BadRequestError } = require("../core/core-error");
const { Created } = require("../core/core-sucess");

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
        let CONNECT = getCloud();
        let { productOwner, address, contact, landArea, price, category } = req.body;
        let { files } = req;

        let PRODUCER = configQueue.PRODUCT.NEW.PRODUCER;
        let CONSUMER = configQueue.PRODUCT.NEW.CONSUMER;

        let thumbs = [];

        if(files.length) {
            files.forEach((thumb) => {
                thumbs.push(thumb.path)
            })
        }

        let payload = {productOwner, address, contact, landArea, price, category, thumbs};

        await AmqpProducer.producer(CONNECT, PRODUCER, JSON.stringify(payload));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;

            if(!status) throw new BadRequestError(message)
            return new Created(message).response(res);
        })
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