"use strict"
const Servicecategory = require("../service/service-category");
const getCloud = require("../amqp/amqp-core").getCloud;
const AmqpProducer = require("../amqp/amqp-reducer");
const AmqpConsumer = require("../amqp/amqp-consumer");
const configQueue = require("../config/config-queue");
const { BadRequestError } = require("../core/core-error");
const { Created } = require("../core/core-sucess");

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
        let count = await Servicecategory.getAmount();
        return res.status(200).json({status: true, count});
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

        // let CONNECT = getCloud();
        // let REDUCER_ROLE = configQueue.AUTH.DELETE_ROLE.REDUCER_DELETE_ROLE;
        // let CONSUMER = configQueue.AUTH.DELETE_ROLE.COMSUMER_DELETE_ROLE;

        // await AmqpProducer.producer(CONNECT, 'PRODUCT-NEW-CATEGORY', JSON.stringify({status: true, message: 'Text new product'}));
        // await AmqpConsumer.consumer(CONNECT, 'REFLY-PRODUCT-NEW-CATEGORY', (information) => {
        //     console.log(information);

        //     // if(!status) throw new BadRequestError(message)
        //     // new Accepted(message).response(res);
        // })
        return res.status(200).json({status: true, categories});
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
        return res.status(200).json({
            status: true,
            category: await Servicecategory.getCategoryById({id})
        })
    }

    /**
     * CREATE CATEGORY
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async createCategory(req, res, next) {
        let CONNECT = getCloud();
        let { title, description } = req.body;
        let { files } = req;

        let PRODUCER = configQueue.CATEGORY.NEW.PRODUCER;
        let CONSUMER = configQueue.CATEGORY.NEW.CONSUMER;

        let thumbs = [];

        if(files.length) {
            files.forEach((thumb) => {
                thumbs.push(thumb.path)
            })
        }

        let payload = {title, description, thumbs};

        await AmqpProducer.producer(CONNECT, PRODUCER, JSON.stringify(payload));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;
            if(!status) throw new BadRequestError(message)
            new Created(message).response(res);
        })
    }


    async deleteCategry(req, res, next) {
        let CONNECT = getCloud();
        let { id } = req.body;

        let PRODUCER = configQueue.CATEGORY.DELETE.PRODUCER;
        let CONSUMER = configQueue.CATEGORY.DELETE.CONSUMER;

        let payload = {id};

        await AmqpProducer.producer(CONNECT, PRODUCER, JSON.stringify(payload));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, async (information) => {
            let { status, message, thumbs } = information;
            let { status: statusFinal, message: messageFinal } = await Servicecategory.deleteThumbsCategory({thumbs});
            if(!status || !statusFinal) throw new BadRequestError(message)
            new Created(messageFinal).response(res);
        })
    }

    /**
     * UPLOAD CATEGORY THUMB
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async uploadCategoryThumb(req, res, next) {
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
     * DELETE CATEGORY THUMB
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async deleteCategoryThumb(req, res, next) {
        let { thumbs } = req.body;
        let { status, message } = await Servicecategory.deleteThumbsCategory({thumbs});
        return res.status(200).json({status, message});
    }
}

module.exports = new ControllerCategory();