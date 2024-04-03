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
        let { files } = req;
        let thumbs = [];
        if(files.length) {
            files.forEach((thumb) => {
                thumbs.push(thumb.path)
            })
        }
        return res.status(200).json({status: true, message: 'Upload thumb category', thumbs});
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
        let { thumbs } = req.body;
        let { status, message } = await Servicecategory.deleteThumbsCategory({thumbs});
        
        if(!status) {
            return res.status(400).json({status: false, message});
        }
        return res.status(200).json({status: true, message});
    }
}

module.exports = new ControllerCategory();