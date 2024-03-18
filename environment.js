"use strict"
const environment = {
    model: {
        dev: {
            cors: {
                origins: [
                    'http://localhost:4200',
                    'http://localhost:8080'
                ]
            }
        },
        pro: {

        }
    },
    port: 8080
}

const env = environment.model.dev;

module.exports = environment;

module.exports.model = env;