"use strict"
const Servicecategory = require("../service/service-category");
const getCloud = require("../amqp/amqp-core").getCloud;
const AmqpProducer = require("../amqp/amqp-reducer");
const AmqpConsumer = require("../amqp/amqp-consumer");
const configQueue = require("../config/config-queue");

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
     * @returns 
     */
    async createCategory(req, res, next) {
        let { title, description } = req.body;
        // let { files } = req;
        // let thumbs = [];

        let CONNECT = getCloud();
        let REDUCER = configQueue.PRODUCT.CATEGORY.REDUCER_CATEGORY;
        // let CONSUMER = configQueue.AUTH.ALL_ROLE.COMSUMER_ALL_ROLE;

        await AmqpProducer.producer(CONNECT, REDUCER, JSON.stringify({title, description, thumbs: ['text']}));

        // if(files.length) {
        //     files.forEach((thumb) => {
        //         thumbs.push(thumb.path)
        //     })
        // }

        // let category = await Servicecategory.createCategory({title, description, thumbs});

        // await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
        //     let { roles } = information;
        //     return res.status(200).json({status: true, roles});
        // })
        
        // if(!category) return res.status(500).json({status: false, message: 'Create category unsuccess'});
        return res.status(200).json({status: true, message: 'Create category success'});
    }

    /**
     * UPDATE CATEGORY
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async updateCategory(req, res, next) {
        let { id, title, description } = req.body;
        let { files } = req;

        let thumbs = [];

        if(files.length) {
            files.forEach((thumb) => {
                thumbs.push(thumb.path)
            })
        }

        let { status } = await Servicecategory.updateCategory({id, title, description, thumbs});
        if(!status) {
            return res.status(400).json({status: false, message: 'Update category unsuccess'});
        }
        return res.status(200).json({status: true, message: 'Update category success'});
    }


    /**
     * DELETE CATEGORY
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async deleteCategory(req, res, next) {
        let { id } = req.body;
        let { status } = await Servicecategory.deleteCategory({id});
        
        if(!status) {
            return res.status(400).json({status: false, message: 'Delete category unsuccess'});
        }
        return res.status(200).json({status: true, message: 'Delete category success'});
    }
}

module.exports = new ControllerCategory();