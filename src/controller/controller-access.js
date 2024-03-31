"use strict"
const ServiceAccess = require("../service/service-access");
class ControllerAccess {

    constructor() { }

    async clientSignup(req, res, next) {
        console.log('Signup accout');
        return res.status(200).json("User signup success");
    }

    async adminSignin(req, res, next) {
        let { email, password } = req.body;
        let { status, message, access } = await ServiceAccess.userSignin({email, password});

        if(!status) {
            return res.status(400).json({status, message});
        }

        return res.status(200).json({
            status,
            message,
            metadata: {
                userId: access.user._id,
                email: access.user.email,
                phone: access.user.phone,
                address: access.user.address,
                accessToken: access.accessToken,
                refreshToken: access.refreshToken
            }
        });
    }

}

module.exports = new ControllerAccess();