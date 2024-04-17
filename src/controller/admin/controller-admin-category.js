"use strict"
const { validationResult } = require("express-validator");
const Servicecategory = require("../../service/service-category");
const getCloud = require("../../amqp/amqp-core").getCloud;
const AmqpProducer = require("../../amqp/amqp-reducer");
const AmqpConsumer = require("../../amqp/amqp-consumer");
const configQueue = require("../../config/config-queue");
const { BadRequestError, MethodNotAllowed } = require("../../core/core-error");
const { Created, Accepted } = require("../../core/core-sucess");

class ControllerAdminCategory {

    constructor() { }

    /**
     * CREATE CATEGORY
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async createCategory(req, res, next) {
        let error = validationResult(req);
        if (!error.isEmpty()) throw new BadRequestError(error.array()[0].msg)

        let CONNECT = getCloud();
        let { title, description } = req.body;
        let { thumbs } = req;

        let PRODUCER = configQueue.CATEGORY.NEW.PRODUCER;
        let CONSUMER = configQueue.CATEGORY.NEW.CONSUMER;

        let payload = {title, description, thumbs};

        await AmqpProducer.producer(CONNECT, PRODUCER, JSON.stringify(payload));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;
            if(!status) throw new BadRequestError(message)
            return new Created(message).response(res);
        })
    }

    /**
     * UPDATE CATEGORY
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async updateCategory(req, res, next) {
        let error = validationResult(req);
        if (!error.isEmpty()) throw new BadRequestError(error.array()[0].msg)

        let CONNECT = getCloud();
        let { id, title, description } = req.body;
        let { thumbs } = req;

        let PRODUCER = configQueue.CATEGORY.UPDATE.PRODUCER;
        let CONSUMER = configQueue.CATEGORY.UPDATE.CONSUMER;

        let payload = {id, title, description, thumbs};

        await AmqpProducer.producer(CONNECT, PRODUCER, JSON.stringify(payload));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;
            if(!status) throw new BadRequestError(message)
            return new Accepted(message).response(res);
        })
    }

    /**
     * DELETE CATEGORY
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async deleteCategry(req, res, next) {
        let error = validationResult(req);
        if (!error.isEmpty()) throw new BadRequestError(error.array()[0].msg)
    
        let { id } = req.body;
        let category = await Servicecategory.getCategoryById({id});
        if(category.products.length) throw new MethodNotAllowed();

        let CONNECT = getCloud();
        let PRODUCER = configQueue.CATEGORY.DELETE.PRODUCER;
        let CONSUMER = configQueue.CATEGORY.DELETE.CONSUMER;

        let payload = {id};

        await AmqpProducer.producer(CONNECT, PRODUCER, JSON.stringify(payload));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, async (information) => {
            let { status, message, thumbs } = information;
            let { status: statusFinal, message: messageFinal } = await Servicecategory.deleteThumbsCategory({thumbs});
            if(!status || !statusFinal) throw new BadRequestError(message)
            return new Created(messageFinal).response(res);
        })
    }
}

module.exports = new ControllerAdminCategory();