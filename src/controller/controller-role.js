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
            return new Ok("Get roles success").response(res, metadata);
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
            return new Ok("Get role success").response(res, metadata);
        })
    }
}

module.exports = new ControllerRole();