"use strict"
const express = require("express");
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const router = require("./router/router");
const MiddlewareCors = require('./middleware/middleware-cors');
const app = express();
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'nodejs api',
            version: '1.0.0'
        },
        servers: [
            {
                // url: 'http://localhost:8080'
                url: 'https://lands-be.onrender.com'
            }
        ],
        paths: {
            '/example': { // Đường dẫn API
                get: { // Phương thức HTTP
                    summary: 'Example API',
                    description: 'Endpoint example',
                    responses: {
                        '200': {
                            description: 'Successful operation',
                            content: {
                                'application/json': {
                                    example: { message: 'This is the response from /example' }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./router/*.js']
}

app.use(MiddlewareCors.cors);
const swaggerExpec = swaggerJsDoc(options);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerExpec));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/", router);

module.exports = app;