"use strict"
const ServiceRole = require("../service/service-role");
const getCloud = require("../amqp/amqp-core").getCloud;
const AmqpProducer = require("../amqp/amqp-reducer");
const AmqpConsumer = require("../amqp/amqp-consumer");
const configQueue = require("../config/config-queue");

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
        let roles = await ServiceRole.getAllRole();
        return res.status(200).json({status: true, message: 'Get all role', roles});
    }

    async getRoleById(req, res, next) {
        let { id } = req.params;
        let role = await ServiceRole.getRoleById(id);
        return res.status(200).json({status: true, message: 'Get role success', role});
    }

    /**
     * CREATE ROLE
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async createRole(req, res, next) {
        let { title } = req.body;

        let CONNECT = getCloud();
        let REDUCER_ROLE = configQueue.AUTH.ROLE.REDUCER_ROLE;
        let CONSUMER = configQueue.AUTH.ROLE.COMSUMER_ROLE;

        await AmqpProducer.producer(CONNECT, REDUCER_ROLE, JSON.stringify({title}));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;

            if(!status) {
                return res.status(400).json({status, message});
            }
            return res.status(200).json({status, message});
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
        let { id, title } = req.body;
        let { status, message } = await ServiceRole.updateRole({id, title});

        if(!status) {
            return res.status(400).json({status, message});
        }

        return res.status(200).json({status, message});
    }

    /**
     * DELETE ROLE
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async deleteRole(req, res, next) {
        let { id } = req.body;

        let CONNECT = getCloud();
        let REDUCER_DELETE_ROLE = configQueue.AUTH.DELETE_ROLE.REDUCER_DELETE_ROLE;
        let CONSUMER = configQueue.AUTH.DELETE_ROLE.COMSUMER_DELETE_ROLE;

        await AmqpProducer.producer(CONNECT, REDUCER_DELETE_ROLE, JSON.stringify({id}));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;

            if(!status) {
                return res.status(400).json({status, message});
            }
            return res.status(200).json({status, message});
        })
    }
}

module.exports = new ControllerRole();