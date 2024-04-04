"use strict"
const ModelProduct = require("../model/model-product");
const ServiceCategory = require("./service-category");
const UtilCloudinary = require("../utils/util-cloudinary");
const environment = require("../../environment").environment;

class ServiceProduct {

    constructor() { }

    /**
     * GET ALL PRODUCT
     * @returns 
     */
    async getAll() {
        try {
            return await ModelProduct.find({}).lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * GET PRODUCT BY ID
     * @param {*} id 
     * @returns 
     */
    async getProductById(id) {
        try {
            return await ModelProduct
                        .findById(id)
                        .populate([
                            {
                                path: 'categories'
                            }
                        ])
                        .lean();

        } catch (error) {
            throw error;
        }
    }

    /**
     * FIND PRODUCT BY ID
     * @param {*} id 
     * @returns 
     */
    async findProductById(id = '') {
        try {
            return await ModelProduct
                        .findById(id)
                        .populate([
                            {
                                path: 'categories',
                            }
                        ]);

        } catch (error) {
            throw error;
        }
    }

    /**
     * DELETE THUMBS IMAGE OF PRODUCT
     * @param {*} infor 
     * @returns 
     */
    async deleteThumbsProduct(infor = {}) {
        try {
            if(infor.thumbs.length) {
                let thumbs = [];

                for(let thumb of infor.thumbs) {
                    let thumbExtract = thumb.split('/');
                    let index = thumbExtract.findIndex((directory) => directory === environment.cloudinary.directory);
                    let thumbExtractResult = thumbExtract.slice(index).join('/').split('.')[0];

                    // CHECK IMAGE EXIT ON CLOUD
                    let {status } = await UtilCloudinary.exists(thumbExtractResult);
                    if(status) {
                        thumbs.push(thumbExtractResult);
                    }
                }
                
                if(thumbs.length) {
                    await UtilCloudinary.destroyMany(thumbs);
                }
            }

            return { status: true, message: 'Delete thumbs success'};

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ServiceProduct();