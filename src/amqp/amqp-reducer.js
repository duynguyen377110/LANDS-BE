"use strict"
class AmqpProducer {

    constructor() { }

    async producer(connect = {}, queueName = "", payload = '') {
        try {
            const channel = await connect.createChannel();
            await channel.assertQueue(queueName, { durable: true});

            await channel.sendToQueue(queueName, Buffer.from(payload), {
                persistent: true,
                expiration: 1500
            })

        } catch (error) {
            throw error;
        }
    }

}

module.exports = new AmqpProducer();