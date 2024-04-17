"use strict"
const path = require("path");
const fs = require("fs");

class ControllerApplication {

    constructor() { }

    /**
     * LINK DOWNLOAD APPLICATION ANDROID VERSION 01
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async downAndroid(req, res, next) {
        let pathFile = path.join(__dirname, "../../", 'application', "android", "v1.apk");
        let fileDoc = fs.createReadStream(pathFile);

        res.setHeader('Content-Type', 'application/vnd.android.package-archive');
        res.setHeader('Content-Disposition', 'attachment; filename=application.apk');
        fileDoc.pipe(res);
    }
}

module.exports = new ControllerApplication();