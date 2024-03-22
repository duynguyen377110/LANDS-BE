"use strict"
const Servicecategory = require("../service/service-category");

class ControllerCategory {

    constructor() { }

    async createCategory(req, res, next) {
        let { title, description } = req.body;
        let category = await Servicecategory.createCategory({title, description});
        
        if(!category) return res.status(500).json({status: false, message: 'Create category unsuccess'});
        return res.status(200).json({status: true, message: 'Create category success'});
    }
}

module.exports = new ControllerCategory();