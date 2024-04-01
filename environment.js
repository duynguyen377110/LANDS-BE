"use strict"
const environment = {
    model: {
        dev: {
            cloudinary: {
                name: 'ditc3z3gj',
                key: 651235569212581,
                secret:'RfddO2mXOq20VwROSDjFLu3N8h4',
                directory: 'lands-test'
            },
            cors: {
                origins: [
                    'http://localhost:4200',
                    'http://localhost:8080'
                ]
            },
            swagger: {
                sersers: 'http://localhost:8080'
            },
            db: 'mongodb://127.0.0.1:27017/lands',
            queue: 'amqps://nciukfke:tfRF0Brz8Q0PvkXI-ELFMQrFbB53q3DN@armadillo.rmq.cloudamqp.com/nciukfke'
        },
        pro: {
            cloudinary: {
                name: 'ditc3z3gj',
                key: 651235569212581,
                secret:'RfddO2mXOq20VwROSDjFLu3N8h4',
                directory: 'lands'
            },
            cors: {
                origins: [
                    'https://lands-be.onrender.com',
                ]
            },
            swagger: {
                sersers: 'https://lands-be.onrender.com'
            },
            db: 'mongodb+srv://duy366110:A6XzLL3lblXeKH40@management.fr9ayxi.mongodb.net/lands-store?retryWrites=true&w=majority',
            queue: 'amqps://nciukfke:tfRF0Brz8Q0PvkXI-ELFMQrFbB53q3DN@armadillo.rmq.cloudamqp.com/nciukfke'
        }
    },
    port: 8080
}

const env = environment.model.pro;

module.exports = environment;
module.exports.environment = env;