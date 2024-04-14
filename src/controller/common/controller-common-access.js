"use strict"
const getCloud = require("../../amqp/amqp-core").getCloud;
const configQueue = require("../../config/config-queue");
const AmqpProducer = require("../../amqp/amqp-reducer");
const AmqpConsumer = require("../../amqp/amqp-consumer");
const { Ok } = require("../../core/core-sucess");

class ControllerCommonAccess {

    constructor() { }

    /**
     * CLIENT SIGNUP ACCOUNT
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async signup(req, res, next) {
        let CONNECT = getCloud();
        let REDUCER = configQueue.AUTH.SIGNUP.REDUCER_SIGNUP;
        let CONSUMER = configQueue.AUTH.SIGNUP.COMSUMER_SIGNUP;
        let { fullName, email, password, phone, address } = req.body;

        await AmqpProducer.producer(CONNECT, REDUCER, JSON.stringify({ fullName, email, password, phone, address}));
        return await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message, access } = information;

            if(!status) throw new BadRequestError(message)
            new Ok(message).response(res, {access});
        })
    }

    /**
     * CLIENT SIGNOUT ACCOUNT
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async signout(req, res, next) {
        const error = validationResult(req);
        let { email } = req.body;

        if (!error.isEmpty()) throw new BadRequestError(error.array()[0].msg)

        let CONNECT = getCloud();
        let REDUCER_SIGNOUT = configQueue.AUTH.SIGNOUT.REDUCER_SIGNOUT;
        let CONSUMER = configQueue.AUTH.SIGNOUT.COMSUMER_SIGNOUT;

        await AmqpProducer.producer(CONNECT, REDUCER_SIGNOUT, JSON.stringify({email}));
        return await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;

            if(!status) throw new BadRequestError(message)
            return new Ok(message).response(res);
        })
    }

}

module.exports = new ControllerCommonAccess();