"use strict"
const getCloud = require("../../amqp/amqp-core").getCloud;
const configQueue = require("../../config/config-queue");
const AmqpProducer = require("../../amqp/amqp-reducer");
const AmqpConsumer = require("../../amqp/amqp-consumer");
const { Ok } = require("../../core/core-sucess");

class ControllerCommonAccess {

    constructor() { }

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

}

module.exports = new ControllerCommonAccess();