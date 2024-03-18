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
            }
        },
        pro: {
            swagger: {
                sersers: 'https://lands-be.onrender.com'
            }
        }
    },
    port: 8080
}

const env = environment.model.pro;

module.exports = environment;

module.exports.environment = env;