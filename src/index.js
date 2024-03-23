"use strict"
const express = require("express");
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const helmet = require("helmet");
const compression = require('compression');
const multer = require("multer");

const router = require("./router/router");
const MiddlewareCors = require('./middleware/middleware-cors');
const ConfigSwagger = require("./config/config-swagger");
const cloudinary = require("./utils/util-cloudinary");
const app = express();

app.use(MiddlewareCors.cors);

const swaggerExpec = swaggerJsDoc(ConfigSwagger.definitial());
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerExpec));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(helmet());
app.use(compression());

app.use(multer({storage: cloudinary.storage}).any('photos'));

app.use("/api/v1", router);

module.exports = app;