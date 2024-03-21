"use strict"

class ControllerCategory {

    constructor() { }

    async createCategory(req, res, next) {
        console.log('Create category');
        return res.status(200).json({status: true, message: 'Create category success'});
    }
}

module.exports = new ControllerCategory();