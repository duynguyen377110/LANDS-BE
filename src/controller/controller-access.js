"use strict"
const getCloud = require("../amqp/amqp-core").getCloud;
const AmqpProducer = require("../amqp/amqp-reducer");
const AmqpConsumer = require("../amqp/amqp-consumer");
const configQueue = require("../config/config-queue");

class ControllerAccess {

    constructor() { }

    /**
     * CLIENT SIGNUP USER ACCOUNT
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async clientSignup(req, res, next) {
        // let { fullName, email, password, phone, address } = req.body;
        // let { status, message } = await ServiceAccess.userSignup({fullName, email, password, phone, address});
        // if(!status) {
        //     return res.status(400).json({status, message});
        // }
        // return res.status(200).json({status, message});
    }

    /**
     * CLIENT SIGNIN
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async clientSignin(req, res, next) {
        // let { email, password } = req.body;
        // let { status, message, access } = await ServiceAccess.userSignin({email, password});

        // if(!status) {
        //     return res.status(400).json({status, message});
        // }

        // return res.status(200).json({
        //     status,
        //     message,
        //     metadata: {
        //         userId: access.user._id,
        //         email: access.user.email,
        //         phone: access.user.phone,
        //         address: access.user.address,
        //         accessToken: access.accessToken,
        //         refreshToken: access.refreshToken
        //     }
        // });
    }

    /**
     * ADMIN SIGNIN
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async adminSignin(req, res, next) {
        let { email, password } = req.body;
        let CONNECT = getCloud();
        let REDUCER_SIGNIN = configQueue.AUTH.SIGNIN.REDUCER_SIGNIN;
        let CONSUMER = configQueue.AUTH.SIGNIN.COMSUMER_SIGNIN;

        await AmqpProducer.producer(CONNECT, REDUCER_SIGNIN, JSON.stringify({email, password}));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message, access } = information;
            if(!status) {
                return res.status(400).json({status, message});
            }

            return res.status(200).json({
                status,
                message,
                metadata: {
                    userId: access.user._id,
                    email: access.user.email,
                    phone: access.user.phone,
                    address: access.user.address,
                    accessToken: access.accessToken,
                    refreshToken: access.refreshToken
                }
            });

        })
    }

    /**
     * ADMIN SIGNOUT
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async adminSignout(req, res, next) {
        let { email } = req.body;

        let CONNECT = getCloud();
        let REDUCER_SIGNOUT = configQueue.AUTH.SIGNOUT.REDUCER_SIGNOUT;
        let CONSUMER = configQueue.AUTH.SIGNOUT.COMSUMER_SIGNOUT;

        await AmqpProducer.producer(CONNECT, REDUCER_SIGNOUT, JSON.stringify({email}));
        await AmqpConsumer.consumer(CONNECT, CONSUMER, (information) => {
            let { status, message } = information;

            if(!status) {
                return res.status(400).json({status, message});
            }
            return res.status(200).json({status, message});
        })
    }

}

module.exports = new ControllerAccess();