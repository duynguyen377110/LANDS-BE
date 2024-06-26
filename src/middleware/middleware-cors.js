"use strict"
const environment = require("../../environment").environment;
class MiddlewareCors  {

    constructor() { }

    cors = (req, res, next) => {
        let origin = req.get('origin');
        req.admin = req.get("xxx-admin");

        // if(environment.cors.origins.some((host) => host === origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin? origin : '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, xxx-client, xxx-admin');
            res.setHeader('Access-Control-Expose-Headers', 'xxx-client, xxx-admin');
            next();

        // } else {
        //     res.status(400).json({status: false, message: 'Corss origin resuce sharing policy from server'});
        // }
        
    }

}

module.exports = new MiddlewareCors();