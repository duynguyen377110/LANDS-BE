"use strict"
const { validationResult } = require("express-validator");
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
        const error = validationResult(req);
        if (!error.isEmpty()) throw new BadRequestError(error.array()[0].msg)

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
     * CLIENT SIGNIN ACCOUNT
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async signin(req, res, next) {
        const error = validationResult(req);
        if (!error.isEmpty()) throw new BadRequestError(error.array()[0].msg)

        let CONNECT = getCloud();
        let REDUCER_SIGNIN = configQueue.AUTH.SIGNIN.REDUCER_SIGNIN;
        let CONSUMER = configQueue.AUTH.SIGNIN.COMSUMER_SIGNIN;
        let { email, password } = req.body;

        await AmqpProducer.producer(CONNECT, REDUCER_SIGNIN, JSON.stringify({email, password}));
        return await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message, access } = information;

            if(!status) throw new BadRequestError(message)

            let metadata = {
                userId: access.user._id,
                email: access.user.email,
                phone: access.user.phone,
                address: access.user.address,
                accessToken: access.accessToken,
                refreshToken: access.refreshToken
            }

            new Ok(message).response(res, metadata);
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
        if (!error.isEmpty()) throw new BadRequestError(error.array()[0].msg)

        let CONNECT = getCloud();
        let REDUCER_SIGNOUT = configQueue.AUTH.SIGNOUT.REDUCER_SIGNOUT;
        let CONSUMER = configQueue.AUTH.SIGNOUT.COMSUMER_SIGNOUT;
        let { email } = req.body;

        await AmqpProducer.producer(CONNECT, REDUCER_SIGNOUT, JSON.stringify({email}));
        return await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;

            if(!status) throw new BadRequestError(message)
            return new Ok(message).response(res);
        })
    }

}

module.exports = new ControllerCommonAccess();