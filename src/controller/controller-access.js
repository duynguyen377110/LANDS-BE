"use strict"

class ControllerAccess {

    constructor() { }

    async clientSignup(req, res, next) {
        console.log('Signup accout');
        return res.status(200).json("User signup success");
    }

}

module.exports = new ControllerAccess();