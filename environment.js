"use strict"
const environment = {
    model: {
        dev: {
            cors: {
                origins: [
                    'http://localhost:4200',
                    'http://localhost:8080'
                ]
            },
            swagger: {
                sersers: 'http://localhost:8080'
            },
            db: 'mongodb://127.0.0.1:27017/lands'
        },
        pro: {
            swagger: {
                sersers: 'https://lands-be.onrender.com'
            },
            db: 'mongodb+srv://duy366110:A6XzLL3lblXeKH40@management.fr9ayxi.mongodb.net/lands-store?retryWrites=true&w=majority'
        }
    },
    port: 8080
}

const env = environment.model.dev;

module.exports = environment;
module.exports.environment = env;