"use strict"
const express = require("express");
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const router = require("./router/router");
const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Open api nodejs',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'https://lands-be.onrender.com'
                // url: 'http://localhost:8080'
            }
        ]
    },
    apis: [
        './router/*.js'
    ]
}

const swaggerSpec = swaggerJsDoc(options);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json);

app.use("/", router);

module.exports = app;