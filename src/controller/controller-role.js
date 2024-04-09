"use strict"
const getCloud = require("../amqp/amqp-core").getCloud;
const AmqpProducer = require("../amqp/amqp-reducer");
const AmqpConsumer = require("../amqp/amqp-consumer");
const configQueue = require("../config/config-queue");
const { validationResult } = require("express-validator");
const { BadRequestError } = require("../core/core-error");
const { Ok, Created, Accepted } = require("../core/core-sucess");

class ControllerRole {

    constructor() { }

    /**
     * GET ALL ROLE
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getAllRole(req, res, next) {
        let CONNECT = getCloud();
        let REDUCER_ROLE = configQueue.AUTH.ALL_ROLE.REDUCER_ALL_ROLE;
        let CONSUMER = configQueue.AUTH.ALL_ROLE.COMSUMER_ALL_ROLE;

        await AmqpProducer.producer(CONNECT, REDUCER_ROLE, JSON.stringify({status: true}));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { roles } = information;

            let metadata = {
                roles
            }
            new Ok("Get roles success").response(res, metadata);
        })
    }

    /**
     * GET ROLE BY ID
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async getRoleById(req, res, next) {
        let { id } = req.params;
        
        let CONNECT = getCloud();
        let REDUCER_ROLE = configQueue.AUTH.GET_ROLE_BY_ID.REDUCER_GET_ROLE_BY_ID;
        let CONSUMER = configQueue.AUTH.GET_ROLE_BY_ID.COMSUMER_GET_ROLE_BY_ID;

        await AmqpProducer.producer(CONNECT, REDUCER_ROLE, JSON.stringify({id}));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { role } = information;

            let metadata = {
                role
            }
            new Ok("Get role success").response(res, metadata);
        })
    }

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

        let { title } = req.body;
        let CONNECT = getCloud();
        let REDUCER_ROLE = configQueue.AUTH.ROLE.REDUCER_ROLE;
        let CONSUMER = configQueue.AUTH.ROLE.COMSUMER_ROLE;

        await AmqpProducer.producer(CONNECT, REDUCER_ROLE, JSON.stringify({title}));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;

            if(!status) throw new BadRequestError(message)
            new  Created(message).response(res);
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
        
        let { id, title } = req.body;
        let CONNECT = getCloud();
        let REDUCER_ROLE = configQueue.AUTH.UPDATE_ROLE.REDUCER_UPDATE_ROLE;
        let CONSUMER = configQueue.AUTH.UPDATE_ROLE.COMSUMER_UPDATE_ROLE;

        await AmqpProducer.producer(CONNECT, REDUCER_ROLE, JSON.stringify({id, title}));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;

            if(!status) throw new BadRequestError(message)
            new Accepted(message).response(res);
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
            new Accepted(message).response(res);
        })
    }
}

module.exports = new ControllerRole();