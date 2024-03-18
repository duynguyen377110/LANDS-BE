"use strict";
const environment = require("../../environment").environment;
const configConstantSwagger = require("./config-constant-swagger");

class ConfigSwagger {

    constructor() {}

    definitial() {
        return {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'Swagger open api',
                    version: '1.0.0'
                },
                servers: [
                    {
                        url: environment.swagger.sersers
                    }
                ],
                paths: {
                    '/api/v1/common-access/signup': {
                        ...configConstantSwagger.commonAccessSignup
                    }
                },
            },
            apis: ['./router/*.js']
        }
    }
}

module.exports = new ConfigSwagger();