"use strict"
const express = require("express");
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const helmet = require("helmet");
const compression = require('compression');

const router = require("./router/router");
const routerAdmin = require("../src/router/admin/admin-router");
const routerCommon = require("../src/router/common/common-router");
const MiddlewareCors = require('./middleware/middleware-cors');
const ConfigSwagger = require("./config/config-swagger");
const app = express();

app.use(MiddlewareCors.cors);

const swaggerExpec = swaggerJsDoc(ConfigSwagger.definitial());
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerExpec));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(helmet());
app.use(compression());

app.use("/api/v1", router);
app.use("/api/v1/admin", routerAdmin);
app.use("/api/v1/common", routerCommon)

app.use((req, res, next) => {
    let error = Error("Not found");
    error.httpStatusCode = 404;
    return next(error);
})

app.use((error, req, res, next) => {
    let status = error.httpStatusCode || 500;

    return res.status(status).json({
        status,
        message: error.message || 'Internal server failed'
    })
})

module.exports = app;