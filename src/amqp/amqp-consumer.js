"use strict"
class AmqpConsumer {

    constructor() { }

    async consumer(connect, queueName = '', cb) {
        try {
            const channel = await connect.createChannel();
            await channel.assertQueue(queueName, {
                durable: true
            })

            await channel.consume(queueName, async (message) => {
                message = JSON.parse(message.content.toString());
                
                cb(message);
                await channel.close();
            }, {
                noAck: true
            })

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AmqpConsumer();