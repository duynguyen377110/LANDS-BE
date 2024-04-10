"use strict"
const { validationResult } = require("express-validator");
const configQueue = require("../config/config-queue");
const AmqpProducer = require("../amqp/amqp-reducer");
const AmqpConsumer = require("../amqp/amqp-consumer");
const getCloud = require("../amqp/amqp-core").getCloud;
const { BadRequestError } = require("../core/core-error");
const { Ok, Created, Accepted } = require("../core/core-sucess");

class ControllerUser {

    constructor() { }

    /**
     * GET ALL USER
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getAll(req, res, next) {
        let CONNECT = getCloud();
        let REDUCER = configQueue.AUTH.ALL_USER.REDUCER_ALL_USER;
        let CONSUMER = configQueue.AUTH.ALL_USER.COMSUMER_ALL_USER;

        await AmqpProducer.producer(CONNECT, REDUCER, JSON.stringify({type: true}));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message, users } = information;

            if(!status) throw new BadRequestError(message)

            let metadata = {
                users
            }
            return new Ok(message).response(res, metadata)
        })
    }

    /**
     * GET USER BY ID
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getUserById(req, res, next) {
        let CONNECT = getCloud();
        let REDUCER = configQueue.AUTH.GET_USER_BY_ID.REDUCER_GET_USER_BY_ID;
        let CONSUMER = configQueue.AUTH.GET_USER_BY_ID.COMSUMER_GET_USER_BY_ID;
        let { id } = req.params;

        await AmqpProducer.producer(CONNECT, REDUCER, JSON.stringify({id}));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message, user } = information;

            if(!status) throw new BadRequestError(message)

            let metadata = {
                user
            }
            return new Ok(message).response(res, metadata)
        })
    }
}

module.exports = new ControllerUser();