"use strict"
const { validationResult } = require("express-validator");
const getCloud = require("../../amqp/amqp-core").getCloud;
const AmqpProducer = require("../../amqp/amqp-reducer");
const AmqpConsumer = require("../../amqp/amqp-consumer");
const configQueue = require("../../config/config-queue");
const { BadRequestError } = require("../../core/core-error");
const { Created, Accepted } = require("../../core/core-sucess");

class ControllerAdminRole {

    constructor() { }

    /**
     * CREATE ROLE
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async createRole(req, res, next) {
        const error = validationResult(req);
        if (!error.isEmpty()) throw new BadRequestError(error.array()[0].msg)

        let { title, slug } = req.body;
        let CONNECT = getCloud();
        let REDUCER_ROLE = configQueue.AUTH.ROLE.REDUCER_ROLE;
        let CONSUMER = configQueue.AUTH.ROLE.COMSUMER_ROLE;

        await AmqpProducer.producer(CONNECT, REDUCER_ROLE, JSON.stringify({title, slug}));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;

            if(!status) throw new BadRequestError(message)
            return new  Created(message).response(res);
        })
    }

    /**
     * UPDATE ROLE
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async updateRole(req, res, next) {
        let error = validationResult(req);
        if (!error.isEmpty()) throw new BadRequestError(error.array()[0].msg)
        
        let { id, title, slug } = req.body;
        let CONNECT = getCloud();
        let REDUCER_ROLE = configQueue.AUTH.UPDATE_ROLE.REDUCER_UPDATE_ROLE;
        let CONSUMER = configQueue.AUTH.UPDATE_ROLE.COMSUMER_UPDATE_ROLE;

        await AmqpProducer.producer(CONNECT, REDUCER_ROLE, JSON.stringify({id, title, slug}));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;

            if(!status) throw new BadRequestError(message)
            return new Accepted(message).response(res);
        })
    }

    /**
     * DELETE ROLE
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async deleteRole(req, res, next) {
        let error = validationResult(req);
        if (!error.isEmpty()) throw new BadRequestError(error.array()[0].msg)

        let { id } = req.body;
        let CONNECT = getCloud();
        let REDUCER_ROLE = configQueue.AUTH.DELETE_ROLE.REDUCER_DELETE_ROLE;
        let CONSUMER = configQueue.AUTH.DELETE_ROLE.COMSUMER_DELETE_ROLE;

        await AmqpProducer.producer(CONNECT, REDUCER_ROLE, JSON.stringify({id}));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;

            if(!status) throw new BadRequestError(message)
            return new Accepted(message).response(res);
        })
    }
}

module.exports = new ControllerAdminRole();