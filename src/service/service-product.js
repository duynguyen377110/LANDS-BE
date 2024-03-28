"use strict"
const ModelProduct = require("../model/model-product");
const ServiceCategory = require("./service-category");
const UtilCloudinary = require("../utils/util-cloudinary");

class ServiceProduct {

    constructor() { }

    /**
     * CREATE PRODUCT
     * @param {*} infor 
     * @returns 
     */
    async createProduct(infor = {}) {
        try {
            let category = await ServiceCategory.findCategoryById(infor.category);
            let product = await ModelProduct.create({
                productOwner: infor.productOwner,
                address: infor.address,
                contact: infor.contact,
                landArea: infor.landArea,
                price: infor.price,
                category,
                thumbs: infor.thumbs
            })

            if(!product) {
                return { status: false, message: 'Create product unsuccess'};
            }
            
            category.products.unshift(product);
            await category.save();
            return { status: true, message: 'Create product success'};

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ServiceProduct();