"use strict"
const express = require("express");
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const router = require("./router/router");
const MiddlewareCors = require('./middleware/middleware-cors');
const ConfigSwagger = require("./config/config-swagger");
const app = express();

app.use(MiddlewareCors.cors);
const swaggerExpec = swaggerJsDoc(ConfigSwagger.definitial());
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerExpec));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api/v1", router);

module.exports = app;