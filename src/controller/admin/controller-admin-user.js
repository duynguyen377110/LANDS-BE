"use strict"
const { validationResult } = require("express-validator");
const getCloud = require("../../amqp/amqp-core").getCloud;
const configQueue = require("../../config/config-queue");
const AmqpProducer = require("../../amqp/amqp-reducer");
const AmqpConsumer = require("../../amqp/amqp-consumer");
const { BadRequestError } = require("../../core/core-error");
const { Ok, Created, Accepted } = require("../../core/core-sucess");

class ControllerAdminUser {

    constructor() { }

    /**
     * CREATE USER
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async createUser(req, res, next) {
        const error = validationResult(req);
        if (!error.isEmpty()) throw new BadRequestError(error.array()[0].msg)

        let CONNECT = getCloud();
        let REDUCER = configQueue.AUTH.USER.REDUCER_USER;
        let CONSUMER = configQueue.AUTH.USER.COMSUMER_USER;
        let { fullName, email, password, phone, address, role } = req.body;

        await AmqpProducer.producer(CONNECT, REDUCER, JSON.stringify({ fullName, email, password, phone, address, role}));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;

            if(!status) throw new BadRequestError(message)
            return new Created(message).response(res);
        })
    }

    /**
     * UPDATE USER
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async updateUser(req, res, next) {
        const error = validationResult(req);
        if (!error.isEmpty()) throw new BadRequestError(error.array()[0].msg)

        let CONNECT = getCloud();
        let REDUCER = configQueue.AUTH.UPDATE_USER.REDUCER_UPDATE_USER;
        let CONSUMER = configQueue.AUTH.UPDATE_USER.COMSUMER_UPDATE_USER;
        let {id, fullName, email, phone, address, role} = req.body;

        await AmqpProducer.producer(CONNECT, REDUCER, JSON.stringify({id, fullName, email, phone, address, role}));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;

            if(!status) throw new BadRequestError(message)
            return new Accepted(message).response(res);
        })
    }

    /**
     * DELETE USER
     * @param {*} req 
     * @param {*} res 
     * @param {*} next
     * @returns 
     */
    async deleteUser(req, res, next) {
        const error = validationResult(req);
        if (!error.isEmpty()) throw new BadRequestError(error.array()[0].msg)

        let CONNECT = getCloud();
        let REDUCER = configQueue.AUTH.DELETE_USER.REDUCER_DELETE_USER;
        let CONSUMER = configQueue.AUTH.DELETE_USER.COMSUMER_DELETE_USER;
        let { id } = req.body;

        await AmqpProducer.producer(CONNECT, REDUCER, JSON.stringify({id}));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;

            if(!status) throw new BadRequestError(message)
            return new Accepted(message).response(res);
        })
    }
}

module.exports = new ControllerAdminUser();