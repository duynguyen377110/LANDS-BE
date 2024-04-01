"use strict"
const amqplib = require("amqplib");
const environment = require("../../environment").environment;

let _cloud = null;

const connectCloud = async (cb) => {
    try {
        _cloud = await amqplib.connect(environment.queue);
        console.log("Connect cloud rabbit mq successful");
        cb();

    } catch (error) {
        throw error;
    }
}

const getCloud = () => {
    if(_cloud) {
        return _cloud;
    }
    throw Error('Connection failed!');
}

module.exports = connectCloud;
module.exports.getCloud = getCloud;