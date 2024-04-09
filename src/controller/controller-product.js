"use strict"
const ServiceProduct = require("../service/service-product");
const getCloud = require("../amqp/amqp-core").getCloud;
const AmqpProducer = require("../amqp/amqp-reducer");
const AmqpConsumer = require("../amqp/amqp-consumer");
const configQueue = require("../config/config-queue");
const { BadRequestError } = require("../core/core-error");
const { Created, Accepted } = require("../core/core-sucess");

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
     * UPDATE PRODUCT
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async updateProduct(req, res, next) {
        let CONNECT = getCloud();
        let {id, productOwner, address, contact, landArea, price, category} = req.body;
        let { files } = req;

        let PRODUCER = configQueue.PRODUCT.UPDATE.PRODUCER;
        let CONSUMER = configQueue.PRODUCT.UPDATE.CONSUMER;

        let thumbs = [];
        if(files.length) {
            files.forEach((thumb) => {
                thumbs.push(thumb.path);
            })
        }

        let payload = {id, productOwner, address, contact, landArea, price, category, thumbs};

        await AmqpProducer.producer(CONNECT, PRODUCER, JSON.stringify(payload));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;

            if(!status) throw new BadRequestError(message)
            return new Created(message).response(res);
        })
    }

    /**
     * DELETE PRODUCT
     * @param {*} req 
     * @param {*} res 
     * @param {*} next
     * @returns 
     */
    async deleteProduct(req, res, next) {
        let CONNECT = getCloud();
        let { id } = req.body;

        let PRODUCER = configQueue.PRODUCT.DELETE.PRODUCER;
        let CONSUMER = configQueue.PRODUCT.DELETE.CONSUMER;

        let payload = { id };

        await AmqpProducer.producer(CONNECT, PRODUCER, JSON.stringify(payload));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, async(information) => {
            let { status, message, thumbs } = information;
            let { status: statusFinal, message: messageFinal } = await ServiceProduct.deleteThumbsProduct({thumbs});

            if(!status || !statusFinal) throw new BadRequestError(message)
            return new Accepted(messageFinal).response(res);
        })
    }
}

module.exports = new ControllerProduct();